import React from 'react';
import { useEditor } from '../../store/editor';
import { useFileSystem } from '../../store/fileSystem';
import { X, FileText, FileJson } from 'lucide-react';
import clsx from 'clsx';
import { CodeViewer } from './CodeViewer';
import { MarkdownViewer } from './MarkdownViewer';

const getFileIcon = (extension?: string) => {
    switch (extension) {
        case 'md': return <FileText size={14} className="text-term-accent" />;
        case 'json': return <FileJson size={14} className="text-term-success" />;
        default: return <FileText size={14} className="text-term-muted" />;
    }
};

export const EditorPane: React.FC = () => {
    const { activeTabs, activeFile, setActiveFile, closeFile } = useEditor();
    const getFile = useFileSystem((state) => state.getFile);

    if (activeTabs.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center text-term-muted bg-term-bg h-full">
                <div className="text-center">
                    <div className="font-semibold mb-2 text-term-text">Developer Portfolio as Source Code</div>
                    <div>Keyboard shortcuts:</div>
                    <div className="mt-2 text-xs opacity-70">
                        <div><kbd className="bg-white/10 px-1 rounded">ctrl+p</kbd> / <kbd className="bg-white/10 px-1 rounded">cmd+p</kbd> to open Command Palette</div>
                        <div>Use terminal below to run <kbd className="bg-white/10 px-1 rounded">ls</kbd>, <kbd className="bg-white/10 px-1 rounded">cd</kbd>, <kbd className="bg-white/10 px-1 rounded">cat</kbd>, <kbd className="bg-white/10 px-1 rounded">open</kbd></div>
                    </div>
                </div>
            </div>
        );
    }

    const activeNode = activeFile ? getFile(activeFile) : null;

    return (
        <div className="flex flex-col h-full bg-term-surface">
            {/* Editor Tabs */}
            <div className="flex overflow-x-auto bg-term-crust border-b border-term-border custom-scrollbar">
                {activeTabs.map((path) => {
                    const node = getFile(path);
                    if (!node) return null;
                    const isActive = activeFile === path;

                    return (
                        <div
                            key={path}
                            className={clsx(
                                "group flex items-center h-9 px-3 border-r border-term-border cursor-pointer select-none text-[13px] min-w-[120px] max-w-[200px]",
                                isActive ? "bg-term-surface text-term-text border-t-2 border-t-term-accent border-b-0" : "bg-term-crust text-term-muted hover:bg-term-surface-hover"
                            )}
                            onClick={() => setActiveFile(path)}
                            onAuxClick={(e) => {
                                if (e.button === 1) closeFile(path); // middle click close
                            }}
                        >
                            <span className="mr-2 shrink-0">{getFileIcon(node.extension)}</span>
                            <span className="truncate flex-1">{node.name}</span>
                            <button
                                className={clsx(
                                    "shrink-0 ml-2 rounded p-0.5 opacity-0 group-hover:opacity-100 transition-opacity",
                                    isActive && "opacity-100",
                                    "hover:bg-white/10"
                                )}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    closeFile(path);
                                }}
                            >
                                <X size={14} />
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto relative">
                {activeNode && (
                    <div className="absolute inset-0">
                        {activeNode.extension === 'md' ? (
                            <MarkdownViewer content={activeNode.content || ''} />
                        ) : (
                            <CodeViewer
                                content={activeNode.content || ''}
                                language={activeNode.extension === 'json' ? 'json' : 'typescript'}
                                path={activeNode.path}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
