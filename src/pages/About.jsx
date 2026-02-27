import { Users, Award, Target, Coffee, Rocket, Heart } from 'lucide-react'
import './About.css'

const About = () => {
    const values = [
        {
            icon: <Rocket size={24} />,
            title: 'İnovasyon',
            desc: 'Sürekli yeni teknolojileri keşfeder ve projelerimize entegre ederiz.',
        },
        {
            icon: <Heart size={24} />,
            title: 'Tutku',
            desc: 'Her projede kalbimizi koyarız. İşimizi seviyoruz.',
        },
        {
            icon: <Target size={24} />,
            title: 'Kalite',
            desc: 'Kaliteden asla ödün vermeyiz. Her detayı önemseriz.',
        },
        {
            icon: <Users size={24} />,
            title: 'Takım Çalışması',
            desc: 'Güçlü bir ekip ruhuyla birlikte çalışırız.',
        },
        {
            icon: <Award size={24} />,
            title: 'Güvenilirlik',
            desc: 'Müşterilerimize verdiğimiz sözleri her zaman tutarız.',
        },
        {
            icon: <Coffee size={24} />,
            title: 'Şeffaflık',
            desc: 'İletişimde şeffaf ve açık oluruz. Sürecin her adımını paylaşırız.',
        },
    ]

    const team = [
        { name: 'Ahmet Yılmaz', role: 'Kurucu & CEO', initial: 'AY' },
        { name: 'Elif Demir', role: 'Lead Developer', initial: 'ED' },
        { name: 'Burak Can', role: 'UI/UX Designer', initial: 'BC' },
        { name: 'Zeynep Aksoy', role: 'Backend Developer', initial: 'ZA' },
    ]

    return (
        <main className="about-page" id="about-page">
            {/* Hero */}
            <section className="about-hero">
                <div className="grid-bg"></div>
                <div className="glow-orb glow-orb-1"></div>
                <div className="container about-hero__content">
                    <div className="section-badge animate-fade-in-up">
                        <span className="badge-dot"></span>
                        hakkımızda
                    </div>
                    <h1 className="hero__title animate-fade-in-up animate-delay-1">
                        Biz <span className="hero__title-gradient">Codly.io</span>'yuz
                    </h1>
                    <p className="hero__subtitle animate-fade-in-up animate-delay-2">
                        2024 yılında kurulan Codly.io, modern yazılım çözümleriyle işletmelerin dijital dönüşümüne öncülük eden bir yazılım geliştirme şirketidir.
                    </p>
                </div>
            </section>

            {/* Story */}
            <section className="about-story" id="about-story">
                <div className="container">
                    <div className="about-story__grid">
                        <div className="about-story__text">
                            <div className="section-badge">
                                <span className="badge-dot"></span>
                                Hikayemiz
                            </div>
                            <h2 className="section-title">
                                Dijital Dünyada <span className="gradient-text">İz Bırakıyoruz</span>
                            </h2>
                            <p className="about-story__desc">
                                Codly.io olarak, yazılım geliştirme tutkumuzla yola çıktık. Her projede en son teknolojileri kullanarak, müşterilerimize premium kalitede çözümler sunuyoruz.
                            </p>
                            <p className="about-story__desc">
                                Ekibimiz, farklı uzmanlık alanlarından gelen yetenekli profesyonellerden oluşuyor. Web geliştirme, mobil uygulama, UI/UX tasarım ve dijital pazarlama alanlarında kapsamlı hizmetler sunuyoruz.
                            </p>
                        </div>
                        <div className="about-story__stats">
                            <div className="about-stat glass-card">
                                <span className="about-stat__value">150+</span>
                                <span className="about-stat__label">Tamamlanan Proje</span>
                            </div>
                            <div className="about-stat glass-card">
                                <span className="about-stat__value">50+</span>
                                <span className="about-stat__label">Mutlu Müşteri</span>
                            </div>
                            <div className="about-stat glass-card">
                                <span className="about-stat__value">10+</span>
                                <span className="about-stat__label">Ekip Üyesi</span>
                            </div>
                            <div className="about-stat glass-card">
                                <span className="about-stat__value">2+</span>
                                <span className="about-stat__label">Yıllık Deneyim</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="about-values" id="about-values">
                <div className="container">
                    <div className="about-values__header">
                        <div className="section-badge">
                            <span className="badge-dot"></span>
                            Değerlerimiz
                        </div>
                        <h2 className="section-title">
                            Bizi Biz Yapan <span className="gradient-text">Değerler</span>
                        </h2>
                    </div>
                    <div className="about-values__grid">
                        {values.map((value, i) => (
                            <div key={i} className="value-card glass-card" id={`value-card-${i}`}>
                                <div className="value-card__icon">{value.icon}</div>
                                <h3 className="value-card__title">{value.title}</h3>
                                <p className="value-card__desc">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="about-team" id="about-team">
                <div className="container">
                    <div className="about-team__header">
                        <div className="section-badge">
                            <span className="badge-dot"></span>
                            Ekibimiz
                        </div>
                        <h2 className="section-title">
                            <span className="gradient-text">Ekibimiz</span> ile Tanışın
                        </h2>
                        <p className="section-subtitle">
                            Arkasındaki yetenekli insanlar. Olağanüstü dijital deneyimler yaratma konusunda tutkuluyuz.
                        </p>
                    </div>
                    <div className="about-team__grid">
                        {team.map((member, i) => (
                            <div key={i} className="team-card glass-card" id={`team-member-${i}`}>
                                <div className="team-card__avatar">{member.initial}</div>
                                <h3 className="team-card__name">{member.name}</h3>
                                <p className="team-card__role">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default About
