import React from 'react';

interface AppLayoutProps {
    sidebar: React.ReactNode;
    editor: React.ReactNode;
    terminal: React.ReactNode;
    statusBar: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
    sidebar,
    editor,
    terminal,
    statusBar
}) => {
    return (
        <div className="flex flex-col h-screen w-screen bg-term-bg text-term-text overflow-hidden font-mono text-sm">
            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden min-h-0">
                {/* Sidebar */}
                <div className="w-64 flex-shrink-0 border-r border-term-border flex flex-col items-stretch overflow-hidden">
                    {sidebar}
                </div>

                {/* Editor & Terminal Area */}
                <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex-1 overflow-hidden min-h-0">
                        {editor}
                    </div>
                    <div className="h-64 flex-shrink-0 border-t border-term-border">
                        {terminal}
                    </div>
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-6 flex-shrink-0">
                {statusBar}
            </div>
        </div>
    );
};
