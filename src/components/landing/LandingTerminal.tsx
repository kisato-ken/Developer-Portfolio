import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFileSystem } from '../../store/fileSystem';

type HistoryEntry = {
    id: string;
    type: 'input' | 'output';
    content: React.ReactNode;
};

const COMMANDS = [
    { name: 'about', desc: 'About Me' },
    { name: 'education', desc: 'My Education' },
    { name: 'skills', desc: 'My Tech Skills' },
    { name: 'projects', desc: 'My Tech Projects' },
    { name: 'contact', desc: 'Contact Me' },
    { name: 'blog', desc: 'Visit my blog' },
    { name: 'clear', desc: 'Clear terminal' },
];

const PromptPrefix = () => (
    <span className="mr-2">
        <span className="text-landing-peach">λ</span>{' '}
        <span className="text-landing-muted">::</span>{' '}
        <span className="text-landing-purple">~</span>{' '}
        <span className="text-landing-cyan">&gt;&gt;</span>
    </span>
);

export const LandingTerminal: React.FC = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { getFile } = useFileSystem();

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
        const trimmed = cmdStr.trim().toLowerCase();
        if (!trimmed) return;

        // Add input to history
        const newEntryId = Math.random().toString(36).substring(7);
        setHistory(prev => [...prev, {
            id: `in-${newEntryId}`,
            type: 'input',
            content: (
                <div className="flex items-center">
                    <PromptPrefix />
                    <span className="text-landing-text">{trimmed}</span>
                </div>
            )
        }]);

        // Process output
        let outputContent: React.ReactNode = null;

        switch (trimmed) {
            case 'help':
                outputContent = (
                    <div className="flex flex-col mt-2 mb-6 w-full max-w-md">
                        {COMMANDS.map(cmd => (
                            <div key={cmd.name} className="flex justify-between font-mono">
                                <span className="text-landing-text">{cmd.name}</span>
                                <span className="text-landing-text">{cmd.desc}</span>
                            </div>
                        ))}
                        <div className="mt-6 text-landing-text">
                            Type one of the above to view. For eg. <span className="text-landing-cyan">about</span>
                        </div>
                    </div>
                );
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'about': {
                const node = getFile('/about.md');
                outputContent = <div className="mt-2 mb-4 text-landing-text whitespace-pre-wrap">{node?.content || 'About file not found.'}</div>;
                break;
            }
            case 'education': {
                const node = getFile('/about.md');
                const content = node?.content || '';
                const educationStr = content.split('## Education')[1]?.trim() || 'Education details not found.';
                outputContent = <div className="mt-2 mb-4 text-landing-text whitespace-pre-wrap">{educationStr}</div>;
                break;
            }
            case 'skills': {
                const dir = getFile('/skills');
                if (dir && dir.children) {
                    const skillsText = dir.children.map(child => {
                        const file = getFile(child);
                        return `${file?.name}:\n${file?.content}`;
                    }).join('\n\n');
                    outputContent = <div className="mt-2 mb-4 text-landing-text whitespace-pre-wrap">{skillsText}</div>;
                } else {
                    outputContent = <div className="mt-2 mb-4 text-landing-error">Skills directory not found.</div>;
                }
                break;
            }
            case 'projects': {
                const dir = getFile('/projects');
                if (dir && dir.children) {
                    const projectsText = dir.children.map(child => {
                        const file = getFile(child);
                        return file?.content;
                    }).join('\n\n---\n\n');
                    outputContent = <div className="mt-2 mb-4 text-landing-text whitespace-pre-wrap">{projectsText}</div>;
                } else {
                    outputContent = <div className="mt-2 mb-4 text-landing-error">Projects directory not found.</div>;
                }
                break;
            }
            case 'contact': {
                const node = getFile('/contact.json');
                outputContent = <div className="mt-2 mb-4 text-landing-text whitespace-pre-wrap">{node?.content || 'Contact file not found.'}</div>;
                break;
            }
            case 'blog':
                outputContent = <div className="mt-2 mb-4 text-landing-text">Blog is coming soon.</div>;
                break;
            case 'normal':
                navigate('/desktop');
                return;
            default:
                outputContent = <div className="mt-2 mb-4 text-landing-text whitespace-pre-wrap">Command not found: {trimmed}. Type 'help' to see available commands.</div>;
                break;
        }

        setHistory(prev => [...prev, {
            id: `out-${newEntryId}`,
            type: 'output',
            content: outputContent
        }]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        }
    };

    return (
        <div
            className="flex flex-col h-screen w-screen bg-landing-bg overflow-hidden p-8 font-mono text-base sm:text-lg md:text-xl lg:p-16 custom-scrollbar justify-center items-center"
            onClick={handleTerminalClick}
        >
            <div className="w-full max-w-fit flex flex-col max-h-full">
                {/* Header Section */}
                <div className="mb-8 font-bold text-5xl md:text-7xl leading-tight tracking-tight">
                    <div className="text-landing-purple">kisato:$ type</div>
                    <div className="text-landing-lavender">help to start</div>
                </div>

                <div className="mb-8 text-xl font-bold">
                    <span className="text-landing-text">Visit </span>
                    <Link to="/desktop" className="text-landing-cyan underline hover:text-landing-lavender transition-colors">Normal website</Link>
                </div>

                {/* Terminal History */}
                <div className="flex-1 overflow-y-auto w-full pr-4" ref={scrollRef}>
                    {history.map((entry) => (
                        <div key={entry.id}>
                            {entry.content}
                        </div>
                    ))}

                    {/* Active Input Line */}
                    <div className="flex items-center mt-2">
                        <PromptPrefix />
                        <input
                            ref={inputRef}
                            type="text"
                            className="flex-1 bg-transparent outline-none border-none text-landing-text min-w-0 font-mono"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoComplete="off"
                            spellCheck="false"
                            autoFocus
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
