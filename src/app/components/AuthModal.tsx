import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'signin' | 'signup';
  loading?: boolean;
  message?: string;
  onClose: () => void;
  onSignIn: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string, fullName: string) => Promise<void>;
}

export function AuthModal({
  isOpen,
  initialMode = 'signin',
  loading = false,
  message,
  onClose,
  onSignIn,
  onSignUp,
}: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    if (isOpen) setMode(initialMode);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const isSignup = mode === 'signup';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSignup) {
      await onSignUp(email.trim(), password, fullName.trim());
      return;
    }

    await onSignIn(email.trim(), password);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#06173C]/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#06173C]">
              {isSignup ? 'Criar conta' : 'Entrar'}
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Salve seu progresso, respostas e plano de negócios.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-gray-500 transition-colors hover:bg-[#e5f0ea] hover:text-[#052254]"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignup && (
            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-[#06173C]">Nome</span>
              <input
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="w-full rounded-lg border border-[#B2C9BF] px-4 py-3 text-sm outline-none transition-colors focus:border-[#329314] focus:ring-2 focus:ring-[#329314]/20"
                placeholder="Seu nome"
                required
              />
            </label>
          )}

          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-[#06173C]">E-mail</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-[#B2C9BF] px-4 py-3 text-sm outline-none transition-colors focus:border-[#329314] focus:ring-2 focus:ring-[#329314]/20"
              placeholder="voce@email.com"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-[#06173C]">Senha</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-[#B2C9BF] px-4 py-3 text-sm outline-none transition-colors focus:border-[#329314] focus:ring-2 focus:ring-[#329314]/20"
              placeholder="Mínimo 6 caracteres"
              minLength={6}
              required
            />
          </label>

          {message && (
            <div className="rounded-lg border border-[#B2C9BF] bg-[#f5faf7] px-4 py-3 text-sm text-[#06173C]">
              {message}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Processando...' : isSignup ? 'Criar conta' : 'Entrar'}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => setMode(isSignup ? 'signin' : 'signup')}
          className="mt-4 w-full text-center text-sm font-semibold text-[#052254] hover:underline"
        >
          {isSignup ? 'Já tenho conta' : 'Ainda não tenho conta'}
        </button>
      </div>
    </div>
  );
}
