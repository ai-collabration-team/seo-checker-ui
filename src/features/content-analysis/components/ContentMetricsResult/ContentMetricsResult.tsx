import React from 'react';
import { ContentMetrics } from '../../types';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface ContentMetricsResultProps {
  metrics: ContentMetrics;
}

export const ContentMetricsResult: React.FC<ContentMetricsResultProps> = ({ metrics }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-slate-400">Word Count</p>
            <p className="text-3xl font-bold text-slate-100">{metrics.wordCount}</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-slate-400">Paragraphs</p>
            <p className="text-3xl font-bold text-slate-100">{metrics.paragraphCount}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-slate-400">Average Sentence Length</p>
          <Badge variant="secondary">
            {metrics.averageSentenceLength} words
          </Badge>
        </div>
        <Progress value={Math.min(metrics.averageSentenceLength / 20 * 100, 100)} />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-slate-400">Readability Score</p>
          <Badge variant="secondary">
            {metrics.readabilityScore}/100
          </Badge>
        </div>
        <Progress value={metrics.readabilityScore} />
      </div>

      {metrics.keywordDensity.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-400">Keyword Density</p>
          <div className="space-y-2 rounded-lg bg-slate-800/50 p-4 border border-slate-700/50">
            {metrics.keywordDensity.map((keyword, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-slate-200">{keyword.keyword}</span>
                <Badge variant="secondary">
                  {(keyword.density * 100).toFixed(1)}% ({keyword.count} times)
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 