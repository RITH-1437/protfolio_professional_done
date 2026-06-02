// Portfolio JavaScript - Modern Interactive Features

// EmailJS Configuration
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'r21wFB7iMhijX8UL2',
    SERVICE_ID: 'service_vulxbtf',
    TEMPLATE_ID: 'template_lo3avs9'
};

// Initialize EmailJS
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init({
            publicKey: EMAILJS_CONFIG.PUBLIC_KEY,
        });
    }
})();

class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupThemeToggle();
        this.initTypingAnimation();
        this.initParticles();
        this.initSkillBars();
        this.setupContactForm();
        this.setupNewsletterForm();
        this.initScrollAnimations();
    }

    setupEventListeners() {
        // Navigation
        this.setupNavigation();
        
        // Back to top button
        this.setupBackToTop();
        
        // Smooth scrolling for anchor links
        this.setupSmoothScrolling();
        
        // Mobile menu toggle
        this.setupMobileMenu();
    }

    setupNavigation() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Navbar background on scroll
        const updateNavbar = () => {
            const isLight = document.body.getAttribute('data-theme') === 'light';
            if (window.scrollY > 100) {
                navbar.style.background = isLight ? 'rgba(255, 255, 255, 0.98)' : 'rgba(15, 20, 25, 0.98)';
                navbar.style.boxShadow = isLight ? '0 2px 15px rgba(0, 0, 0, 0.1)' : '0 2px 15px rgba(0, 0, 0, 0.25)';
            } else {
                navbar.style.background = isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 20, 25, 0.95)';
                navbar.style.boxShadow = isLight ? '0 2px 15px rgba(0, 0, 0, 0.08)' : '0 2px 15px rgba(0, 0, 0, 0.2)';
            }
        };
        window.addEventListener('scroll', updateNavbar);

        // Active navigation link highlighting
        const sections = document.querySelectorAll('section[id]');
        
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-80px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${entry.target.id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        hamburger?.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger?.contains(e.target) && !navMenu?.contains(e.target)) {
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
            }
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn?.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            body.setAttribute('data-theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        themeToggle?.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            
            if (currentTheme === 'light') {
                body.removeAttribute('data-theme');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                body.setAttribute('data-theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'light');
            }

            // Re-apply navbar color immediately after theme switch
            const navbar = document.querySelector('.navbar');
            const isLight = body.getAttribute('data-theme') === 'light';
            if (window.scrollY > 100) {
                navbar.style.background = isLight ? 'rgba(255, 255, 255, 0.98)' : 'rgba(15, 20, 25, 0.98)';
                navbar.style.boxShadow = isLight ? '0 2px 15px rgba(0, 0, 0, 0.1)' : '0 2px 15px rgba(0, 0, 0, 0.25)';
            } else {
                navbar.style.background = isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 20, 25, 0.95)';
                navbar.style.boxShadow = isLight ? '0 2px 15px rgba(0, 0, 0, 0.08)' : '0 2px 15px rgba(0, 0, 0, 0.2)';
            }
        });
    }

    initTypingAnimation() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        const roles = [
  'Full Stack Web Developer',
  'Frontend Developer',
  'Backend Developer',
  'Software Engineer',
  'Computer Science Student',
  'Web Application Developer',
  'API Developer',
  'UI/UX Enthusiast',
  'AI & Tech Enthusiast',
  'DevOps Learner',
  'Open Source Learner',
  'Problem Solver',
  'System Design Enthusiast',
  'Java Spring Boot Developer',
  'Future AI Engineer',
];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const typeRole = () => {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause before deleting
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500; // Pause before typing next role
            }

            setTimeout(typeRole, typingSpeed);
        };

        typeRole();
    }

    initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 50,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: '#5a67d8'
                    },
                    shape: {
                        type: 'circle',
                        stroke: {
                            width: 0,
                            color: '#000000'
                        }
                    },
                    opacity: {
                        value: 0.2,
                        random: false,
                        anim: {
                            enable: false,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 40,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#5a67d8',
                        opacity: 0.15,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'repulse'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 400,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        bubble: {
                            distance: 400,
                            size: 40,
                            duration: 2,
                            opacity: 8,
                            speed: 3
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4
                        },
                        push: {
                            particles_nb: 4
                        },
                        remove: {
                            particles_nb: 2
                        }
                    }
                },
                retina_detect: true
            });
        }
    }

    initSkillBars() {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillLevels = entry.target.querySelectorAll('.skill-level');
                    skillLevels.forEach(skillLevel => {
                        const level = skillLevel.dataset.level;
                        skillLevel.style.setProperty('--skill-width', `${level}%`);
                    });
                }
            });
        }, { threshold: 0.5 });

        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            skillObserver.observe(skillsSection);
        }
    }

    initScrollAnimations() {
        const animateOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-up');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Add animation to cards and sections
        const elementsToAnimate = document.querySelectorAll(
            '.project-card, .blog-card, .skill-category, .about-highlights .highlight-item, .contact-item'
        );

        elementsToAnimate.forEach(element => {
            animateOnScroll.observe(element);
        });
    }

    setupContactForm() {
        const contactForm = document.getElementById('contact-form');

        contactForm?.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            const templateParams = {
                from_name:  contactForm.querySelector('#name').value,
                from_email: contactForm.querySelector('#email').value,
                subject:    contactForm.querySelector('#subject').value,
                message:    contactForm.querySelector('#message').value,
            };

            try {
                // Check if EmailJS is properly configured
                if (!EMAILJS_CONFIG.PUBLIC_KEY || EMAILJS_CONFIG.PUBLIC_KEY === 'r21wFB7iMhijX8UL2') {
                    throw new Error('EmailJS not configured. Please add your credentials in script.js');
                }
                
                await emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATE_ID,
                    templateParams
                );
                this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            } catch (error) {
                console.error('EmailJS error:', error);
                const errorMsg = error.message.includes('not configured') 
                    ? 'Email service not configured yet. Please contact me directly at your-email@example.com'
                    : 'Failed to send message. Please try again or email me directly.';
                this.showNotification(errorMsg, 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    setupNewsletterForm() {
        const newsletterForm = document.querySelector('.newsletter-form');
        
        newsletterForm?.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value;
            const submitBtn = newsletterForm.querySelector('button');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            submitBtn.disabled = true;
            
            try {
                // Simulate newsletter subscription (replace with actual API call)
                await this.simulateNewsletterSubscription(email);
                
                // Show success message
                this.showNotification('Successfully subscribed to newsletter!', 'success');
                newsletterForm.reset();
                
            } catch (error) {
                // Show error message
                this.showNotification('Failed to subscribe. Please try again.', 'error');
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    async simulateFormSubmission(formData) {
        // Simulate API call delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                Math.random() > 0.1 ? resolve() : reject();
            }, 2000);
        });
    }

    async simulateNewsletterSubscription(email) {
        // Simulate API call delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                Math.random() > 0.1 ? resolve() : reject();
            }, 1500);
        });
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close"><i class="fas fa-times"></i></button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        
        notification.querySelector('.notification-close').style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        const autoRemoveTimeout = setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);
        
        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            clearTimeout(autoRemoveTimeout);
            this.removeNotification(notification);
        });
    }

    removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }

    initializeAnimations() {
        // Add entrance animations to elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        // Animate cards and content sections
        const animatedElements = document.querySelectorAll(`
            .hero-content,
            .about-content,
            .skill-category,
            .project-card,
            .blog-card,
            .contact-content
        `);

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }
}

