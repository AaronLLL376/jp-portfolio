/**
 * Google Analytics Event Tracking
 */
const GAHelper = {
    isLoaded: () => typeof gtag === 'function',
    
    track: (category, action, label) => {
        if (!GAHelper.isLoaded()) {
            console.warn('Google Analytics not loaded');
            return;
        }
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    },

    bindEvents: () => {
        // Service boxes tracking
        document.querySelectorAll('.service-box')?.forEach(box => {
            box.addEventListener('click', e => {
                const title = e.currentTarget.querySelector('h3')?.textContent || 'unknown';
                GAHelper.track('Services', 'click', title);
            });
        });

        // Interview tool button tracking
        document.querySelector('.btn-learn-more')?.addEventListener('click', () => {
            GAHelper.track('Tools', 'click', 'interview_tool');
        });

        // Job listing button tracking
        document.querySelector('.job-listing-btn')?.addEventListener('click', () => {
            GAHelper.track('Jobs', 'click', 'job_listing');
        });

        // Return to CTSS button tracking (tool.html only)
        document.querySelector('.btn-return')?.addEventListener('click', () => {
            GAHelper.track('Navigation', 'click', 'return_to_ctss');
        });
    }
};

// Initialize event tracking when DOM is ready
document.addEventListener('DOMContentLoaded', GAHelper.bindEvents);