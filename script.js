/**
 * TralaShop - Main Application
 * Premium Computer Parts & Tech E-Commerce Platform
 * 
 * Architecture: Modular, Cloud-Ready, Production-Grade
 * 
 * Note: Dependencies are loaded via <script> tags in index.html
 * This ensures proper loading order for browser compatibility
 */

/**
 * Check if all dependencies are loaded
 */
function checkDependencies() {
    const required = [
        'Config',
        'Utils',
        'ProductService',
        'CartService',
        'NotificationService',
        'AuthService',
        'LoadingScreen',
        'ProductCard',
        'CartSidebar',
    ];
    
    const missing = required.filter(dep => typeof window[dep] === 'undefined');
    
    if (missing.length > 0) {
        console.warn('Missing dependencies:', missing);
        return false;
    }
    
    return true;
}

/**
 * Main TralaShop Application Class
 */
class TralaShop {
    constructor() {
        // Services
        this.productService = null;
        this.cartService = null;
        this.notificationService = null;
        
        // Components
        this.loadingScreen = null;
        this.cartSidebar = null;
        
        // State
        this.currentFilter = 'all';
        this.searchTimeout = null;
        this.isLoading = false;
        this.theme = 'light';
        
        // Wait for dependencies to load
        this.init();
    }
    
