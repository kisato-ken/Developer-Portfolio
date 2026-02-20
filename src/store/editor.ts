import { create } from 'zustand';

interface EditorState {
    activeTabs: string[]; // Array of absolute file paths
    activeFile: string | null; // Currently viewed file path

    // Actions
    openFile: (path: string) => void;
    closeFile: (path: string) => void;
    setActiveFile: (path: string) => void;
}

export const useEditor = create<EditorState>((set, get) => ({
    activeTabs: ['/about.md'],
    activeFile: '/about.md',

    openFile: (path) => {
        const { activeTabs } = get();
        if (!activeTabs.includes(path)) {
            set({ activeTabs: [...activeTabs, path], activeFile: path });
        } else {
            set({ activeFile: path });
        }
    },

    closeFile: (path) => {
        const { activeTabs, activeFile } = get();
        const newTabs = activeTabs.filter(t => t !== path);
        let newActiveFile = activeFile;

        // If we are closing the active file
        if (activeFile === path) {
            if (newTabs.length > 0) {
                // Fallback to the last tab or adjacent tab
                const index = activeTabs.indexOf(path);
                const fallbackIndex = index > 0 ? index - 1 : 0;
                newActiveFile = newTabs[fallbackIndex];
            } else {
                newActiveFile = null;
            }
        }

        set({ activeTabs: newTabs, activeFile: newActiveFile });
    },

    setActiveFile: (path) => set({ activeFile: path })
}));
