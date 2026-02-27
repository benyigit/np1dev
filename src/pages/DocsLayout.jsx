import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './DocsLayout.css';

export default function DocsLayout() {
    return (
        <div className="np-docs-layout">
            <Sidebar />
            <main className="np-docs-content">
                <Outlet />
            </main>
        </div>
    );
}
