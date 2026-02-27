import React from 'react';

const CodlyLogo = ({ className = "" }) => {
    return (
        <svg
            id="svg-Pixel Core"
            width="160"
            height="40"
            viewBox="0 0 240 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Kare arka plan - Tema rengini kullanacak */}
            <rect
                x="10"
                y="10"
                width="40"
                height="40"
                rx="8"
                style={{ fill: 'var(--accent-primary)' }}
            />

            {/* Karenin içindeki beyaz nokta */}
            <rect x="24" y="24" width="12" height="12" fill="white" />

            {/* Metin */}
            <text
                x="60"
                y="42"
                fontFamily="sans-serif"
                fontSize="32"
                fontWeight="900"
                letterSpacing="-1"
                fill="currentColor"
                className="fill-current"
            >
                codlyio
                {/* Sondaki nokta - Tema rengini kullanacak */}
                <tspan style={{ fill: 'var(--accent-primary)' }}>.</tspan>
            </text>
        </svg>
    );
};

export default CodlyLogo;
