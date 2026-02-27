import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import componentRegistry from '../library/registry';
import './SearchModal.css';

export default function SearchModal({ isOpen, onClose }) {
    const { t, language } = useLanguage();
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        if (isOpen) window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const filtered = componentRegistry.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        (c.description[language] || c.description.en).toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (comp) => {
        navigate(`/docs/${comp.id}`);
        onClose();
    };

    return (
        <div className="np-search-overlay" onClick={onClose}>
            <div className="np-search-modal" onClick={e => e.stopPropagation()}>
                <div className="np-search-input-wrap">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                    <input
                        ref={inputRef}
                        type="text"
                        className="np-search-input"
                        placeholder={t('search.placeholder')}
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        id="search-input"
                    />
                    <kbd className="np-search-esc">ESC</kbd>
                </div>
                <div className="np-search-results">
                    {filtered.length === 0 ? (
                        <div className="np-search-empty">{t('search.noResults')}</div>
                    ) : (
                        filtered.map(c => (
                            <button key={c.id} className="np-search-result" onClick={() => handleSelect(c)}>
                                <span className="np-search-result-name">{c.name}</span>
                                <span className="np-search-result-cat">{t(`sidebar.categories.${c.category}`)}</span>
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
