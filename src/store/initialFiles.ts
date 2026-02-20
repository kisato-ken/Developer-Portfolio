export type FileType = 'file' | 'directory';
export type FileExtension = 'md' | 'json' | 'ts' | 'txt';

export interface FileNode {
    name: string;
    type: FileType;
    path: string; // Absolute path, e.g., '/projects/aluminai_2025.md'
    content?: string; // Content for files
    extension?: FileExtension;
    children?: string[]; // Array of absolute paths for directories
}

export const initialFiles: Record<string, FileNode> = {
    '/': { name: 'root', type: 'directory', path: '/', children: ['/about.md', '/skills', '/projects', '/contact.json'] },
    '/about.md': {
        name: 'about.md',
        type: 'file',
        path: '/about.md',
        extension: 'md',
        content: `# Siddhartha Shankar Dhar
**Software Engineer** passionate about building efficient and scalable solutions.

With 2+ years of experience in AI/ML, I specialize in developing production-grade systems using modern technologies and best practices.

## Education
**BCA in AI/ML**  
Assam Down Town University  
Specialized in Machine Learning, Deep Learning, and AI Systems Architecture`
    },
    '/contact.json': {
        name: 'contact.json',
        type: 'file',
        path: '/contact.json',
        extension: 'json',
        content: `{
  "email": "kisato.ken@protonmail.com",
  "github": "https://github.com/kisato-ken",
  "linkedin": "https://www.linkedin.com/in/siddharthadhar04",
  "phone": "+91 8822543062",
  "location": "Guwahati, Assam, India"
}`
    },
    '/skills': { name: 'skills', type: 'directory', path: '/skills', children: ['/skills/languages.json', '/skills/frontend.json', '/skills/backend-db.json', '/skills/ai-ml.json'] },
    '/skills/languages.json': {
        name: 'languages.json',
        type: 'file',
        path: '/skills/languages.json',
        extension: 'json',
        content: '[\n  "Python",\n  "JavaScript",\n  "TypeScript",\n  "C",\n  "C++",\n  "Rust"\n]'
    },
    '/skills/frontend.json': {
        name: 'frontend.json',
        type: 'file',
        path: '/skills/frontend.json',
        extension: 'json',
        content: '[\n  "React",\n  "Next.js",\n  "Tailwind CSS"\n]'
    },
    '/skills/backend-db.json': {
        name: 'backend-db.json',
        type: 'file',
        path: '/skills/backend-db.json',
        extension: 'json',
        content: '[\n  "Node.js",\n  "PostgreSQL",\n  "MongoDB",\n  "Firebase",\n  "Docker",\n  "Git"\n]'
    },
    '/skills/ai-ml.json': {
        name: 'ai-ml.json',
        type: 'file',
        path: '/skills/ai-ml.json',
        extension: 'json',
        content: '[\n  "TensorFlow",\n  "PyTorch",\n  "Scikit-learn",\n  "Pandas",\n  "NumPy"\n]'
    },
    '/projects': { name: 'projects', type: 'directory', path: '/projects', children: ['/projects/aluminai_2025.md', '/projects/nocturne.md', '/projects/stock-price-predictor.md', '/projects/nocturne-music-player.md'] },
    '/projects/aluminai_2025.md': {
        name: 'aluminai_2025.md',
        type: 'file',
        path: '/projects/aluminai_2025.md',
        extension: 'md',
        content: `# Aluminai 2025
[View on GitHub](https://github.com/kisato-ken/Aluminai_2025)

Platform connecting alumni and students natively, augmented by AI for matching and career paths.`
    },
    '/projects/nocturne.md': {
        name: 'nocturne.md',
        type: 'file',
        path: '/projects/nocturne.md',
        extension: 'md',
        content: `# Nocturne
[View on GitHub](https://github.com/kisato-ken/Nocturne)

An advanced web application built with modern technologies focusing on optimal performance and rich user experience.`
    },
    '/projects/stock-price-predictor.md': {
        name: 'stock-price-predictor.md',
        type: 'file',
        path: '/projects/stock-price-predictor.md',
        extension: 'md',
        content: `# Stock Price Predictor
[View on GitHub](https://github.com/kisato-ken/Stock-Price-Predictor)

Machine Learning model predicting stock market trends primarily using time-series forecasting techniques.`
    },
    '/projects/nocturne-music-player.md': {
        name: 'nocturne-music-player.md',
        type: 'file',
        path: '/projects/nocturne-music-player.md',
        extension: 'md',
        content: `# Nocturne Music Player
[View on GitHub](https://github.com/kisato-ken/Nocturne-Music-Player)

A feature-rich music player with an intuitive interface, playlist management, and sleek design.`
    }
};
