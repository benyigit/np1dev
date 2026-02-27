import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import componentRegistry from '../library/registry';
import CodeBlock from '../components/CodeBlock';
import './ComponentPage.css';

const DEFAULT_CUSTOMIZATIONS = {
    primaryColor: '#ff6b00',
    secondaryColor: '#ffb347',
    bgColor: '#0a0a0a',
    textColor: '#ffffff',
    borderRadius: '12',
    fontSize: '16',
    animationSpeed: '1',
};

function hexToRgb(hex) {
    const h = hex.replace('#', '');
    return {
        r: parseInt(h.substring(0, 2), 16),
        g: parseInt(h.substring(2, 4), 16),
        b: parseInt(h.substring(4, 6), 16),
    };
}

function replaceCustomValues(code, customs) {
    if (!code) return code;
    let result = code;
    const pri = hexToRgb(customs.primaryColor);
    const sec = hexToRgb(customs.secondaryColor);

    // Replace hex colors
    result = result.replace(/#ff6b00/gi, customs.primaryColor);
    result = result.replace(/#ff9500/gi, customs.primaryColor);
    result = result.replace(/#ffb347/gi, customs.secondaryColor);
    result = result.replace(/#ff0080/gi, customs.secondaryColor);

    // Replace rgba(255,107,0,...) -> primary color with same alpha
    result = result.replace(/rgba\(\s*255\s*,\s*107\s*,\s*0\s*,\s*([\d.]+)\s*\)/gi,
        (_, a) => `rgba(${pri.r},${pri.g},${pri.b},${a})`);
    // rgba(255,170,50,...) -> primary
    result = result.replace(/rgba\(\s*255\s*,\s*170\s*,\s*50\s*,\s*([\d.]+)\s*\)/gi,
        (_, a) => `rgba(${pri.r},${pri.g},${pri.b},${a})`);
    // rgba(255,200,100,...) -> secondary
    result = result.replace(/rgba\(\s*255\s*,\s*200\s*,\s*100\s*,\s*([\d.]+)\s*\)/gi,
        (_, a) => `rgba(${sec.r},${sec.g},${sec.b},${a})`);
    // rgba(255,80+,0,...) variations
    result = result.replace(/rgba\(\s*255\s*,\s*(\d{2,3})\s*,\s*0\s*,\s*([\d.]+)\s*\)/gi,
        (match, g, a) => {
            const gv = parseInt(g);
            if (gv >= 50 && gv <= 200) return `rgba(${pri.r},${pri.g},${pri.b},${a})`;
            return match;
        });

    // Replace background color
    result = result.replace(/#0a0a0a/gi, customs.bgColor);
    result = result.replace(/#050505/gi, customs.bgColor);
    result = result.replace(/#050510/gi, customs.bgColor);

    // Border radius
    result = result.replace(/border-radius:\s*12px/gi, `border-radius:${customs.borderRadius}px`);

    // Animation speed
    if (customs.animationSpeed !== '1') {
        const speedFactor = parseFloat(customs.animationSpeed);
        result = result.replace(/(\d+(?:\.\d+)?)s(?=\s|;|,|\))/g, (match, num) => {
            const original = parseFloat(num);
            if (original > 0 && original <= 60) {
                const scaled = (original / speedFactor).toFixed(1);
                return `${scaled}s`;
            }
            return match;
        });
    }
    return result;
}

export default function ComponentPage() {
    const { id } = useParams();
    const { t, language } = useLanguage();
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState('preview');
    const [codeTab, setCodeTab] = useState('html');
    const [customs, setCustoms] = useState(DEFAULT_CUSTOMIZATIONS);
    const [showCustomizer, setShowCustomizer] = useState(false);
    const iframeRef = useRef(null);

    const comp = useMemo(() => componentRegistry.find(c => c.id === id), [id]);

    // Reset when component changes
    useEffect(() => {
        setActiveTab('preview');
        setCodeTab('html');
        setCustoms(DEFAULT_CUSTOMIZATIONS);
    }, [id]);

    // Build customized code
    const customizedHtml = useMemo(() => replaceCustomValues(comp?.html, customs), [comp?.html, customs]);
    const customizedCss = useMemo(() => replaceCustomValues(comp?.css, customs), [comp?.css, customs]);
    const customizedJs = useMemo(() => replaceCustomValues(comp?.js, customs), [comp?.js, customs]);

    // Build live iframe content
    const iframeSrc = useMemo(() => {
        if (!comp) return '';
        const bg = theme === 'dark' ? customs.bgColor : '#f5f5f5';
        return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html,body{width:100%;height:100%;overflow:auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}
  body{display:flex;align-items:center;justify-content:center;min-height:100%;background:${bg};color:${customs.textColor};padding:24px}
  @keyframes aurora1{0%{transform:translateX(-8%) translateY(-4%)}100%{transform:translateX(8%) translateY(4%)}}
  @keyframes aurora2{0%{transform:translateX(8%) scale(1)}100%{transform:translateX(-8%) scale(1.1)}}
  @keyframes gradientMesh{0%{background-position:0%50%}50%{background-position:100%50%}100%{background-position:0%50%}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
  @keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes slideInLeft{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}}
  @keyframes slideInRight{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
  @keyframes shimmer{0%{background-position:200%0}100%{background-position:-200%0}}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
  @keyframes pulse{0%,100%{transform:scale(1);opacity:.7}50%{transform:scale(1.5);opacity:.3}}
  @keyframes meteor{0%{transform:translateY(-100%) rotate(35deg);opacity:1}100%{transform:translateY(120vh) rotate(35deg);opacity:0}}
  @keyframes scanLineFall{from{top:-1%}to{top:101%}}
  @keyframes noiseAnim{0%{background-position:0 0}25%{background-position:50px 20px}50%{background-position:20px 50px}75%{background-position:80px 30px}100%{background-position:0 0}}
  @keyframes rain{from{background-position:0 0}to{background-position:0 20px}}
  @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
  @keyframes ripple{to{transform:scale(4);opacity:0}}
  @keyframes morphShape{0%,100%{border-radius:60%40%30%70%/60%30%70%40%}25%{border-radius:30%60%70%40%/50%60%30%60%}50%{border-radius:50%60%30%60%/40%30%60%50%}75%{border-radius:60%40%60%30%/30%60%40%60%}}
  @keyframes ping{0%{transform:scale(1);opacity:.7}100%{transform:scale(3);opacity:0}}
  @keyframes heartbeat{0%{transform:scale(1)}14%{transform:scale(1.15)}28%{transform:scale(1)}42%{transform:scale(1.15)}70%{transform:scale(1)}}
  @keyframes bounceIn{0%{opacity:0;transform:scale(.3)}50%{transform:scale(1.1)}70%{transform:scale(.9)}100%{opacity:1;transform:scale(1)}}
  @keyframes orbit{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes waveChar{from{transform:translateY(0)}to{transform:translateY(-12px)}}
  @keyframes neonPulse{from{text-shadow:0 0 10px ${customs.primaryColor},0 0 20px ${customs.primaryColor},0 0 40px ${customs.primaryColor}}to{text-shadow:0 0 5px ${customs.primaryColor},0 0 10px ${customs.primaryColor},0 0 20px ${customs.primaryColor},0 0 60px ${customs.primaryColor},0 0 100px ${customs.primaryColor}}}
  @keyframes flicker{0%,18%,20%,50.1%,60%,65.1%,80%,90.1%,92%{opacity:1}19%,50%,60.5%,65%,80.5%,91%{opacity:0}}
  @keyframes confettiFall{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(80vh) rotate(720deg);opacity:0}}
  @keyframes typingDot{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-10px)}}
  @keyframes gradientShift{0%{background-position:0%50%}50%{background-position:100%50%}100%{background-position:0%50%}}
  @keyframes scaleIn{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}
  @keyframes blurReveal{0%{filter:blur(20px);opacity:0;transform:scale(1.1)}100%{filter:blur(0);opacity:1;transform:scale(1)}}
  @keyframes shake{0%,100%{transform:translateX(0)}10%,30%,50%,70%,90%{transform:translateX(-8px)}20%,40%,60%,80%{transform:translateX(8px)}}
  @keyframes pulseGlow{0%,100%{transform:scale(1);opacity:.7}50%{transform:scale(1.2);opacity:1}}
  @keyframes flipWord{0%{transform:rotateX(90deg);opacity:0}40%{transform:rotateX(-10deg);opacity:1}70%{transform:rotateX(5deg)}100%{transform:rotateX(0)}}
  @keyframes spacingExpand{from{opacity:0;letter-spacing:-.5em}to{opacity:1;letter-spacing:.15em}}
  ${customizedCss || ''}
</style>
</head>
<body>
  ${customizedHtml || '<p>No preview available</p>'}
  <script>
  try {
    ${(customizedJs && !customizedJs.includes('Pure CSS')) ? customizedJs : ''}
  } catch(e) { console.log('Component JS error:', e); }
  </script>
</body>
</html>`;
    }, [comp, theme, customs, customizedHtml, customizedCss, customizedJs]);

    const handleCustomChange = useCallback((key, value) => {
        setCustoms(prev => ({ ...prev, [key]: value }));
    }, []);

    const handleResetCustom = useCallback(() => {
        setCustoms(DEFAULT_CUSTOMIZATIONS);
    }, []);

    const handleCopyAll = useCallback(async () => {
        const full = `<!-- HTML -->\n${customizedHtml || ''}\n\n/* CSS */\n${customizedCss || ''}\n\n// JavaScript\n${customizedJs || ''}`;
        try {
            await navigator.clipboard.writeText(full);
        } catch { }
    }, [customizedHtml, customizedCss, customizedJs]);

    if (!comp) {
        return <div className="np-comp-notfound">Component not found</div>;
    }

    const desc = comp.description[language] || comp.description.en;

    return (
        <div className="np-comp">
            <div className="np-comp-header">
                <div className="np-comp-header-row">
                    <div>
                        <h1 className="np-comp-title">{comp.name}</h1>
                        <p className="np-comp-desc">{desc}</p>
                    </div>
                    <div className="np-comp-actions">
                        <button className="np-customize-toggle" onClick={() => setShowCustomizer(!showCustomizer)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
                            {t('component.customize') || 'Customize'}
                        </button>
                        <button className="np-copy-all-btn" onClick={handleCopyAll}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                            {t('component.copyAll') || 'Copy All'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Customizer Panel */}
            {showCustomizer && (
                <div className="np-customizer">
                    <div className="np-customizer-header">
                        <h3>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                            {t('component.customizeTitle') || 'Customization'}
                        </h3>
                        <button className="np-reset-btn" onClick={handleResetCustom}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 01-9 9 9.75 9.75 0 01-6.74-2.74L3 16" /><path d="M3 21v-5h5" /></svg>
                            {t('component.reset') || 'Reset'}
                        </button>
                    </div>
                    <div className="np-customizer-grid">
                        <div className="np-custom-field">
                            <label>{t('component.primaryColor') || 'Primary Color'}</label>
                            <div className="np-color-input-wrap">
                                <input type="color" value={customs.primaryColor} onChange={e => handleCustomChange('primaryColor', e.target.value)} />
                                <input type="text" value={customs.primaryColor} onChange={e => handleCustomChange('primaryColor', e.target.value)} className="np-color-text" />
                            </div>
                        </div>
                        <div className="np-custom-field">
                            <label>{t('component.secondaryColor') || 'Secondary Color'}</label>
                            <div className="np-color-input-wrap">
                                <input type="color" value={customs.secondaryColor} onChange={e => handleCustomChange('secondaryColor', e.target.value)} />
                                <input type="text" value={customs.secondaryColor} onChange={e => handleCustomChange('secondaryColor', e.target.value)} className="np-color-text" />
                            </div>
                        </div>
                        <div className="np-custom-field">
                            <label>{t('component.bgColor') || 'Background'}</label>
                            <div className="np-color-input-wrap">
                                <input type="color" value={customs.bgColor} onChange={e => handleCustomChange('bgColor', e.target.value)} />
                                <input type="text" value={customs.bgColor} onChange={e => handleCustomChange('bgColor', e.target.value)} className="np-color-text" />
                            </div>
                        </div>
                        <div className="np-custom-field">
                            <label>{t('component.borderRadius') || 'Border Radius'}</label>
                            <div className="np-range-wrap">
                                <input type="range" min="0" max="50" value={customs.borderRadius} onChange={e => handleCustomChange('borderRadius', e.target.value)} />
                                <span>{customs.borderRadius}px</span>
                            </div>
                        </div>
                        <div className="np-custom-field">
                            <label>{t('component.animSpeed') || 'Anim Speed'}</label>
                            <div className="np-range-wrap">
                                <input type="range" min="0.2" max="3" step="0.1" value={customs.animationSpeed} onChange={e => handleCustomChange('animationSpeed', e.target.value)} />
                                <span>{customs.animationSpeed}x</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="np-comp-tabs">
                <button className={`np-comp-tab ${activeTab === 'preview' ? 'active' : ''}`} onClick={() => setActiveTab('preview')}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
                    {t('component.preview')}
                </button>
                <button className={`np-comp-tab ${activeTab === 'code' ? 'active' : ''}`} onClick={() => setActiveTab('code')}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                    {t('component.code')}
                </button>
            </div>

            {/* Preview — Live iframe */}
            {activeTab === 'preview' && (
                <div className="np-comp-preview-section">
                    <div className="np-comp-preview-frame">
                        <iframe
                            ref={iframeRef}
                            srcDoc={iframeSrc}
                            className="np-live-preview-iframe"
                            title={`${comp.name} preview`}
                            sandbox="allow-scripts"
                        />
                    </div>
                </div>
            )}

            {/* Code section */}
            {activeTab === 'code' && (
                <div className="np-comp-code-section">
                    <div className="np-comp-code-tabs">
                        {comp.html && <button className={`np-code-tab ${codeTab === 'html' ? 'active' : ''}`} onClick={() => setCodeTab('html')}>{t('component.htmlTab')}</button>}
                        {comp.css && <button className={`np-code-tab ${codeTab === 'css' ? 'active' : ''}`} onClick={() => setCodeTab('css')}>{t('component.cssTab')}</button>}
                        {comp.js && <button className={`np-code-tab ${codeTab === 'js' ? 'active' : ''}`} onClick={() => setCodeTab('js')}>{t('component.jsTab')}</button>}
                    </div>
                    {codeTab === 'html' && comp.html && <CodeBlock code={customizedHtml} language="html" title={t('component.htmlTab')} />}
                    {codeTab === 'css' && comp.css && <CodeBlock code={customizedCss} language="css" title={t('component.cssTab')} />}
                    {codeTab === 'js' && comp.js && <CodeBlock code={customizedJs} language="javascript" title={t('component.jsTab')} />}
                </div>
            )}
        </div>
    );
}
