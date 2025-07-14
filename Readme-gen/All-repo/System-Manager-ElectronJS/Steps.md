# ⚡ Electron + React + Vite Starter Template

A minimal boilerplate for building cross-platform desktop apps with **Electron**, **React**, and **Vite**. Supports development and production builds for **Windows**, **macOS**, and **Linux**.

---

## 🔧 Project Structure

```
.
├── dist-electron/         # Compiled Electron main process
├── dist-react/            # Vite-built React app
├── src/
│   ├── electron/
│   │   ├── main.ts        # Electron main process
│   │   ├── util.ts        # Utility functions
│   │   └── tsconfig.json  # Electron-specific TS config
│   └── ui/             # React frontend app
│       └── main.tsx        # React Main File
├── types.d.ts             # (Optional) Global type declarations
├── vite.config.ts         # Vite config for React
├── package.json
└── tsconfig.json
```

---

## ⚙ Vite Configuration

**`vite.config.ts`**
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist-react',
  },
  server: {
    port: 5123,
    strictPort: true,
  },
});
```

- `base: './'`: Enables `file://` support.
- `outDir: 'dist-react'`: Keeps frontend output isolated.
- `port: 5123` + `strictPort: true`: Consistent dev port for Electron to hook into.

---

## 🚀 Electron Main Process

**`src/electron/main.ts`**
```ts
import { app, BrowserWindow } from 'electron';
import { isDev } from './util.js';
import path from 'path';

app.on('ready', () => {
  const mainWindow = new BrowserWindow({});
  if (isDev()) {
    mainWindow.loadURL('http://localhost:5123');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react/index.html'));
  }
});
```

**`src/electron/util.ts`**
```ts
export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}
```

---

## 📦 Build Scripts

**`package.json`**
```json
{
  "name": "system-manager",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "main": "dist-electron/main.js",
  "scripts": {
    "dev": "npm-run-all --parallel dev:react dev:electron",
    "dev:react": "vite",
    "dev:electron": "npm run transpile:electron && cross-env NODE_ENV=development electron .",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "transpile:electron": "tsc --project src/electron/tsconfig.json",
    "dist:mac": "npm run transpile:electron && npm run build && electron-builder --mac --arm64",
    "dist:win": "npm run transpile:electron && npm run build && electron-builder --win --x64",
    "dist:linux": "npm run transpile:electron && npm run build && electron-builder --linux --x64"
  }
}
```

---

## 🧱 TypeScript Configs

**Root `tsconfig.json`**
```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ESNext",
    "module": "NodeNext",
    "outDir": "../../dist-electron",
    "skipLibCheck": true,
    "types": ["../../types"]
  }
}
```

---

## 📁 Optional

**Create `types.d.ts` in root:**
```ts
// Declare custom types or modules here for global usage
```

---

## 🛠 Dev Dependencies

```json
"devDependencies": {
  "@types/node": "^22.5.5",
  "@types/os-utils": "^0.0.4",
  "@types/react": "^18.3.8",
  "@types/react-dom": "^18.3.0",
  "@vitejs/plugin-react": "^4.3.1",
  "cross-env": "^7.0.3",
  "electron": "^32.1.2",
  "electron-builder": "^25.0.5",
  "npm-run-all": "^4.1.5",
  "typescript": "^5.6.2",
  "vite": "^5.4.7",
  "vitest": "^2.1.1"
}
```

---

## 🧪 Run / Build

```bash
# Development
npm install
npm run dev

# Production Build
npm run dist:mac
npm run dist:win
npm run dist:linux
```

Done.