// Additional utility functions
class Utils {
    static debounce(func, wait) {
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

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

// Additional interactive features
class InteractiveFeatures {
    constructor() {
        this.initCursorEffect();
        this.initProjectHover();
        this.initSkillHover();
    }

    initCursorEffect() {
        // Create custom cursor
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.1s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);

        // Update cursor position
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            cursor.style.opacity = '1';
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });

        // Scale cursor on hover over interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .blog-card');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
            });
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
            });
        });
    }

    initProjectHover() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Add tilt effect
                card.style.transform = 'translateY(-10px) rotateX(5deg) rotateY(5deg)';
                card.style.transformStyle = 'preserve-3d';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            });
            
            // Add mouse move effect for more dynamic tilt
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        });
    }

    initSkillHover() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const skillLevel = item.querySelector('.skill-level');
                if (skillLevel) {
                    skillLevel.style.boxShadow = 'none';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const skillLevel = item.querySelector('.skill-level');
                if (skillLevel) {
                    skillLevel.style.boxShadow = 'none';
                }
            });
        });
    }
}

// Performance optimization
class PerformanceOptimizer {
    constructor() {
        this.lazyLoadImages();
        this.optimizeScrollEvents();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    optimizeScrollEvents() {
        // Use throttled scroll events for better performance
        const throttledScroll = Utils.throttle(() => {
            // Update scroll-dependent elements
            this.updateScrollProgress();
        }, 16); // ~60fps

        window.addEventListener('scroll', throttledScroll);
    }

    updateScrollProgress() {
        const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        // Update scroll progress indicator if it exists
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = `${scrollProgress}%`;
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
    new InteractiveFeatures();
    new PerformanceOptimizer();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.classList.add('page-hidden');
    } else {
        // Resume animations when page becomes visible
        document.body.classList.remove('page-hidden');
    }
});

