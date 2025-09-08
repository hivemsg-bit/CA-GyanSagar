// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initLanguageSwitcher();
    initTestimonialSlider();
    initModal();
    initSmoothScrolling();
    initFormHandling();
    initPricingTabs();
    initOpenLoginButtons();
    initCouponCopy();
    initFreeTestsFlow();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.backgroundColor = '#ffffff';
                navbar.style.backdropFilter = 'none';
            }
        });
    }
}

// Copy coupon code
function initCouponCopy() {
    const btn = document.getElementById('copyCouponBtn');
    const codeEl = document.getElementById('couponCodeText');
    if (!btn || !codeEl) return;
    btn.addEventListener('click', async () => {
        const code = codeEl.textContent.trim();
        try {
            await navigator.clipboard.writeText(code);
            showNotification('Coupon copied: ' + code, 'success');
        } catch (e) {
            showNotification('Copy failed. Code: ' + code, 'error');
        }
    });
}

// Free tests flow: open modal and start test after form submit
function initFreeTestsFlow() {
    const startButtons = document.querySelectorAll('.start-test-btn');
    const modal = document.getElementById('loginModal');
    if (!startButtons.length || !modal) return;

    let pendingFreeTestLevel = null;

    // Expose to other handlers
    window.__setPendingFreeTestLevel = function(level){ pendingFreeTestLevel = level; }

    startButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const level = btn.getAttribute('data-level');
            pendingFreeTestLevel = level;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Hook Login and Register buttons inside modal
    const authSubmitButtons = document.querySelectorAll('#login .auth-form button, #register .auth-form button');
    authSubmitButtons.forEach(ab => {
        ab.addEventListener('click', (e) => {
            // For demo, treat as success
            e.preventDefault();
            if (!pendingFreeTestLevel) pendingFreeTestLevel = 'foundation';
            startFreeTest(pendingFreeTestLevel);
        });
    });
}

function startFreeTest(level) {
    // Close auth modal
    const authModal = document.getElementById('loginModal');
    if (authModal) {
        authModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Map level to Google Drive direct download links (placeholders)
    const DRIVE_IDS = {
        foundation: 'FOUNDATION_FILE_ID_PLACEHOLDER',
        intermediate: 'INTERMEDIATE_FILE_ID_PLACEHOLDER',
        final: 'FINAL_FILE_ID_PLACEHOLDER'
    };
    const fileId = DRIVE_IDS[level] || DRIVE_IDS.foundation;
    const directUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    // Open download modal
    const downloadModal = document.getElementById('downloadModal');
    const downloadBtn = document.getElementById('downloadPdfBtn');
    const closeDownload = document.getElementById('closeDownload');
    if (downloadModal && downloadBtn) {
        downloadBtn.href = directUrl;
        downloadModal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        if (closeDownload) {
            closeDownload.onclick = () => {
                downloadModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            };
        }
        window.addEventListener('click', function onWinClick(e) {
            if (e.target === downloadModal) {
                downloadModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                window.removeEventListener('click', onWinClick);
            }
        });
    } else {
        // Fallback: navigate directly
        window.location.href = directUrl;
    }
}

// Language switcher functionality
function initLanguageSwitcher() {
    const languageSelect = document.getElementById('languageSelect');
    
    if (languageSelect) {
        // Load saved language preference
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
        languageSelect.value = savedLanguage;
        updateLanguage(savedLanguage);

        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            localStorage.setItem('selectedLanguage', selectedLanguage);
            updateLanguage(selectedLanguage);
        });
    }
}

function updateLanguage(language) {
    const elements = document.querySelectorAll('[data-en][data-hi]');
    
    elements.forEach(element => {
        if (language === 'hi') {
            element.textContent = element.getAttribute('data-hi');
        } else {
            element.textContent = element.getAttribute('data-en');
        }
    });

    // Update page direction for Hindi
    if (language === 'hi') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'hi');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', 'en');
    }
}

// Testimonial slider functionality
function initTestimonialSlider() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    // Auto-advance slides every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }, 5000);

    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Show current slide
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }

    // Make currentSlide function globally available
    window.currentSlide = showSlide;
}

// Modal functionality
function initModal() {
    const loginBtn = document.getElementById('loginBtn');
    const modal = document.getElementById('loginModal');
    const closeBtn = document.getElementById('closeModal');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Open modal
    if (loginBtn && modal) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    // Close modal
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    if (modal) {
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Pricing tabs functionality
function initPricingTabs() {
    const tabs = document.querySelectorAll('.pricing-tab');
    const panels = {
        foundation: document.getElementById('panel-foundation'),
        intermediate: document.getElementById('panel-intermediate'),
        final: document.getElementById('panel-final')
    };

    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show corresponding panel
            const target = tab.getAttribute('data-target');
            Object.values(panels).forEach(p => p && p.classList.remove('active'));
            const panel = panels[target];
            if (panel) {
                panel.classList.add('active');
            }
        });
    });
}

// Trigger login modal from buttons (e.g., Sign Up for Free)
function initOpenLoginButtons() {
    const buttons = document.querySelectorAll('.open-login');
    const modal = document.getElementById('loginModal');
    if (!buttons.length || !modal) return;
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
}

// Form handling
function initFormHandling() {
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                // Show success message
                showNotification('Thank you for subscribing!', 'success');
                this.reset();
            }
        });
    }

    // Login form
    const loginForm = document.querySelector('#login .auth-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('#loginEmail').value;
            const password = this.querySelector('#loginPassword').value;
            
            if (email && password) {
                // Simulate login process
                showNotification('Login functionality will be implemented soon!', 'info');
                this.reset();
            }
        });
    }

    // Register form
    const registerForm = document.querySelector('#register .auth-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('#regName').value;
            const email = this.querySelector('#regEmail').value;
            const password = this.querySelector('#regPassword').value;
            const confirmPassword = this.querySelector('#regConfirmPassword').value;
            
            if (password !== confirmPassword) {
                showNotification('Passwords do not match!', 'error');
                return;
            }
            
            if (name && email && password) {
                // Simulate registration process
                showNotification('Registration functionality will be implemented soon!', 'info');
                this.reset();
            }
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
function addScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

    scrollBtn.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', debounce(() => {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    }, 100));
}

// Initialize scroll to top button
addScrollToTopButton();

// Lazy loading for images (if any are added later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Performance optimization: Preload critical resources
function preloadCriticalResources() {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadCriticalResources();

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You can add error reporting here
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker will be added when implementing PWA features
        console.log('Service Worker support detected');
    });
}
