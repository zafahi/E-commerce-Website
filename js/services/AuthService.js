/**
 * Authentication Service
 * Handles user authentication and session management
 */

class AuthService {
    constructor() {
        this.currentUser = null;
        this.loadUserFromStorage();
    }

    /**
     * Register new user
     * @param {string} email - User email
     * @param {string} password - User password
     * @param {string} name - User name
     * @returns {Object} Result object with success status
     */
    register(email, password, name) {
        // Validate input
        if (!email || !password || !name) {
            return { success: false, message: 'All fields are required' };
        }

        if (!Utils.isValidEmail(email)) {
            return { success: false, message: 'Invalid email address' };
        }

        if (password.length < 6) {
            return { success: false, message: 'Password must be at least 6 characters' };
        }

        // Check if user already exists
        const users = Utils.storage.get('tralashop_users', []);
        if (users.find((u) => u.email === email)) {
            return { success: false, message: 'Email already registered' };
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            email: email,
            name: name,
            password: this.hashPassword(password), // In production, use proper hashing
            createdAt: new Date().toISOString(),
        };

        users.push(newUser);
        Utils.storage.set('tralashop_users', users);

        // Auto login after registration
        this.currentUser = { id: newUser.id, email: newUser.email, name: newUser.name };
        this.saveUserToStorage();

        return { success: true, message: 'Registration successful!', user: this.currentUser };
    }

    /**
     * Login user
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Object} Result object with success status
     */
    login(email, password) {
        if (!email || !password) {
            return { success: false, message: 'Email and password are required' };
        }

        const users = Utils.storage.get('tralashop_users', []);
        const user = users.find((u) => u.email === email);

        if (!user) {
            return { success: false, message: 'Invalid email or password' };
        }

        // In production, use proper password verification
        if (user.password !== this.hashPassword(password)) {
            return { success: false, message: 'Invalid email or password' };
        }

        // Set current user
        this.currentUser = { id: user.id, email: user.email, name: user.name };
        this.saveUserToStorage();

        return { success: true, message: 'Login successful!', user: this.currentUser };
    }

    /**
     * Logout user
     */
    logout() {
        this.currentUser = null;
        Utils.storage.remove('tralashop_current_user');
        return { success: true, message: 'Logged out successfully' };
    }

    /**
     * Check if user is logged in
     * @returns {boolean} True if logged in
     */
    isLoggedIn() {
        return this.currentUser !== null;
    }

    /**
     * Get current user
     * @returns {Object|null} Current user object or null
     */
    getCurrentUser() {
        return this.currentUser;
    }

    /**
     * Save user to storage
     */
    saveUserToStorage() {
        if (this.currentUser) {
            Utils.storage.set('tralashop_current_user', this.currentUser);
        }
    }

    /**
     * Load user from storage
     */
    loadUserFromStorage() {
        const savedUser = Utils.storage.get('tralashop_current_user', null);
        if (savedUser) {
            this.currentUser = savedUser;
        }
    }

    /**
     * Simple password hashing (for demo only)
     * In production, use proper hashing like bcrypt
     * @param {string} password - Plain password
     * @returns {string} Hashed password
     */
    hashPassword(password) {
        // Simple hash for demo - DO NOT USE IN PRODUCTION
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString();
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthService;
} else {
    window.AuthService = AuthService;
}
