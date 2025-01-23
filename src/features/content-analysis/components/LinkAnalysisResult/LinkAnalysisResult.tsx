import React from 'react';
import { LinkAnalysis } from '../../types';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExternalLink, Link as LinkIcon, AlertTriangle } from 'lucide-react';

interface LinkAnalysisResultProps {
  analysis: LinkAnalysis;
}

export const LinkAnalysisResult: React.FC<LinkAnalysisResultProps> = ({ analysis }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-2">
          <Badge variant="secondary" className="bg-slate-800/50 flex items-center gap-2">
            <LinkIcon className="w-3 h-3" />
            Internal Links
          </Badge>
          <p className="text-3xl font-bold text-slate-100">{analysis.internalLinks.length}</p>
        </div>
        <div className="space-y-2">
          <Badge variant="secondary" className="bg-slate-800/50 flex items-center gap-2">
            <ExternalLink className="w-3 h-3" />
            External Links
          </Badge>
          <p className="text-3xl font-bold text-slate-100">{analysis.externalLinks.length}</p>
        </div>
        <div className="space-y-2">
          <Badge variant="destructive" className="bg-slate-800/50 flex items-center gap-2">
            <AlertTriangle className="w-3 h-3" />
            Broken Links
          </Badge>
          <p className="text-3xl font-bold text-slate-100">{analysis.brokenLinks.length}</p>
        </div>
      </div>

      {analysis.brokenLinks.length > 0 && (
        <div className="space-y-2 rounded-lg bg-red-950/20 p-4 border border-red-900/50">
          <p className="text-sm font-medium text-red-200">Broken Links Found:</p>
          <div className="space-y-3">
            {analysis.brokenLinks.map((link, index) => (
              <div key={index} className="space-y-1">
                <p className="text-sm text-red-300">{link.text}</p>
                <p className="text-xs text-red-400">{link.url}</p>
                <p className="text-xs text-red-500">{link.error}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-slate-800/50">Internal</Badge>
            <p className="text-sm font-medium text-slate-400">
              {analysis.internalLinks.length} Links
            </p>
          </div>
          <div className="space-y-2 rounded-lg bg-slate-800/50 p-4 border border-slate-700/50">
            {analysis.internalLinks.map((link, index) => (
              <div key={index} className="space-y-1">
                <p className="text-sm text-slate-200">{link.text}</p>
                <p className="text-xs text-slate-400">{link.url}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-slate-800/50">External</Badge>
            <p className="text-sm font-medium text-slate-400">
              {analysis.externalLinks.length} Links
            </p>
          </div>
          <div className="space-y-2 rounded-lg bg-slate-800/50 p-4 border border-slate-700/50">
            {analysis.externalLinks.map((link, index) => (
              <div key={index} className="space-y-1">
                <p className="text-sm text-slate-200">{link.text}</p>
                <p className="text-xs text-slate-400">{link.url}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 