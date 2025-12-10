# Setup Guide - TralaShop

Panduan singkat untuk development dan deployment (GitHub + Railway).

## 🚀 Quick Start (Lokal)
```bash
git clone <repository-url>
cd script
npm install
npm run dev   # http://localhost:3000
# atau
npx serve . -l 3000
```

## 📦 Struktur
```
script/
├── index.html
├── styles.css
├── script.js
├── js/
│   ├── config.js
│   ├── utils.js
│   ├── services/
│   └── components/
└── package.json
```

## 🔧 Skrip Penting
- `npm run dev` / `npm start` : serve lokal
- `npm run build`             : build statis (echo)
- `npm run lint`              : lint JS
- `npm run format`            : prettier

## 🌐 Deploy via GitHub + Railway (Static)
1) Push ke GitHub
```bash
git init
git remote add origin <repo-url>
git add .
git commit -m "Initial"
git push -u origin main
```
2) Railway Dashboard
- New Project → Deploy from GitHub → pilih repo.
- Root directory: `script` (jika repo punya folder ini) atau `.` jika langsung.
- Build command: `npm run build`
- Output directory: `.`
- Tambah env jika perlu (mis. `API_BASE_URL`, `NODE_ENV=production`).
- Deploy.

3) Railway CLI (opsional)
```bash
npm i -g @railway/cli
railway login
railway init    # pilih project / buat baru
railway up      # deploy
```
Gunakan konfigurasi sama: build `npm run build`, output `.`, root sesuai struktur.

## (Opsional) Vercel
- Build: `npm run build`
- Output: `.`
- Root: `script` atau `.` sesuai repo
- CLI: `npm i -g vercel && vercel && vercel --prod`

## 🔐 Environment Variables (opsional)
- `API_BASE_URL=https://api.tralashop.com`
- `NODE_ENV=production`
