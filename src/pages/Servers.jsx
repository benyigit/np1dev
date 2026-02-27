import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Hash, Users, Star, ArrowRight, Filter, Globe } from 'lucide-react'
import './Servers.css'

const Servers = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [category, setCategory] = useState('all')

    // Örnek Veriler (Daha sonra Firebase'den çekeceğiz)
    const servers = [
        {
            id: '1',
            name: 'Codly Topluluğu',
            icon: 'https://cdn.discordapp.com/icons/853565551936307220/8b6d859424602f26792da0256860223e.png',
            description: 'Yazılım, tasarım ve teknoloji üzerine kurulu Türkiye\'nin en aktif topluluğu.',
            members: 15420,
            online: 3200,
            tags: ['Yazılım', 'Topluluk', 'Eğitim'],
            premium: true
        },
        {
            id: '2',
            name: 'Oyun Alanı',
            icon: null, // Placeholder kullanacak
            description: 'Her türlü oyunun konuşulduğu, etkinliklerin yapıldığı eğlence sunucusu.',
            members: 8500,
            online: 1200,
            tags: ['Oyun', 'Eğlence', 'Sohbet'],
            premium: false
        },
        {
            id: '3',
            name: 'Tasarım Atölyesi',
            icon: null,
            description: 'Grafik tasarımcıların buluşma noktası. Portfolyo paylaşımı ve yardımlaşma.',
            members: 5600,
            online: 800,
            tags: ['Tasarım', 'Sanat', 'Freelance'],
            premium: false
        }
    ]

    const categories = [
        { id: 'all', name: 'Tümü' },
        { id: 'gaming', name: 'Oyun' },
        { id: 'community', name: 'Topluluk' },
        { id: 'dev', name: 'Yazılım' },
        { id: 'design', name: 'Tasarım' },
        { id: 'music', name: 'Müzik' }
    ]

    return (
        <div className="servers-page">
            {/* Hero Section */}
            <section className="servers-hero">
                <div className="servers-hero__content container">
                    <h1 className="servers-hero__title">
                        En İyi <span className="text-gradient">Discord Sunucularını</span> Keşfet
                    </h1>
                    <p className="servers-hero__desc">
                        Binlerce sunucu arasından ilgini çekenleri bul, topluluklara katıl ve yeni arkadaşlar edin.
                    </p>

                    <div className="search-box">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Sunucu ara... (Örn: Minecraft, Yazılım)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn--primary">Ara</button>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <div className="filters-section container">
                <div className="categories-scroll">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`category-btn ${category === cat.id ? 'active' : ''}`}
                            onClick={() => setCategory(cat.id)}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                <div className="filters-actions">
                    <button className="btn btn--outline btn--sm">
                        <Filter size={16} /> Filtrele
                    </button>
                </div>
            </div>

            {/* Server Grid */}
            <section className="servers-grid container">
                {servers.map(server => (
                    <Link to={`/servers/${server.id}`} key={server.id} className="server-card">
                        <div className="server-card__header">
                            {server.premium && (
                                <div className="premium-badge">
                                    <Star size={12} fill="currentColor" /> Öne Çıkan
                                </div>
                            )}
                            <div className="server-banner" style={{ backgroundColor: '#2b2d31' }}></div>
                        </div>

                        <div className="server-card__body">
                            <div className="server-icon-wrapper">
                                {server.icon ? (
                                    <img src={server.icon} alt={server.name} className="server-icon" />
                                ) : (
                                    <div className="server-icon placeholder">
                                        {server.name.substring(0, 2).toUpperCase()}
                                    </div>
                                )}
                            </div>

                            <h3 className="server-name">{server.name}</h3>
                            <p className="server-desc">{server.description}</p>

                            <div className="server-stats">
                                <div className="stat">
                                    <div className="status-dot online"></div>
                                    <span>{(server.online / 1000).toFixed(1)}k Çevrimiçi</span>
                                </div>
                                <div className="stat">
                                    <Users size={14} />
                                    <span>{(server.members / 1000).toFixed(1)}k Üye</span>
                                </div>
                            </div>

                            <div className="server-tags">
                                {server.tags.map(tag => (
                                    <span key={tag} className="tag">#{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div className="server-card__footer">
                            <button className="btn btn--secondary w-full">
                                İncele <ArrowRight size={16} />
                            </button>
                        </div>
                    </Link>
                ))}
            </section>
        </div>
    )
}

export default Servers