    /**
     * Initialize application
     */
    init() {
        // Wait for DOM
        const initApp = () => {
            // Check dependencies with retry
            this.waitForDependencies(() => {
                this.initializeApp();
            });
        };
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initApp);
        } else {
            initApp();
        }
    }

    /**
     * Wait for dependencies to load with retry mechanism
     */
    waitForDependencies(callback, retries = 10, delay = 100) {
        if (checkDependencies()) {
            callback();
            return;
        }
        
        if (retries > 0) {
            setTimeout(() => {
                this.waitForDependencies(callback, retries - 1, delay);
            }, delay);
        } else {
            console.error('Failed to load dependencies. Initializing with fallback...');
            // Fallback: hide loading screen anyway
            this.hideLoadingScreenFallback();
            // Try to initialize with what we have
            try {
                callback();
            } catch (error) {
                console.error('Error initializing app:', error);
                this.hideLoadingScreenFallback();
            }
        }
    }

    /**
     * Fallback to hide loading screen if dependencies fail
     */
    hideLoadingScreenFallback() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 500);
        }
    }

    /**
     * Initialize application components
     */
    initializeApp() {
        try {
            // Initialize services
            this.productService = new ProductService();
            this.cartService = new CartService();
            this.notificationService = new NotificationService();
            this.authService = new AuthService();
            
            // Initialize components
            this.loadingScreen = new LoadingScreen();
            this.cartSidebar = new CartSidebar(this.cartService, this.notificationService);
            
            // Show loading screen
            this.loadingScreen.show();
            
            // Initialize features
            this.initializeProducts();
            this.initializeTheme();
            this.updateUserMenu();
            this.setupEventListeners();
            this.setupScrollEffects();
            this.animateStats();
            this.createParticles();
            
            // Hide loading screen after initialization
            const loadingDelay = (window.Config && window.Config.ui && window.Config.ui.loadingDelay) || 2000;
            setTimeout(() => {
                if (this.loadingScreen) {
                    this.loadingScreen.hide();
                } else {
                    this.hideLoadingScreenFallback();
                }
            }, loadingDelay);
            
            // Make app globally available
            window.tralaShop = this;
        } catch (error) {
            console.error('Error initializing app:', error);
            // Always hide loading screen even on error
            this.hideLoadingScreenFallback();
        }
    }

    /**
     * Initialize products
     */
    initializeProducts() {
        this.productService.initializeProducts();
        this.renderProducts();
    }
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Theme toggle
        const themeToggle = Utils.getElement('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // User menu (login) - handled in updateUserMenu()
        // Event listener will be set dynamically based on login status

        // Search functionality
        const searchInput = Utils.getElement('search-input');
        const searchBtn = document.querySelector('.search-btn');
        
        if (searchInput) {
            searchInput.addEventListener('input', Utils.debounce((e) => {
            this.handleSearch(e.target.value);
            }));
        
        searchInput.addEventListener('focus', () => {
                const suggestions = Utils.getElement('search-suggestions');
                if (suggestions) suggestions.style.display = 'block';
            });
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const query = searchInput?.value || '';
                this.handleSearch(query);
            });
        }

        // Product filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.filterProducts(filter);
                
                // Update active filter button
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
        
        // Category cards - trigger search instead of filter
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                const categoryName = Utils.formatCategory(category);
                
                // Set search input value
                const searchInput = Utils.getElement('search-input');
                if (searchInput) {
                    searchInput.value = categoryName;
                }
                
                // Trigger search
                this.handleSearch(categoryName);
                
                // Scroll to products section
                const productsSection = document.querySelector('.products-section');
                if (productsSection) {
                    Utils.smoothScrollTo(productsSection, 100);
                }
                
                // Show notification
                this.notificationService.info(`Searching for ${categoryName}...`);
            });
        });
        
        // Load more products
        const loadMoreBtn = Utils.getElement('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMoreProducts());
        }

        // Newsletter form
        const newsletterForm = Utils.getElement('newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
                this.handleNewsletterSignup(e);
            });
        }

        // Back to top button
        const backToTop = Utils.getElement('back-to-top');
        if (backToTop) {
            backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        }

        // Mobile menu toggle
        const mobileMenuToggle = Utils.getElement('mobile-menu-toggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Hero buttons
        document.querySelectorAll('.hero-buttons .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (btn.textContent.includes('Shop Now')) {
                    const productsSection = document.querySelector('.products-section');
                    if (productsSection) {
                        Utils.smoothScrollTo(productsSection, 100);
                    }
                } else if (btn.textContent.includes('Watch Demo')) {
                    this.notificationService.info('Demo video coming soon!');
                }
            });
        });
        
        // Product card interactions (delegated)
        document.addEventListener('click', (e) => {
            // Add to cart (only from overlay, not main button)
            if (e.target.closest('.add-to-cart')) {
                const btn = e.target.closest('.add-to-cart');
                const productId = parseInt(btn.dataset.productId);
                this.addToCart(productId);
            }
            
            // Quick view
            if (e.target.closest('.quick-view')) {
                const btn = e.target.closest('.quick-view');
                const productId = parseInt(btn.dataset.productId);
                this.showQuickView(productId);
            }
        });

        // Close search suggestions on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                const suggestions = Utils.getElement('search-suggestions');
                if (suggestions) suggestions.style.display = 'none';
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Escape key closes modals
            if (e.key === 'Escape') {
                const modal = document.querySelector('.quick-view-modal.active');
                if (modal) {
                    this.closeQuickView(modal);
                } else if (this.cartSidebar.isOpen()) {
                    this.cartSidebar.close();
                }
            }
            
            // Ctrl/Cmd + K opens search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                if (searchInput) searchInput.focus();
            }
        });

        // Checkout event listener
        document.addEventListener('checkout', (e) => {
            this.startCheckoutProcess(e.detail.cart);
        });

        // User login event listener
        document.addEventListener('userLoggedIn', (e) => {
            this.updateUserMenu();
        });
    }

    /**
     * Setup scroll effects
     */
    setupScrollEffects() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', Utils.throttle(() => {
            const header = Utils.getElement('header');
            const nav = Utils.getElement('nav');
            const backToTop = Utils.getElement('back-to-top');
            
            // Header scroll effect
            if (window.scrollY > 100) {
                header?.classList.add('scrolled');
                nav?.classList.add('scrolled');
            } else {
                header?.classList.remove('scrolled');
                nav?.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll
            if (window.scrollY > lastScrollY && window.scrollY > 200) {
                if (header) header.style.transform = 'translateY(-100%)';
                if (nav) nav.style.transform = 'translateY(-100%)';
            } else {
                if (header) header.style.transform = 'translateY(0)';
                if (nav) nav.style.transform = 'translateY(0)';
            }
            
            // Back to top button
            if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
                }
            }
            
            lastScrollY = window.scrollY;
        }, 100));
        
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe sections for animations
        document.querySelectorAll('.section, .category-card, .product-card, .feature-card').forEach(el => {
            observer.observe(el);
        });
    }
    
    /**
     * Toggle theme
     */
    toggleTheme() {
        const body = document.body;
        const themeIcon = document.querySelector('#theme-toggle i');
        
        body.classList.toggle('dark-theme');
        this.theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        
        // Update data-theme attribute for better CSS support
        document.documentElement.setAttribute('data-theme', this.theme);
        
        if (themeIcon) {
            themeIcon.className = this.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        
        const storageKey = (window.Config && window.Config.storage && window.Config.storage.theme) || 'tralashop_theme';
        Utils.storage.set(storageKey, this.theme);
    }

    /**
     * Initialize theme from storage
     */
    initializeTheme() {
        const storageKey = (window.Config && window.Config.storage && window.Config.storage.theme) || 'tralashop_theme';
        const savedTheme = Utils.storage.get(storageKey, 'light');
        const themeIcon = document.querySelector('#theme-toggle i');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            document.documentElement.setAttribute('data-theme', 'dark');
            this.theme = 'dark';
            if (themeIcon) themeIcon.className = 'fas fa-sun';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            if (themeIcon) themeIcon.className = 'fas fa-moon';
        }
    }

    /**
     * Update user menu display
     */
    updateUserMenu() {
        const userMenu = Utils.getElement('user-menu');
        if (!userMenu) return;

        // Remove old event listeners by cloning
        const newUserMenu = userMenu.cloneNode(true);
        userMenu.parentNode.replaceChild(newUserMenu, userMenu);
        const updatedMenu = Utils.getElement('user-menu');

        if (this.authService.isLoggedIn()) {
            const user = this.authService.getCurrentUser();
            const icon = updatedMenu.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-user-check';
            }
            updatedMenu.title = `Logged in as ${user.name}`;
            updatedMenu.classList.add('logged-in');
            // Add click listener to show dropdown
            updatedMenu.addEventListener('click', (e) => {
                e.preventDefault();
                this.showUserMenu();
            });
        } else {
            const icon = updatedMenu.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-user';
            }
            updatedMenu.title = 'Login';
            updatedMenu.classList.remove('logged-in');
            // Add click listener to redirect to login
            updatedMenu.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'login.html';
            });
        }
    }

    /**
     * Show user menu dropdown
     */
    showUserMenu() {
        const user = this.authService.getCurrentUser();
        if (!user) {
            // If not logged in, redirect to login page
            window.location.href = 'login.html';
            return;
        }

        // Create dropdown menu
        const existingMenu = document.querySelector('.user-dropdown');
        if (existingMenu) {
            existingMenu.remove();
            return; // Toggle off if already open
        }

        const dropdown = Utils.createElement('div', { className: 'user-dropdown' });
        dropdown.innerHTML = `
            <div class="user-info">
                <div class="user-name">${user.name}</div>
                <div class="user-email">${user.email}</div>
            </div>
            <div class="user-menu-divider"></div>
            <button class="user-menu-item" id="logout-btn">
                <i class="fas fa-sign-out-alt"></i>
                Logout
            </button>
        `;

        document.body.appendChild(dropdown);

        // Position dropdown
        const userMenu = Utils.getElement('user-menu');
        if (userMenu) {
            const rect = userMenu.getBoundingClientRect();
            dropdown.style.top = (rect.bottom + 10) + 'px';
            dropdown.style.right = (window.innerWidth - rect.right) + 'px';
        }

        // Logout button
        const logoutBtn = dropdown.querySelector('#logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.authService.logout();
                this.updateUserMenu();
                this.notificationService.success('Logged out successfully');
                dropdown.remove();
                // Redirect to login page after logout
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 500);
            });
        }

        // Close on outside click
        setTimeout(() => {
            document.addEventListener('click', function closeDropdown(e) {
                if (!dropdown.contains(e.target) && !userMenu.contains(e.target)) {
                    dropdown.remove();
                    document.removeEventListener('click', closeDropdown);
                }
            });
        }, 10);
    }
    
    /**
     * Handle search
     * @param {string} query - Search query
     */
    handleSearch(query) {
        clearTimeout(this.searchTimeout);
        
        this.searchTimeout = setTimeout(() => {
            const suggestions = Utils.getElement('search-suggestions');
            
            if (!query || query.trim().length === 0) {
                if (suggestions) {
                suggestions.innerHTML = '';
                suggestions.style.display = 'none';
                }
                this.renderProducts();
                return;
            }
            
            if (query.length < 2) return;
            
            const filteredProducts = this.productService.searchProducts(query);
            this.showSearchSuggestions(query, filteredProducts);
            this.renderProducts(filteredProducts);
        }, Config.ui.debounceDelay);
    }
    
    /**
     * Show search suggestions
     * @param {string} query - Search query
     * @param {Array} products - Filtered products
     */
    showSearchSuggestions(query, products) {
        const suggestions = Utils.getElement('search-suggestions');
        if (!suggestions) return;
        
        if (products.length === 0) {
            suggestions.innerHTML = '<div class="search-suggestion">No products found</div>';
        } else {
            const suggestionItems = products.slice(0, 5).map(product => 
                `<div class="search-suggestion" data-product-id="${product.id}">
                    <i class="fas fa-search"></i>
                    <span>${product.name}</span>
                    <span class="suggestion-price">${Utils.formatCurrency(product.price)}</span>
                </div>`
            ).join('');
            
            suggestions.innerHTML = suggestionItems;
            
            // Add click listeners to suggestions
            suggestions.querySelectorAll('.search-suggestion').forEach(item => {
                item.addEventListener('click', () => {
                    const productId = parseInt(item.dataset.productId);
                    const product = this.productService.getProductById(productId);
                    if (product) {
                        const searchInput = Utils.getElement('search-input');
                        if (searchInput) searchInput.value = product.name;
                        this.renderProducts([product]);
                        suggestions.style.display = 'none';
                    }
                });
            });
        }
        
        suggestions.style.display = 'block';
    }
    
    /**
     * Render products
     * @param {Array} products - Products to render (optional)
     */
    renderProducts(products = null) {
        const productsGrid = Utils.getElement('products-grid');
        if (!productsGrid) return;
        
        const productsToRender = products || this.productService.getFilteredProducts();
        ProductCard.render(productsToRender, productsGrid);
    }

    /**
     * Filter products
     * @param {string} filter - Filter type
     */
    filterProducts(filter) {
        this.currentFilter = filter;
        this.productService.filterProducts(filter);
        this.renderProducts();
    }
    
    /**
     * Add product to cart
     * @param {number} productId - Product ID
     */
    addToCart(productId) {
        const product = this.productService.getProductById(productId);
        if (!product) return;
        
        const success = this.cartService.addToCart(product);
        if (success) {
            this.cartSidebar.update();
            this.notificationService.success(`${product.name} added to cart!`);
        }
    }

    /**
     * Load more products
     */
    loadMoreProducts() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        const loadMoreBtn = Utils.getElement('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            loadMoreBtn.disabled = true;
        }
        
        setTimeout(() => {
            this.productService.loadMoreProducts();
            this.renderProducts();
            
            if (loadMoreBtn) {
                loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Products';
                loadMoreBtn.disabled = false;
            }
            
            this.isLoading = false;
        }, 1000);
    }

    /**
     * Show quick view modal
     * @param {number} productId - Product ID
     */
    showQuickView(productId) {
        const product = this.productService.getProductById(productId);
        if (!product) return;
        
        const modal = Utils.createElement('div', { className: 'quick-view-modal' });
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close"><i class="fas fa-times"></i></button>
                <div class="quick-view-content">
                    <div class="quick-view-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="quick-view-info">
                        <div class="product-category">${Utils.formatCategory(product.category)}</div>
                        <h2>${product.name}</h2>
                        <div class="product-rating">
                            ${Utils.generateStars(product.rating)}
                            <span>${product.rating} (${product.reviews} reviews)</span>
                        </div>
                        <p class="product-description">${product.description}</p>
                        <div class="product-specs">
                            <h4>Specifications:</h4>
                            ${product.specifications.map(spec => `<span class="spec-tag">${spec}</span>`).join('')}
                        </div>
                        <div class="product-price">
                            <span class="current-price">${Utils.formatCurrency(product.price)}</span>
                            ${product.originalPrice ? `<span class="original-price">${Utils.formatCurrency(product.originalPrice)}</span>` : ''}
                        </div>
                        <button class="btn btn-primary btn-block add-to-cart-modal" data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                            <i class="fas fa-shopping-cart"></i>
                            ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);
        
        // Event listeners
        modal.querySelector('.modal-close')?.addEventListener('click', () => this.closeQuickView(modal));
        modal.querySelector('.modal-overlay')?.addEventListener('click', () => this.closeQuickView(modal));
        modal.querySelector('.add-to-cart-modal')?.addEventListener('click', () => {
            this.addToCart(product.id);
            this.closeQuickView(modal);
        });
    }
    
    /**
     * Close quick view modal
     * @param {HTMLElement} modal - Modal element
     */
    closeQuickView(modal) {
        if (!modal) return;
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), Config.ui.animationDuration);
    }

    /**
     * Handle newsletter signup
     * @param {Event} e - Form event
     */
    handleNewsletterSignup(e) {
        const emailInput = Utils.getElement('newsletter-email');
        if (!emailInput) return;
        
        const email = emailInput.value.trim();
        
        if (Utils.isValidEmail(email)) {
            this.notificationService.success('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        } else {
            this.notificationService.error('Please enter a valid email address');
        }
    }

    /**
     * Animate statistics
     */
    animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.target);
                    Utils.animateNumber(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        stats.forEach(stat => observer.observe(stat));
    }
    
    /**
     * Create particle effect
     */
    createParticles() {
        const particlesContainer = document.querySelector('.hero-particles');
        if (!particlesContainer) return;
        
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = Utils.createElement('div', { className: 'particle' });
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    
    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        const nav = Utils.getElement('nav');
        const toggle = Utils.getElement('mobile-menu-toggle');
        
        nav?.classList.toggle('mobile-active');
        toggle?.classList.toggle('active');
    }

    /**
     * Start checkout process
     * @param {Array} cart - Cart items
     */
    startCheckoutProcess(cart) {
        const modal = Utils.createElement('div', { className: 'checkout-modal' });
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        modal.innerHTML = `
            <div class="checkout-overlay"></div>
                <div class="checkout-content">
                <button class="checkout-close" id="close-checkout">&times;</button>
                    <h2><i class="fas fa-credit-card"></i> Checkout</h2>
                    <div class="checkout-summary">
                        <h3>Order Summary</h3>
                    ${cart.map(item => `
                            <div class="checkout-item">
                                <span>${item.name} x ${item.quantity}</span>
                            <span>${Utils.formatCurrency(item.price * item.quantity)}</span>
                            </div>
                        `).join('')}
                        <div class="checkout-total">
                        <strong>Total: ${Utils.formatCurrency(total)}</strong>
                        </div>
                    </div>
                    <div class="checkout-form">
                        <p class="demo-notice">
                            <i class="fas fa-info-circle"></i>
                            This is a demo. No actual payment will be processed.
                        </p>
                        <button class="btn btn-primary btn-block complete-order">
                            <i class="fas fa-check"></i>
                            Complete Order (Demo)
                        </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);
        
        // Event listeners
        modal.querySelector('.checkout-close')?.addEventListener('click', () => this.closeCheckout(modal));
        modal.querySelector('.checkout-overlay')?.addEventListener('click', () => this.closeCheckout(modal));
        modal.querySelector('.complete-order')?.addEventListener('click', () => this.completeOrder(modal));
    }

    /**
     * Complete order
     * @param {HTMLElement} modal - Checkout modal
     */
    completeOrder(modal) {
        this.cartService.clearCart();
        this.cartSidebar.update();
        this.notificationService.success('Order completed successfully! (Demo)');
        this.closeCheckout(modal);
        this.cartSidebar.close();
    }
    
    /**
     * Close checkout modal
     * @param {HTMLElement} modal - Checkout modal
     */
    closeCheckout(modal) {
        if (!modal) return;
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), Config.ui.animationDuration);
    }
}

// Initialize application - wait for all scripts to load
(function() {
    // Wait for DOM and all scripts
    function initApp() {
        // Double check dependencies
        if (typeof window.Config === 'undefined' || 
            typeof window.Utils === 'undefined' ||
            typeof window.ProductService === 'undefined') {
            console.warn('Some dependencies not loaded, retrying...');
            setTimeout(initApp, 100);
            return;
        }
        
        try {
            const app = new TralaShop();
            window.tralaShop = app;
        } catch (error) {
            console.error('Error creating app:', error);
            // Hide loading screen anyway
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 500);
            }
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        // Small delay to ensure all scripts are loaded
        setTimeout(initApp, 50);
    }
})();

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// Global error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // In production, send to error tracking service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // In production, send to error tracking service
});
