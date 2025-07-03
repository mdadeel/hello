// Utility: Throttle function for scroll/mousemove
function throttle(fn, wait) {
    let last = 0;
    return function(...args) {
        const now = Date.now();
        if (now - last >= wait) {
            last = now;
            fn.apply(this, args);
        }
    };
}

// Enhanced features initialization
function initializeEnhancedFeatures() {
    // Add smooth page transitions
    document.body.style.opacity = '0';
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    });
    
    // Modern skill chips with magnetic effect
    document.querySelectorAll('.skill-chip').forEach(chip => {
        chip.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) translateY(-3px)';
            this.style.boxShadow = '0 12px 25px rgba(59, 130, 246, 0.4)';
            this.style.filter = 'brightness(1.1)';
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: translate(-50%, -50%);
                animation: chipRipple 0.6s ease-out forwards;
                pointer-events: none;
            `;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
        
        chip.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '';
            this.style.filter = '';
        });
    });
    
    // Add interactive star ratings
    document.querySelectorAll('.skill-rating').forEach(rating => {
        const stars = rating.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.addEventListener('mouseenter', function() {
                for (let i = 0; i <= index; i++) {
                    stars[i].style.color = '#fbbf24';
                    stars[i].style.transform = 'scale(1.2)';
                }
            });
            
            star.addEventListener('mouseleave', function() {
                stars.forEach((s, i) => {
                    if (!s.classList.contains('filled')) {
                        s.style.color = '';
                    }
                    s.style.transform = 'scale(1)';
                });
            });
        });
    });
    
    // Add notebook page flip effect
    document.querySelectorAll('.notebook-page').forEach(page => {
        page.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateY(2deg)';
            this.style.boxShadow = '10px 10px 30px rgba(0,0,0,0.15)';
        });
        
        page.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(0deg)';
            this.style.boxShadow = '';
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Enhanced initialization
    initializeEnhancedFeatures();
    
    // Create scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);

    // Limit number of floating doodles for performance
    addFloatingDoodles(8); // Reduced from 15 to 8

    // Revolutionary Section Card Hover Effects
    initializeRevolutionaryCardEffects();

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animate skill stars on scroll
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate stars in skill ratings
                const stars = entry.target.querySelectorAll('.star.filled');
                stars.forEach((star, index) => {
                    setTimeout(() => {
                        star.style.animation = 'starPop 0.3s ease-out forwards';
                    }, index * 100);
                });
                
                // Animate project sketches
                if (entry.target.classList.contains('sketch-item')) {
                    entry.target.style.animation = 'slideInLeft 0.6s ease-out forwards';
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe skill sections and project items
    document.querySelectorAll('.skill-section, .sketch-item').forEach(el => {
        observer.observe(el);
    });

    // Add floating animation to doodles
    const doodles = document.querySelectorAll('.doodle');
    doodles.forEach((doodle, index) => {
        doodle.style.animationDelay = `${index * 0.5}s`;
    });

    // Form submission handler
    const contactForm = document.querySelector('.paper-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show a thank you message (you can customize this)
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Message Sent! ✨';
            submitBtn.style.background = 'var(--highlight-yellow)';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                this.reset();
            }, 3000);
        });
    }

    // Add typewriter effect to page titles
    const pageTitle = document.querySelector('.name-title');
    if (pageTitle) {
        const text = pageTitle.textContent;
        pageTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                pageTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 500);
    }

    // Add paper crinkle sound effect on page load (visual only)
    function addPaperEffect() {
        const paperTexture = document.querySelector('.paper-texture');
        if (paperTexture) {
            paperTexture.style.animation = 'paperCrinkle 0.5s ease-out';
        }
    }
    
    addPaperEffect();

    // Throttle scroll event handlers for performance
    window.addEventListener('scroll', throttle(() => {
        // Scroll Progress Indicator
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';

        // Parallax Effect for Doodles
        const scrolledY = window.pageYOffset;
        const rate = scrolledY * -0.3;
        const doodles = document.querySelectorAll('.doodle');
        doodles.forEach((doodle, index) => {
            doodle.style.transform = `translateY(${rate * (index + 1) * 0.1}px) rotate(${rate * 0.01}deg)`;
        });

        // Active Navigation Highlighting
        let current = '';
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // FAB show/hide
        if (fab) {
            if (window.pageYOffset > 500) {
                fab.style.opacity = '1';
                fab.style.transform = 'scale(1)';
            } else {
                fab.style.opacity = '0';
                fab.style.transform = 'scale(0.8)';
            }
        }
    }, 50)); // Throttle to 20fps

    // Throttle mousemove for parallax
    document.addEventListener('mousemove', throttle((e) => {
        const cursor = { x: e.clientX, y: e.clientY };
        const parallaxElements = document.querySelectorAll('.sticky-note, .photo-frame');
        parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (cursor.x - centerX) * 0.02;
            const deltaY = (cursor.y - centerY) * 0.02;
            element.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${element.style.transform.includes('rotate') ? element.style.transform.match(/rotate\((.+?)\)/)[1] : '0deg'})`;
        });
    }, 30)); // Throttle to ~30fps

    // Add click animations to interactive elements
    document.querySelectorAll('.btn, .nav-link, .sketch-link').forEach(element => {
        element.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(254, 240, 138, 0.6);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Floating Action Button (FAB) functionality
    const fab = document.getElementById('scrollToTop');
    if (fab) {
        // Show/hide FAB based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                fab.style.opacity = '1';
                fab.style.transform = 'scale(1)';
            } else {
                fab.style.opacity = '0';
                fab.style.transform = 'scale(0.8)';
            }
        });
        
        // Scroll to top functionality
        fab.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Initially hide FAB
        fab.style.opacity = '0';
        fab.style.transform = 'scale(0.8)';
    }
});

