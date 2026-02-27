import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    LayoutDashboard, FileText, Settings, Users, BarChart3,
    LogOut, Menu, X, Bell, Search, ChevronRight,
    TrendingUp, Eye, DollarSign, ShoppingCart,
    Plus, Edit3, Trash2, MoreVertical, Calendar,
    Globe, CheckCircle, Clock, AlertCircle,
    Shield, Crown, MessageCircle, Music, FileCode,
    Volume2, Layout, Save, Upload
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import './Admin.css'

const Admin = () => {
    const { user, userData, isAdmin, isManager, loading } = useAuth()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('dashboard')
    const [sidebarOpen, setSidebarOpen] = useState(true)

    // State for managing data
    const [allUsers, setAllUsers] = useState([])
    const [discordSounds, setDiscordSounds] = useState([
        { id: 1, name: 'Hoş Geldin Sesi', category: 'Karşılama', status: 'active', downloads: 245 },
        { id: 2, name: 'Bildirim Sesi', category: 'Bildirim', status: 'active', downloads: 189 },
        { id: 3, name: 'Level Up', category: 'Oyun', status: 'active', downloads: 320 },
        { id: 4, name: 'Ödül Kazandın', category: 'Ödül', status: 'active', downloads: 156 },
    ])
    const [templates, setTemplates] = useState([
        { id: 1, name: 'Discord Bot Şablonu', category: 'Discord', language: 'JavaScript', downloads: 456 },
        { id: 2, name: 'Landing Page Şablonu', category: 'Web', language: 'React', downloads: 312 },
        { id: 3, name: 'REST API Starter', category: 'Backend', language: 'Node.js', downloads: 278 },
    ])

    // Modal states
    const [showAddSound, setShowAddSound] = useState(false)
    const [showAddTemplate, setShowAddTemplate] = useState(false)
    const [showRoleModal, setShowRoleModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [newSound, setNewSound] = useState({ name: '', category: 'Karşılama' })
    const [newTemplate, setNewTemplate] = useState({ name: '', category: 'Discord', language: 'JavaScript' })

    // Auth check
    useEffect(() => {
        if (!loading && (!user || !isAdmin)) {
            navigate('/auth')
        }
    }, [user, isAdmin, loading, navigate])

    // Fetch users from Firestore
    useEffect(() => {
        const fetchUsers = async () => {
            const demoUsers = [
                { id: '1', username: 'coldyio', displayName: 'Coldyio', email: 'admin@codly.io', role: 'manager', provider: 'email', createdAt: { toDate: () => new Date() } },
                { id: '2', username: 'ahmet', displayName: 'Ahmet Yılmaz', email: 'ahmet@test.com', role: 'admin', provider: 'google', createdAt: { toDate: () => new Date() } },
                { id: '3', username: 'zeynep', displayName: 'Zeynep Kaya', email: 'zeynep@test.com', role: 'user', provider: 'email', createdAt: { toDate: () => new Date() } },
                { id: '4', username: 'can', displayName: 'Can Demir', email: 'can@test.com', role: 'user', provider: 'apple', createdAt: { toDate: () => new Date() } },
                { id: '5', username: 'elif', displayName: 'Elif Arslan', email: 'elif@test.com', role: 'user', provider: 'google', createdAt: { toDate: () => new Date() } },
            ]
            try {
                const querySnapshot = await getDocs(collection(db, 'users'))
                const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                // Use Firestore data if available, otherwise fall back to demo data
                setAllUsers(users.length > 0 ? users : demoUsers)
            } catch (error) {
                console.error('Kullanıcılar yüklenemedi:', error)
                // Demo data fallback
                setAllUsers(demoUsers)
            }
        }
        if (isAdmin) fetchUsers()
    }, [isAdmin])

    // Role update
    const handleRoleChange = async (userId, newRole) => {
        try {
            await updateDoc(doc(db, 'users', userId), { role: newRole })
            setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u))
            setShowRoleModal(false)
        } catch (error) {
            console.error('Rol güncellenemedi:', error)
            // Fallback for demo
            setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u))
            setShowRoleModal(false)
        }
    }

    // Add sound
    const handleAddSound = () => {
        if (!newSound.name) return
        setDiscordSounds(prev => [...prev, {
            id: Date.now(),
            name: newSound.name,
            category: newSound.category,
            status: 'active',
            downloads: 0
        }])
        setNewSound({ name: '', category: 'Karşılama' })
        setShowAddSound(false)
    }

    // Add template
    const handleAddTemplate = () => {
        if (!newTemplate.name) return
        setTemplates(prev => [...prev, {
            id: Date.now(),
            name: newTemplate.name,
            category: newTemplate.category,
            language: newTemplate.language,
            downloads: 0
        }])
        setNewTemplate({ name: '', category: 'Discord', language: 'JavaScript' })
        setShowAddTemplate(false)
    }

    // Delete sound
    const handleDeleteSound = (id) => {
        setDiscordSounds(prev => prev.filter(s => s.id !== id))
    }

    // Delete template
    const handleDeleteTemplate = (id) => {
        setTemplates(prev => prev.filter(t => t.id !== id))
    }

    const sidebarItems = [
        { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { id: 'users', icon: <Users size={20} />, label: 'Kullanıcılar' },
        { id: 'services', icon: <FileText size={20} />, label: 'Hizmetler' },
        { id: 'discord', icon: <MessageCircle size={20} />, label: 'Discord Sesleri' },
        { id: 'templates', icon: <Layout size={20} />, label: 'Şablonlar' },
        { id: 'projects', icon: <Globe size={20} />, label: 'Projeler' },
        { id: 'analytics', icon: <BarChart3 size={20} />, label: 'Analitik' },
        { id: 'settings', icon: <Settings size={20} />, label: 'Ayarlar' },
    ]

    const stats = [
        { icon: <Eye size={22} />, label: 'Toplam Ziyaretçi', value: '12,847', change: '+12.5%', positive: true, gradient: 'linear-gradient(135deg, #6c5ce7, #a29bfe)' },
        { icon: <Users size={22} />, label: 'Kayıtlı Üye', value: allUsers.length.toString(), change: '+5', positive: true, gradient: 'linear-gradient(135deg, #00cec9, #74b9ff)' },
        { icon: <DollarSign size={22} />, label: 'Aylık Gelir', value: '₺148,500', change: '+8.2%', positive: true, gradient: 'linear-gradient(135deg, #55efc4, #00b894)' },
        { icon: <TrendingUp size={22} />, label: 'Dönüşüm Oranı', value: '%4.6', change: '-0.3%', positive: false, gradient: 'linear-gradient(135deg, #fd79a8, #e84393)' },
    ]

    const recentProjects = [
        { name: 'TechStart Web Sitesi', client: 'Mehmet Yılmaz', status: 'active', progress: 75, date: '2024-12-15' },
        { name: 'ModaShop E-Ticaret', client: 'Ayşe Kara', status: 'completed', progress: 100, date: '2024-12-10' },
        { name: 'FinApp Mobil Uygulama', client: 'Can Demir', status: 'active', progress: 45, date: '2024-12-08' },
        { name: 'FoodDelivery API', client: 'Ali Öztürk', status: 'pending', progress: 10, date: '2024-12-20' },
        { name: 'HealthTrack Dashboard', client: 'Selin Koç', status: 'active', progress: 60, date: '2024-12-12' },
    ]

    const services = [
        { id: 1, name: 'Web Geliştirme', status: 'active', projects: 45, revenue: '₺85,000' },
        { id: 2, name: 'Mobil Uygulama', status: 'active', projects: 23, revenue: '₺62,000' },
        { id: 3, name: 'UI/UX Tasarım', status: 'active', projects: 38, revenue: '₺45,000' },
        { id: 4, name: 'Discord Hizmetleri', status: 'active', projects: 56, revenue: '₺32,000' },
        { id: 5, name: 'Reddit Hizmetleri', status: 'active', projects: 18, revenue: '₺15,000' },
        { id: 6, name: 'CodeShare', status: 'active', projects: 94, revenue: '₺0' },
        { id: 7, name: 'Backend Geliştirme', status: 'active', projects: 28, revenue: '₺52,000' },
        { id: 8, name: 'E-Ticaret Çözümleri', status: 'paused', projects: 12, revenue: '₺35,000' },
    ]

    const activities = [
        { text: 'Yeni üye kaydı: Elif Arslan', time: '30 dk önce', type: 'info' },
        { text: 'TechStart projesi %75 tamamlandı', time: '2 saat önce', type: 'success' },
        { text: 'Discord botuna yeni ses eklendi', time: '3 saat önce', type: 'info' },
        { text: 'ModaShop projesi başarıyla teslim edildi', time: '1 gün önce', type: 'success' },
        { text: 'Yeni şablon eklendi: React Starter', time: '2 gün önce', type: 'info' },
    ]

    const getRoleBadge = (role) => {
        const config = {
            manager: { label: 'Codly.io Manager', icon: <Crown size={12} />, className: 'role-badge--manager' },
            admin: { label: 'Admin', icon: <Shield size={12} />, className: 'role-badge--admin' },
            user: { label: 'Üye', icon: <Users size={12} />, className: 'role-badge--user' },
        }
        const r = config[role] || config.user
        return (
            <span className={`role-badge ${r.className}`}>
                {r.icon} {r.label}
            </span>
        )
    }

    const getStatusBadge = (status) => {
        const config = {
            active: { label: 'Aktif', icon: <CheckCircle size={12} />, className: 'status--active' },
            completed: { label: 'Tamamlandı', icon: <CheckCircle size={12} />, className: 'status--completed' },
            pending: { label: 'Beklemede', icon: <Clock size={12} />, className: 'status--pending' },
            paused: { label: 'Durduruldu', icon: <AlertCircle size={12} />, className: 'status--paused' },
        }
        const s = config[status] || config.pending
        return (
            <span className={`status-badge ${s.className}`}>
                {s.icon} {s.label}
            </span>
        )
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="admin-dashboard">
                        {/* Stats */}
                        <div className="admin-stats">
                            {stats.map((stat, i) => (
                                <div key={i} className="admin-stat-card glass-card" id={`admin-stat-${i}`}>
                                    <div className="admin-stat-card__header">
                                        <div className="admin-stat-card__icon" style={{ background: stat.gradient }}>
                                            {stat.icon}
                                        </div>
                                        <span className={`admin-stat-card__change ${stat.positive ? 'positive' : 'negative'}`}>
                                            {stat.change}
                                        </span>
                                    </div>
                                    <p className="admin-stat-card__value">{stat.value}</p>
                                    <p className="admin-stat-card__label">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="admin-dashboard__grid">
                            {/* Recent Projects */}
                            <div className="admin-panel-card glass-card">
                                <div className="admin-panel-card__header">
                                    <h3 className="admin-panel-card__title">Son Projeler</h3>
                                    <button className="admin-panel-card__action" onClick={() => setActiveTab('projects')}>Tümünü Gör</button>
                                </div>
                                <div className="admin-table-wrapper">
                                    <table className="admin-table" id="projects-table">
                                        <thead>
                                            <tr>
                                                <th>Proje</th>
                                                <th>Müşteri</th>
                                                <th>Durum</th>
                                                <th>İlerleme</th>
                                                <th>Tarih</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentProjects.map((project, i) => (
                                                <tr key={i}>
                                                    <td className="admin-table__project">{project.name}</td>
                                                    <td className="admin-table__client">{project.client}</td>
                                                    <td>{getStatusBadge(project.status)}</td>
                                                    <td>
                                                        <div className="admin-progress">
                                                            <div className="admin-progress__bar">
                                                                <div className="admin-progress__fill" style={{ width: `${project.progress}%` }}></div>
                                                            </div>
                                                            <span className="admin-progress__value">{project.progress}%</span>
                                                        </div>
                                                    </td>
                                                    <td className="admin-table__date">{project.date}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Activity Feed */}
                            <div className="admin-panel-card glass-card">
                                <div className="admin-panel-card__header">
                                    <h3 className="admin-panel-card__title">Son Aktiviteler</h3>
                                </div>
                                <div className="admin-activity-feed">
                                    {activities.map((activity, i) => (
                                        <div key={i} className="admin-activity-item" id={`activity-${i}`}>
                                            <div className={`admin-activity-item__dot admin-activity-item__dot--${activity.type}`}></div>
                                            <div className="admin-activity-item__content">
                                                <p className="admin-activity-item__text">{activity.text}</p>
                                                <p className="admin-activity-item__time">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )

            // ==================== USERS TAB ====================
            case 'users':
                return (
                    <div className="admin-services">
                        <div className="admin-services__header">
                            <h2 className="admin-services__title">
                                Kullanıcı Yönetimi
                                <span className="admin-services__count">({allUsers.length} üye)</span>
                            </h2>
                        </div>
                        <div className="admin-panel-card glass-card">
                            <div className="admin-table-wrapper">
                                <table className="admin-table" id="users-admin-table">
                                    <thead>
                                        <tr>
                                            <th>Kullanıcı</th>
                                            <th>E-posta</th>
                                            <th>Rol</th>
                                            <th>Giriş Yöntemi</th>
                                            <th>İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allUsers.map((u) => (
                                            <tr key={u.id}>
                                                <td>
                                                    <div className="admin-user-cell">
                                                        <div className="admin-user-cell__avatar">
                                                            {(u.displayName || u.username || 'U')[0].toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <span className="admin-user-cell__name">{u.displayName || u.username}</span>
                                                            <span className="admin-user-cell__username">@{u.username}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="admin-table__client">{u.email}</td>
                                                <td>{getRoleBadge(u.role)}</td>
                                                <td>
                                                    <span className="provider-badge">
                                                        {u.provider === 'google' ? '🔵 Google' :
                                                            u.provider === 'apple' ? '🍎 Apple' : '📧 E-posta'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="admin-table__actions">
                                                        {isManager && u.role !== 'manager' && (
                                                            <button
                                                                className="admin-table__action-btn"
                                                                title="Yetki Değiştir"
                                                                onClick={() => { setSelectedUser(u); setShowRoleModal(true); }}
                                                            >
                                                                <Shield size={14} />
                                                            </button>
                                                        )}
                                                        {u.role === 'manager' && (
                                                            <span className="admin-table__owner-badge">
                                                                <Crown size={12} /> Sahip
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Role Change Modal */}
                        {showRoleModal && selectedUser && (
                            <div className="admin-modal-overlay" onClick={() => setShowRoleModal(false)}>
                                <div className="admin-modal glass-card" onClick={e => e.stopPropagation()}>
                                    <div className="admin-modal__header">
                                        <h3>Yetki Değiştir</h3>
                                        <button onClick={() => setShowRoleModal(false)}><X size={20} /></button>
                                    </div>
                                    <p className="admin-modal__desc">
                                        <strong>{selectedUser.displayName || selectedUser.username}</strong> kullanıcısının yetkisini değiştir
                                    </p>
                                    <div className="admin-modal__roles">
                                        <button
                                            className={`admin-modal__role-btn ${selectedUser.role === 'user' ? 'active' : ''}`}
                                            onClick={() => handleRoleChange(selectedUser.id, 'user')}
                                        >
                                            <Users size={18} />
                                            <span>Üye</span>
                                            <small>Temel erişim hakları</small>
                                        </button>
                                        <button
                                            className={`admin-modal__role-btn ${selectedUser.role === 'admin' ? 'active' : ''}`}
                                            onClick={() => handleRoleChange(selectedUser.id, 'admin')}
                                        >
                                            <Shield size={18} />
                                            <span>Admin</span>
                                            <small>Panel erişimi ve yönetim</small>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )

            // ==================== SERVICES TAB ====================
            case 'services':
                return (
                    <div className="admin-services">
                        <div className="admin-services__header">
                            <h2 className="admin-services__title">Hizmet Yönetimi</h2>
                            <button className="btn-primary btn-sm" id="add-service-btn">
                                <Plus size={16} /> Yeni Hizmet Ekle
                            </button>
                        </div>
                        <div className="admin-panel-card glass-card">
                            <div className="admin-table-wrapper">
                                <table className="admin-table" id="services-admin-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Hizmet Adı</th>
                                            <th>Durum</th>
                                            <th>Proje Sayısı</th>
                                            <th>Gelir</th>
                                            <th>İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {services.map((service) => (
                                            <tr key={service.id}>
                                                <td className="admin-table__id">{service.id}</td>
                                                <td className="admin-table__project">{service.name}</td>
                                                <td>{getStatusBadge(service.status)}</td>
                                                <td>{service.projects}</td>
                                                <td className="admin-table__revenue">{service.revenue}</td>
                                                <td>
                                                    <div className="admin-table__actions">
                                                        <button className="admin-table__action-btn" title="Düzenle">
                                                            <Edit3 size={14} />
                                                        </button>
                                                        <button className="admin-table__action-btn admin-table__action-btn--danger" title="Sil">
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )

            // ==================== DISCORD SOUNDS TAB ====================
            case 'discord':
                return (
                    <div className="admin-services">
                        <div className="admin-services__header">
                            <h2 className="admin-services__title">
                                <MessageCircle size={22} /> Discord Sesleri
                                <span className="admin-services__count">({discordSounds.length} ses)</span>
                            </h2>
                            <button className="btn-primary btn-sm" onClick={() => setShowAddSound(true)} id="add-sound-btn">
                                <Plus size={16} /> Yeni Ses Ekle
                            </button>
                        </div>

                        <div className="admin-panel-card glass-card">
                            <div className="admin-table-wrapper">
                                <table className="admin-table" id="sounds-admin-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Ses Adı</th>
                                            <th>Kategori</th>
                                            <th>Durum</th>
                                            <th>İndirme</th>
                                            <th>İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {discordSounds.map((sound, i) => (
                                            <tr key={sound.id}>
                                                <td className="admin-table__id">{i + 1}</td>
                                                <td>
                                                    <div className="admin-sound-cell">
                                                        <Volume2 size={16} className="admin-sound-cell__icon" />
                                                        <span>{sound.name}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="category-badge">{sound.category}</span>
                                                </td>
                                                <td>{getStatusBadge(sound.status)}</td>
                                                <td>{sound.downloads}</td>
                                                <td>
                                                    <div className="admin-table__actions">
                                                        <button className="admin-table__action-btn" title="Düzenle">
                                                            <Edit3 size={14} />
                                                        </button>
                                                        <button
                                                            className="admin-table__action-btn admin-table__action-btn--danger"
                                                            title="Sil"
                                                            onClick={() => handleDeleteSound(sound.id)}
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Add Sound Modal */}
                        {showAddSound && (
                            <div className="admin-modal-overlay" onClick={() => setShowAddSound(false)}>
                                <div className="admin-modal glass-card" onClick={e => e.stopPropagation()}>
                                    <div className="admin-modal__header">
                                        <h3><Volume2 size={20} /> Yeni Ses Ekle</h3>
                                        <button onClick={() => setShowAddSound(false)}><X size={20} /></button>
                                    </div>
                                    <div className="admin-modal__form">
                                        <div className="admin-modal__field">
                                            <label>Ses Adı</label>
                                            <input
                                                type="text"
                                                value={newSound.name}
                                                onChange={e => setNewSound(prev => ({ ...prev, name: e.target.value }))}
                                                placeholder="Ses dosyasının adı"
                                                className="admin-modal__input"
                                            />
                                        </div>
                                        <div className="admin-modal__field">
                                            <label>Kategori</label>
                                            <select
                                                value={newSound.category}
                                                onChange={e => setNewSound(prev => ({ ...prev, category: e.target.value }))}
                                                className="admin-modal__input"
                                            >
                                                <option value="Karşılama">Karşılama</option>
                                                <option value="Bildirim">Bildirim</option>
                                                <option value="Oyun">Oyun</option>
                                                <option value="Ödül">Ödül</option>
                                                <option value="Müzik">Müzik</option>
                                                <option value="Efekt">Efekt</option>
                                            </select>
                                        </div>
                                        <div className="admin-modal__field">
                                            <label>Ses Dosyası</label>
                                            <div className="admin-modal__upload">
                                                <Upload size={24} />
                                                <span>Dosya yüklemek için tıklayın veya sürükleyin</span>
                                                <small>.mp3, .wav, .ogg</small>
                                            </div>
                                        </div>
                                        <button className="btn-primary admin-modal__submit" onClick={handleAddSound}>
                                            <Save size={16} /> Ses Ekle
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )

            // ==================== TEMPLATES TAB ====================
            case 'templates':
                return (
                    <div className="admin-services">
                        <div className="admin-services__header">
                            <h2 className="admin-services__title">
                                <Layout size={22} /> Şablon Yönetimi
                                <span className="admin-services__count">({templates.length} şablon)</span>
                            </h2>
                            <button className="btn-primary btn-sm" onClick={() => setShowAddTemplate(true)} id="add-template-btn">
                                <Plus size={16} /> Yeni Şablon Ekle
                            </button>
                        </div>

                        <div className="admin-templates-grid">
                            {templates.map(template => (
                                <div key={template.id} className="admin-template-card glass-card">
                                    <div className="admin-template-card__icon">
                                        <FileCode size={28} />
                                    </div>
                                    <h4 className="admin-template-card__name">{template.name}</h4>
                                    <div className="admin-template-card__meta">
                                        <span className="category-badge">{template.category}</span>
                                        <span className="language-badge">{template.language}</span>
                                    </div>
                                    <p className="admin-template-card__downloads">{template.downloads} indirme</p>
                                    <div className="admin-template-card__actions">
                                        <button className="admin-table__action-btn" title="Düzenle">
                                            <Edit3 size={14} />
                                        </button>
                                        <button
                                            className="admin-table__action-btn admin-table__action-btn--danger"
                                            title="Sil"
                                            onClick={() => handleDeleteTemplate(template.id)}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add Template Modal */}
                        {showAddTemplate && (
                            <div className="admin-modal-overlay" onClick={() => setShowAddTemplate(false)}>
                                <div className="admin-modal glass-card" onClick={e => e.stopPropagation()}>
                                    <div className="admin-modal__header">
                                        <h3><FileCode size={20} /> Yeni Şablon Ekle</h3>
                                        <button onClick={() => setShowAddTemplate(false)}><X size={20} /></button>
                                    </div>
                                    <div className="admin-modal__form">
                                        <div className="admin-modal__field">
                                            <label>Şablon Adı</label>
                                            <input
                                                type="text"
                                                value={newTemplate.name}
                                                onChange={e => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                                                placeholder="Şablon adını girin"
                                                className="admin-modal__input"
                                            />
                                        </div>
                                        <div className="admin-modal__field">
                                            <label>Kategori</label>
                                            <select
                                                value={newTemplate.category}
                                                onChange={e => setNewTemplate(prev => ({ ...prev, category: e.target.value }))}
                                                className="admin-modal__input"
                                            >
                                                <option value="Discord">Discord</option>
                                                <option value="Web">Web</option>
                                                <option value="Backend">Backend</option>
                                                <option value="Mobil">Mobil</option>
                                                <option value="DevOps">DevOps</option>
                                            </select>
                                        </div>
                                        <div className="admin-modal__field">
                                            <label>Programlama Dili</label>
                                            <select
                                                value={newTemplate.language}
                                                onChange={e => setNewTemplate(prev => ({ ...prev, language: e.target.value }))}
                                                className="admin-modal__input"
                                            >
                                                <option value="JavaScript">JavaScript</option>
                                                <option value="TypeScript">TypeScript</option>
                                                <option value="Python">Python</option>
                                                <option value="React">React</option>
                                                <option value="Node.js">Node.js</option>
                                                <option value="Go">Go</option>
                                            </select>
                                        </div>
                                        <button className="btn-primary admin-modal__submit" onClick={handleAddTemplate}>
                                            <Save size={16} /> Şablon Ekle
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )

            case 'projects':
                return (
                    <div className="admin-services">
                        <div className="admin-services__header">
                            <h2 className="admin-services__title">Proje Yönetimi</h2>
                            <button className="btn-primary btn-sm" id="add-project-btn">
                                <Plus size={16} /> Yeni Proje Ekle
                            </button>
                        </div>
                        <div className="admin-panel-card glass-card">
                            <div className="admin-table-wrapper">
                                <table className="admin-table" id="projects-admin-table">
                                    <thead>
                                        <tr>
                                            <th>Proje Adı</th>
                                            <th>Müşteri</th>
                                            <th>Durum</th>
                                            <th>İlerleme</th>
                                            <th>Tarih</th>
                                            <th>İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentProjects.map((project, i) => (
                                            <tr key={i}>
                                                <td className="admin-table__project">{project.name}</td>
                                                <td>{project.client}</td>
                                                <td>{getStatusBadge(project.status)}</td>
                                                <td>
                                                    <div className="admin-progress">
                                                        <div className="admin-progress__bar">
                                                            <div className="admin-progress__fill" style={{ width: `${project.progress}%` }}></div>
                                                        </div>
                                                        <span className="admin-progress__value">{project.progress}%</span>
                                                    </div>
                                                </td>
                                                <td className="admin-table__date">{project.date}</td>
                                                <td>
                                                    <div className="admin-table__actions">
                                                        <button className="admin-table__action-btn" title="Düzenle">
                                                            <Edit3 size={14} />
                                                        </button>
                                                        <button className="admin-table__action-btn admin-table__action-btn--danger" title="Sil">
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )

            default:
                return (
                    <div className="admin-placeholder">
                        <div className="admin-placeholder__icon">
                            {sidebarItems.find(i => i.id === activeTab)?.icon}
                        </div>
                        <h2 className="admin-placeholder__title">
                            {sidebarItems.find(i => i.id === activeTab)?.label}
                        </h2>
                        <p className="admin-placeholder__desc">Bu bölüm yakında aktif olacaktır.</p>
                    </div>
                )
        }
    }

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="admin-loading__spinner"></div>
                <p>Yükleniyor...</p>
            </div>
        )
    }

    return (
        <div className="admin-layout" id="admin-page">
            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? '' : 'admin-sidebar--collapsed'}`} id="admin-sidebar">
                <div className="admin-sidebar__header">
                    <Link to="/" className="admin-sidebar__logo">
                        <span className="admin-sidebar__logo-text">codly</span>
                        <span className="admin-sidebar__logo-dot">.</span>
                    </Link>
                    <button className="admin-sidebar__toggle" onClick={() => setSidebarOpen(!sidebarOpen)} id="sidebar-toggle">
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="admin-sidebar__nav">
                    <p className="admin-sidebar__section-title">GENEL</p>
                    {sidebarItems.slice(0, 3).map((item) => (
                        <button
                            key={item.id}
                            className={`admin-sidebar__item ${activeTab === item.id ? 'admin-sidebar__item--active' : ''}`}
                            onClick={() => setActiveTab(item.id)}
                            id={`sidebar-item-${item.id}`}
                        >
                            {item.icon}
                            {sidebarOpen && <span>{item.label}</span>}
                        </button>
                    ))}

                    <p className="admin-sidebar__section-title">İÇERİK</p>
                    {sidebarItems.slice(3, 6).map((item) => (
                        <button
                            key={item.id}
                            className={`admin-sidebar__item ${activeTab === item.id ? 'admin-sidebar__item--active' : ''}`}
                            onClick={() => setActiveTab(item.id)}
                            id={`sidebar-item-${item.id}`}
                        >
                            {item.icon}
                            {sidebarOpen && <span>{item.label}</span>}
                        </button>
                    ))}

                    <p className="admin-sidebar__section-title">SİSTEM</p>
                    {sidebarItems.slice(6).map((item) => (
                        <button
                            key={item.id}
                            className={`admin-sidebar__item ${activeTab === item.id ? 'admin-sidebar__item--active' : ''}`}
                            onClick={() => setActiveTab(item.id)}
                            id={`sidebar-item-${item.id}`}
                        >
                            {item.icon}
                            {sidebarOpen && <span>{item.label}</span>}
                        </button>
                    ))}
                </nav>

                <div className="admin-sidebar__footer">
                    <Link to="/" className="admin-sidebar__item admin-sidebar__item--logout">
                        <LogOut size={20} />
                        {sidebarOpen && <span>Siteye Dön</span>}
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="admin-main">
                {/* Top Bar */}
                <header className="admin-topbar" id="admin-topbar">
                    <div className="admin-topbar__left">
                        <button className="admin-sidebar__toggle-mobile" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <Menu size={20} />
                        </button>
                        <div className="admin-topbar__search">
                            <Search size={16} />
                            <input type="text" placeholder="Ara..." className="admin-topbar__search-input" id="admin-search" />
                        </div>
                    </div>
                    <div className="admin-topbar__right">
                        <button className="admin-topbar__notification" id="admin-notifications">
                            <Bell size={18} />
                            <span className="admin-topbar__notification-dot"></span>
                        </button>
                        <div className="admin-topbar__user">
                            <div className="admin-topbar__avatar">
                                {user?.photoURL ? (
                                    <img src={user.photoURL} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                ) : (
                                    (userData?.displayName || 'A')[0].toUpperCase()
                                )}
                            </div>
                            <div className="admin-topbar__user-info">
                                <span className="admin-topbar__user-name">{userData?.displayName || 'Admin'}</span>
                                <span className="admin-topbar__user-role">
                                    {userData?.role === 'manager' ? 'Codly.io Manager' : 'Admin'}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="admin-content" id="admin-content">
                    <div className="admin-content__header">
                        <h1 className="admin-content__title">
                            {sidebarItems.find(i => i.id === activeTab)?.label}
                        </h1>
                        <div className="admin-content__breadcrumb">
                            <Link to="/admin">Admin</Link>
                            <ChevronRight size={14} />
                            <span>{sidebarItems.find(i => i.id === activeTab)?.label}</span>
                        </div>
                    </div>
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

export default Admin
