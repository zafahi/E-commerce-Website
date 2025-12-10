# Setup Guide - TralaShop

Quick setup guide for getting started with TralaShop development and deployment.

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone <repository-url>
cd script
```

### 2. Install Dependencies (Optional)

```bash
npm install
```

### 3. Run Locally

```bash
npm start
# or
npx serve .
```

Open http://localhost:3000 in your browser.

## 📦 Project Structure

```
script/
├── index.html              # Main HTML
├── styles.css              # Styles
├── script.js               # Main app
├── js/
│   ├── config.js           # Config
│   ├── utils.js             # Utilities
│   ├── services/           # Business logic
│   └── components/         # UI components
└── .github/workflows/      # CI/CD
```

## 🔧 Development

### Local Development Server

```bash
# Using npm script
npm run dev

# Using serve directly
npx serve . -l 3000

# Using Python (if installed)
python -m http.server 8000
```

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## 🌐 Deployment to Vercel

### Option 1: Vercel Dashboard

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import GitHub repository
5. Deploy!

### Option 2: Vercel CLI

```bash
# Install CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

## 🔐 Environment Variables

Set in Vercel Dashboard > Project Settings > Environment Variables:

```
NODE_ENV=production
API_BASE_URL=https://api.tralashop.com
```
