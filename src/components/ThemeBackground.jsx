import React from 'react';

const ThemeBackground = () => {
    return (
        <div className="home-background" style={{
            position: 'fixed',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            pointerEvents: 'none',
            overflow: 'hidden',
        }}>
            {/* Grid Pattern */}
            <div className="grid-bg" style={{ opacity: 0.4 }}></div>

            {/* Central Soft Glow (Fixed Visibility) */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)`,
                    opacity: 0.4,
                    mixBlendMode: 'var(--bg-blend)',
                    zIndex: 0,
                }}
            />

            {/* Additional Ambient Orbs for Depth */}
            <div className="glow-orb glow-orb-1"></div>
            <div className="glow-orb glow-orb-2"></div>

            {/* Floating Particles */}
            <div className="hero__particles">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="hero__particle" style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${3 + Math.random() * 4}s`,
                    }}></div>
                ))}
            </div>
        </div>
    );
};

export default ThemeBackground;
