import React from 'react';
import { Home, Info, LayoutGrid, LogOut, UserRound } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface AppHeaderProps {
  onHome: () => void;
  onAbout: () => void;
  onOpenModules: () => void;
  userEmail?: string | null;
  onAuthClick: () => void;
  onSignOut: () => void;
}

export function AppHeader({ onHome, onAbout, onOpenModules, userEmail, onAuthClick, onSignOut }: AppHeaderProps) {
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
            onClick={onAbout}
            className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold text-[#052254] transition-colors hover:bg-[#e5f0ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#329314] focus-visible:ring-offset-2"
          >
            <Info className="h-4 w-4" />
            <span>Quem somos</span>
          </button>

          <button
            type="button"
            onClick={onOpenModules}
            className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold text-[#052254] transition-colors hover:bg-[#e5f0ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#329314] focus-visible:ring-offset-2"
          >
            <LayoutGrid className="h-4 w-4" />
            <span>Módulos</span>
          </button>

          {userEmail ? (
            <button
              type="button"
              onClick={onSignOut}
              className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold text-[#052254] transition-colors hover:bg-[#e5f0ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#329314] focus-visible:ring-offset-2"
              title={userEmail}
            >
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onAuthClick}
              className="inline-flex h-10 items-center gap-2 rounded-md bg-[#052254] px-3 text-sm font-semibold text-white transition-colors hover:bg-[#06173C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#329314] focus-visible:ring-offset-2"
            >
              <UserRound className="h-4 w-4" />
              <span>Entrar</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
