import React from 'react';
import { CheckCircle2, Lock } from 'lucide-react';

interface ModuleCardProps {
  title: string;
  description: string;
  completed: boolean;
  locked: boolean;
  onClick?: () => void;
}

export function ModuleCard({ title, description, completed, locked, onClick }: ModuleCardProps) {
  return (
    <div
      onClick={!locked ? onClick : undefined}
      className={`
        p-6 rounded-xl border-2 transition-all duration-200
        ${completed ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'}
        ${locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg hover:border-blue-500'}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
        <div className="ml-4">
          {completed ? (
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          ) : locked ? (
            <Lock className="w-6 h-6 text-gray-400" />
          ) : (
            <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
          )}
        </div>
      </div>
    </div>
  );
}
