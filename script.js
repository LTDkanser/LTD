// Language Management
const languages = ['en', 'ru', 'de', 'tr'];
const langFlags = { en: '🇺🇸', ru: '🇷🇺', de: '🇩🇪', tr: '🇹🇷' };
const langNames = { en: 'English', ru: 'Русский', de: 'Deutsch', tr: 'Türkçe' };
let currentLang = localStorage.getItem('lang') || 'en';

function setLanguage(lang) {
    if (!languages.includes(lang)) lang = 'en';
    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    // Update all translatable elements
    document.querySelectorAll(`[data-${languages[0]}]`).forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) el.textContent = text;
    });
    
    // Update placeholders
    document.querySelectorAll(`[data-placeholder-${languages[0]}]`).forEach(el => {
        const ph = el.getAttribute(`data-placeholder-${lang}`);
        if (ph) el.placeholder = ph;
    });
    
    // Update select options
    document.querySelectorAll('select option[data-en]').forEach(opt => {
        const text = opt.getAttribute(`data-${lang}`);
        if (text) opt.textContent = text;
    });
    
    // Update lang toggle button with emoji flag
    const langBtn = document.getElementById('langToggle');
    if (langBtn) {
        langBtn.textContent = `${langFlags[lang]} ${langNames[lang]}`;
    }
    
    // Update active state in dropdown
    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.classList.toggle('bg-accent-400/20', opt.dataset.lang === lang);
        opt.classList.toggle('text-accent-400', opt.dataset.lang === lang);
        opt.classList.toggle('text-gray-400', opt.dataset.lang !== lang);
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Initialize language
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
    
    // Language dropdown toggle
    const langBtn = document.getElementById('langToggle');
    const langDropdown = document.getElementById('langDropdown');
    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('hidden');
        });
        
        // Language options
        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.addEventListener('click', () => {
                setLanguage(opt.dataset.lang);
                langDropdown.classList.add('hidden');
            });
        });
        
        // Close dropdown on outside click
        document.addEventListener('click', () => {
            langDropdown.classList.add('hidden');
        });
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('shadow-md');
            } else {
                header.classList.remove('shadow-md');
            }
        });
    }
});

// Form Submission Handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    [name, email, message].forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('border-red-500');
            isValid = false;
        } else {
            field.classList.remove('border-red-500');
        }
    });
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value && !emailRegex.test(email.value)) {
        email.classList.add('border-red-500');
        isValid = false;
    }
    
    if (isValid) {
        const form = document.getElementById('contactForm');
        const success = document.getElementById('formSuccess');
        if (form && success) {
            form.classList.add('hidden');
            success.classList.remove('hidden');
            
            setTimeout(() => {
                form.reset();
                form.classList.remove('hidden');
                success.classList.add('hidden');
            }, 3000);
        }
    }
}

// Scroll animations
const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1) translateX(0)';
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-scale').forEach(el => {
        animObserver.observe(el);
    });
});
