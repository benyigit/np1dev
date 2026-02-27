import { useEffect, useRef } from 'react'
import { X, Sun, Moon, Type, Globe, Palette, Check } from 'lucide-react'
import { usePreferences, themeColors, fontOptions, langOptions } from '../context/PreferencesContext'
import './PreferencesPanel.css'

const PreferencesPanel = () => {
    const {
        theme, setTheme,
        themeColor, setThemeColor,
        font, setFont,
        lang, setLang,
        t,
        isPreferencesOpen, setIsPreferencesOpen
    } = usePreferences()

    const panelRef = useRef(null)

    // ESC ile kapat
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setIsPreferencesOpen(false)
        }
        if (isPreferencesOpen) {
            document.addEventListener('keydown', handleEsc)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.removeEventListener('keydown', handleEsc)
            document.body.style.overflow = ''
        }
    }, [isPreferencesOpen, setIsPreferencesOpen])

    // Dışarı tıkla kapat
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) setIsPreferencesOpen(false)
    }

    if (!isPreferencesOpen) return null

    return (
        <div className="pref-overlay" onClick={handleBackdropClick}>
            <div className="pref-panel" ref={panelRef}>
                {/* Header */}
                <div className="pref-panel__header">
                    <div className="pref-panel__header-left">
                        <Palette size={20} />
                        <h2>{t('preferencesTitle')}</h2>
                    </div>
                    <button
                        className="pref-panel__close"
                        onClick={() => setIsPreferencesOpen(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="pref-panel__body">
                    {/* Tema: Aydınlık / Karanlık */}
                    <div className="pref-section">
                        <div className="pref-section__label">
                            {theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
                            <span>{t('lightTheme')}</span>
                        </div>
                        <div className="pref-toggle-group">
                            <button
                                className={`pref-toggle-btn ${theme === 'dark' ? 'pref-toggle-btn--active' : ''}`}
                                onClick={() => setTheme('dark')}
                            >
                                <Moon size={14} />
                                Karanlık
                            </button>
                            <button
                                className={`pref-toggle-btn ${theme === 'light' ? 'pref-toggle-btn--active' : ''}`}
                                onClick={() => setTheme('light')}
                            >
                                <Sun size={14} />
                                Aydınlık
                            </button>
                        </div>
                    </div>

                    {/* Font Tipi */}
                    <div className="pref-section">
                        <div className="pref-section__label">
                            <Type size={16} />
                            <span>{t('fontType')}</span>
                        </div>
                        <div className="pref-font-list">
                            {Object.entries(fontOptions).map(([key, opt]) => (
                                <button
                                    key={key}
                                    className={`pref-font-item ${font === key ? 'pref-font-item--active' : ''}`}
                                    onClick={() => setFont(key)}
                                    style={{ fontFamily: opt.family }}
                                >
                                    <span className="pref-font-item__name">{opt.label}</span>
                                    <span className="pref-font-item__preview" style={{ fontFamily: opt.family }}>Aa Bb Cc</span>
                                    {font === key && <Check size={14} className="pref-font-item__check" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Site Dili */}
                    <div className="pref-section">
                        <div className="pref-section__label">
                            <Globe size={16} />
                            <span>{t('siteLanguage')}</span>
                        </div>
                        <div className="pref-lang-list">
                            {Object.entries(langOptions).map(([key, opt]) => (
                                <button
                                    key={key}
                                    className={`pref-lang-item ${lang === key ? 'pref-lang-item--active' : ''}`}
                                    onClick={() => setLang(key)}
                                >
                                    <span className="pref-lang-item__flag">{opt.flag}</span>
                                    <span>{opt.label}</span>
                                    {lang === key && <Check size={14} className="pref-lang-item__check" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Site Teması (Renk) */}
                    <div className="pref-section">
                        <div className="pref-section__label">
                            <Palette size={16} />
                            <span>{t('siteTheme')}</span>
                        </div>
                        <div className="pref-color-grid">
                            {Object.entries(themeColors).map(([key, color]) => (
                                <button
                                    key={key}
                                    className={`pref-color-item ${themeColor === key ? 'pref-color-item--active' : ''}`}
                                    onClick={() => setThemeColor(key)}
                                    title={color.label}
                                >
                                    <div
                                        className="pref-color-item__swatch"
                                        style={{ background: color.gradient }}
                                    >
                                        {themeColor === key && <Check size={14} />}
                                    </div>
                                    <span className="pref-color-item__label">{color.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreferencesPanel
