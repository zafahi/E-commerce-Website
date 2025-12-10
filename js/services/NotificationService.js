/**
 * Notification Service
 * Handles toast notifications
 */

class NotificationService {
    constructor() {
        this.toastElement = Utils.getElement('toast');
        this.init();
    }

    /**
     * Initialize notification service
     */
    init() {
        if (!this.toastElement) {
            console.warn('Toast element not found');
        }
    }

    /**
     * Show toast notification
     * @param {string} message - Message to display
     * @param {string} type - Notification type (success, error, info, warning)
     * @param {number} duration - Duration in milliseconds
     */
    show(message, type = 'info', duration = 3000) {
        if (!this.toastElement) return;

        const toastContent = this.toastElement.querySelector('.toast-content');
        if (!toastContent) return;

        // Set icon based on type
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        const iconElement = toastContent.querySelector('i');
        if (iconElement) {
            iconElement.className = icons[type] || icons.info;
        }

        const messageElement = toastContent.querySelector('.toast-message');
        if (messageElement) {
            messageElement.textContent = message;
        }

        // Update toast class
        this.toastElement.className = `toast ${type}`;
        this.toastElement.classList.add('show');

        // Auto hide
        setTimeout(() => {
            this.hide();
        }, duration);
    }

    /**
     * Hide toast notification
     */
    hide() {
        if (this.toastElement) {
            this.toastElement.classList.remove('show');
        }
    }

    /**
     * Show success notification
     * @param {string} message - Success message
     */
    success(message) {
        this.show(message, 'success');
    }

    /**
     * Show error notification
     * @param {string} message - Error message
     */
    error(message) {
        this.show(message, 'error');
    }

    /**
     * Show info notification
     * @param {string} message - Info message
     */
    info(message) {
        this.show(message, 'info');
    }

    /**
     * Show warning notification
     * @param {string} message - Warning message
     */
    warning(message) {
        this.show(message, 'warning');
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NotificationService;
} else {
    window.NotificationService = NotificationService;
}

