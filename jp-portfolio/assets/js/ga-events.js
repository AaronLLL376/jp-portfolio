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

        // Navbar link tracking
        document.querySelectorAll('nav a[href^="#"]').forEach(link => {
            link.addEventListener('click', e => {
                GAHelper.track('Navigation', 'click', link.getAttribute('href'));
            });
        });

        // CTA recruit button
        document.querySelectorAll('.cta-recruit').forEach(btn => {
            btn.addEventListener('click', () => {
                GAHelper.track('CTA', 'click', 'recruit');
            });
        });

        // FAQ accordion tracking
        document.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', () => {
                GAHelper.track('FAQ', 'toggle', header.textContent.trim());
            });
        });

        // Contact form submit
        document.querySelector('form[action*="formspree"]')?.addEventListener('submit', () => {
            GAHelper.track('Contact', 'submit', 'contact_form');
        });

        // Contact form input tracking
        document.querySelectorAll('form[action*="formspree"] input, form[action*="formspree"] textarea').forEach(input => {
            input.addEventListener('input', () => {
                GAHelper.track('Contact', 'input', input.name || input.id || 'unknown_field');
            });
        });

        // Social icons
        document.querySelectorAll('a[href*="facebook"],a[href*="linkedin"],a[href*="instagram"]').forEach(link => {
            link.addEventListener('click', () => {
                GAHelper.track('Social', 'click', link.href);
            });
        });

        // Testimonials card click
        document.querySelectorAll('#testimonials .bg-white').forEach(card => {
            card.addEventListener('click', () => {
                const name = card.querySelector('h4')?.textContent || 'unknown';
                GAHelper.track('Testimonials', 'click', name);
            });
        });

        // Job category button
        document.querySelectorAll('.job-category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                GAHelper.track('Jobs', 'category_select', btn.textContent.trim());
            });
        });

        // Partner logo click
        document.querySelectorAll('.partner-link').forEach(link => {
            link.addEventListener('click', () => {
                GAHelper.track('Partners', 'click', link.querySelector('img')?.alt || link.href);
            });
        });

        // 數轉工作室連結點擊
        document.querySelectorAll('a[href*="studio"],a[href*="數轉工作室"]').forEach(link => {
            link.addEventListener('click', () => {
                GAHelper.track('Studio', 'click', link.href);
            });
        });

        // Mouse scroll tracking (只記錄首次滾動)
        let hasScrolled = false;
        window.addEventListener('scroll', () => {
            if (!hasScrolled && window.scrollY > 0) {
                hasScrolled = true;
                GAHelper.track('Page', 'scroll', 'first_scroll');
            }
        });
    }
};

// Initialize event tracking when DOM is ready
document.addEventListener('DOMContentLoaded', GAHelper.bindEvents);