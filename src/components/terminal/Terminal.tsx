import React, { useState, useRef, useEffect } from 'react';
import { useTerminal } from '../../store/terminal';
import { useFileSystem } from '../../store/fileSystem';
import { useEditor } from '../../store/editor';

export const Terminal: React.FC = () => {
    const { history, pushToHistory, clearHistory } = useTerminal();
    const { cwd, setCwd, resolvePath, getFile } = useFileSystem();
    const { openFile } = useEditor();

    const [input, setInput] = useState('');
    const [historyIndex, setHistoryIndex] = useState(-1);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    // Handle click to focus terminal
    const handleTerminalClick = () => {
        inputRef.current?.focus();
    };

    const handleCommand = (cmdStr: string) => {
        const trimmed = cmdStr.trim();
        if (!trimmed) return;

        pushToHistory({ command: "visitor@portfolio:" + cwd + "$ " + trimmed, output: '', type: 'input' });

        const [cmd, ...args] = trimmed.split(' ');

        switch (cmd) {
            case 'help':
                pushToHistory({
                    command: '',
                    output: "Available commands:\n  ls       List directory contents\n  cd       Change directory\n  cat      Print file content\n  open     Open file in editor tab\n  clear    Clear terminal output\n  help     Show this message",
                    type: 'system',
                });
                break;

            case 'clear':
                clearHistory();
                break;

            case 'ls': {
                const targetPath = args[0] ? resolvePath(args[0]) : cwd;
                const node = getFile(targetPath);

                if (!node) {
                    pushToHistory({ command: '', output: "ls: cannot access '" + targetPath + "': No such file or directory", type: 'error' });
                } else if (node.type === 'file') {
                    pushToHistory({ command: '', output: node.name, type: 'output' });
                } else {
                    const children = node.children || [];
                    if (children.length === 0) {
                        pushToHistory({ command: '', output: '', type: 'output' }); // empty dir
                    } else {
                        const childNames = children.map(c => getFile(c)?.name).filter(Boolean).join('  ');
                        pushToHistory({ command: '', output: childNames, type: 'output' });
                    }
                }
                break;
            }

            case 'cd': {
                const targetPath = args[0] || '/';
                const resolved = resolvePath(targetPath);
                const node = getFile(resolved);

                if (!node) {
                    pushToHistory({ command: '', output: "cd: " + targetPath + ": No such file or directory", type: 'error' });
                } else if (node.type !== 'directory') {
                    pushToHistory({ command: '', output: "cd: " + targetPath + ": Not a directory", type: 'error' });
                } else {
                    setCwd(resolved);
                }
                break;
            }

            case 'cat': {
                if (!args[0]) {
                    pushToHistory({ command: '', output: 'cat: missing operand', type: 'error' });
                    break;
                }
                const targetPath = resolvePath(args[0]);
                const node = getFile(targetPath);

                if (!node) {
                    pushToHistory({ command: '', output: "cat: " + args[0] + ": No such file or directory", type: 'error' });
                } else if (node.type === 'directory') {
                    pushToHistory({ command: '', output: "cat: " + args[0] + ": Is a directory", type: 'error' });
                } else {
                    pushToHistory({ command: '', output: node.content || '', type: 'output' });
                }
                break;
            }

            case 'open': {
                if (!args[0]) {
                    pushToHistory({ command: '', output: 'open: missing operand', type: 'error' });
                    break;
                }
                const targetPath = resolvePath(args[0]);
                const node = getFile(targetPath);

                if (!node) {
                    pushToHistory({ command: '', output: "open: " + args[0] + ": No such file or directory", type: 'error' });
                } else if (node.type === 'directory') {
                    pushToHistory({ command: '', output: "open: " + args[0] + ": Can only open files, not directories", type: 'error' });
                } else {
                    openFile(node.path);
                }
                break;
            }

            default:
                pushToHistory({ command: '', output: cmd + ": command not found", type: 'error' });
                break;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
            setHistoryIndex(-1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const inputHistory = history.filter(h => h.type === 'input');
            if (inputHistory.length > 0) {
                const newIndex = historyIndex < inputHistory.length - 1 ? historyIndex + 1 : historyIndex;
                setHistoryIndex(newIndex);

                // Find command from end
                const cmdStr = inputHistory[inputHistory.length - 1 - newIndex].command.replace(/^visitor@portfolio:[^$]+\$ /, '');
                setInput(cmdStr);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const inputHistory = history.filter(h => h.type === 'input');
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                const cmdStr = inputHistory[inputHistory.length - 1 - newIndex].command.replace(/^visitor@portfolio:[^$]+\$ /, '');
                setInput(cmdStr);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput('');
            }
        }
    };

    return (
        <div
            className="h-full w-full bg-term-bg flex flex-col font-mono text-sm leading-relaxed p-2 custom-scrollbar"
            onClick={handleTerminalClick}
        >
            <div className="flex-1 overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-words" ref={scrollRef}>
                {history.map((entry) => (
                    <div key={entry.id} className="mb-1">
                        {entry.type === 'input' && (
                            <span className="text-term-accent mr-2">{entry.command}</span>
                        )}
                        {entry.type === 'output' && (
                            <span className="text-term-text">{entry.output}</span>
                        )}
                        {entry.type === 'error' && (
                            <span className="text-term-error">{entry.output}</span>
                        )}
                        {entry.type === 'system' && (
                            <span className="text-term-muted italic">{entry.output}</span>
                        )}
                    </div>
                ))}

                <div className="flex items-center">
                    <span className="text-term-success mr-2 shrink-0">visitor@portfolio:{cwd}$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        className="flex-1 bg-transparent outline-none border-none text-term-text min-w-0 font-mono"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                        spellCheck="false"
                    />
                </div>
            </div>
        </div>
    );
};
