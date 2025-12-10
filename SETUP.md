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

## ✅ Pre-Deployment Checklist

- [ ] Code tested locally
- [ ] No console errors
- [ ] All features working
- [ ] Responsive design tested
- [ ] Environment variables set
- [ ] README updated

## 🐛 Troubleshooting

### Scripts not loading?

Check browser console for errors. Ensure all files are in correct paths.

### Styles not applying?

Clear browser cache or do hard refresh (Ctrl+Shift+R / Cmd+Shift+R).

### Deployment fails?

- Check Vercel logs
- Verify all files are committed
- Check `vercel.json` configuration

## 📚 Next Steps

1. Read [README.md](./README.md) for full documentation
2. Read [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment details
3. Customize configuration in `js/config.js`
4. Add your own features!

---

**Happy Coding! 🎉**

