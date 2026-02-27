import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Hash, Users, Star, ArrowRight, Filter, Zap, ChevronUp, Download } from 'lucide-react'
import './Bots.css'

const Bots = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [category, setCategory] = useState('all')

    // Örnek Veriler
    const bots = [
        {
            id: '1',
            name: 'Moderator Pro',
            icon: 'https://cdn.discordapp.com/embed/avatars/1.png',
            desc: 'Sunucunuzu güvende tutmak için en gelişmiş moderasyon botu. Otomatik ban, kick ve susturma özellikleri.',
            votes: 1250,
            servers: 4500,
            tags: ['Moderasyon', 'Güvenlik'],
            promoted: true
        },
        {
            id: '2',
            name: 'Music Master',
            icon: 'https://cdn.discordapp.com/embed/avatars/2.png',
            desc: 'Spotify, SoundCloud ve YouTube destekli yüksek kaliteli müzik botu. Kesintisiz yayın.',
            votes: 980,
            servers: 3200,
            tags: ['Müzik', 'Eğlence'],
            promoted: false
        },
        {
            id: '3',
            name: 'Economy King',
            icon: 'https://cdn.discordapp.com/embed/avatars/3.png',
            desc: 'Gelişmiş ekonomi sistemi, market, ticaret ve kumar oyunları ile sunucunuzu canlandırın.',
            votes: 850,
            servers: 1800,
            tags: ['Ekonomi', 'Oyun'],
            promoted: false
        },
        {
            id: '4',
            name: 'LevelUp',
            icon: 'https://cdn.discordapp.com/embed/avatars/4.png',
            desc: 'Kullanıcılarınızı aktif tutmak için seviye ve XP sistemi. Özelleştirilebilir kartlar.',
            votes: 720,
            servers: 2100,
            tags: ['Seviye', 'Sosyal'],
            promoted: false
        }
    ]

    const categories = [
        { id: 'all', name: 'Tümü' },
        { id: 'moderation', name: 'Moderasyon' },
        { id: 'music', name: 'Müzik' },
        { id: 'economy', name: 'Ekonomi' },
        { id: 'leveling', name: 'Seviye' },
        { id: 'fun', name: 'Eğlence' }
    ]

    return (
        <div className="bots-page">
            {/* Hero Section */}
            <section className="bots-hero">
                <div className="bots-hero__content container">
                    <h1 className="bots-hero__title">
                        Sunucunuza Güç Katacak <span className="text-gradient">Botlar</span>
                    </h1>
                    <p className="bots-hero__desc">
                        Moderasyondan müziğe, eğlenceden ekonomiye kadar binlerce botu keşfedin ve sunucunuza ekleyin.
                    </p>

                    <div className="search-box">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Bot ara... (Örn: Müzik, Moderasyon)"
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
                    <Link to="/add-bot" className="btn btn--primary btn--sm">
                        <Zap size={16} className="mr-2" /> Bot Ekle
                    </Link>
                </div>
            </div>

            {/* Bot Grid */}
            <section className="bots-grid container">
                {bots.map(bot => (
                    <div key={bot.id} className="bot-card">
                        {bot.promoted && (
                            <div className="promoted-badge">
                                <Star size={12} fill="currentColor" /> Öne Çıkan
                            </div>
                        )}

                        <div className="bot-card__header">
                            <div className="bot-icon-wrapper">
                                <img src={bot.icon} alt={bot.name} className="bot-icon" />
                            </div>
                            <div className="bot-header-info">
                                <h3 className="bot-name">{bot.name}</h3>
                                <div className="bot-stats-mini">
                                    <span title="Sunucu Sayısı"><Users size={12} /> {(bot.servers / 1000).toFixed(1)}k</span>
                                    <span title="Oy Sayısı"><ChevronUp size={12} /> {bot.votes}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bot-card__body">
                            <p className="bot-desc">{bot.desc}</p>
                            <div className="bot-tags">
                                {bot.tags.map(tag => (
                                    <span key={tag} className="tag">#{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div className="bot-card__footer">
                            <button className="btn btn--secondary btn--sm w-full">
                                <Download size={16} className="mr-2" /> Davet Et
                            </button>
                            <Link to={`/bots/${bot.id}`} className="btn btn--outline btn--sm w-full">
                                İncele
                            </Link>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    )
}

export default Bots
