// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupToggle();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateToggleIcon();
    }

    updateToggleIcon() {
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = this.theme === 'light' ? '🌙' : '☀️';
        }
    }

    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    setupToggle() {
        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggle());
        }
    }
}

// Mobile Navigation
class MobileNav {
    constructor() {
        this.menuBtn = document.getElementById('mobileMenuBtn');
        this.mobileNav = document.getElementById('mobileNav');
        this.isOpen = false;
        this.init();
    }

    init() {
        if (this.menuBtn && this.mobileNav) {
            this.menuBtn.addEventListener('click', () => this.toggle());
            this.setupNavLinks();
        }
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.mobileNav.classList.toggle('active', this.isOpen);
        this.updateMenuIcon();
    }

    updateMenuIcon() {
        const hamburger = this.menuBtn.querySelector('.hamburger');
        if (hamburger) {
            hamburger.style.transform = this.isOpen ? 'rotate(45deg)' : 'rotate(0deg)';
        }
    }

    setupNavLinks() {
        const navLinks = this.mobileNav.querySelectorAll('.nav-link-mobile');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.isOpen = false;
                this.mobileNav.classList.remove('active');
                this.updateMenuIcon();
            });
        });
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Project Filtering
class ProjectFilter {
    constructor() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => this.filter(btn));
        });
    }

    filter(activeBtn) {
        const filter = activeBtn.getAttribute('data-filter');
        
        // Update active button
        this.filterBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
        
        // Filter projects
        this.projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

// Contact Form
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.successMessage = document.getElementById('successMessage');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Show loading state
        this.submitBtn.classList.add('loading');
        this.submitBtn.disabled = true;
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        this.showSuccess();
        
        // Reset form
        this.form.reset();
        
        // Reset button state
        this.submitBtn.classList.remove('loading');
        this.submitBtn.disabled = false;
    }

    showSuccess() {
        this.successMessage.classList.add('show');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            this.successMessage.classList.remove('show');
        }, 5000);
    }
}

// Scroll to Top
class ScrollToTop {
    constructor() {
        this.scrollBtn = document.getElementById('scrollTop');
        this.init();
    }

    init() {
        if (this.scrollBtn) {
            this.scrollBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
}

// Intersection Observer for Animations
class AnimationObserver {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        const animatedElements = document.querySelectorAll('.skill-card, .project-card');
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });
    }
}

// Header Scroll Effect
class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.init();
    }

    init() {
        if (this.header) {
            window.addEventListener('scroll', () => this.handleScroll());
        }
    }

    handleScroll() {
        const scrolled = window.scrollY > 50;
        
        if (scrolled) {
            this.header.style.background = 'rgba(255, 255, 255, 0.95)';
            this.header.style.backdropFilter = 'blur(20px)';
        } else {
            this.header.style.background = 'rgba(255, 255, 255, 0.8)';
            this.header.style.backdropFilter = 'blur(10px)';
        }
        
        // Update for dark theme
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            if (scrolled) {
                this.header.style.background = 'rgba(17, 24, 39, 0.95)';
            } else {
                this.header.style.background = 'rgba(17, 24, 39, 0.8)';
            }
        }
    }
}

// Typing Effect for Hero Section
class TypingEffect {
    constructor() {
        this.element = document.querySelector('.hero-subtitle');
        this.text = '1st Year BCA Student | Aspiring Front-End Developer';
        this.speed = 100;
        this.init();
    }

    init() {
        if (this.element) {
            this.element.textContent = '';
            this.typeText();
        }
    }

    async typeText() {
        for (let i = 0; i <= this.text.length; i++) {
            this.element.textContent = this.text.slice(0, i);
            await new Promise(resolve => setTimeout(resolve, this.speed));
        }
    }
}

// Parallax Effect for Hero Background
class ParallaxEffect {
    constructor() {
        this.blobs = document.querySelectorAll('.blob');
        this.init();
    }

    init() {
        if (this.blobs.length > 0) {
            window.addEventListener('scroll', () => this.handleScroll());
        }
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        this.blobs.forEach((blob, index) => {
            const speed = (index + 1) * 0.2;
            blob.style.transform = `translateY(${rate * speed}px)`;
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    new ThemeManager();
    new MobileNav();
    new SmoothScroll();
    new ProjectFilter();
    new ContactForm();
    new ScrollToTop();
    
    // Enhanced features
    new AnimationObserver();
    new HeaderScroll();
    new TypingEffect();
    new ParallaxEffect();
    
    // Add loading animation delay for staggered effects
    const animatedElements = document.querySelectorAll('.skill-card, .project-card');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 150}ms`;
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav && window.innerWidth > 768) {
        mobileNav.classList.remove('active');
    }
});

// Handle form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '';
        }
    });
    
    return isValid;
}

// Add focus effects to form inputs
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
});

// Preload images for better performance
function preloadImages() {
    const images = [
        'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=600'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
window.addEventListener('load', preloadImages);