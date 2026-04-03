import { useEffect, useMemo, useState } from "react";

const createFallbackSrc = (label) => {
  const safeLabel = label || "Venta jewelry";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#131313" />
          <stop offset="55%" stop-color="#191714" />
          <stop offset="100%" stop-color="#0f1d1f" />
        </linearGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#bg)" rx="36" />
      <circle cx="1040" cy="130" r="160" fill="#c7995333" />
      <circle cx="190" cy="770" r="220" fill="#7b3a2b2a" />
      <path d="M600 270c-74 0-134 60-134 134 0 99 134 226 134 226s134-127 134-226c0-74-60-134-134-134Zm0 55c43 0 79 36 79 79 0 52-54 122-79 151-25-29-79-99-79-151 0-43 36-79 79-79Z" fill="#d4a756" opacity="0.92" />
      <text x="600" y="720" text-anchor="middle" fill="#f7f1e8" font-family="Georgia, serif" font-size="54" letter-spacing="4">VENTA</text>
      <text x="600" y="775" text-anchor="middle" fill="#b8ab93" font-family="Arial, sans-serif" font-size="24" letter-spacing="8">${safeLabel}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const FallbackImage = ({ src, alt, className }) => {
  const fallbackSrc = useMemo(() => createFallbackSrc(alt), [alt]);
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);

  useEffect(() => {
    setCurrentSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
};

export default FallbackImage;
