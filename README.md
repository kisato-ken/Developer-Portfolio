# Developer Portfolio

An interactive developer portfolio featuring a terminal-style interface and virtual file system. Built with React, TypeScript, and Vite.

## Features

-  **Terminal Interface**: Navigate through the portfolio using familiar terminal commands
-  **Virtual File System**: Explore projects, skills, and information in a file-tree structure  
-  **Command Palette**: Quick navigation with `Ctrl/Cmd + P`
-  **Code Editor UI**: View content in a VS Code-inspired editor pane
-  **Modern Stack**: React 19, TypeScript, Tailwind CSS, Framer Motion
-  **Fast & Responsive**: Built with Vite for optimal performance

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Available Commands

### Landing Terminal
- `help` - Show available commands
- `about` - View about information
- `education` - View education details
- `skills` - List technical skills
- `projects` - View project portfolio
- `contact` - Display contact information
- `clear` - Clear terminal history

## Project Structure

```
src/
├── components/
│   ├── editor/        # Code viewer and markdown renderer
│   ├── landing/       # Landing terminal interface
│   ├── layout/        # App layout and status bar
│   ├── palette/       # Command palette
│   ├── sidebar/       # File explorer
│   └── terminal/      # Desktop terminal component
└── store/            # Zustand state management
    ├── editor.ts      # Editor state
    ├── fileSystem.ts  # Virtual file system
    ├── palette.ts     # Command palette state
    └── terminal.ts    # Terminal state
```

## Technologies

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Styling
- **Zustand** - State management
- **Monaco Editor** - Code editor component
- **Framer Motion** - Animations
- **React Router** - Routing

## Deployment

The project can be deployed to any static hosting service:

- **Vercel**: `vercel`
- **Netlify**: `netlify deploy`
- **GitHub Pages**: Build and push `dist/` folder

Make sure to configure routing for SPA (see deployment configuration below).

## License

MIT

## Author

**Siddhartha Shankar Dhar**  
    kisato.ken@protonmail.com  
    [GitHub](https://github.com/kisato-ken)  
    [LinkedIn](https://www.linkedin.com/in/siddharthadhar04)
