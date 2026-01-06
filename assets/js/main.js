// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    if (!menu) return;
    
    menu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (menu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.nav-blur') || document.querySelector('nav');

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// Load Section Content
async function loadSection(sectionId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Failed to load ${filePath}`);
        const html = await response.text();
        const element = document.getElementById(sectionId);
        if (element) {
            element.innerHTML = html;
        }
    } catch (error) {
        console.error('Error loading section:', error);
    }
}

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    // Load all sections (only if elements exist)
    const sections = [
        { id: 'header-section', path: './sections/header.html' },
        { id: 'hero-section', path: './sections/hero-banner.html' },
        { id: 'products-section', path: './sections/products.html' },
        { id: 'features-section', path: './sections/features-contact.html' },
        { id: 'footer-section', path: './sections/footer.html' }
    ];
    
    sections.forEach(section => {
        if (document.getElementById(section.id)) {
            loadSection(section.id, section.path);
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.querySelector('.mobile-menu');
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        toggleMobileMenu();
                    }
                }
            }
        });
    });
    
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe product cards
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }, 500);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuButton = document.querySelector('.lg\\:hidden') || document.querySelector('#mobile-menu-btn');
    
    if (mobileMenu && menuButton && mobileMenu.classList.contains('active')) {
        if (!mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
            toggleMobileMenu();
        }
    }
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (window.innerWidth >= 1024 && mobileMenu && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }, 250);
});