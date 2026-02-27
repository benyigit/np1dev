import { useLocation, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import componentRegistry, { categories } from '../library/registry';
import './Sidebar.css';

export default function Sidebar() {
    const { t } = useLanguage();
    const location = useLocation();

    const groupedComponents = {};
    categories.forEach(cat => {
        groupedComponents[cat.id] = componentRegistry.filter(c => c.category === cat.id);
    });

    return (
        <aside className="np-sidebar">
            <div className="np-sidebar-inner">
                <Link to="/docs" className={`np-sidebar-all ${location.pathname === '/docs' ? 'active' : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
                    {t('sidebar.allComponents')}
                </Link>

                {categories.map(cat => (
                    <div key={cat.id} className="np-sidebar-category">
                        <div className="np-sidebar-cat-title">{t(`sidebar.categories.${cat.id}`)}</div>
                        <div className="np-sidebar-items">
                            {groupedComponents[cat.id]?.map(comp => (
                                <Link
                                    key={comp.id}
                                    to={`/docs/${comp.id}`}
                                    className={`np-sidebar-item ${location.pathname === `/docs/${comp.id}` ? 'active' : ''}`}
                                >
                                    <span>{comp.name}</span>
                                    {comp.isNew && <span className="np-badge-new">New</span>}
                                    {comp.isUpdated && <span className="np-badge-updated">Updated</span>}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
}
