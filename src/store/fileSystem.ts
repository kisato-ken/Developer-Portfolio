import { create } from 'zustand';
import { initialFiles, type FileNode } from './initialFiles';

interface FileSystemState {
    files: Record<string, FileNode>;
    cwd: string; // Current working directory (absolute path)

    // Actions
    setCwd: (path: string) => void;
    getFile: (path: string) => FileNode | undefined;
    resolvePath: (path: string) => string;
}

export const useFileSystem = create<FileSystemState>((set, get) => ({
    files: initialFiles,
    cwd: '/',

    setCwd: (path) => {
        const resolvedPath = get().resolvePath(path);
        const node = get().getFile(resolvedPath);
        if (node && node.type === 'directory') {
            set({ cwd: resolvedPath });
        }
    },

    getFile: (path) => {
        // If path is root '/' it returns the root node
        const files = get().files;
        return files[path];
    },

    resolvePath: (path) => {
        const { cwd } = get();
        if (path.startsWith('/')) {
            return path === '/' ? '/' : path.replace(/\/+$/, ''); // Remove trailing slashes
        }

        // Handle relative paths
        const segments = path.split('/').filter(p => p !== '');
        const currentSegments = cwd === '/' ? [] : cwd.split('/').filter(p => p !== '');

        for (const segment of segments) {
            if (segment === '.') continue;
            if (segment === '..') {
                currentSegments.pop();
            } else {
                currentSegments.push(segment);
            }
        }

        if (currentSegments.length === 0) return '/';
        return '/' + currentSegments.join('/');
    }
}));
