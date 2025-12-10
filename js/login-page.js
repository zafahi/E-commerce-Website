/**
 * Login Page Script
 * Handles login page functionality
 */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const authService = new AuthService();
    const notificationService = new NotificationService();

    // Check if already logged in, redirect to home
    if (authService.isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }

    let isLoginMode = true;

    // Get elements
    const form = document.getElementById('login-form');
    const title = document.getElementById('login-title');
    const subtitle = document.getElementById('login-subtitle');
    const submitText = document.getElementById('login-submit-text');
    const nameGroup = document.getElementById('name-group');
    const tabs = document.querySelectorAll('.login-tab');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const nameInput = document.getElementById('login-name');

    // Tab switching
    tabs.forEach((tab) => {
        tab.addEventListener('click', (e) => {
            const mode = e.target.dataset.mode;
            isLoginMode = mode === 'login';
            switchMode(isLoginMode);
        });
    });

    // Switch between login and register mode
    function switchMode(isLogin) {
        isLoginMode = isLogin;

        if (isLogin) {
            title.textContent = 'Login';
            subtitle.textContent = 'Welcome back! Please login to your account.';
            submitText.textContent = 'Login';
            nameGroup.style.display = 'none';
            tabs[0].classList.add('active');
            tabs[1].classList.remove('active');
        } else {
            title.textContent = 'Register';
            subtitle.textContent = 'Create a new account to get started.';
            submitText.textContent = 'Register';
            nameGroup.style.display = 'block';
            tabs[0].classList.remove('active');
            tabs[1].classList.add('active');
        }
    }

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const name = nameInput.value.trim();

        if (isLoginMode) {
            const result = authService.login(email, password);
            if (result.success) {
                notificationService.success(result.message);
                // Redirect to home after 1 second
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                notificationService.error(result.message);
            }
        } else {
            const result = authService.register(email, password, name);
            if (result.success) {
                notificationService.success(result.message);
                // Redirect to home after 1 second
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                notificationService.error(result.message);
            }
        }
    });

    // Focus on email input
    if (emailInput) {
        emailInput.focus();
    }

    // Initialize theme if saved
    const storageKey =
        (window.Config && window.Config.storage && window.Config.storage.theme) ||
        'tralashop_theme';
    const savedTheme = Utils.storage.get(storageKey, 'light');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.documentElement.setAttribute('data-theme', 'dark');
    }
});
