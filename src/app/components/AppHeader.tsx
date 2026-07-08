import React from 'react';
import { Home, LayoutGrid } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface AppHeaderProps {
  onHome: () => void;
  onOpenModules: () => void;
}

export function AppHeader({ onHome, onOpenModules }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-[60] border-b border-[#dbe9e2] bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onHome}
          className="flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#329314] focus-visible:ring-offset-2"
          aria-label="Ir para a página inicial"
        >
          <BrandLogo />
        </button>

        <nav className="flex shrink-0 items-center gap-1 sm:gap-2" aria-label="Navegação principal">
          <button
            type="button"
            onClick={onHome}
            className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold text-[#052254] transition-colors hover:bg-[#e5f0ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#329314] focus-visible:ring-offset-2"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </button>

          <button
            type="button"
            onClick={onOpenModules}
            className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold text-[#052254] transition-colors hover:bg-[#e5f0ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#329314] focus-visible:ring-offset-2"
          >
            <LayoutGrid className="h-4 w-4" />
            <span>Módulos</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
