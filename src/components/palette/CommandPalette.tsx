import React, { useState, useEffect, useRef } from 'react';
import { usePalette } from '../../store/palette';
import { useFileSystem } from '../../store/fileSystem';
import { useEditor } from '../../store/editor';
import { FileText, FileJson, Search } from 'lucide-react';

export const CommandPalette: React.FC = () => {
    const { isOpen, closePalette } = usePalette();
    const { files } = useFileSystem();
    const { openFile } = useEditor();
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input when palette opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isOpen]);

    const fileNodes = Object.values(files).filter(f => f.type === 'file');
    const filteredFiles = fileNodes.filter(
        f => f.name.toLowerCase().includes(query.toLowerCase()) || f.path.toLowerCase().includes(query.toLowerCase())
    );

    // Clamp selected index to valid range
    const clampedIndex = Math.min(selectedIndex, Math.max(0, filteredFiles.length - 1));



    if (!isOpen) return null;

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            closePalette();
            setQuery('');
            setSelectedIndex(0);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev < filteredFiles.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredFiles[clampedIndex]) {
                openFile(filteredFiles[clampedIndex].path);
                closePalette();
                setQuery('');
                setSelectedIndex(0);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-[15vh]">
            <div
                className="bg-[#111] border border-term-border rounded-lg shadow-2xl w-[600px] max-w-[90vw] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center px-4 py-3 border-b border-term-border">
                    <Search size={18} className="text-term-muted mr-3" />
                    <input
                        ref={inputRef}
                        type="text"
                        className="flex-1 bg-transparent outline-none text-term-text font-mono text-base"
                        placeholder="Search files by name..."
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setSelectedIndex(0);
                        }}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <div className="max-h-[400px] overflow-y-auto py-2">
                    {filteredFiles.length === 0 ? (
                        <div className="px-4 py-3 text-term-muted text-sm font-mono text-center">No matching files found.</div>
                    ) : (
                        filteredFiles.map((file, i) => (
                            <div
                                key={file.path}
                                className={"flex items-center px-4 py-2 cursor-pointer font-mono text-sm " + (i === clampedIndex ? 'bg-term-accent/20 text-term-text' : 'text-term-muted hover:bg-white/5')}
                                onClick={() => {
                                    openFile(file.path);
                                    closePalette();
                                    setQuery('');
                                    setSelectedIndex(0);
                                }}
                                onMouseEnter={() => setSelectedIndex(i)}
                            >
                                {file.extension === 'json' ? (
                                    <FileJson size={14} className="mr-3 text-term-success opacity-80" />
                                ) : (
                                    <FileText size={14} className="mr-3 text-term-accent opacity-80" />
                                )}
                                <span className="flex-1 truncate">{file.name}</span>
                                <span className="text-[10px] opacity-40 ml-4 truncate max-w-[50%] hidden sm:block">
                                    {file.path}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Invisible backdrop to catch clicks outside */}
            <div className="fixed inset-0 -z-10" onClick={closePalette} />
        </div>
    );
};
