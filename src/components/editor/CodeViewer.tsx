import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeViewerProps {
    content: string;
    language?: string;
    path: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ content, language = 'javascript', path }) => {
    return (
        <Editor
            height="100%"
            path={path}
            language={language}
            value={content}
            theme="vs-dark"
            options={{
                readOnly: true,
                minimap: { enabled: true },
                scrollBeyondLastLine: false,
                fontSize: 14,
                fontFamily: 'var(--font-mono)',
                wordWrap: 'on',
                padding: { top: 16 },
                lineNumbersMinChars: 4,
                cursorBlinking: 'smooth',
                smoothScrolling: true,
            }}
            loading={<div className="flex items-center justify-center h-full text-term-muted">Loading editor...</div>}
        />
    );
};
