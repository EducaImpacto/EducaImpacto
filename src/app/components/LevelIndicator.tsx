import React from 'react';
import { TrendingUp } from 'lucide-react';

interface LevelIndicatorProps {
  level: number;
  xp: number;
  nextLevelXp: number;
}

export function LevelIndicator({ level, xp, nextLevelXp }: LevelIndicatorProps) {
  const progress = (xp / nextLevelXp) * 100;

  return (
    <div className="bg-white rounded-xl p-4 border-2 border-blue-200 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="text-sm text-gray-600">Nível Atual</div>
          <div className="text-2xl font-bold text-blue-600">{level}</div>
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">XP</span>
          <span className="font-semibold text-gray-900">{xp} / {nextLevelXp}</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
