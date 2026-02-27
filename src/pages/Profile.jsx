import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import {
    User, Settings, LogOut, Edit3, Save, X, Camera,
    Music, MessageCircle, Globe, Shield, Upload,
    Linkedin, Github, Twitter, Instagram, Link as LinkIcon,
    MapPin, Briefcase, Calendar
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './Profile.css'

const Profile = () => {
    const { user, userData: currentUserData, loading, logout, updateUserProfile, isAdmin, linkDiscordAccount } = useAuth()
    const navigate = useNavigate()
    const { username } = useParams()

    const [isEditing, setIsEditing] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [editData, setEditData] = useState({})
    const [publicUser, setPublicUser] = useState(null)
    const [loadingProfile, setLoadingProfile] = useState(false)

    const bannerInputRef = useRef(null)
    const avatarInputRef = useRef(null)

    // Kendi profilim mi? (URL'de username yoksa YA DA URL'deki username benim username'imse)
    const isOwnProfile = !username || (currentUserData && currentUserData.username === username)
    // Gösterilecek kullanıcı verisi
    const displayUser = isOwnProfile ? currentUserData : publicUser

    useEffect(() => {
        if (username && !isOwnProfile) {
            const fetchUser = async () => {
                setLoadingProfile(true)
                try {
                    const q = query(collection(db, "users"), where("username", "==", username))
                    const querySnapshot = await getDocs(q)
                    if (!querySnapshot.empty) {
                        setPublicUser(querySnapshot.docs[0].data())
                    } else {
                        setPublicUser(null)
                    }
                } catch (error) {
                    console.error("Profil alınamadı:", error)
                } finally {
                    setLoadingProfile(false)
                }
            }
            fetchUser()
        }
    }, [username, isOwnProfile])

    useEffect(() => {
        if (isOwnProfile && currentUserData) {
            setEditData({ ...currentUserData })
        }
    }, [currentUserData, isOwnProfile])

    useEffect(() => {
        // Sadece kendi profilimdeysem ve giriş yapmamışsam redirect
        if (!loading && !user && !username) navigate('/auth')
    }, [user, loading, navigate, username])

    const handleChange = (e) => {
        const { name, value } = e.target
        setEditData(prev => ({ ...prev, [name]: value }))
    }

    const handleSave = async () => {
        try {
            await updateUserProfile(editData)
            setIsEditing(false)
        } catch (error) {
            console.error('Profil kaydedilemedi:', error)
            alert('Hata oluştu.')
        }
    }

    const handleFileUpload = async (file, type) => {
        if (!file) return
        if (file.size > 5 * 1024 * 1024) {
            alert('Dosya çok büyük (Max 5MB)')
            return
        }

        setIsUploading(true)
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', 'ml_default')

            const response = await fetch('https://api.cloudinary.com/v1_1/dnvza7yn6/image/upload', {
                method: 'POST',
                body: formData
            })

            const data = await response.json()
            if (data.error) throw new Error(data.error.message)

            await updateUserProfile({
                [type === 'avatar' ? 'photoURL' : 'banner']: data.secure_url
            })
        } catch (error) {
            alert('Yükleme başarısız')
        } finally {
            setIsUploading(false)
        }
    }

    if (loading || loadingProfile) return <div className="loading-spinner"></div>

    // Eğer profil verisi yoksa (örn: geçersiz username)
    if (!displayUser) return (
        <div className="profile-page" style={{ paddingTop: '120px', textAlign: 'center' }}>
            <h2>Kullanıcı bulunamadı</h2>
            <button className="btn btn--primary" onClick={() => navigate('/')}>Anasayfaya Dön</button>
        </div>
    )

    return (
        <div className="profile-page">
            <div className="profile-container">

                {/* Banner Section */}
                <div className="profile-banner">
                    {displayUser.banner ? (
                        <img src={displayUser.banner} alt="Banner" className="profile-banner__img" />
                    ) : (
                        <div className="profile-banner__placeholder" />
                    )}

                    {isOwnProfile && (
                        <div className="profile-banner__actions">
                            <button className="btn-icon-glass" onClick={() => bannerInputRef.current?.click()}>
                                <Camera size={20} />
                            </button>
                            <input type="file" ref={bannerInputRef} hidden onChange={(e) => handleFileUpload(e.target.files[0], 'banner')} accept="image/*" />
                        </div>
                    )}
                </div>

                {/* Profile Header (Avatar overlap) */}
                <div className="profile-header">
                    <div className="profile-avatar-section">
                        <div className="profile-avatar">
                            <img src={displayUser.photoURL || `https://ui-avatars.com/api/?name=${displayUser.username}&background=random`} alt="Avatar" />
                            {isOwnProfile && (
                                <>
                                    <div className="avatar-edit-overlay" onClick={() => avatarInputRef.current?.click()}>
                                        <Camera size={24} />
                                    </div>
                                    <input type="file" ref={avatarInputRef} hidden onChange={(e) => handleFileUpload(e.target.files[0], 'avatar')} accept="image/*" />
                                </>
                            )}
                        </div>

                        <div className="profile-identity">
                            <div className="profile-name-row">
                                <h1 className="profile-displayname">{displayUser.displayName || displayUser.username}</h1>
                                {displayUser.role === 'admin' && <span className="badge badge-admin"><Shield size={12} /> Admin</span>}
                            </div>
                            <span className="profile-username">@{displayUser.username}</span>
                        </div>
                    </div>

                    {isOwnProfile && (
                        <div className="profile-header-actions">
                            <style>{`
                                .btn-edit-visible {
                                    background: var(--accent-gradient-btn) !important;
                                    color: white !important;
                                    border: none !important;
                                    padding: 10px 20px !important;
                                    border-radius: 8px !important;
                                    font-weight: 600 !important;
                                    cursor: pointer !important;
                                    display: flex !important;
                                    align-items: center !important;
                                    gap: 8px !important;
                                    opacity: 1 !important;
                                    visibility: visible !important;
                                    z-index: 100 !important;
                                    box-shadow: 0 4px 6px rgba(0,0,0,0.3) !important;
                                    transition: all 0.2s ease !important;
                                }
                                .btn-edit-visible:hover {
                                    transform: translateY(-2px);
                                    box-shadow: 0 6px 12px var(--accent-glow) !important;
                                }
                            `}</style>
                            <button className="btn-edit-visible" onClick={() => setIsEditing(true)}>
                                <Edit3 size={18} /> Profili Düzenle
                            </button>
                        </div>
                    )}
                </div>

                {/* Main Content Grid */}
                <div className="profile-content-grid">

                    {/* Left Sidebar */}
                    <aside className="profile-sidebar">

                        {/* Discord Card */}
                        {(isOwnProfile || displayUser.hasDiscordConnected) && (
                            <div className="discord-full-card">
                                {displayUser.hasDiscordConnected ? (
                                    <>
                                        <div
                                            className="discord-banner-area"
                                            style={displayUser.discordBanner
                                                ? { backgroundImage: `url(${displayUser.discordBanner})` }
                                                : { backgroundColor: displayUser.discordAccentColor ? `#${displayUser.discordAccentColor.toString(16).padStart(6, '0')}` : '#5865F2' }
                                            }
                                        ></div>

                                        <div className="discord-avatar-wrapper">
                                            <div className="discord-avatar-container">
                                                <img
                                                    src={displayUser.discordAvatar || "https://cdn.discordapp.com/embed/avatars/0.png"}
                                                    className="discord-avatar-img"
                                                    alt="Discord Avatar"
                                                />
                                                {displayUser.discordDecoration && (
                                                    <img src={displayUser.discordDecoration} className="discord-decoration-img" alt="" />
                                                )}
                                            </div>
                                        </div>

                                        <div className="discord-profile-body">
                                            <div className="discord-display-name">{displayUser.discordGlobalName || displayUser.discordUsername}</div>
                                            <div className="discord-username">@{displayUser.discordUsername}</div>

                                            {/* Bio */}
                                            {displayUser.discordBio && (
                                                <div className="discord-bio">{displayUser.discordBio}</div>
                                            )}

                                            <div className="discord-divider"></div>

                                            {/* Member Since */}
                                            <span className="discord-section-title">ÜYELİK TARİHİ</span>
                                            <div className="discord-member-since">
                                                <span className="discord-member-date">
                                                    {displayUser.discordCreatedAt
                                                        ? new Date(displayUser.discordCreatedAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
                                                        : 'Bilinmiyor'}
                                                </span>
                                            </div>

                                            {/* Connections */}
                                            {displayUser.discordConnections && displayUser.discordConnections.length > 0 && (
                                                <>
                                                    <div className="discord-divider"></div>
                                                    <span className="discord-section-title">BAĞLANTILAR</span>
                                                    <div className="discord-connections">
                                                        {displayUser.discordConnections.map((conn, index) => (
                                                            <a
                                                                key={index}
                                                                href={conn.url || '#'}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="discord-connection-item"
                                                                title={conn.type}
                                                            >
                                                                {conn.name}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </>
                                            )}

                                            <div className="discord-actions" style={{ marginTop: '16px' }}>
                                                <a
                                                    href={`https://discord.com/users/${displayUser.discordId}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="discord-message-btn"
                                                >
                                                    Mesaj Gönder
                                                </a>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div style={{ padding: '24px', textAlign: 'center', background: '#111214', color: 'white' }}>
                                        <div style={{ marginBottom: '16px' }}>
                                            <svg width="48" height="48" viewBox="0 0 127.14 96.36" fill="#5865F2">
                                                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22c2.36-24.44-5.24-49.77-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                                            </svg>
                                        </div>
                                        <h3 style={{ marginBottom: '12px', fontSize: '18px' }}>Discord Hesabını Bağla</h3>
                                        <p style={{ marginBottom: '20px', color: '#b5bac1', fontSize: '14px' }}>
                                            Profil kartını özelleştirmek ve sunucularını yönetmek için bağla.
                                        </p>
                                        <button onClick={linkDiscordAccount} className="btn-discord-connect-large">
                                            Hesabı Bağla
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Social Links */}
                        <div className="profile-card">
                            <div className="card-header">
                                <LinkIcon size={20} />
                                <h3>Bağlantılar</h3>
                            </div>
                            <div className="social-links">
                                {displayUser.website && <a href={displayUser.website} target="_blank" className="social-item"><Globe size={18} /> Website</a>}
                                {displayUser.github && <a href={displayUser.github} target="_blank" className="social-item"><Github size={18} /> GitHub</a>}
                                {displayUser.twitter && <a href={displayUser.twitter} target="_blank" className="social-item"><Twitter size={18} /> Twitter</a>}
                                {displayUser.instagram && <a href={displayUser.instagram} target="_blank" className="social-item"><Instagram size={18} /> Instagram</a>}
                                {!displayUser.website && !displayUser.github && !displayUser.twitter && !displayUser.instagram && (
                                    <p className="text-muted text-sm">Bağlantı eklenmemiş.</p>
                                )}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="profile-card">
                            <div className="info-item">
                                <MapPin size={16} /> <span>{displayUser.location || 'Konum yok'}</span>
                            </div>
                            <div className="info-item">
                                <Briefcase size={16} /> <span>{displayUser.company || 'Meslek yok'}</span>
                            </div>
                            <div className="info-item">
                                <Calendar size={16} /> <span>Katılım: {displayUser.createdAt?.toDate ? new Date(displayUser.createdAt.toDate()).toLocaleDateString() : 'Yeni'}</span>
                            </div>
                        </div>

                    </aside>

                    {/* Right Content */}
                    <main className="profile-main-column">
                        {/* Bio */}
                        <div className="profile-card">
                            <div className="card-header">
                                <h3>Hakkında</h3>
                            </div>
                            <p className="profile-bio">
                                {displayUser.bio || "Kendinden bahset..."}
                            </p>
                        </div>

                        {/* Spotify Embed */}
                        {displayUser.spotify && (
                            <div className="profile-card">
                                <iframe
                                    src={`https://open.spotify.com/embed/track/${displayUser.spotify.split('/').pop().split('?')[0]}?utm_source=generator&theme=0`}
                                    width="100%"
                                    height="80"
                                    frameBorder="0"
                                    allow="encrypted-media"
                                    loading="lazy"
                                    style={{ borderRadius: '12px' }}
                                ></iframe>
                            </div>
                        )}

                        {/* Stats Placeholder */}
                        <div className="stats-grid">
                            <div className="stat-card">
                                <span className="stat-value">0</span>
                                <span className="stat-label">Sunucu</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-value">0</span>
                                <span className="stat-label">Bot</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-value">0</span>
                                <span className="stat-label">Yorum</span>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {/* Edit Modal (isOwnProfile kontrolü ile) */}
            {isOwnProfile && isEditing && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Profili Düzenle</h2>
                            <button onClick={() => setIsEditing(false)}><X size={24} /></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Görünen İsim</label>
                                <input name="displayName" value={editData.displayName} onChange={handleChange} className="form-input" />
                            </div>
                            <div className="form-group">
                                <label>Biyografi</label>
                                <textarea name="bio" value={editData.bio} onChange={handleChange} className="form-textarea" rows={3} />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Konum</label>
                                    <input name="location" value={editData.location} onChange={handleChange} className="form-input" />
                                </div>
                                <div className="form-group">
                                    <label>Meslek / Şirket</label>
                                    <input name="company" value={editData.company} onChange={handleChange} className="form-input" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Spotify Şarkı Linki</label>
                                <input name="spotify" value={editData.spotify} onChange={handleChange} className="form-input" placeholder="https://open.spotify.com/track/..." />
                            </div>

                            <h3>Sosyal Medya</h3>
                            <div className="social-inputs">
                                <input name="website" value={editData.website} onChange={handleChange} placeholder="Website URL" className="form-input" />
                                <input name="github" value={editData.github} onChange={handleChange} placeholder="GitHub URL" className="form-input" />
                                <input name="twitter" value={editData.twitter} onChange={handleChange} placeholder="Twitter URL" className="form-input" />
                                <input name="instagram" value={editData.instagram} onChange={handleChange} placeholder="Instagram URL" className="form-input" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn--secondary" onClick={() => setIsEditing(false)}>İptal</button>
                            <button className="btn btn--primary" onClick={handleSave}>Kaydet</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile
// trigger redeploy
