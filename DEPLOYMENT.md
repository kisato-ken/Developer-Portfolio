# Deployment Guide

## Prerequisites

Ensure you have completed the production build:
```bash
npm run build
```

## Vercel Deployment

### Option 1: CLI
```bash
npm install -g vercel
vercel
```

### Option 2: GitHub Integration
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect the configuration

Configuration is handled by `vercel.json`.

## Netlify Deployment

### Option 1: CLI
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Option 2: Drag & Drop
1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist/` folder to the deploy zone

Configuration is handled by `netlify.toml`.

## GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json scripts:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Set base in vite.config.ts:
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
```

4. Deploy:
```bash
npm run deploy
```

## Environment Variables

If you add environment variables in the future:

### Vercel
Add in Project Settings → Environment Variables

### Netlify
Add in Site Settings → Build & Deploy → Environment

### Local Development
Create `.env.local` file (already gitignored)

## Important Notes

- All routes are handled client-side (SPA)
- The routing configuration redirects all paths to index.html
- No backend or API routes are needed
- All content is statically generated at build time
