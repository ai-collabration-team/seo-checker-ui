import React from 'react';
import { HeadingAnalysis } from '../../types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface HeadingAnalysisResultProps {
  analysis: HeadingAnalysis;
}

export const HeadingAnalysisResult: React.FC<HeadingAnalysisResultProps> = ({ analysis }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Badge variant={analysis.hasH1 ? "success" : "destructive"} className="bg-slate-800/50">
          {analysis.hasH1 ? 'H1 Present' : 'Missing H1'}
        </Badge>
        {analysis.multipleH1s && (
          <Badge variant="warning" className="bg-slate-800/50">Multiple H1 Tags</Badge>
        )}
        <Badge 
          variant={analysis.headingHierarchy ? "success" : "warning"} 
          className="bg-slate-800/50"
        >
          {analysis.headingHierarchy ? 'Valid Hierarchy' : 'Invalid Hierarchy'}
        </Badge>
      </div>

      {analysis.issues.length > 0 && (
        <div className="space-y-2 rounded-lg bg-amber-950/20 p-4 border border-amber-900/50">
          <p className="text-sm font-medium text-amber-200">Issues Found:</p>
          <ul className="space-y-2">
            {analysis.issues.map((issue, index) => (
              <li key={index} className="text-sm text-amber-300/80 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-amber-500" />
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-4">
        {Object.entries(analysis.headings).map(([level, headings]) => (
          headings.length > 0 && (
            <div key={level} className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-slate-800/50">
                  {level.toUpperCase()}
                </Badge>
                <p className="text-sm font-medium text-slate-400">
                  {headings.length} {headings.length === 1 ? 'Tag' : 'Tags'}
                </p>
              </div>
              <div className="space-y-2 rounded-lg bg-slate-800/50 p-4 border border-slate-700/50">
                {headings.map((heading, index) => (
                  <p key={index} className="text-sm text-slate-200">
                    {heading}
                  </p>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}; 