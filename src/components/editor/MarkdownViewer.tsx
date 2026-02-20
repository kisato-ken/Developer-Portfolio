import React from 'react';
import Markdown from 'react-markdown';
import { motion } from 'framer-motion';

interface MarkdownViewerProps {
    content: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="max-w-4xl mx-auto p-8"
        >
            <div className="prose prose-invert prose-pre:font-mono prose-pre:bg-term-bg prose-pre:border prose-pre:border-term-border prose-a:text-term-accent hover:prose-a:text-blue-400 max-w-none">
                <Markdown>{content}</Markdown>
            </div>
        </motion.div>
    );
};
