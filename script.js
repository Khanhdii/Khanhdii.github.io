// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ==========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(`
        .summary-card,
        .timeline-item,
        .education-card,
        .publication-card,
        .project-card,
        .skill-category,
        .award-card,
        .contact-card
    `);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// ==========================================
// PUBLICATION FILTERS
// ==========================================
const filterButtons = document.querySelectorAll('.filter-btn');
const publicationCards = document.querySelectorAll('.publication-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        publicationCards.forEach(card => {
            const categories = card.getAttribute('data-category');
            
            if (filter === 'all') {
                card.classList.remove('hidden');
                animateCard(card);
            } else if (categories && categories.includes(filter)) {
                card.classList.remove('hidden');
                animateCard(card);
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

function animateCard(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 50);
}

// ==========================================
// ACTIVE NAV LINK ON SCROLL
// ==========================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ==========================================
// TYPING EFFECT FOR HERO SUBTITLE (Optional)
// ==========================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect
// const heroSubtitle = document.querySelector('.hero-subtitle');
// if (heroSubtitle) {
//     const originalText = heroSubtitle.textContent;
//     typeWriter(heroSubtitle, originalText, 50);
// }

// ==========================================
// PARTICLE EFFECT FOR HERO (Optional)
// ==========================================
class ParticleEffect {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.particleCount = 50;
        this.init();
    }

    init() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '0';
        
        this.container.appendChild(canvas);
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        this.createParticles();
        this.animate();
    }

    resize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 1 - 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        // Draw connections
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Uncomment to enable particle effect
// const heroBackground = document.querySelector('.hero-background');
// if (heroBackground) {
//     new ParticleEffect(heroBackground);
// }

// ==========================================
// COUNTER ANIMATION FOR STATS
// ==========================================
function animateCounter(element, target, suffix = '', duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            // Ensure final value is set correctly with suffix
            if (target % 1 !== 0) {
                element.textContent = target.toFixed(2) + suffix;
            } else {
                element.textContent = Math.floor(target) + suffix;
            }
            clearInterval(timer);
        } else {
            // Handle decimal numbers
            if (target % 1 !== 0) {
                element.textContent = current.toFixed(2) + suffix;
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }
    }, 16);
}

// Animate counters when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const originalValue = statNumber.textContent;
            
            console.log('Animating stat:', originalValue);
            
            // Extract number from text (e.g., "10+" -> 10, "3.77" -> 3.77, "#1" -> 1)
            let match;
            if (originalValue.includes('#')) {
                // Handle "#1" case
                match = originalValue.match(/#(\d+)/);
                if (match) {
                    const target = parseInt(match[1]);
                    // Animate with # prefix
                    animateCounter(statNumber, target, '#');
                }
            } else {
                // Handle "10+", "3.77" cases
                match = originalValue.match(/[\d.]+/);
                if (match) {
                    const target = parseFloat(match[0]);
                    const suffix = originalValue.replace(match[0], '');
                    // Animate with suffix (e.g., "+")
                    animateCounter(statNumber, target, suffix);
                }
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// ==========================================
// CURSOR TRAIL EFFECT (Optional)
// ==========================================
class CursorTrail {
    constructor() {
        this.dots = [];
        this.mouse = { x: 0, y: 0 };
        this.colors = ['#6366f1', '#8b5cf6', '#ec4899'];
        this.init();
    }

    init() {
        // Create dots
        for (let i = 0; i < 10; i++) {
            const dot = document.createElement('div');
            dot.style.position = 'fixed';
            dot.style.width = '5px';
            dot.style.height = '5px';
            dot.style.borderRadius = '50%';
            dot.style.backgroundColor = this.colors[i % this.colors.length];
            dot.style.pointerEvents = 'none';
            dot.style.zIndex = '9999';
            dot.style.opacity = '0';
            dot.style.transition = 'opacity 0.3s';
            document.body.appendChild(dot);
            
            this.dots.push({
                element: dot,
                x: 0,
                y: 0
            });
        }

        // Track mouse
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Animate
        this.animate();
    }

    animate() {
        let x = this.mouse.x;
        let y = this.mouse.y;

        this.dots.forEach((dot, index) => {
            dot.element.style.left = x + 'px';
            dot.element.style.top = y + 'px';
            dot.element.style.opacity = (10 - index) / 20;

            const nextDot = this.dots[index + 1] || this.dots[0];
            x += (nextDot.x - x) * 0.5;
            y += (nextDot.y - y) * 0.5;

            dot.x = x;
            dot.y = y;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Uncomment to enable cursor trail (desktop only)
// if (window.innerWidth > 768) {
//     new CursorTrail();
// }

// ==========================================
// PROGRESS BAR ON SCROLL
// ==========================================
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)';
    progressBar.style.zIndex = '10000';
    progressBar.style.transition = 'width 0.1s ease-out';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

createScrollProgress();

// ==========================================
// LAZY LOADING IMAGES (if you add images later)
// ==========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// DARK/LIGHT MODE TOGGLE
// ==========================================
function initThemeToggle() {
    console.log('Initializing theme toggle...');
    
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    if (!themeToggle) {
        console.error('Theme toggle button not found!');
        return;
    }

    console.log('Theme toggle button found!');

    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', currentTheme);
    console.log('Current theme:', currentTheme);

    // Keep palette icon for theme selector
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        // Always keep palette icon since this is now a theme selector
        icon.className = 'fas fa-palette';
        themeToggle.title = 'Choose Theme';
        console.log('Theme selector ready with palette icon');
    }

    // Initialize theme icon
    updateThemeIcon(currentTheme);

    // Theme toggle functionality
    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Theme toggle clicked!');
        
        // Toggle dropdown instead of switching theme
        const dropdown = document.getElementById('themeDropdown');
        if (dropdown) {
            const isVisible = dropdown.style.opacity === '1' || dropdown.classList.contains('show');
            if (isVisible) {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(-10px) scale(0.95)';
                dropdown.classList.remove('show');
            } else {
                dropdown.style.opacity = '1';
                dropdown.style.visibility = 'visible';
                dropdown.style.transform = 'translateY(0) scale(1)';
                dropdown.classList.add('show');
            }
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
} else {
    initThemeToggle();
}

// ==========================================
// THEME CUSTOMIZATION
// ==========================================
function initThemeCustomization() {
    console.log('Initializing theme customization...');
    
    const themeOptions = document.querySelectorAll('.theme-option');
    const body = document.body;

    if (!themeOptions.length) {
        console.error('Theme options not found!');
        return;
    }

    console.log('Theme options found:', themeOptions.length);

    // Load saved theme or default to 'dark'
    const savedTheme = localStorage.getItem('customTheme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    console.log('Loaded theme:', savedTheme);

    // Add click listeners to theme options
    themeOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const theme = option.getAttribute('data-theme');
            console.log('Switching to theme:', theme);
            
            // Remove previous theme classes
            body.removeAttribute('data-theme');
            
            // Add new theme
            body.setAttribute('data-theme', theme);
            
            // Save to localStorage
            localStorage.setItem('customTheme', theme);
            
            // Add smooth transition
            body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            setTimeout(() => {
                body.style.transition = '';
            }, 300);
            
            // Show success message
            showThemeNotification(theme);
            
            // Hide dropdown
            const dropdown = document.getElementById('themeDropdown');
            if (dropdown) {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(-10px) scale(0.95)';
                dropdown.classList.remove('show');
            }
        });
    });
}

function showThemeNotification(theme) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'theme-notification';
    notification.innerHTML = `
        <i class="fas fa-palette"></i>
        <span>Switched to ${theme.charAt(0).toUpperCase() + theme.slice(1)} theme!</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-card);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        border: 1px solid var(--primary);
        box-shadow: var(--shadow-lg);
        backdrop-filter: blur(15px);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize theme customization
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing theme customization...');
    initThemeCustomization();
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const themeSelector = document.querySelector('.theme-selector');
    const dropdown = document.getElementById('themeDropdown');
    
    if (themeSelector && dropdown && !themeSelector.contains(e.target)) {
        dropdown.style.opacity = '0';
        dropdown.style.visibility = 'hidden';
        dropdown.style.transform = 'translateY(-10px) scale(0.95)';
        dropdown.classList.remove('show');
    }
});

