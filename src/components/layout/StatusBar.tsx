import React from 'react';
import { useFileSystem } from '../../store/fileSystem';
import { GitBranch, Clock, Copy } from 'lucide-react';

export const StatusBar: React.FC = () => {
    const cwd = useFileSystem((state) => state.cwd);

    return (
        <div className="h-full bg-[#111] border-t border-term-border flex items-center justify-between px-3 text-xs text-term-muted">
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 hover:text-term-text cursor-pointer transition-colors">
                    <GitBranch size={12} />
                    <span>main*</span>
                </div>
                <div className="flex items-center space-x-1 hover:text-term-text cursor-pointer transition-colors">
                    <Copy size={12} />
                    <span>{cwd}</span>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <span className="hover:text-term-text cursor-pointer transition-colors">UTF-8</span>
                <span className="hover:text-term-text cursor-pointer transition-colors">React TypeScript</span>
                <span className="flex items-center space-x-1">
                    <Clock size={12} />
                    <span>Portfolio OS v1.0</span>
                </span>
            </div>
        </div>
    );
};
