// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const navbar = document.getElementById('navbar');
const viewProjectsBtn = document.getElementById('viewProjects');
const downloadResumeBtn = document.getElementById('downloadResume');
const ctaButton = document.getElementById('ctaButton');
const resumeDownloadBtn = document.getElementById('resumeDownloadBtn');
const contactForm = document.getElementById('contactForm');
const skillLevels = document.querySelectorAll('.skill-level');

// Theme Toggle
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Update icon
    const icon = themeToggle.querySelector('i');
    const mobileIcon = mobileThemeToggle.querySelector('i');
    if (newTheme === 'light') {
        icon.className = 'fas fa-sun';
        mobileIcon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
        mobileIcon.className = 'fas fa-moon';
    }
    
    // Save preference
    localStorage.setItem('theme', newTheme);
}

themeToggle.addEventListener('click', toggleTheme);
mobileThemeToggle.addEventListener('click', toggleTheme);

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    const icon = themeToggle.querySelector('i');
    const mobileIcon = mobileThemeToggle.querySelector('i');
    if (savedTheme === 'light') {
        icon.className = 'fas fa-sun';
        mobileIcon.className = 'fas fa-sun';
    }
}

// Mobile Navigation
hamburger.addEventListener('click', () => {
    mobileNav.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

overlay.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Trigger animations on scroll
    animateOnScroll();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Button interactions
viewProjectsBtn.addEventListener('click', () => {
    document.querySelector('#projects').scrollIntoView({
        behavior: 'smooth'
    });
});
downloadResumeBtn.addEventListener('click', () => {
    // Simulate download
    const downloadBtn = document.getElementById('resumeDownloadBtn');
    downloadBtn.classList.add('downloading');
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
    
    setTimeout(() => {
        downloadBtn.classList.remove('downloading');
        downloadBtn.innerHTML = '<i class="fas fa-file-download"></i> Download Resume';
        
        // Create and trigger download
        const link = document.createElement('a');
        link.href = 'Elayaraja.pdf';
        link.download = 'Elayaraja.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, 1500);
});

ctaButton.addEventListener('click', () => {
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth'
    });
});

resumeDownloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Animation
    resumeDownloadBtn.classList.add('downloading');
    const originalContent = resumeDownloadBtn.innerHTML;
    resumeDownloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
    
    setTimeout(() => {
        resumeDownloadBtn.classList.remove('downloading');
        resumeDownloadBtn.innerHTML = originalContent;
        
        // Create and trigger download
        const link = document.createElement('a');
        link.href = 'Elayaraja.pdf';
        link.download = 'Elayaraja.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, 1500);
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;   
    const message = document.getElementById('message').value;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Encrypting...';
    submitBtn.disabled = true;
    
    // Simulate encryption/transmission
    setTimeout(() => {
        // Create mailto link
        const subject = `Portfolio Contact from ${name}`;
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0ASubject: ${subject}%0D%0A%0D%0AMessage:%0D%0A${message}`;
        const mailtoLink = `mailto:alex.ryder@nexus7.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open mail client
        window.location.href = mailtoLink;
        
        // Reset form
        contactForm.reset();
        
        // Show success state
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Transmission Sent!';
        submitBtn.style.background = 'linear-gradient(90deg, var(--accent), #00cc88)';
        
        // Reset after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = 'linear-gradient(90deg, var(--primary), var(--accent))';
        }, 3000);
        
    }, 1500);
});

// Initialize Particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#0ff0fc"
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000"
            }
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ff00ff",
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            },
            onclick: {
                enable: true,
                mode: "push"
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
                distance: 100,
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

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.about-card, .timeline-item, .skill-card, .project-card, .contact-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
            
            // Animate skill meters
            if (element.classList.contains('skill-card')) {
                const skillLevel = element.querySelector('.skill-level');
                const level = skillLevel.getAttribute('data-level');
                setTimeout(() => {
                    skillLevel.style.width = level + '%';
                }, 300);
            }
        }
    });
}

// Initial animation trigger
window.addEventListener('load', () => {
    // Trigger typing animation
    const typingText = document.querySelector('.typing-text');
    typingText.style.animation = 'typing 3.5s steps(30, end) forwards, blink 0.75s step-end infinite';
    
    // Initial scroll animation check
    animateOnScroll();
    
    // Create 3D floating icons around profile
    createFloatingIcons();
});

