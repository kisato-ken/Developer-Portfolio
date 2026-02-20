import React, { useState } from 'react';
import { useFileSystem } from '../../store/fileSystem';
import { useEditor } from '../../store/editor';
import { ChevronRight, ChevronDown, FileText, FileJson, Folder } from 'lucide-react';
import clsx from 'clsx';

interface FileNodeItemProps {
    path: string;
    depth?: number;
}

const getFileIcon = (extension?: string) => {
    switch (extension) {
        case 'md': return <FileText size={14} className="text-term-accent" />;
        case 'json': return <FileJson size={14} className="text-term-success" />;
        default: return <FileText size={14} className="text-term-muted" />;
    }
};

export const FileNodeItem: React.FC<FileNodeItemProps> = ({ path, depth = 0 }) => {
    const node = useFileSystem((state) => state.files[path]);
    const activeFile = useEditor((state) => state.activeFile);
    const openFile = useEditor((state) => state.openFile);

    const [isOpen, setIsOpen] = useState(depth === 0);

    if (!node) return null;
    if (node.path === '/') return <>{node.children?.map(child => <FileNodeItem key={child} path={child} depth={0} />)}</>;

    const isDirectory = node.type === 'directory';
    const isActive = activeFile === node.path;

    const handleClick = () => {
        if (isDirectory) {
            setIsOpen(!isOpen);
        } else {
            openFile(node.path);
        }
    };

    return (
        <div>
            <div
                className={clsx(
                    "flex items-center py-1 px-2 cursor-pointer select-none hover:bg-white/5 transition-colors group",
                    isActive && "bg-term-accent/10 text-term-accent"
                )}
                style={{ paddingLeft: (depth * 12 + 8) + 'px' }}
                onClick={handleClick}
            >
                <span className="mr-1 opacity-50 group-hover:opacity-100 transition-opacity flex items-center justify-center w-4 h-4">
                    {isDirectory ? (
                        isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                    ) : null}
                </span>

                <span className="mr-2">
                    {isDirectory ? (
                        <Folder size={14} className={clsx(isOpen ? "text-term-accent" : "text-term-muted")} />
                    ) : (
                        getFileIcon(node.extension)
                    )}
                </span>

                <span className={clsx("truncate text-[13px]", !isActive && "text-term-muted group-hover:text-term-text")}>
                    {node.name}
                </span>
            </div>

            {
                isDirectory && isOpen && node.children && (
                    <div>
                        {node.children.map(child => (
                            <FileNodeItem key={child} path={child} depth={depth + 1} />
                        ))}
                    </div>
                )
            }
        </div >
    );
};
