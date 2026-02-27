import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import SearchModal from './SearchModal';
import './Navbar.css';

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const { language, changeLanguage, t, SUPPORTED_LANGUAGES } = useLanguage();
    const [searchOpen, setSearchOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const langRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const onKey = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setSearchOpen(true);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    useEffect(() => {
        const onClick = (e) => {
            if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
        };
        document.addEventListener('mousedown', onClick);
        return () => document.removeEventListener('mousedown', onClick);
    }, []);

    const isHome = location.pathname === '/';

    return (
        <>
            <nav className={`np-navbar ${scrolled ? 'scrolled' : ''} ${isHome ? 'home' : ''}`}>
                <div className="np-navbar-inner">
                    <Link to="/" className="np-navbar-logo">
                        <span className="np-logo-icon">
                            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                                <rect width="32" height="32" rx="8" fill="var(--accent)" />
                                <path d="M8 22V10l8 12V10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M20 10h4a2 2 0 012 2v0a2 2 0 01-2 2h-4m0-4v4m0 0v8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <span className="np-logo-text">NP1</span>
                    </Link>

                    <div className="np-navbar-center">
                        <Link to="/" className={`np-nav-link ${location.pathname === '/' ? 'active' : ''}`}>{t('nav.home')}</Link>
                        <Link to="/docs" className={`np-nav-link ${location.pathname.startsWith('/docs') ? 'active' : ''}`}>{t('nav.docs')}</Link>
                    </div>

                    <div className="np-navbar-right">
                        <button className="np-search-trigger" onClick={() => setSearchOpen(true)} id="search-trigger">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                            <span>{t('nav.search')}</span>
                            <kbd>{t('nav.searchShortcut')}</kbd>
                        </button>

                        <div className="np-lang-selector" ref={langRef}>
                            <button className="np-icon-btn" onClick={() => setLangOpen(!langOpen)} title="Language" id="language-toggle">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" /></svg>
                            </button>
                            {langOpen && (
                                <div className="np-lang-dropdown">
                                    {SUPPORTED_LANGUAGES.map(l => (
                                        <button key={l.code} className={`np-lang-option ${language === l.code ? 'active' : ''}`} onClick={() => { changeLanguage(l.code); setLangOpen(false); }}>
                                            <span className="np-lang-flag">{l.flag}</span>
                                            <span>{l.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button className="np-icon-btn" onClick={toggleTheme} title={t(`theme.${theme === 'dark' ? 'light' : 'dark'}`)} id="theme-toggle">
                            {theme === 'dark' ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
                            )}
                        </button>
                    </div>
                </div>
            </nav>
            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
}
