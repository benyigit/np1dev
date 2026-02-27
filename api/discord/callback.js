import { db } from '../config.js';

export default async function handler(req, res) {
    try {
        // Check DB Connection First
        if (!db) {
            throw new Error("Firebase DB nesnesi boş! Config hatası olabilir.");
        }

        const { code, state } = req.query; // state = uid

        if (!code || !state) {
            return res.status(400).json({ error: 'Missing code or state' });
        }

        const clientId = process.env.DISCORD_CLIENT_ID;
        const clientSecret = process.env.DISCORD_CLIENT_SECRET;
        const redirectUri = process.env.DISCORD_REDIRECT_URI || 'http://localhost:5173/api/discord/callback';

        // 1. Get Access Token
        const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri,
            }),
        });

        const tokenData = await tokenResponse.json();
        if (tokenData.error) throw new Error(tokenData.error_description || tokenData.error || 'Token Error');

        const accessToken = tokenData.access_token;

        // 2. Get User Info & Connections
        const [userRes, connRes] = await Promise.all([
            fetch('https://discord.com/api/users/@me', { headers: { Authorization: `Bearer ${accessToken}` } }),
            fetch('https://discord.com/api/users/@me/connections', { headers: { Authorization: `Bearer ${accessToken}` } }),
        ]);

        if (!userRes.ok) throw new Error('Discord User Fetch Failed: ' + userRes.statusText);

        const discordUser = await userRes.json();
        let connections = [];

        if (connRes.ok) {
            const rawConnections = await connRes.json();
            connections = Array.isArray(rawConnections)
                ? rawConnections.filter(c => c.visibility === 1).map(c => ({
                    type: c.type,
                    name: c.name,
                    id: c.id,
                    url: c.type === 'github' ? `https://github.com/${c.name}` :
                        c.type === 'twitter' ? `https://twitter.com/${c.name}` :
                            c.type === 'reddit' ? `https://reddit.com/u/${c.name}` :
                                c.type === 'youtube' ? `https://youtube.com/channel/${c.id}` :
                                    c.type === 'twitch' ? `https://twitch.tv/${c.name}` :
                                        c.type === 'steam' ? `https://steamcommunity.com/profiles/${c.id}` : null
                }))
                : [];
        }

        // 3. Update Firestore (Admin SDK)
        const bannerUrl = discordUser.banner
            ? `https://cdn.discordapp.com/banners/${discordUser.id}/${discordUser.banner}.png?size=600`
            : null;

        const avatarUrl = discordUser.avatar
            ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=256`
            : null;

        const decorationUrl = discordUser.avatar_decoration_data
            ? `https://cdn.discordapp.com/avatar-decoration-presets/${discordUser.avatar_decoration_data.asset}.png`
            : null;

        const discordCreatedAt = new Date(Number((BigInt(discordUser.id) >> 22n)) + 1420070400000).toISOString();

        // Firestore Update via Admin SDK
        await db.collection('users').doc(state).update({
            discordId: discordUser.id,
            discordUsername: discordUser.username,
            discordDiscriminator: discordUser.discriminator,
            discordGlobalName: discordUser.global_name,
            discordAvatar: avatarUrl,
            discordBanner: bannerUrl,
            discordDecoration: decorationUrl,
            discordAccentColor: discordUser.accent_color,
            discordPublicFlags: discordUser.public_flags,
            discordBio: discordUser.bio || '',
            discordConnections: connections,
            discordCreatedAt: discordCreatedAt,
            hasDiscordConnected: true,
            updatedAt: new Date()
        });

        // Success
        res.redirect('/profile?status=success');

    } catch (error) {
        console.error('Callback Error:', error);
        // Return visible JSON error
        res.status(500).json({ error: "CALLBACK_ERROR", message: error.message, stack: error.stack });
    }
}
