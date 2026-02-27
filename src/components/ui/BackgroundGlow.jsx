import React from 'react';

export const BackgroundGlow = ({ children }) => {
    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            position: 'relative',
            backgroundColor: 'transparent', // Let parent handle base bg
            overflow: 'hidden'
        }}>
            {/* Soft Glow Overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: -1, // Behind content
                    backgroundImage: `radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)`,
                    opacity: 0.4, // Adjusted for visibility without washout
                    mixBlendMode: 'var(--bg-blend)', // Dynamic blend mode based on theme
                    pointerEvents: 'none' // Click-through
                }}
            />
            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </div>
        </div>
    );
};

export default BackgroundGlow;
