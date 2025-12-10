/**
 * Product Card Component
 * Handles product card rendering and interactions
 */

class ProductCard {
    /**
     * Create product card HTML
     * @param {Object} product - Product object
     * @returns {string} HTML string
     */
    static create(product) {
        const discountPercentage = product.originalPrice
            ? Utils.calculateDiscount(product.originalPrice, product.price)
            : 0;

        return `
            <div class="product-card" data-product-id="${product.id}">
                ${discountPercentage > 0 ? `<div class="product-badge sale">-${discountPercentage}%</div>` : ''}
                ${product.tags.includes('new') ? '<div class="product-badge new">New</div>' : ''}
                ${!product.inStock ? '<div class="product-badge out-of-stock">Out of Stock</div>' : ''}
                
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="product-overlay">
                        <button class="btn btn-primary add-to-cart" data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                            <i class="fas fa-shopping-cart"></i>
                            ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                        <button class="btn btn-outline quick-view" data-product-id="${product.id}">
                            <i class="fas fa-eye"></i>
                            Quick View
                        </button>
                    </div>
                </div>
                
                <div class="product-info">
                    <div class="product-category">${Utils.formatCategory(product.category)}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-rating">
                        ${Utils.generateStars(product.rating)}
                        <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
                    </div>
                    <div class="product-specs">
                        ${product.specifications
                            .slice(0, 2)
                            .map((spec) => `<span class="spec-tag">${spec}</span>`)
                            .join('')}
                    </div>
                    <div class="product-price">
                        <span class="current-price">${Utils.formatCurrency(product.price)}</span>
                        ${product.originalPrice ? `<span class="original-price">${Utils.formatCurrency(product.originalPrice)}</span>` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render products grid
     * @param {Array} products - Array of products
     * @param {HTMLElement} container - Container element
     */
    static render(products, container) {
        if (!container) {
            console.error('Product container not found');
            return;
        }

        if (products.length === 0) {
            container.innerHTML =
                '<div class="no-products">No products found matching your criteria.</div>';
            return;
        }

        container.innerHTML = products.map((product) => this.create(product)).join('');
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductCard;
} else {
    window.ProductCard = ProductCard;
}
