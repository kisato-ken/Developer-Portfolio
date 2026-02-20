import { create } from 'zustand';

interface PaletteState {
    isOpen: boolean;

    // Actions
    openPalette: () => void;
    closePalette: () => void;
    togglePalette: () => void;
}

export const usePalette = create<PaletteState>((set) => ({
    isOpen: false,

    openPalette: () => set({ isOpen: true }),
    closePalette: () => set({ isOpen: false }),
    togglePalette: () => set((state) => ({ isOpen: !state.isOpen }))
}));
