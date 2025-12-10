/**
 * Product Service
 * Handles product data management and operations
 */

class ProductService {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentFilter = 'all';
    }

    /**
     * Initialize products data
     * In production, this would fetch from API
     */
    initializeProducts() {
        this.products = [
            {
                id: 1,
                name: 'AMD Ryzen 9 7950X',
                category: 'processors',
                price: 699.99,
                originalPrice: 799.99,
                image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop',
                rating: 4.9,
                reviews: 1247,
                tags: ['trending', 'sale'],
                specifications: ['16 Cores', '32 Threads', '4.5GHz Base'],
                inStock: true,
                description: 'Ultimate performance processor for gaming and content creation',
            },
            {
                id: 2,
                name: 'NVIDIA RTX 4090',
                category: 'graphics',
                price: 1599.99,
                originalPrice: null,
                image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop',
                rating: 4.8,
                reviews: 892,
                tags: ['new', 'trending'],
                specifications: ['24GB GDDR6X', 'Ada Lovelace', 'Ray Tracing'],
                inStock: true,
                description: 'Flagship graphics card for 4K gaming and AI workloads',
            },
            {
                id: 3,
                name: 'Samsung Odyssey G9',
                category: 'monitors',
                price: 1299.99,
                originalPrice: 1499.99,
                image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop',
                rating: 4.7,
                reviews: 634,
                tags: ['sale'],
                specifications: ['49" Curved', '240Hz', '1ms Response'],
                inStock: true,
                description: 'Ultra-wide curved gaming monitor with HDR support',
            },
            {
                id: 4,
                name: 'Corsair K95 RGB',
                category: 'peripherals',
                price: 199.99,
                originalPrice: 249.99,
                image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop',
                rating: 4.6,
                reviews: 1456,
                tags: ['sale'],
                specifications: ['Mechanical', 'RGB Lighting', 'Macro Keys'],
                inStock: true,
                description: 'Premium mechanical gaming keyboard with RGB',
            },
            {
                id: 5,
                name: 'Samsung 980 PRO 2TB',
                category: 'storage',
                price: 199.99,
                originalPrice: null,
                image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop',
                rating: 4.8,
                reviews: 2341,
                tags: ['trending'],
                specifications: ['NVMe SSD', '7000MB/s Read', 'PCIe 4.0'],
                inStock: true,
                description: 'High-speed NVMe SSD for ultimate performance',
            },
            {
                id: 6,
                name: 'G.Skill Trident Z5 32GB',
                category: 'memory',
                price: 299.99,
                originalPrice: null,
                image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop',
                rating: 4.7,
                reviews: 789,
                tags: ['new'],
                specifications: ['DDR5-6000', '32GB Kit', 'RGB Lighting'],
                inStock: true,
                description: 'High-performance DDR5 memory with RGB lighting',
            },
            {
                id: 7,
                name: 'Intel Core i9-13900K',
                category: 'processors',
                price: 589.99,
                originalPrice: 649.99,
                image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop',
                rating: 4.8,
                reviews: 1123,
                tags: ['sale', 'trending'],
                specifications: ['24 Cores', '32 Threads', '5.8GHz Boost'],
                inStock: true,
                description: 'High-performance processor for gaming and productivity',
            },
            {
                id: 8,
                name: 'ASUS ROG Swift PG32UQ',
                category: 'monitors',
                price: 799.99,
                originalPrice: null,
                image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop',
                rating: 4.6,
                reviews: 445,
                tags: ['new'],
                specifications: ['32" 4K', '144Hz', 'HDR400'],
                inStock: true,
                description: 'Professional 4K gaming monitor with high refresh rate',
            },
        ];

        this.filteredProducts = [...this.products];
        return this.products;
    }

    /**
     * Get all products
     * @returns {Array} Array of products
     */
    getAllProducts() {
        return this.products;
    }

    /**
     * Get product by ID
     * @param {number} id - Product ID
     * @returns {Object|null} Product object or null
     */
    getProductById(id) {
        return this.products.find((product) => product.id === id) || null;
    }

    /**
     * Filter products
     * @param {string} filter - Filter type
     * @returns {Array} Filtered products
     */
    filterProducts(filter) {
        this.currentFilter = filter;

        if (filter === 'all') {
            this.filteredProducts = [...this.products];
            return this.filteredProducts;
        }

        this.filteredProducts = this.products.filter((product) => {
            if (['trending', 'new', 'sale'].includes(filter)) {
                return product.tags.includes(filter);
            }
            return product.category === filter;
        });

        return this.filteredProducts;
    }

    /**
     * Search products
     * @param {string} query - Search query
     * @returns {Array} Filtered products
     */
    searchProducts(query) {
        if (!query || query.trim().length < 2) {
            return this.filteredProducts;
        }

        const lowerQuery = query.toLowerCase();
        return this.products.filter(
            (product) =>
                product.name.toLowerCase().includes(lowerQuery) ||
                product.category.toLowerCase().includes(lowerQuery) ||
                product.description.toLowerCase().includes(lowerQuery) ||
                product.specifications.some((spec) => spec.toLowerCase().includes(lowerQuery))
        );
    }

    /**
     * Get filtered products
     * @returns {Array} Current filtered products
     */
    getFilteredProducts() {
        return this.filteredProducts;
    }

    /**
     * Add more products (for load more functionality)
     * @param {number} count - Number of products to add
     * @returns {Array} New products
     */
    loadMoreProducts(count = 4) {
        // In production, this would fetch from API
        const additionalProducts = this.products.slice(0, count).map((product, index) => ({
            ...product,
            id: product.id + 1000 + index,
            name: product.name + ' (Extended)',
        }));

        this.products.push(...additionalProducts);
        this.filteredProducts = [...this.products];

        return additionalProducts;
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductService;
} else {
    window.ProductService = ProductService;
}
