import React from 'react';
import { BrandLogo } from './BrandLogo';

export function AppFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white/80 px-4 py-5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-xs text-gray-500 sm:flex-row sm:text-left">
        <BrandLogo className="h-14 max-w-[240px] sm:h-16 sm:max-w-[280px]" />
        <span>© 2026 EducaImpacto. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
