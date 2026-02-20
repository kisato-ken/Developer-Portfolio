import React from 'react';
import { FileNodeItem } from './FileNodeItem';

export const FileExplorer: React.FC = () => {
    return (
        <div className="flex flex-col h-full bg-transparent">
            <div className="p-3 text-xs font-semibold uppercase tracking-wider text-term-muted border-b border-term-border">
                Explorer
            </div>
            <div className="flex-1 overflow-y-auto py-2 pr-2">
                {/* We start the tree from the root node '/' */}
                <FileNodeItem path="/" />
            </div>
        </div>
    );
};
