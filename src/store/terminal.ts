import { create } from 'zustand';

export interface CommandEntry {
    id: string;
    command: string;
    output: string | React.ReactNode;
    type: 'input' | 'output' | 'system' | 'error';
}

interface TerminalState {
    history: CommandEntry[];

    // Actions
    pushToHistory: (entry: Omit<CommandEntry, 'id'>) => void;
    clearHistory: () => void;
}

export const useTerminal = create<TerminalState>((set) => ({
    history: [
        {
            id: 'welcome-0',
            command: '',
            output: "Welcome to Siddhartha Shankar Dhar's Developer Portfolio.\n" + 'Type "help" for a list of available commands.',
            type: 'system',
        }
    ],

    pushToHistory: (entry) => set((state) => ({
        history: [...state.history, { ...entry, id: crypto.randomUUID() }]
    })),

    clearHistory: () => set({ history: [] })
}));
