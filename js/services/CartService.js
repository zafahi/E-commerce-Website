/**
 * Cart Service
 * Handles shopping cart operations
 */

class CartService {
    constructor() {
        this.cart = [];
        this.loadCartFromStorage();
    }

    /**
     * Add product to cart
     * @param {Object} product - Product object
     * @param {number} quantity - Quantity to add
     * @returns {boolean} Success status
     */
    addToCart(product, quantity = 1) {
        if (!product || !product.inStock) {
            return false;
        }

        const existingItem = this.cart.find((item) => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                ...product,
                quantity: quantity,
            });
        }

        this.saveCartToStorage();
        return true;
    }

    /**
     * Remove product from cart
     * @param {number} productId - Product ID
     * @returns {boolean} Success status
     */
    removeFromCart(productId) {
        const initialLength = this.cart.length;
        this.cart = this.cart.filter((item) => item.id !== productId);
        const removed = this.cart.length < initialLength;

        if (removed) {
            this.saveCartToStorage();
        }

        return removed;
    }

    /**
     * Update cart item quantity
     * @param {number} productId - Product ID
     * @param {number} quantity - New quantity
     * @returns {boolean} Success status
     */
    updateQuantity(productId, quantity) {
        const item = this.cart.find((item) => item.id === productId);

        if (!item) return false;

        if (quantity <= 0) {
            return this.removeFromCart(productId);
        }

        item.quantity = quantity;
        this.saveCartToStorage();
        return true;
    }

    /**
     * Get cart items
     * @returns {Array} Cart items
     */
    getCart() {
        return this.cart;
    }

    /**
     * Get cart total items count
     * @returns {number} Total items
     */
    getTotalItems() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    /**
     * Get cart total price
     * @returns {number} Total price
     */
    getTotalPrice() {
        return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    /**
     * Clear cart
     */
    clearCart() {
        this.cart = [];
        this.saveCartToStorage();
    }

    /**
     * Check if cart is empty
     * @returns {boolean} True if empty
     */
    isEmpty() {
        return this.cart.length === 0;
    }

    /**
     * Save cart to localStorage
     */
    saveCartToStorage() {
        const storageKey =
            (window.Config && window.Config.storage && window.Config.storage.cart) ||
            'tralashop_cart';
        Utils.storage.set(storageKey, this.cart);
    }

    /**
     * Load cart from localStorage
     */
    loadCartFromStorage() {
        const storageKey =
            (window.Config && window.Config.storage && window.Config.storage.cart) ||
            'tralashop_cart';
        const savedCart = Utils.storage.get(storageKey, []);
        this.cart = Array.isArray(savedCart) ? savedCart : [];
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CartService;
} else {
    window.CartService = CartService;
}