// Create floating 3D icons around profile image
function createFloatingIcons() {
    const profileContainer = document.querySelector('.profile-container');
    const icons = [
        '<i class="fab fa-js"></i>', 
        '<i class="fab fa-html5"></i>', 
        '<i class="fab fa-css3-alt"></i>', 
        '<i class="fas fa-code"></i>', 
        '<i class="fas fa-cube"></i>', 
        '<i class="fas fa-bolt"></i>',
        '<i class="fas fa-envelope"></i>',
        '<i class="fas fa-map-marker-alt"></i>',
        '<i class="fas fa-mobile-alt"></i>'
    ];
    
    for (let i = 0; i < 6; i++) {
        const icon = document.createElement('div');
        icon.className = 'floating-icon';
        icon.innerHTML = icons[i];
        icon.style.position = 'absolute';
        icon.style.color = i % 2 === 0 ? 'var(--primary)' : 'var(--secondary)';
        icon.style.fontSize = '1.5rem';
        icon.style.zIndex = '1';
        
        // Position in a circle around profile
        const angle = (i / 6) * Math.PI * 2;
        const radius = 180;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        icon.style.left = `calc(50% + ${x}px)`;
        icon.style.top = `calc(50% + ${y}px)`;
        icon.style.transform = 'translate(-50%, -50%)';
        
        // Add animation
        const duration = 15 + Math.random() * 10;
        const delay = Math.random() * 5;
        icon.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        
        profileContainer.appendChild(icon);
    }
}

// Project card click animation
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        // Toggle expanded state
        this.classList.toggle('expanded');
        
        if (this.classList.contains('expanded')) {
            this.style.transform = 'perspective(1000px) rotateX(0) translateY(-20px) scale(1.05)';
            this.style.zIndex = '10';
        } else {
            this.style.transform = 'perspective(1000px) rotateX(10deg) translateY(-10px)';
            this.style.zIndex = '1';
        }
    });
});
// Project card GitHub button interactions
document.querySelectorAll('.project-github-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.querySelector('i').style.transform = 'rotate(360deg)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.querySelector('i').style.transform = 'rotate(0deg)';
    });
});

// Add project modal functionality
document.querySelectorAll('.project-live-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const projectCard = this.closest('.project-card');
        const projectTitle = projectCard.querySelector('h3').textContent;
        
        // Show loading state
        const originalHTML = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        this.disabled = true;
        
        // Simulate demo loading
        setTimeout(() => {
            this.innerHTML = originalHTML;
            this.disabled = false;
            
            // Show demo modal (you can implement this)
            showDemoModal(projectTitle);
        }, 1500);
    });
});

