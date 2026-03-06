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
    blue: 'bg-blue-100 text-blue-700 border-blue-300',
    orange: 'bg-orange-100 text-orange-700 border-orange-300',
    green: 'bg-green-100 text-green-700 border-green-300',
    purple: 'bg-purple-100 text-purple-700 border-purple-300',
  };

  const Icon = icons[type];

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 ${colors[color]}`}>
      <Icon className="w-5 h-5" />
      <span className="font-semibold text-sm">{label}</span>
    </div>
  );
}
