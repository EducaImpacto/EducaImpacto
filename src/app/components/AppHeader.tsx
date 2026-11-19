import React from 'react';
import { Home, Info, ArrowRight, LogOut, UserRound } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface AppHeaderProps {
  onHome: () => void;
  onAbout: () => void;
  onStart: () => void;
  userEmail?: string | null;
  onAuthClick: () => void;
  onSignOut: () => void;
}

export function AppHeader({ onHome, onAbout, onStart, userEmail, onAuthClick, onSignOut }: AppHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 h-16 z-[60] border-b border-[#dbe9e2] bg-white">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onHome}
          className="flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#329314] focus-visible:ring-offset-2"
          aria-label="Ir para a página inicial"
        >
          <BrandLogo compact />
        </button>

        <nav className="flex min-w-0 shrink-0 items-center gap-1 sm:gap-2" aria-label="Navegação principal">
          <button
            type="button"
            onClick={onHome}
            className="inline-flex h-10 items-center gap-2 rounded-md px-2 text-sm font-semibold text-[#052254] transition-colors hover:bg-[#e5f0ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#329314] focus-visible:ring-offset-2 sm:px-3"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only">Home</span>
          </button>

          <button
            type="button"
            onClick={onAbout}
            className="inline-flex h-10 items-center gap-2 rounded-md px-2 text-sm font-semibold text-[#052254] transition-colors hover:bg-[#e5f0ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#329314] focus-visible:ring-offset-2 sm:px-3"
          >
            <Info className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only">Quem somos</span>
          </button>

          <button
            type="button"
            onClick={onStart}
            className="inline-flex h-10 items-center gap-2 rounded-md px-2 text-sm font-semibold text-[#052254] transition-colors hover:bg-[#e5f0ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#329314] focus-visible:ring-offset-2 sm:px-3"
          >
            <ArrowRight className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only">Começar</span>
          </button>

          {userEmail ? (
            <button
              type="button"
              onClick={onSignOut}
              className="inline-flex h-10 items-center gap-2 rounded-md px-2 text-sm font-semibold text-[#052254] transition-colors hover:bg-[#e5f0ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#329314] focus-visible:ring-offset-2 sm:px-3"
              title={userEmail}
            >
              <LogOut className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only">Sair</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onAuthClick}
              className="inline-flex h-10 items-center gap-2 rounded-md bg-[#052254] px-2 text-sm font-semibold text-white transition-colors hover:bg-[#06173C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#329314] focus-visible:ring-offset-2 sm:px-3"
            >
              <UserRound className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only">Entrar</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
