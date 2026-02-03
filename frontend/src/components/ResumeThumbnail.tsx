import React from 'react';

interface ResumeThumbnailProps {
    scale: number;
    children: React.ReactNode;
    className?: string;
}

/**
 * ResumeThumbnail - A live preview card for resume builder
 * 
 * This component renders a full-size A4 resume at a scaled-down size
 * with an anti-gravity hover effect.
 * 
 * @param scale - Scale factor (e.g., 0.25 for 25% size)
 * @param children - Full-size A4 resume content
 * @param className - Additional CSS classes
 */
const ResumeThumbnail: React.FC<ResumeThumbnailProps> = ({
    scale,
    children,
    className = ''
}) => {
    // A4 dimensions in pixels (at 96 DPI)
    // A4 = 210mm × 297mm = 794px × 1123px
    const A4_WIDTH = 794;
    const A4_HEIGHT = 1123;

    // Calculate container dimensions based on scale
    const containerWidth = A4_WIDTH * scale;
    const containerHeight = A4_HEIGHT * scale;

    return (
        <div
            className={`relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 ease-out hover:-translate-y-4 hover:shadow-2xl group cursor-pointer ${className}`}
            style={{
                width: `${containerWidth}px`,
                height: `${containerHeight}px`,
            }}
        >
            {/* Scaled content wrapper */}
            <div
                className="origin-top-left"
                style={{
                    transform: `scale(${scale})`,
                    width: `${A4_WIDTH}px`,
                    height: `${A4_HEIGHT}px`,
                }}
            >
                {children}
            </div>

            {/* Optional: Hover overlay with glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Optional: Subtle border glow on hover */}
            <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-500/0 group-hover:ring-blue-500/30 transition-all duration-500 pointer-events-none" />
        </div>
    );
};

export default ResumeThumbnail;
