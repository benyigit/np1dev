export default async function handler(req, res) {
    const { uid } = req.query;

    if (!uid) {
        return res.status(400).json({ error: 'Missing UID' });
    }

    const clientId = process.env.DISCORD_CLIENT_ID;
    const redirectUri = process.env.DISCORD_REDIRECT_URI || 'http://localhost:5173/api/discord/callback';
    const scope = 'identify email connections guilds';

    const discordUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}&state=${uid}`;

    res.redirect(discordUrl);
}
