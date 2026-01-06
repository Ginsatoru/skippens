// Scroll detection for navigation
window.addEventListener('scroll', function() {
    const nav = document.getElementById('mainNav');
    const topBar = document.querySelector('.top-bar');
    
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
        if (topBar) topBar.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
        if (topBar) topBar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', function() {
        const mobileMenu = document.querySelector('.mobile-menu');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Initialize AOS if available
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
}