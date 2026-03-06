import React from 'react';
import { BookOpen } from 'lucide-react';

interface MicroContentCardProps {
  title: string;
  content: string;
}

export function MicroContentCard({ title, content }: MicroContentCardProps) {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-5 mb-6">
      <div className="flex items-start gap-3">
        <BookOpen className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-blue-900 mb-2">{title}</h4>
          <p className="text-gray-700 text-sm leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
}
