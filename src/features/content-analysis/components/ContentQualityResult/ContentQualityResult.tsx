import React from 'react';
import { ContentQualityMetrics } from '../../types';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ContentQualityResultProps {
  metrics: ContentQualityMetrics;
}

export const ContentQualityResult: React.FC<ContentQualityResultProps> = ({ metrics }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-slate-400">Uniqueness Score</p>
            <Badge variant="secondary" className="bg-slate-800/50">
              {metrics.uniquenessScore}%
            </Badge>
          </div>
          <Progress value={metrics.uniquenessScore} className="bg-slate-800/50" />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-slate-400">Grammar Score</p>
            <Badge variant="secondary" className="bg-slate-800/50">
              {metrics.grammarScore}%
            </Badge>
          </div>
          <Progress value={metrics.grammarScore} className="bg-slate-800/50" />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-400">Reading Level</p>
        <Badge 
          variant={metrics.readabilityLevel === 'Easy' ? 'success' : 
                 metrics.readabilityLevel === 'Medium' ? 'secondary' : 'destructive'}
          className="bg-slate-800/50"
        >
          {metrics.readabilityLevel} Reading Level
        </Badge>
      </div>

      {metrics.spellingIssues.length > 0 && (
        <div className="space-y-2 rounded-lg bg-slate-800/50 p-4 border border-slate-700/50">
          <p className="text-sm font-medium text-slate-200">Spelling Issues Found:</p>
          <ul className="space-y-2">
            {metrics.spellingIssues.map((issue, index) => (
              <li key={index} className="text-sm text-slate-400 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-slate-500" />
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}; 