// ==========================================
// DOWNLOAD CV AS PDF
// ==========================================
function initDownloadCV() {
    console.log('Initializing download CV...');
    
    const downloadCV = document.getElementById('downloadCV');

    if (!downloadCV) {
        console.error('Download CV button not found!');
        return;
    }

    console.log('Download CV button found!');

    downloadCV.addEventListener('click', () => {
        console.log('Download CV clicked!');
    // Show loading state
    const icon = downloadCV.querySelector('i');
    const originalIcon = icon.className;
    icon.className = 'fas fa-spinner fa-spin';
    downloadCV.disabled = true;
    
    // Create a simple PDF download (using browser's print to PDF)
    setTimeout(() => {
        // Create a new window with print-friendly content
        const printWindow = window.open('', '_blank');
        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Cao Phan Khanh Duy - CV</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
                    .header { text-align: center; margin-bottom: 30px; }
                    .name { font-size: 2.5em; font-weight: bold; color: #333; margin-bottom: 10px; }
                    .title { font-size: 1.2em; color: #666; margin-bottom: 20px; }
                    .contact { margin-bottom: 30px; }
                    .section { margin-bottom: 25px; }
                    .section h2 { color: #333; border-bottom: 2px solid #6366f1; padding-bottom: 5px; }
                    .section h3 { color: #555; margin-top: 15px; }
                    .section h4 { color: #666; margin-top: 10px; }
                    .date { color: #888; font-style: italic; }
                    .highlight { background-color: #f0f0f0; padding: 2px 4px; border-radius: 3px; }
                    ul { margin: 10px 0; }
                    li { margin: 5px 0; }
                    .badge { background-color: #6366f1; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8em; }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="name">Cao Phan Khanh Duy</div>
                    <div class="title">Data Scientist / AI Engineer</div>
                    <div class="contact">
                        +84-978-650-231 | hauduy20122002@gmail.com<br>
                        Ho Chi Minh City - 700000, Vietnam
                    </div>
                </div>
                
                <div class="section">
                    <h2>OBJECTIVE</h2>
                    <p>AI/ML Engineer with a strong research background in efficient deep learning. Experienced in building, optimizing, and deploying Transformer-based models. Focused on lightweight foundation model efficiency, quantization, and scalable training. First author of multiple Q1/Q2 publications and active contributor to reproducible AI research and open-source pipelines.</p>
                </div>
                
                <div class="section">
                    <h2>PROFESSIONAL SUMMARY</h2>
                    <ul>
                        <li>E2E AI lifecycle: data collection/preprocessing → training/evaluation → deployment</li>
                        <li>Production ML: real-time pipelines Spark/Flink → Apache Beam → PostgreSQL, containerized Docker, automated via CI/CD</li>
                        <li>Research-to-production: first-author 2 Q2 publications, first-author 3 Q1 papers (Under review)</li>
                    </ul>
                </div>
                
                <div class="section">
                    <h2>EDUCATION</h2>
                    <h3>Industrial University of Ho Chi Minh City</h3>
                    <h4>Bachelor of Engineering – Data Science</h4>
                    <div class="date">08/2021 – 11/2025</div>
                    <ul>
                        <li><span class="badge">Valedictorian</span> October 2025 Ceremony – Ranked 1st overall among all university graduates</li>
                        <li>GPA 3.77/4.00, Ranked 1 in Faculty of IT (4,000+ students)</li>
                        <li>Thesis: proposed a Quantum-Inspired Algorithm – Grade 10/10</li>
                        <li>6× merit-based scholarships (Top 5% over consecutive terms)</li>
                    </ul>
                </div>
                
                <div class="section">
                    <h2>EXPERIENCE</h2>
                    <h3>Data Scientist (Full-time)</h3>
                    <h4>MS Digital - Nam Viet Media</h4>
                    <div class="date">02/2025 – Present</div>
                    <ul>
                        <li>Designed scalable content recommendation and fraud detection systems serving 30K+ MAU</li>
                        <li>Developed feature-store pipelines using Apache Beam + PostgreSQL for real-time data ingestion</li>
                        <li>Conducted model compression & optimization for faster inference</li>
                    </ul>
                    
                    <h3>Researcher (Intern)</h3>
                    <h4>CIS Lab – National Chung Cheng University</h4>
                    <div class="date">07/2024 – 12/2024</div>
                    <ul>
                        <li>Audio Anti-spoofing (Q2) — multi-channel (STFT/CQT/MFCC) + split-attention; experimental design, quantitative evaluation</li>
                        <li>Identity Cues (Vision) — skeleton-based gait recognition with 99% accuracy; pipeline reproducibility evaluation</li>
                        <li>Wrote experiment pipelines in PyTorch and Tensorflow; handled GPU resource scheduling and result reproducibility</li>
                    </ul>
                </div>
                
                <div class="section">
                    <h2>PUBLICATIONS</h2>
                    <p><strong>Under Review (Q1):</strong></p>
                    <ul>
                        <li>PBA-Net: A Dual-Branch Architecture with Positional Bias Attention and Multi-Scale CNN for Vietnamese Aspect-Based Sentiment Analysis</li>
                        <li>ViGSA: A Multi-Task Aspect-Based Sentiment Analysis Model with Auxiliary Embedding and Global Sentiment Integration for Vietnamese Restaurant Reviews</li>
                        <li>HQSMA: A quantum-enhanced hybrid attention mechanism for efficient anti-spoofing in automatic speaker verification</li>
                    </ul>
                    
                    <p><strong>Published (Q2):</strong></p>
                    <ul>
                        <li>VDD: Voice deepfake detection with three-channel acoustic representations and advanced split-attention networks</li>
                        <li>MBAAF: Multi-Branch Lightweight Architecture for Audio Spoofing Detection with Temporal Gating and CBAM-Based Attention Fusion</li>
                    </ul>
                </div>
                
                <div class="section">
                    <h2>SKILLS</h2>
                    <p><strong>Research:</strong> experimental design, model evaluation, error analysis</p>
                    <p><strong>Programming:</strong> Python, SQL</p>
                    <p><strong>ML Frameworks:</strong> PyTorch, TensorFlow, scikit-learn, HuggingFace</p>
                    <p><strong>Data & Pipelines:</strong> Apache Beam, Flink, Spark, pandas/NumPy, PostgreSQL</p>
                    <p><strong>MLOps/Deployment:</strong> Docker, CI/CD, MLflow, monitoring & drift detection</p>
                </div>
                
                <div class="section">
                    <h2>AWARDS & HONORS</h2>
                    <ul>
                        <li>Vietnam University Student Math Olympiad (Bronze Medal, Algebra Division) - 2023, 2025</li>
                        <li>Excellent Student of the Year – Faculty of Information Technology - 2023</li>
                        <li>Satellite Application Proposal Presenter - 2024</li>
                        <li>Finalist – DIVE2025 (Data Insight Visualization Event) - 2025</li>
                        <li>Presenter – 3MT (Three Minute Thesis) Competition - 2025</li>
                    </ul>
                </div>
            </body>
            </html>
        `;
        
        printWindow.document.write(printContent);
        printWindow.document.close();
        
        // Wait for content to load, then trigger print
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
        
        // Reset button state
        icon.className = originalIcon;
        downloadCV.disabled = false;
    }, 1000);
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDownloadCV);
} else {
    initDownloadCV();
}

// ==========================================
// SKILLS PROGRESS BARS ANIMATION
// ==========================================
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 200);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

// Observe all skill category charts
document.querySelectorAll('.skill-category-chart').forEach(chart => {
    skillsObserver.observe(chart);
});

// ==========================================
// CONSOLE MESSAGE
// ==========================================
console.log('%c👋 Hello! Thanks for visiting my CV!', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cInterested in the code? Check out the repository on GitHub!', 'font-size: 14px; color: #8b5cf6;');
console.log('%c🚀 Built with HTML, CSS, and vanilla JavaScript', 'font-size: 12px; color: #94a3b8;');
console.log('%c🌙 Try the Dark/Light mode toggle!', 'font-size: 12px; color: #10b981;');

// ==========================================
// PERFORMANCE MONITORING
// ==========================================
window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`%c⚡ Page loaded in ${loadTime}ms`, 'font-size: 12px; color: #10b981;');
});

// ==========================================
// EASTER EGG: Konami Code
// ==========================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 5000);
    
    console.log('%c🎉 You found the Easter egg!', 'font-size: 24px; color: #ec4899; font-weight: bold;');
}

// ==========================================
// EXPORT FOR POTENTIAL MODULE USE
// ==========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ParticleEffect,
        CursorTrail,
        animateCounter
    };
}

