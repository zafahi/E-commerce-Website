/**
 * Cart Sidebar Component
 * Handles cart sidebar display and interactions
 */

class CartSidebar {
    constructor(cartService, notificationService) {
        this.cartService = cartService;
        this.notificationService = notificationService;
        this.element = Utils.getElement('cart-sidebar');
        this.cartContent = Utils.getElement('cart-content');
        this.cartCount = Utils.getElement('cart-count');
        this.cartTotal = Utils.getElement('cart-total');
        this.cartIcon = Utils.getElement('cart-icon');
        this.cartClose = Utils.getElement('cart-close');
        this.checkoutButton = Utils.getElement('checkout-button');

        this.init();
    }

    /**
     * Initialize cart sidebar
     */
    init() {
        if (this.cartIcon) {
            this.cartIcon.addEventListener('click', () => this.toggle());
        }

        if (this.cartClose) {
            this.cartClose.addEventListener('click', () => this.close());
        }

        if (this.checkoutButton) {
            this.checkoutButton.addEventListener('click', () => this.handleCheckout());
        }

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (
                this.isOpen() &&
                !e.target.closest('.cart-sidebar') &&
                !e.target.closest('.cart-icon')
            ) {
                this.close();
            }
        });

        // Update display on init
        this.update();
    }

    /**
     * Toggle cart sidebar
     */
    toggle() {
        if (this.element) {
            this.element.classList.toggle('active');
        }
    }

    /**
     * Open cart sidebar
     */
    open() {
        if (this.element) {
            this.element.classList.add('active');
        }
    }

    /**
     * Close cart sidebar
     */
    close() {
        if (this.element) {
            this.element.classList.remove('active');
        }
    }

    /**
     * Check if cart is open
     * @returns {boolean} True if open
     */
    isOpen() {
        return this.element?.classList.contains('active') || false;
    }

    /**
     * Update cart display
     */
    update() {
        this.updateCount();
        this.updateContent();
        this.updateTotal();
    }

    /**
     * Update cart count badge
     */
    updateCount() {
        if (this.cartCount) {
            const totalItems = this.cartService.getTotalItems();
            this.cartCount.textContent = totalItems;
            this.cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    /**
     * Update cart content
     */
    updateContent() {
        if (!this.cartContent) return;

        const cart = this.cartService.getCart();

        if (cart.length === 0) {
            this.cartContent.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
            return;
        }

        this.cartContent.innerHTML = cart
            .map(
                (item) => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">${Utils.formatCurrency(item.price)}</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn minus" data-product-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-product-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-product-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `
            )
            .join('');

        // Attach event listeners
        this.attachEventListeners();
    }

    /**
     * Update cart total
     */
    updateTotal() {
        if (this.cartTotal) {
            const total = this.cartService.getTotalPrice();
            this.cartTotal.textContent = total.toFixed(2);
        }
    }

    /**
     * Attach event listeners to cart items
     */
    attachEventListeners() {
        // Quantity controls
        this.cartContent.querySelectorAll('.quantity-btn.plus').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(btn.dataset.productId);
                const item = this.cartService.getCart().find((item) => item.id === productId);
                if (item) {
                    this.cartService.updateQuantity(productId, item.quantity + 1);
                    this.update();
                }
            });
        });

        this.cartContent.querySelectorAll('.quantity-btn.minus').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(btn.dataset.productId);
                const item = this.cartService.getCart().find((item) => item.id === productId);
                if (item) {
                    this.cartService.updateQuantity(productId, item.quantity - 1);
                    this.update();
                }
            });
        });

        // Remove items
        this.cartContent.querySelectorAll('.remove-item').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(btn.dataset.productId);
                this.cartService.removeFromCart(productId);
                this.update();
                this.notificationService.info('Item removed from cart');
            });
        });
    }

    /**
     * Handle checkout
     */
    handleCheckout() {
        if (this.cartService.isEmpty()) {
            this.notificationService.error('Your cart is empty');
            return;
        }

        // Trigger checkout event
        const event = new CustomEvent('checkout', {
            detail: { cart: this.cartService.getCart() },
        });
        document.dispatchEvent(event);
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CartSidebar;
} else {
    window.CartSidebar = CartSidebar;
}
