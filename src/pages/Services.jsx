import { Link } from 'react-router-dom'
import {
    Code2, Smartphone, Palette, TrendingUp, Server, Database,
    ArrowRight, Check, Layers, Cpu, Cloud, Shield,
    Globe, Zap, Monitor, Settings, MessageCircle, Share2, FileCode
} from 'lucide-react'
import './Services.css'

const Services = () => {
    const mainServices = [
        {
            icon: <Code2 size={32} />,
            title: 'Web Geliştirme',
            desc: 'Modern, hızlı ve SEO uyumlu web siteleri ve web uygulamaları geliştiriyoruz. React, Next.js, Vue.js gibi güncel framework\'ler kullanarak en iyi performansı sağlıyoruz.',
            features: ['Responsive Tasarım', 'SEO Optimizasyonu', 'Hızlı Yükleme', 'Cross-Browser Uyumluluk', 'Progressive Web App (PWA)', 'API Entegrasyonları'],
            gradient: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
            color: '#a29bfe',
        },
        {
            icon: <Smartphone size={32} />,
            title: 'Mobil Uygulama Geliştirme',
            desc: 'iOS ve Android platformları için native ve cross-platform mobil uygulamalar geliştiriyoruz. Flutter ve React Native ile tek kod tabanından iki platforma yayın.',
            features: ['iOS & Android', 'Cross-Platform', 'Push Bildirimler', 'Offline Destek', 'App Store Yayın', 'Performans Optimizasyonu'],
            gradient: 'linear-gradient(135deg, #00cec9, #74b9ff)',
            color: '#74b9ff',
        },
        {
            icon: <Palette size={32} />,
            title: 'UI/UX Tasarım',
            desc: 'Kullanıcı deneyimini ön planda tutarak modern arayüz tasarımları oluşturuyoruz. Figma ile detaylı prototip ve tasarım süreci.',
            features: ['Kullanıcı Araştırması', 'Wireframe & Prototip', 'Görsel Tasarım', 'Tasarım Sistemi', 'Kullanılabilirlik Testi', 'Marka Kimliği'],
            gradient: 'linear-gradient(135deg, #fd79a8, #e84393)',
            color: '#fd79a8',
        },
        {
            icon: <MessageCircle size={32} />,
            title: 'Discord Hizmetleri',
            desc: 'Discord sunucu kurulumu, özel bot geliştirme, moderasyon araçları ve topluluk yönetimi konusunda profesyonel destek sağlıyoruz.',
            features: ['Özel Bot Geliştirme', 'Sunucu Kurulumu & Tasarımı', 'Moderasyon Botları', 'Müzik & Eğlence Botları', 'Ses Kanalı Yönetimi', 'Seviye & Ödül Sistemleri'],
            gradient: 'linear-gradient(135deg, #5865f2, #7289da)',
            color: '#7289da',
        },
        {
            icon: <Share2 size={32} />,
            title: 'Reddit Hizmetleri',
            desc: 'Reddit topluluk yönetimi, içerik stratejisi ve marka bilinirliği artırma konusunda uzman destek sunuyoruz.',
            features: ['Subreddit Yönetimi', 'İçerik Stratejisi', 'Topluluk Büyütme', 'Marka Bilinirliği', 'Reddit Ads Yönetimi', 'Analiz & Raporlama'],
            gradient: 'linear-gradient(135deg, #ff4500, #ff6b35)',
            color: '#ff6b35',
        },
        {
            icon: <FileCode size={32} />,
            title: 'CodeShare',
            desc: 'Kod paylaşım platformu ile projelerinizi, snippet\'lerinizi ve şablonlarınızı topluluğumuzla paylaşın. Açık kaynak katkıda bulunun.',
            features: ['Kod Snippet Paylaşımı', 'Proje Şablonları', 'Syntax Highlighting', 'Canlı Önizleme', 'Topluluk Yorumları', 'Versiyon Kontrolü'],
            gradient: 'linear-gradient(135deg, #00d2ff, #3a7bd5)',
            color: '#00d2ff',
        },
        {
            icon: <Server size={32} />,
            title: 'Backend Geliştirme',
            desc: 'Güçlü, güvenli ve ölçeklenebilir sunucu taraflı uygulamalar ve API\'ler geliştiriyoruz. Node.js, Python, Go gibi teknolojilerle.',
            features: ['RESTful API', 'GraphQL', 'Microservices', 'Veritabanı Tasarımı', 'Authentication & JWT', 'Cloud Deployment'],
            gradient: 'linear-gradient(135deg, #55efc4, #00b894)',
            color: '#55efc4',
        },
        {
            icon: <Database size={32} />,
            title: 'E-Ticaret Çözümleri',
            desc: 'Özel e-ticaret platformları, ödeme entegrasyonları ve stok yönetim sistemleri geliştiriyoruz.',
            features: ['Ödeme Entegrasyonu', 'Stok Yönetimi', 'Kargo Takibi', 'Çoklu Dil Desteği', 'Raporlama & Analiz', 'Müşteri Yönetimi'],
            gradient: 'linear-gradient(135deg, #ff7675, #d63031)',
            color: '#ff7675',
        },
        {
            icon: <TrendingUp size={32} />,
            title: 'SEO & Dijital Pazarlama',
            desc: 'Web sitenizi arama motorlarında üst sıralara taşıyoruz. Google Ads, sosyal medya ve içerik pazarlama stratejileri.',
            features: ['Anahtar Kelime Analizi', 'On-Page SEO', 'Off-Page SEO', 'Google Ads Yönetimi', 'Sosyal Medya', 'İçerik Stratejisi'],
            gradient: 'linear-gradient(135deg, #fdcb6e, #f39c12)',
            color: '#fdcb6e',
        },
    ]

    const process = [
        { step: '01', title: 'Keşif & Analiz', desc: 'Projenizi ve hedeflerinizi detaylıca anlıyoruz.' },
        { step: '02', title: 'Planlama & Tasarım', desc: 'Strateji oluşturup, tasarım sürecini başlatıyoruz.' },
        { step: '03', title: 'Geliştirme', desc: 'Modern teknolojilerle projenizi kodlamaya başlıyoruz.' },
        { step: '04', title: 'Test & Yayın', desc: 'Kapsamlı test sonrası projenizi yayına alıyoruz.' },
    ]

    return (
        <main className="services-page" id="services-page">
            {/* Hero */}
            <section className="services-hero">
                <div className="grid-bg"></div>
                <div className="glow-orb glow-orb-1"></div>
                <div className="container services-hero__content">
                    <div className="section-badge animate-fade-in-up">
                        <span className="badge-dot"></span>
                        hizmetlerimiz
                    </div>
                    <h1 className="hero__title animate-fade-in-up animate-delay-1">
                        Profesyonel <span className="hero__title-gradient">Yazılım Hizmetleri</span>
                    </h1>
                    <p className="hero__subtitle animate-fade-in-up animate-delay-2">
                        İşletmenizi dijital dünyada öne çıkarmak için kapsamlı yazılım çözümleri sunuyoruz.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="services-list" id="services-list">
                <div className="container">
                    <div className="services-list__grid">
                        {mainServices.map((service, i) => (
                            <div key={i} className="service-detail-card glass-card" id={`service-detail-${i}`}>
                                <div className="service-detail-card__header">
                                    <div className="service-detail-card__icon" style={{ background: service.gradient }}>
                                        {service.icon}
                                    </div>
                                    <h3 className="service-detail-card__title">{service.title}</h3>
                                    <p className="service-detail-card__desc">{service.desc}</p>
                                </div>
                                <div className="service-detail-card__features">
                                    {service.features.map((f, j) => (
                                        <div key={j} className="service-detail-card__feature">
                                            <Check size={14} style={{ color: service.color }} />
                                            <span>{f}</span>
                                        </div>
                                    ))}
                                </div>
                                <Link to="/contact" className="service-detail-card__cta" style={{ borderColor: `${service.color}30`, color: service.color }}>
                                    Teklif Al <ArrowRight size={14} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="process" id="process-section">
                <div className="container">
                    <div className="process__header">
                        <div className="section-badge">
                            <span className="badge-dot"></span>
                            Süreç
                        </div>
                        <h2 className="section-title">
                            Nasıl <span className="gradient-text">Çalışıyoruz?</span>
                        </h2>
                        <p className="section-subtitle">
                            Proje sürecimiz şeffaf ve sistematiktir.
                        </p>
                    </div>
                    <div className="process__grid">
                        {process.map((p, i) => (
                            <div key={i} className="process-card glass-card" id={`process-step-${i}`}>
                                <span className="process-card__step">{p.step}</span>
                                <h3 className="process-card__title">{p.title}</h3>
                                <p className="process-card__desc">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="services-cta">
                <div className="container">
                    <div className="cta-section__content">
                        <h2 className="section-title">
                            Projeniz İçin <span className="gradient-text">Fiyat Teklifi</span> Alın
                        </h2>
                        <p className="section-subtitle" style={{ marginBottom: '36px' }}>
                            Size özel çözümler sunmak için hazırız.
                        </p>
                        <Link to="/contact" className="btn-primary">
                            Ücretsiz Teklif Al <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Services