// Function to show demo modal
function showDemoModal(projectTitle) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('demoModal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'demoModal';
        modal.className = 'demo-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close"><i class="fas fa-times"></i></button>
                <h3>${projectTitle} - Live Demo</h3>
                <div class="modal-body">
                    <p>Demo loading would appear here in a real implementation.</p>
                    <p>This would show the actual project running with all features.</p>
                    <div class="modal-actions">
                        <a href="#" class="modal-btn modal-github">
                            <i class="fab fa-github"></i> GitHub Repository
                        </a>
                        <a href="#" class="modal-btn modal-close-btn">
                            <i class="fas fa-times"></i> Close Demo
                        </a>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add modal styles
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
            .demo-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 2000;
                display: none;
            }
            
            .demo-modal.active {
                display: block;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(10px);
            }
            
            .modal-content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--glass);
                border: 1px solid var(--primary);
                border-radius: 10px;
                padding: 30px;
                width: 90%;
                max-width: 800px;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: var(--neon-glow);
            }
            
            .modal-close {
                position: absolute;
                top: 15px;
                right: 15px;
                background: transparent;
                border: 1px solid var(--primary);
                color: var(--primary);
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                transition: var(--transition);
            }
            
            .modal-close:hover {
                transform: rotate(90deg);
                box-shadow: var(--glow);
            }
            
            .modal-content h3 {
                color: var(--primary);
                margin-bottom: 20px;
                font-size: 1.8rem;
            }
            
            .modal-body {
                margin-top: 20px;
            }
            
            .modal-actions {
                display: flex;
                gap: 15px;
                margin-top: 30px;
            }
            
            .modal-btn {
                padding: 12px 25px;
                border-radius: 5px;
                text-decoration: none;
                font-family: 'Orbitron', sans-serif;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: var(--transition);
            }
            
            .modal-github {
                background: linear-gradient(90deg, var(--primary), var(--accent));
                color: var(--dark);
            }
            
            .modal-close-btn {
                background: transparent;
                color: var(--primary);
                border: 2px solid var(--primary);
            }
            
            .modal-btn:hover {
                transform: translateY(-5px);
                box-shadow: var(--glow);
            }
        `;
        document.head.appendChild(modalStyles);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        const closeModalBtn = modal.querySelector('.modal-close-btn');
        const overlay = modal.querySelector('.modal-overlay');
        
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        closeBtn.addEventListener('click', closeModal);
        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
    }
    
    // Update modal title
    modal.querySelector('h3').textContent = `${projectTitle} - Live Demo`;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Add GitHub button to project cards on click (alternative view)
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Don't trigger if clicking on buttons
        if (e.target.closest('.project-github-btn') || e.target.closest('.project-live-btn')) {
            return;
        }
        
        // Toggle expanded state
        this.classList.toggle('expanded');
        
        if (this.classList.contains('expanded')) {
            this.style.transform = 'perspective(1000px) rotateX(0) translateY(-20px) scale(1.05)';
            this.style.zIndex = '10';
        } else {
            this.style.transform = 'perspective(1000px) rotateX(10deg) translateY(-10px)';
            this.style.zIndex = '1';
        }
    });
});

// Certificate card interaction
document.querySelectorAll('.certificate-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) rotateY(10deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateY(0)';
    });
});

// Social icon animation
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) rotateY(30deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateY(0)';
    });
});

// Contact card hover effects
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (this.classList.contains('visible')) {
            this.style.transform = 'translateY(0)';
        }
    });
});
/**----------------------------------------------------------------------------------------------------------------------------- */
// Update the animateOnScroll function
function animateOnScroll() {
    const elements = document.querySelectorAll('.about-card, .timeline-item, .skill-card, .project-card, .contact-card');
    
    elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            // Add staggered animation for skill cards
            if (element.classList.contains('skill-card')) {
                setTimeout(() => {
                    element.classList.add('visible');
                }, index * 100); // Stagger effect
            } else {
                element.classList.add('visible');
            }
        }
    });
}

// Add skill card hover sound effect (optional)
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Add a subtle glow effect
        this.style.zIndex = '10';
        
        // Play a subtle sound effect (optional)
        if (typeof Audio !== 'undefined') {
            const hoverSound = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==');
            hoverSound.volume = 0.1;
            // hoverSound.play().catch(e => console.log('Audio play failed:', e));
        }
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Add click effect for skills
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', function() {
        const skillName = this.querySelector('h3').textContent;
        const skillIcon = this.querySelector('.skill-icon').className;
        
        // Create a popup or tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'skill-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-icon">
                <i class="${skillIcon}"></i>
            </div>
            <div class="tooltip-text">
                <h4>${skillName}</h4>
                <p>Click again to close</p>
            </div>
        `;
        
        tooltip.style.position = 'fixed';
        tooltip.style.top = '50%';
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translate(-50%, -50%)';
        tooltip.style.background = 'var(--glass)';
        tooltip.style.border = '2px solid var(--primary)';
        tooltip.style.borderRadius = '15px';
        tooltip.style.padding = '20px';
        tooltip.style.zIndex = '2000';
        tooltip.style.backdropFilter = 'blur(10px)';
        tooltip.style.boxShadow = 'var(--neon-glow)';
        tooltip.style.display = 'flex';
        tooltip.style.alignItems = 'center';
        tooltip.style.gap = '15px';
        tooltip.style.animation = 'fadeIn 0.3s ease';
        
        // Add close functionality
        tooltip.addEventListener('click', function(e) {
            e.stopPropagation();
            this.remove();
        });
        
        // Remove any existing tooltip
        const existingTooltip = document.querySelector('.skill-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        document.body.appendChild(tooltip);
        
        // Add fadeIn animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
            
            .tooltip-icon i {
                font-size: 3rem;
            }
            
            .tooltip-text h4 {
                color: var(--primary);
                margin-bottom: 5px;
            }
            
            .tooltip-text p {
                color: var(--light);
                opacity: 0.8;
                font-size: 0.9rem;
            }
        `;
        document.head.appendChild(style);
    });
});
/**--------------------------------------------------For hero section-------------------------------------------------- */
 // Typing effect
    const typingText = document.querySelector('.typing-text');
    const texts = [
        "FULL-STACK WEB DEVELOPER",
        "FRONT-END DESIGNER"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before typing next
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing effect after a short delay

    setTimeout(type, 10000);
