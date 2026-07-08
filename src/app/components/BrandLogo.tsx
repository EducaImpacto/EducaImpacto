import React from 'react';

interface BrandLogoProps {
  inverted?: boolean;
  compact?: boolean;
  className?: string;
}

export function BrandLogo({ inverted = false, compact = false, className = '' }: BrandLogoProps) {
  if (compact) {
    return (
      <img
        src="/logo-educa-impacto-selo.jpeg"
        alt="Educa Impacto"
        className={`h-16 w-16 rounded-full object-cover sm:h-20 sm:w-20 ${className}`}
      />
    );
  }

  return (
    <img
      src="/logo-educa-impacto-horizontal.jpeg"
      alt="Educa Impacto"
      className={`h-20 w-auto max-w-[260px] rounded-md object-contain sm:h-28 sm:max-w-[420px] ${inverted ? 'bg-white p-1' : ''} ${className}`}
    />
  );
}
