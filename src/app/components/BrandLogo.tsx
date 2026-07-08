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
        className={`h-11 w-11 rounded-full object-cover sm:h-12 sm:w-12 ${className}`}
      />
    );
  }

  return (
    <img
      src="/logo-educa-impacto-horizontal.jpeg"
      alt="Educa Impacto"
      className={`h-16 w-auto max-w-[260px] rounded-md object-contain sm:h-20 sm:max-w-[340px] ${inverted ? 'bg-white p-1' : ''} ${className}`}
    />
  );
}
