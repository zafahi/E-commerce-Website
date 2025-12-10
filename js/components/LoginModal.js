/**
 * Login Modal Component
 * Handles login and registration UI
 */

class LoginModal {
    constructor(authService, notificationService) {
        this.authService = authService;
        this.notificationService = notificationService;
        this.modal = null;
        this.isLoginMode = true;
        this.init();
    }

    /**
     * Initialize login modal
     */
    init() {
        this.createModal();
        this.attachEventListeners();
    }

    /**
     * Create modal HTML
     */
    createModal() {
        this.modal = Utils.createElement('div', { className: 'login-modal', id: 'login-modal' });
        this.modal.innerHTML = `
            <div class="login-overlay"></div>
            <div class="login-content">
                <button class="login-close" id="login-close">
                    <i class="fas fa-times"></i>
                </button>
                
                <div class="login-header">
                    <h2 id="login-title">Login</h2>
                    <p id="login-subtitle">Welcome back! Please login to your account.</p>
                </div>

                <div class="login-tabs">
                    <button class="login-tab active" data-mode="login">Login</button>
                    <button class="login-tab" data-mode="register">Register</button>
                </div>

                <form class="login-form" id="login-form">
                    <div class="form-group" id="name-group" style="display: none;">
                        <label for="login-name">Full Name</label>
                        <input type="text" id="login-name" placeholder="Enter your name" required>
                    </div>

                    <div class="form-group">
                        <label for="login-email">Email</label>
                        <input type="email" id="login-email" placeholder="Enter your email" required>
                    </div>

                    <div class="form-group">
                        <label for="login-password">Password</label>
                        <input type="password" id="login-password" placeholder="Enter your password" required>
                        <small class="form-hint">Minimum 6 characters</small>
                    </div>

                    <button type="submit" class="btn btn-primary btn-block" id="login-submit">
                        <i class="fas fa-sign-in-alt"></i>
                        <span id="login-submit-text">Login</span>
                    </button>
                </form>

                <div class="login-footer">
                    <p class="demo-notice">
                        <i class="fas fa-info-circle"></i>
                        Demo mode - No real authentication
                    </p>
                </div>
            </div>
        `;

        document.body.appendChild(this.modal);
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Close button
        const closeBtn = this.modal.querySelector('#login-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        // Overlay click
        const overlay = this.modal.querySelector('.login-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => this.close());
        }

        // Tab switching
        this.modal.querySelectorAll('.login-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const mode = e.target.dataset.mode;
                this.switchMode(mode === 'register');
            });
        });

        // Form submission
        const form = this.modal.querySelector('#login-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.close();
            }
        });
    }

    /**
     * Switch between login and register mode
     * @param {boolean} isRegister - True for register mode
     */
    switchMode(isRegister) {
        this.isLoginMode = !isRegister;

        const title = this.modal.querySelector('#login-title');
        const subtitle = this.modal.querySelector('#login-subtitle');
        const submitText = this.modal.querySelector('#login-submit-text');
        const nameGroup = this.modal.querySelector('#name-group');
        const tabs = this.modal.querySelectorAll('.login-tab');

        if (isRegister) {
            title.textContent = 'Register';
            subtitle.textContent = 'Create a new account to get started.';
            submitText.textContent = 'Register';
            nameGroup.style.display = 'block';
            tabs[0].classList.remove('active');
            tabs[1].classList.add('active');
        } else {
            title.textContent = 'Login';
            subtitle.textContent = 'Welcome back! Please login to your account.';
            submitText.textContent = 'Login';
            nameGroup.style.display = 'none';
            tabs[0].classList.add('active');
            tabs[1].classList.remove('active');
        }
    }

    /**
     * Handle form submission
     */
    handleSubmit() {
        const email = this.modal.querySelector('#login-email').value.trim();
        const password = this.modal.querySelector('#login-password').value;
        const name = this.modal.querySelector('#login-name').value.trim();

        if (this.isLoginMode) {
            const result = this.authService.login(email, password);
            if (result.success) {
                this.notificationService.success(result.message);
                this.close();
                // Trigger login event
                document.dispatchEvent(new CustomEvent('userLoggedIn', { detail: result.user }));
            } else {
                this.notificationService.error(result.message);
            }
        } else {
            const result = this.authService.register(email, password, name);
            if (result.success) {
                this.notificationService.success(result.message);
                this.close();
                // Trigger login event
                document.dispatchEvent(new CustomEvent('userLoggedIn', { detail: result.user }));
            } else {
                this.notificationService.error(result.message);
            }
        }
    }

    /**
     * Open modal
     */
    open() {
        if (this.modal) {
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            // Focus on email input
            setTimeout(() => {
                const emailInput = this.modal.querySelector('#login-email');
                if (emailInput) emailInput.focus();
            }, 100);
        }
    }

    /**
     * Close modal
     */
    close() {
        if (this.modal) {
            this.modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            // Reset form
            const form = this.modal.querySelector('#login-form');
            if (form) form.reset();
        }
    }

    /**
     * Check if modal is open
     * @returns {boolean} True if open
     */
    isOpen() {
        return this.modal?.classList.contains('active') || false;
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LoginModal;
} else {
    window.LoginModal = LoginModal;
}