// Handle window resize
window.addEventListener('resize', Utils.debounce(() => {
    // Reinitialize particles on resize
    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
        pJSDom[0].pJS.fn.particlesRefresh();
    }
}, 250));

// Preload critical resources
window.addEventListener('load', () => {
    // Preload important images
    const criticalImages = [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Location Modal Functions
function openLocationModal() {
    const modal = document.getElementById('locationModal');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeLocationModal() {
    const modal = document.getElementById('locationModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside of it
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('locationModal');
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeLocationModal();
        }
    });
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('locationModal');
        if (modal && modal.classList.contains('show')) {
            closeLocationModal();
        }
    }
});

// Enhanced Interactive Cursor Effect
class CursorEffect {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursor.style.cssText = `
            width: 20px;
            height: 20px;
            border: 2px solid rgba(90, 103, 216, 0.4);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.15s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(this.cursor);
        
        this.cursorDot = document.createElement('div');
        this.cursorDot.style.cssText = `
            width: 6px;
            height: 6px;
            background: rgba(168, 85, 247, 0.8);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 10000;
            transition: all 0.08s ease;
        `;
        document.body.appendChild(this.cursorDot);
        
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
            this.cursorDot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
        });
        
        // Enhance cursor on hover
        document.querySelectorAll('a, button, .btn, .project-card, .skill-item').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.width = '40px';
                this.cursor.style.height = '40px';
                this.cursor.style.borderColor = 'rgba(168, 85, 247, 0.8)';
                this.cursor.style.transform = `translate(${event.clientX - 20}px, ${event.clientY - 20}px)`;
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.style.width = '20px';
                this.cursor.style.height = '20px';
                this.cursor.style.borderColor = 'rgba(99, 102, 241, 0.5)';
            });
        });
    }
}

// Initialize Enhanced Cursor (Only on desktop)
if (window.innerWidth > 768) {
    new CursorEffect();
}

// Add floating animation to cards
const addFloatingAnimation = () => {
    const cards = document.querySelectorAll('.skill-category, .project-card, .profile-card');
    
    cards.forEach((card, index) => {
        const delay = index * 0.1;
        card.style.animation = `float 3s ease-in-out ${delay}s infinite`;
    });
};

// Define float animation if not exists
if (!document.getElementById('float-animation-style')) {
    const style = document.createElement('style');
    style.id = 'float-animation-style';
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
        }
    `;
    document.head.appendChild(style);
}

setTimeout(addFloatingAnimation, 1000);

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Portfolio, Utils, InteractiveFeatures, PerformanceOptimizer, CursorEffect };
}