import { useState, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './CodeBlock.css';

export default function CodeBlock({ code, language: lang = 'html', title }) {
    const { t } = useLanguage();
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch { /* fallback */ }
    }, [code]);

    return (
        <div className="np-codeblock">
            {title && (
                <div className="np-codeblock-header">
                    <span className="np-codeblock-title">{title}</span>
                    <span className="np-codeblock-lang">{lang.toUpperCase()}</span>
                </div>
            )}
            <div className="np-codeblock-body">
                <pre className="np-codeblock-pre"><code>{code}</code></pre>
                <button
                    className={`np-copy-btn ${copied ? 'copied' : ''}`}
                    onClick={handleCopy}
                    title={copied ? t('component.copied') : t('component.copy')}
                >
                    {copied ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5" /></svg>
                    ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                    )}
                </button>
            </div>
        </div>
    );
}
