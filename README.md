# Tralalero TralaShop

**Premium Computer Parts & Tech E-Commerce Platform**

A modern, cloud-ready web application for selling premium computer parts and technology accessories. Built with vanilla JavaScript, following best practices for scalability, maintainability, and cloud deployment.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with dark mode support
- **Shopping Cart**: Full cart functionality with persistent storage
- **Product Management**: Advanced filtering, search, and product display
- **Cloud-Ready**: Optimized for cloud deployment (Vercel)
- **Modular Architecture**: Clean, maintainable code structure
- **Performance Optimized**: Lazy loading, debouncing, and efficient rendering
- **PWA Ready**: Service worker support for offline functionality

## 📁 Project Structure

```
script/
├── index.html              # Main HTML file
├── styles.css              # Global styles
├── script.js               # Main application entry point
├── js/
│   ├── config.js           # Application configuration
│   ├── utils.js            # Utility functions
│   ├── services/
│   │   ├── ProductService.js    # Product data management
│   │   ├── CartService.js       # Shopping cart operations
│   │   └── NotificationService.js # Toast notifications
│   └── components/
│       ├── LoadingScreen.js     # Loading screen component
│       ├── ProductCard.js       # Product card component
│       └── CartSidebar.js       # Cart sidebar component
├── .github/
│   └── workflows/
│       └── ci-cd.yml       # CI/CD pipeline configuration
├── vercel.json             # Vercel deployment configuration
├── package.json            # Node.js dependencies
└── README.md               # This file
```

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 with CSS Variables
- **Icons**: Font Awesome 6.4.0
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions
- **Version Control**: Git

## 📦 Installation

### Prerequisites

- Node.js 18+ (for development)
- Git
- Modern web browser

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd script
   ```

2. **Install dependencies** (optional, for linting/formatting)
   ```bash
   npm install
   ```

3. **Run local server**
   ```bash
   npm start
   # or
   npx serve .
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🚀 Deployment

### Deploy to Vercel

#### Option 1: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   # For production
   vercel --prod
   ```

#### Option 2: GitHub Integration

1. **Connect GitHub repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project settings

2. **Set Environment Variables** (if needed)
   - Go to Project Settings > Environment Variables
   - Add any required variables

3. **Automatic Deployments**
   - Every push to `main` branch = Production deployment
   - Every pull request = Preview deployment

### CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/ci-cd.yml`) that:

1. **Lints and Tests**: Runs code quality checks
2. **Builds**: Creates production-ready build artifacts
3. **Deploys Preview**: Deploys to Vercel preview on PRs
4. **Deploys Production**: Deploys to production on main branch
5. **Security Scan**: Runs vulnerability scans

#### Setup GitHub Secrets

For CI/CD to work, add these secrets to your GitHub repository:

1. Go to Repository Settings > Secrets and variables > Actions
2. Add the following secrets:
   - `VERCEL_TOKEN`: Your Vercel API token
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

**How to get Vercel credentials:**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# This will create .vercel/project.json with your IDs
# Get token from: https://vercel.com/account/tokens
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file (or set in Vercel dashboard):

```env
# API Configuration (for future cloud integration)
API_BASE_URL=https://api.tralashop.com

# Feature Flags
ENABLE_WISHLIST=true
ENABLE_REVIEWS=true
ENABLE_COMPARISON=true
```

### Application Configuration

Edit `js/config.js` to customize:
- API endpoints
- Storage keys
- UI settings
- Feature flags
- Pagination settings

## 📝 Development Workflow

### Code Structure

The application follows a modular architecture:

- **Services**: Business logic and data management
- **Components**: UI components and rendering
- **Utils**: Reusable utility functions
- **Config**: Centralized configuration

### Adding New Features

1. **Create Service** (if needed)
   ```javascript
   // js/services/NewService.js
   class NewService {
       // Service logic
   }
   ```

2. **Create Component** (if needed)
   ```javascript
   // js/components/NewComponent.js
   class NewComponent {
       // Component logic
   }
   ```

3. **Integrate in Main App**
   ```javascript
   // script.js
   this.newService = new NewService();
   this.newComponent = new NewComponent();
   ```

### Code Style

- Use ES6+ features
- Follow JavaScript best practices
- Use meaningful variable names
- Add JSDoc comments for functions
- Keep functions small and focused

## 🧪 Testing

### Manual Testing Checklist

- [ ] Product display and filtering
- [ ] Search functionality
- [ ] Add to cart
- [ ] Cart operations (add, remove, update quantity)
- [ ] Checkout process
- [ ] Theme toggle (dark/light mode)
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Loading states
- [ ] Error handling

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔒 Security

- XSS Protection headers
- Content Security Policy (can be added)
- Secure storage for sensitive data
- Input validation
- CSRF protection (for future API integration)

## 📊 Performance

- Lazy loading images
- Debounced search
- Efficient DOM manipulation
- Optimized CSS
- Minimal JavaScript bundle

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

**TralaShop Development Team**

## 📞 Support

For support, email support@trashop.com or open an issue in the repository.

## 🗺️ Roadmap

- [ ] Backend API integration
- [ ] User authentication
- [ ] Payment integration
- [ ] Product reviews system
- [ ] Wishlist functionality
- [ ] Product comparison
- [ ] Advanced filters
- [ ] Analytics integration
- [ ] Multi-language support
- [ ] PWA features (offline support)

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [JavaScript Best Practices](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

---

**Built with ❤️ for Software Development Operations in Cloud Environments**

