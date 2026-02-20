import React, { useEffect, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingTerminal } from './components/landing/LandingTerminal';
import { usePalette } from './store/palette';

// Lazy loaded desktop components
const AppLayout = React.lazy(() => import('./components/layout/AppLayout').then(m => ({ default: m.AppLayout })));
const StatusBar = React.lazy(() => import('./components/layout/StatusBar').then(m => ({ default: m.StatusBar })));
const FileExplorer = React.lazy(() => import('./components/sidebar/FileExplorer').then(m => ({ default: m.FileExplorer })));
const EditorPane = React.lazy(() => import('./components/editor/EditorPane').then(m => ({ default: m.EditorPane })));
const Terminal = React.lazy(() => import('./components/terminal/Terminal').then(m => ({ default: m.Terminal })));
const CommandPalette = React.lazy(() => import('./components/palette/CommandPalette').then(m => ({ default: m.CommandPalette })));

// Loading spinner for Suspense
const LoadingScreen = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-term-bg text-term-text font-mono">
    Booting OS...
  </div>
);

function App() {
  const { togglePalette } = usePalette();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle palette on Ctrl+P or Cmd+P
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        togglePalette();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePalette]);

  return (
    <Routes>
      <Route path="/" element={<LandingTerminal />} />
      <Route path="/desktop" element={
        <Suspense fallback={<LoadingScreen />}>
          <AppLayout
            sidebar={<FileExplorer />}
            editor={<EditorPane />}
            terminal={<Terminal />}
            statusBar={<StatusBar />}
          />
          <CommandPalette />
        </Suspense>
      } />
    </Routes>
  );
}

export default App;
