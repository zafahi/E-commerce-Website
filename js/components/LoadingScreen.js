/**
 * Loading Screen Component
 * Handles loading screen display and animation
 */

class LoadingScreen {
    constructor() {
        this.element = Utils.getElement('loading-screen');
        this.progressBar = this.element?.querySelector('.loading-progress');
    }

    /**
     * Show loading screen with animation
     */
    show() {
        if (!this.element) return;

        this.element.style.display = 'flex';
        this.element.style.opacity = '1';
        document.body.style.overflow = 'hidden';

        this.animateProgress();
    }

    /**
     * Hide loading screen
     */
    hide() {
        if (!this.element) return;

        this.element.style.opacity = '0';

        setTimeout(() => {
            this.element.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 500);
    }

    /**
     * Animate progress bar
     */
    animateProgress() {
        if (!this.progressBar) return;

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
            }
            this.progressBar.style.width = progress + '%';
        }, 100);
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LoadingScreen;
} else {
    window.LoadingScreen = LoadingScreen;
}
