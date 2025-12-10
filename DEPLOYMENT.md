# Deployment Guide - TralaShop

Comprehensive guide for deploying TralaShop to cloud platforms.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Vercel Deployment](#vercel-deployment)
3. [CI/CD Setup](#cicd-setup)
4. [Environment Configuration](#environment-configuration)
5. [Monitoring & Maintenance](#monitoring--maintenance)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

- ✅ GitHub account
- ✅ Vercel account (free tier available)
- ✅ Git installed locally
- ✅ Node.js 18+ (for local development)

## Vercel Deployment

### Method 1: Vercel Dashboard (Recommended for Beginners)

1. **Prepare Your Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy via Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect settings
   - Click "Deploy"

3. **Configure Project Settings**
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: (leave empty for static site)
   - **Output Directory**: `./`
   - **Install Command**: `npm install` (optional)

4. **Environment Variables** (if needed)
   - Go to Project Settings > Environment Variables
   - Add variables:
     ```
     NODE_ENV=production
     API_BASE_URL=https://api.tralashop.com
     ```

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # First deployment (preview)
   vercel

   # Production deployment
   vercel --prod
   ```

4. **Link to Existing Project**
   ```bash
   vercel link
   ```

## CI/CD Setup

### GitHub Actions Workflow

The project includes automated CI/CD via GitHub Actions.

#### Step 1: Get Vercel Credentials

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link project (creates .vercel/project.json)
vercel link

# Get your token from: https://vercel.com/account/tokens
```

#### Step 2: Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to: **Settings** > **Secrets and variables** > **Actions**
3. Add the following secrets:

   | Secret Name | Description | How to Get |
   |------------|-------------|------------|
   | `VERCEL_TOKEN` | Vercel API token | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
   | `VERCEL_ORG_ID` | Organization ID | From `.vercel/project.json` after `vercel link` |
   | `VERCEL_PROJECT_ID` | Project ID | From `.vercel/project.json` after `vercel link` |

#### Step 3: Verify Workflow

1. Push to `main` branch → Triggers production deployment
2. Create a Pull Request → Triggers preview deployment
3. Check Actions tab in GitHub to see workflow status

### Workflow Stages

The CI/CD pipeline includes:

1. **Lint & Test**
   - Code quality checks
   - HTML validation
   - Link checking

2. **Build**
   - Create build artifacts
   - Optimize assets
   - Prepare for deployment

3. **Deploy Preview** (on PR)
   - Deploy to Vercel preview environment
   - Get preview URL in PR comments

4. **Deploy Production** (on main branch)
   - Deploy to production
   - Run post-deployment checks

5. **Security Scan**
   - Vulnerability scanning
   - Security analysis

## Environment Configuration

### Development Environment

Create `.env.local`:
```env
NODE_ENV=development
API_BASE_URL=http://localhost:3000/api
```

### Production Environment

Set in Vercel Dashboard:

1. Go to **Project Settings** > **Environment Variables**
2. Add variables:
   ```
   NODE_ENV=production
   API_BASE_URL=https://api.tralashop.com
   ```

### Environment-Specific Configs

The app uses `js/config.js` for configuration. For environment-specific values:

```javascript
// js/config.js
const Config = {
    api: {
        baseUrl: process.env.API_BASE_URL || 'https://api.tralashop.com',
        // ...
    }
};
```

## Monitoring & Maintenance

### Vercel Analytics

1. Enable in Vercel Dashboard
2. Go to **Analytics** tab
3. View:
   - Page views
   - Performance metrics
   - User behavior

### Error Tracking

Add error tracking service (optional):

```javascript
// script.js
window.addEventListener('error', (e) => {
    // Send to error tracking service
    // Example: Sentry, LogRocket, etc.
    console.error('Error:', e.error);
});
```

### Performance Monitoring

- Use Vercel Analytics
- Monitor Core Web Vitals
- Check Lighthouse scores
- Monitor API response times

### Regular Maintenance

1. **Update Dependencies**
   ```bash
   npm update
   ```

2. **Security Updates**
   - Check GitHub Dependabot alerts
   - Update vulnerable packages

3. **Performance Optimization**
   - Optimize images
   - Minify CSS/JS
   - Enable caching

## Troubleshooting

### Common Issues

#### 1. Build Fails

**Problem**: Deployment fails during build

**Solution**:
- Check build logs in Vercel dashboard
- Verify `package.json` is correct
- Ensure all dependencies are listed

#### 2. Environment Variables Not Working

**Problem**: Environment variables not accessible

**Solution**:
- Verify variables are set in Vercel dashboard
- Check variable names match exactly
- Redeploy after adding variables

#### 3. 404 Errors

**Problem**: Routes return 404

**Solution**:
- Check `vercel.json` rewrite rules
- Verify file paths are correct
- Ensure `index.html` exists

#### 4. CI/CD Pipeline Fails

**Problem**: GitHub Actions workflow fails

**Solution**:
- Check GitHub Secrets are set correctly
- Verify Vercel credentials are valid
- Check workflow logs in Actions tab

#### 5. Assets Not Loading

**Problem**: CSS/JS/images not loading

**Solution**:
- Check file paths (relative vs absolute)
- Verify files are committed to repository
- Check browser console for errors

### Debugging Tips

1. **Check Vercel Logs**
   - Go to Deployment > Functions Logs
   - View real-time logs

2. **Local Testing**
   ```bash
   # Test build locally
   npm run build
   
   # Test with Vercel CLI
   vercel dev
   ```

3. **Browser DevTools**
   - Check Network tab
   - Review Console errors
   - Inspect Elements

## Deployment Checklist

Before deploying to production:

- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Environment variables configured
- [ ] Build succeeds locally
- [ ] No console errors
- [ ] Responsive design tested
- [ ] Performance optimized
- [ ] Security headers configured
- [ ] Analytics enabled
- [ ] Error tracking set up
- [ ] Documentation updated

## Rollback Procedure

If deployment has issues:

1. **Via Vercel Dashboard**
   - Go to Deployments
   - Find previous working deployment
   - Click "..." > "Promote to Production"

2. **Via CLI**
   ```bash
   vercel rollback
   ```

## Next Steps

After successful deployment:

1. ✅ Test all features in production
2. ✅ Monitor error logs
3. ✅ Check performance metrics
4. ✅ Set up alerts
5. ✅ Document any issues
6. ✅ Plan next improvements

## Support

For deployment issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Review [GitHub Actions Docs](https://docs.github.com/en/actions)
- Open an issue in the repository

---

**Happy Deploying! 🚀**

