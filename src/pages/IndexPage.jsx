import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import componentRegistry, { categories } from '../library/registry';
import './IndexPage.css';

export default function IndexPage() {
    const { t, language } = useLanguage();
    const { theme } = useTheme();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');

    const filtered = componentRegistry.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
        const matchCat = filter === 'all' || c.category === filter;
        return matchSearch && matchCat;
    });

    return (
        <div className="np-index">
            <div className="np-index-header">
                <h1 className="np-index-title">{t('index.title')}</h1>
                <div className="np-index-controls">
                    <div className="np-index-search">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                        <input type="text" placeholder={t('index.searchPlaceholder')} value={search} onChange={e => setSearch(e.target.value)} id="index-search" />
                    </div>
                    <select className="np-index-filter" value={filter} onChange={e => setFilter(e.target.value)} id="category-filter">
                        <option value="all">{t('index.allComponents')}</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{t(`sidebar.categories.${cat.id}`)}</option>
                        ))}
                    </select>
                </div>
            </div>

            {filtered.length === 0 ? (
                <div className="np-index-empty">{t('index.noResults')}</div>
            ) : (
                <div className="np-index-grid">
                    {filtered.map((comp, i) => (
                        <Link to={`/docs/${comp.id}`} key={comp.id} className="np-index-card" style={{ animationDelay: `${i * 0.05}s` }}>
                            <div className="np-index-card-preview" dangerouslySetInnerHTML={{ __html: comp.preview ? comp.preview(theme) : '' }} />
                            <div className="np-index-card-info">
                                <span className="np-index-card-name">{comp.name}</span>
                                <span className="np-index-card-cat">{t(`sidebar.categories.${comp.category}`)}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