// Function to add floating background doodles
function addFloatingDoodles(count = 8) {
    const doodleSymbols = ['✦', '✧', '⋆', '◆', '○', '△', '□', '♦', '♢', '◇'];
    const container = document.body;
    // Remove existing floating doodles if any
    document.querySelectorAll('.floating-doodle').forEach(d => d.remove());
    for (let i = 0; i < count; i++) {
        const doodle = document.createElement('div');
        doodle.className = 'floating-doodle';
        doodle.textContent = doodleSymbols[Math.floor(Math.random() * doodleSymbols.length)];
        doodle.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 6}s;
            z-index: -1;
        `;
        container.appendChild(doodle);
    }
}

// Add CSS animations for JavaScript effects
const style = document.createElement('style');
style.textContent = `
    @keyframes starPop {
        0% { transform: scale(0.5); opacity: 0; }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes paperCrinkle {
        0%, 100% { opacity: 0.1; }
        50% { opacity: 0.2; }
    }
    
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .handwriting-animate {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Revolutionary Section Card Hover Effects
function initializeRevolutionaryCardEffects() {
    // Liquid Morphing Effects for All Section Cards
    const cards = document.querySelectorAll('.info-card, .form-card, .sketch-item, .notebook-page');
    
    cards.forEach(card => {
        // Add liquid background container
        const liquidBg = document.createElement('div');
        liquidBg.className = 'liquid-background';
        liquidBg.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #a8e6cf, #dcedc1, #e0c3fc, #9bb5ff);
            background-size: 400% 400%;
            opacity: 0;
            transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
            border-radius: inherit;
            z-index: -1;
        `;
        
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        card.appendChild(liquidBg);
        
        // Floating particles system
        const particleCount = 8;
        const particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, #ffffff, #60a5fa);
                border-radius: 50%;
                opacity: 0;
                pointer-events: none;
                transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
            `;
            
            card.appendChild(particle);
            particles.push(particle);
        }
        
        // Ultra-smooth morphing hover effects
        card.addEventListener('mouseenter', function(e) {
            // Optimized liquid background activation
            liquidBg.style.willChange = 'opacity, background-position';
            liquidBg.style.opacity = '0.85';
            liquidBg.style.animation = 'liquidFlow 1.5s ease-in-out infinite';
            
            // GPU-accelerated card transformation
            this.style.willChange = 'transform';
            this.style.transform = 'translate3d(0, -15px, 0) scale3d(1.03, 1.03, 1) rotateX(3deg)';
            this.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.2)';
            this.style.borderRadius = '20px';
            
            // Efficient particle activation
            particles.forEach((particle, index) => {
                const angle = (index / particleCount) * Math.PI * 2;
                const distance = 50;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                
                particle.style.willChange = 'transform, opacity';
                particle.style.opacity = '0.7';
                particle.style.transform = `translate3d(${x}px, ${y}px, 0) scale3d(1.2, 1.2, 1)`;
                particle.style.left = '50%';
                particle.style.top = '50%';
            });
            
            // Optimized text color change
            const textElements = this.querySelectorAll('h3, p, .info-title, .form-title, .sketch-title');
            textElements.forEach(el => {
                el.style.willChange = 'color';
                el.style.color = 'white';
                el.style.textShadow = '0 2px 4px rgba(0,0,0,0.3)';
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset liquid background
            liquidBg.style.opacity = '0';
            liquidBg.style.animation = '';
            
            // Reset card transformation
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.backdropFilter = '';
            this.style.borderRadius = '';
            
            // Hide particles
            particles.forEach(particle => {
                particle.style.opacity = '0';
                particle.style.transform = 'translate(0, 0) scale(0)';
            });
            
            // Reset text colors
            const textElements = this.querySelectorAll('h3, p, .info-title, .form-title, .sketch-title');
            textElements.forEach(el => {
                el.style.color = '';
                el.style.textShadow = '';
            });
        });
        
        // Mouse movement tracking for dynamic effects
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            // Dynamic gradient position
            liquidBg.style.backgroundPosition = `${x}% ${y}%`;
            
            // Subtle tilt based on mouse position
            const tiltX = ((y - 50) / 50) * 5;
            const tiltY = ((x - 50) / 50) * -5;
            this.style.transform = `translateY(-20px) scale(1.05) rotateX(${5 + tiltX}deg) rotateY(${tiltY}deg)`;
        });
    });
    
    // Add CSS for liquid flow animation
    const liquidStyle = document.createElement('style');
    liquidStyle.textContent = `
        @keyframes liquidFlow {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }
        
        .floating-particle {
            animation: particleFloat 3s ease-in-out infinite;
        }
        
        @keyframes particleFloat {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
            }
            33% {
                transform: translateY(-10px) rotate(120deg);
            }
            66% {
                transform: translateY(-5px) rotate(240deg);
            }
        }
    `;
    document.head.appendChild(liquidStyle);
}
