/**
 * TralaShop Configuration
 * Centralized configuration for the application
 */

const Config = {
    // API Configuration (for future cloud integration)
    api: {
        baseUrl: window.API_BASE_URL || 'https://api.tralashop.com',
        timeout: 10000,
        retryAttempts: 3,
    },

    // Storage Keys
    storage: {
        cart: 'tralashop_cart',
        wishlist: 'tralashop_wishlist',
        theme: 'tralashop_theme',
        reviews: 'tralashop_reviews',
    },

    // UI Configuration
    ui: {
        loadingDelay: 2000,
        toastDuration: 3000,
        animationDuration: 300,
        debounceDelay: 300,
    },

    // Pagination
    pagination: {
        itemsPerPage: 12,
        loadMoreCount: 4,
    },

    // Feature Flags
    features: {
        wishlist: true,
        reviews: true,
        comparison: true,
        filters: true,
    },
};

// Export for module systems, fallback to window for browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Config;
} else {
    window.Config = Config;
}
