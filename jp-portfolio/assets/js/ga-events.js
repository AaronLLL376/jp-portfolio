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

        // Hero 區主按鈕
        document.querySelectorAll('.hero-cta, .hero-main-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                GAHelper.track('Hero', 'click', btn.textContent.trim());
            });
        });

        // 服務區每個功能按鈕
        document.querySelectorAll('.service-box button, .service-box a').forEach(btn => {
            btn.addEventListener('click', () => {
                GAHelper.track('Services', 'action', btn.textContent.trim());
            });
        });

        // 方案/價格區切換
        document.querySelectorAll('.pricing-tab, .plan-switch').forEach(tab => {
            tab.addEventListener('click', () => {
                GAHelper.track('Pricing', 'tab_switch', tab.textContent.trim());
            });
        });

        // 方案/價格區購買按鈕
        document.querySelectorAll('.pricing-buy-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                GAHelper.track('Pricing', 'buy_click', btn.textContent.trim());
            });
        });

        // 合作夥伴 logo 點擊
        document.querySelectorAll('.partner-link, .partner-logo').forEach(link => {
            link.addEventListener('click', () => {
                GAHelper.track('Partners', 'click', link.querySelector('img')?.alt || link.href);
            });
        });

        // 招募區 104 按鈕
        document.querySelectorAll('.btn-104, .recruit-104-link').forEach(btn => {
            btn.addEventListener('click', () => {
                GAHelper.track('Recruit', '104_click', btn.href || btn.textContent.trim());
            });
        });

        // FAQ 問題展開
        document.querySelectorAll('.faq-question, .accordion-header').forEach(header => {
            header.addEventListener('click', () => {
                GAHelper.track('FAQ', 'toggle', header.textContent.trim());
            });
        });

        // Testimonials/見證卡片
        document.querySelectorAll('#testimonials .bg-white, .testimonial-card').forEach(card => {
            card.addEventListener('click', () => {
                const name = card.querySelector('h4, .testimonial-name')?.textContent || 'unknown';
                GAHelper.track('Testimonials', 'click', name);
            });
        });

        // Footer 社群連結
        document.querySelectorAll('footer a[href*="facebook"],footer a[href*="linkedin"],footer a[href*="instagram"]').forEach(link => {
            link.addEventListener('click', () => {
                GAHelper.track('Footer', 'social_click', link.href);
            });
        });

        // Footer 重要連結
        document.querySelectorAll('footer a:not([href*="facebook"]):not([href*="linkedin"]):not([href*="instagram"])').forEach(link => {
            link.addEventListener('click', () => {
                GAHelper.track('Footer', 'link_click', link.href);
            });
        });

        // 表單填寫與送出
        document.querySelectorAll('form input, form textarea, form select').forEach(input => {
            input.addEventListener('input', () => {
                GAHelper.track('Form', 'input', input.name || input.id || 'unknown_field');
            });
        });
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', () => {
                GAHelper.track('Form', 'submit', form.getAttribute('action') || 'main_form');
            });
        });

        // 首次滑動
        let hasScrolled = false;
        window.addEventListener('scroll', () => {
            if (!hasScrolled && window.scrollY > 0) {
                hasScrolled = true;
                GAHelper.track('Page', 'scroll', 'first_scroll');
            }
        });

        // 滾動深度（25%、50%、75%、100%）
        let scrollDepths = [0.25, 0.5, 0.75, 1];
        let scrollDepthTracked = {};
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight <= 0) return;
            scrollDepths.forEach(depth => {
                if (!scrollDepthTracked[depth] && scrollTop / docHeight >= depth) {
                    scrollDepthTracked[depth] = true;
                    GAHelper.track('Page', 'scroll_depth', `${depth * 100}%`);
                }
            });
        });
    }
};

// Initialize event tracking when DOM is ready
document.addEventListener('DOMContentLoaded', GAHelper.bindEvents);