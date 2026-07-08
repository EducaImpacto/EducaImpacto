import React from 'react';
import { Award, Star, Trophy, Zap } from 'lucide-react';

interface BadgeProps {
  type?: 'award' | 'star' | 'trophy' | 'zap';
  label: string;
  color?: 'blue' | 'orange' | 'green' | 'purple';
}

export function Badge({ type = 'award', label, color = 'blue' }: BadgeProps) {
  const icons = {
    award: Award,
    star: Star,
    trophy: Trophy,
    zap: Zap,
  };

  const colors = {
    blue: 'bg-[#e5f0ea] text-[#052254] border-[#B2C9BF]',
    orange: 'bg-[#e5f0ea] text-[#0A5740] border-[#7CAF70]',
    green: 'bg-[#e5f0ea] text-[#0A5740] border-[#7CAF70]',
    purple: 'bg-[#e5f0ea] text-[#0A5740] border-[#7CAF70]',
  };

  const Icon = icons[type];

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 ${colors[color]}`}>
      <Icon className="w-5 h-5" />
      <span className="font-semibold text-sm">{label}</span>
    </div>
  );
}
