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
      src="/logo-educa-impacto-horizontal.png"
      alt="Educa Impacto"
      className={`h-[4.5rem] w-auto max-w-[290px] rounded-md object-contain sm:h-[5.5rem] sm:max-w-[370px] ${inverted ? 'bg-white p-1' : ''} ${className}`}
    />
  );
}
