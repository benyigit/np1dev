import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Home.css';

export default function Home() {
    const { t } = useLanguage();

    return (
        <div className="np-home">
            {/* Hero Background */}
            <div className="np-hero-bg">
                <div className="np-hero-glow np-hero-glow-1" />
                <div className="np-hero-glow np-hero-glow-2" />
                <div className="np-hero-glow np-hero-glow-3" />
                <div className="np-hero-grid" />
            </div>

            {/* Hero */}
            <section className="np-hero">
                <div className="np-hero-badge">
                    <span className="np-hero-badge-dot" />
                    {t('hero.badge')}
                </div>
                <h1 className="np-hero-title">
                    {t('hero.title')}
                    <span className="np-hero-highlight">{t('hero.titleHighlight')}</span>
                </h1>
                <p className="np-hero-subtitle">{t('hero.subtitle')}</p>
                <div className="np-hero-actions">
                    <Link to="/docs" className="np-btn-primary">
                        {t('hero.cta')}
                    </Link>
                    <a href="#features" className="np-btn-secondary">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" /><path d="m9 18 6-6-6-6" />
                        </svg>
                        {t('hero.ctaSecondary')}
                    </a>
                </div>
                <div className="np-hero-stats">
                    <div className="np-stat">
                        <span className="np-stat-value">600+</span>
                        <span className="np-stat-label">{t('hero.statsComponents')}</span>
                    </div>
                    <div className="np-stat">
                        <span className="np-stat-value">6</span>
                        <span className="np-stat-label">{t('hero.statsCategories')}</span>
                    </div>
                    <div className="np-stat">
                        <span className="np-stat-value">4</span>
                        <span className="np-stat-label">{t('hero.statsLanguages')}</span>
                    </div>
                    <div className="np-stat">
                        <span className="np-stat-value">0</span>
                        <span className="np-stat-label">{t('hero.statsDeps')}</span>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="np-features" id="features">
                <h2 className="np-features-title">{t('features.title')}</h2>
                <p className="np-features-sub">{t('features.subtitle')}</p>
                <div className="np-features-grid">
                    {[
                        { key: 'copy', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg> },
                        { key: 'customize', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg> },
                        { key: 'responsive', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg> },
                        { key: 'animated', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg> },
                    ].map(({ key, icon }, i) => (
                        <div key={key} className="np-feature-card" style={{ animationDelay: `${i * 0.1}s` }}>
                            <div className="np-feature-icon">{icon}</div>
                            <h3 className="np-feature-title">{t(`features.${key}.title`)}</h3>
                            <p className="np-feature-desc">{t(`features.${key}.desc`)}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="np-footer">
                <div className="np-footer-inner">
                    <div className="np-footer-brand">
                        <span className="np-footer-logo">
                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="var(--accent)" /><path d="M8 22V10l8 12V10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M20 10h4a2 2 0 012 2v0a2 2 0 01-2 2h-4m0-4v4m0 0v8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            NP1
                        </span>
                        <p className="np-footer-tagline">{t('footer.tagline')}</p>
                    </div>
                    <div className="np-footer-links">
                        <div className="np-footer-col">
                            <h4>{t('footer.resources')}</h4>
                            <Link to="/docs">{t('footer.docs')}</Link>
                            <Link to="/docs">{t('footer.components')}</Link>
                        </div>
                        <div className="np-footer-col">
                            <h4>{t('footer.community')}</h4>
                            <a href="#">{t('footer.github')}</a>
                            <a href="#">{t('footer.twitter')}</a>
                            <a href="#">{t('footer.discord')}</a>
                        </div>
                        <div className="np-footer-col">
                            <h4>{t('footer.legal')}</h4>
                            <a href="#">{t('footer.privacy')}</a>
                            <a href="#">{t('footer.terms')}</a>
                            <a href="#">{t('footer.license')}</a>
                        </div>
                    </div>
                </div>
                <div className="np-footer-bottom">
                    <span>© {new Date().getFullYear()} NP1. {t('footer.rights')}</span>
                </div>
            </footer>
        </div>
    );
}
