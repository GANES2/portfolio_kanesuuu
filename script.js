// Commented out as scroll buttons were removed in UI redesign
/*
function scrollLeft(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.scrollLeft -= container.offsetWidth;
    }
}

function scrollRight(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.scrollLeft += container.offsetWidth;
    }
}
*/

const themeToggle = document.querySelector('.theme-toggle');

// Check saved theme preference
if (localStorage.getItem('lightTheme') === 'true') {
    document.body.classList.add('light-theme');
}

// Scroll Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

// Smooth Scrolling
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header Scroll Effect - Throttled
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            const header = document.querySelector('header');
            header.classList.toggle('scrolled', window.scrollY > 50);
            scrollTimeout = null;
        }, 16); // ~60fps
    }
});

// Dynamic WIB Clock and Date
function updateWIBDateTime() {
    // Time Options
    const timeOptions = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    
    // Date Options
    const dateOptions = {
        timeZone: 'Asia/Jakarta',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    };
    
    const now = new Date();
    
    // Update Clock
    const timeString = now.toLocaleTimeString('id-ID', timeOptions);
    document.getElementById('wib-clock').textContent = `WIB: ${timeString}`;
    
    // Update Date (DD/MM/YYYY format)
    let dateString = now.toLocaleDateString('id-ID', dateOptions);
    dateString = dateString.replace(/\./g, '/');
    const parts = dateString.split('/');
    if (parts[0].length === 1) parts[0] = '0' + parts[0];
    if (parts[1].length === 1) parts[1] = '0' + parts[1];
    const formattedDate = parts.join('/');
    
    // Update all date elements
    document.querySelectorAll('.date').forEach(el => {
        el.textContent = formattedDate;
    });
    
    // Update copyright year
    document.getElementById('current-year').textContent = now.getFullYear();
}

// Music Player
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

const bubblesContainer = document.querySelector('.music-bubbles-container');
let bubbleInterval;

function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    const size = Math.random() * 15 + 10; // 10 to 25 px
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * (bubblesContainer.clientWidth - size)}px`;
    bubble.style.animationDuration = `${Math.random() * 2 + 2}s`; // 2 to 4 seconds
    bubblesContainer.appendChild(bubble);

    bubble.addEventListener('animationend', () => {
        bubble.remove();
    });
}

function startBubbles() {
    if (bubbleInterval) return;
    bubbleInterval = setInterval(createBubble, 500);
}

function stopBubbles() {
    clearInterval(bubbleInterval);
    bubbleInterval = null;
    // Remove all existing bubbles
    while (bubblesContainer.firstChild) {
        bubblesContainer.firstChild.remove();
    }
}

function initMusicPlayer() {
    bgMusic.volume = 0.3;
    bgMusic.play().then(() => {
        isPlaying = true;
        updateMusicButton();
        startBubbles();
    }).catch(e => console.log('Autoplay prevented:', e));
    
    musicToggle.addEventListener('click', toggleMusic);
}

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        stopBubbles();
    } else {
        bgMusic.play();
        startBubbles();
    }
    isPlaying = !isPlaying;
    updateMusicButton();
}

function updateMusicButton() {
    if (isPlaying) {
        musicToggle.classList.add('music-playing');
        musicToggle.querySelector('.music-text').textContent = 'Pause Music';
    } else {
        musicToggle.classList.remove('music-playing');
        musicToggle.querySelector('.music-text').textContent = 'Play Music';
    }
}

const profilePhoto = document.querySelector('.profile-photo');
if (profilePhoto) {
    profilePhoto.addEventListener('mouseenter', () => {
        const frame = profilePhoto.closest('.photo-frame');
        frame.style.animation = 'rgbBorder 1s infinite';
    });
    
    profilePhoto.addEventListener('mouseleave', () => {
        const frame = profilePhoto.closest('.photo-frame');
        frame.style.animation = 'rgbBorder 8s infinite linear';
    });
}

// RGB Hover Effects
document.querySelectorAll('.rgb-hover').forEach(el => {
    el.addEventListener('mouseenter', () => {
        el.style.animation = 'rgbBorder 2s infinite';
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.animation = 'none';
    });
});

// RGB Movement Effect for Arrow Keys
let moving = false;
const body = document.body;
const movementKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
const keysPressed = new Set();

function updateMovementEffect() {
    if (keysPressed.size > 0) {
        if (!moving) {
            moving = true;
            body.classList.add('rgb-move-effect');
        }
    } else {
        if (moving) {
            moving = false;
            body.classList.remove('rgb-move-effect');
        }
    }
}

window.addEventListener('keydown', (e) => {
    if (movementKeys.includes(e.key)) {
        keysPressed.add(e.key);
        updateMovementEffect();
    }
});

window.addEventListener('keyup', (e) => {
    if (movementKeys.includes(e.key)) {
        keysPressed.delete(e.key);
        updateMovementEffect();
    }
});

// Form Submission
document.querySelector('.contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent! (Demo)');
    e.target.reset();
});

// Portfolio Filter
const filterButtons = document.querySelectorAll('.portfolio-filter button');
const portfolioItems = document.querySelectorAll('#projects .project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initMusicPlayer();
    updateWIBDateTime();
    setInterval(updateWIBDateTime, 1000);

    // Animated Text Typing Effect
    const typedText = document.querySelector(".typed-text");
    const cursor = document.querySelector(".cursor");
    const textArray = ["Aku Butuh Kopi", "Portfolio Kanesuuu", "Selamat Datang!"];
    let textIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textIndex].length) {
            typedText.textContent += textArray[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedText.textContent = textArray[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            textIndex = (textIndex + 1) % textArray.length;
            setTimeout(type, 1000);
        }
    }

    if (textArray.length) setTimeout(type, 1000);

    // Mouse Move Parallax Background - Throttled
    const hero = document.querySelector('.hero');
    let parallaxTimeout;
    hero?.addEventListener('mousemove', (e) => {
        if (!parallaxTimeout) {
            parallaxTimeout = requestAnimationFrame(() => {
                const x = (e.clientX / window.innerWidth) * 10;
                const y = (e.clientY / window.innerHeight) * 10;
                hero.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
                parallaxTimeout = null;
            });
        }
    });

    // Automatic Dark/Light Mode Based on Time
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }

    // tsParticles Initialization with delay to ensure theme is set and library loaded
    let particlesContainer;
    let heroParticlesContainer;
    setTimeout(() => {
        if (typeof tsParticles !== 'undefined') {
            const isLight = document.body.classList.contains('light-theme');
            const config = {
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: 30,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 2,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: isLight ? "#000000" : "#ffffff",
                    },
                    links: {
                        color: isLight ? "#000000" : "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 1,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 2,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 30,
                    },
                    opacity: {
                        value: 1,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 3, max: 8 },
                    },
                },
                detectRetina: true,
            };
            tsParticles.load("tsparticles", config).then(container => {
                particlesContainer = container;
            }).catch(err => console.error('tsParticles init error:', err));

            // Hero Particles Initialization
            const heroConfig = {
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: 30,
                particles: {
                    color: {
                        value: isLight ? ["#000080", "#4b0082", "#8b0000", "#000000"] : ["#00bfff", "#8a2be2", "#ff69b4", "#ffffff"],
                    },
                    links: {
                        enable: false,
                    },
                    collisions: {
                        enable: false,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "out",
                        },
                        random: true,
                        speed: 1,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 400,
                        },
                        value: 10,
                    },
                    opacity: {
                        value: { min: 0.3, max: 0.8 },
                        animation: {
                            enable: true,
                            speed: 1,
                            sync: false,
                        },
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 2, max: 6 },
                    },
                },
                detectRetina: true,
            };
            tsParticles.load("hero-particles", heroConfig).then(container => {
                heroParticlesContainer = container;
            }).catch(err => console.error('Hero tsParticles init error:', err));
        } else {
            console.error('tsParticles not loaded');
        }
    }, 500);

    // Consolidated Theme Toggle with Particle Update and Electric Glow
    themeToggle.addEventListener('click', () => {
        document.body.classList.add('theme-transition-electric');
        document.body.classList.toggle('light-theme');
        localStorage.setItem('lightTheme', document.body.classList.contains('light-theme'));
        setTimeout(() => {
            document.body.classList.remove('theme-transition-electric');
        }, 500);
        setTimeout(() => {
            const isLight = document.body.classList.contains('light-theme');
            if (particlesContainer) {
                particlesContainer.options.particles.color.value = isLight ? "#000000" : "#ffffff";
                particlesContainer.options.particles.links.color = isLight ? "#000000" : "#ffffff";
                particlesContainer.refresh();
            }
            if (heroParticlesContainer) {
                heroParticlesContainer.options.particles.color.value = isLight ? ["#000080", "#4b0082", "#8b0000", "#000000"] : ["#00bfff", "#8a2be2", "#ff69b4", "#ffffff"];
                heroParticlesContainer.refresh();
            }
        }, 100);
    });
});

// Hover Sound FX on Buttons and Links
const hoverSound = document.getElementById('hoverSound');
document.querySelectorAll('button, a').forEach(el => {
    el.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play();
    });
});

// Footer Particles Animation and Back to Top Button
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('footer-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = document.querySelector('footer').offsetHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 50,
            radius: Math.random() * 2 + 1,
            speed: Math.random() * 1 + 0.5,
            alpha: Math.random() * 0.5 + 0.5
        };
    }

    for (let i = 0; i < 20; i++) {
        particles.push(createParticle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let p of particles) {
            p.y -= p.speed;
            if (p.y < -10) {
                Object.assign(p, createParticle());
                p.y = canvas.height;
            }
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
            ctx.fill();
        }
        requestAnimationFrame(animate);
    }

    animate();

    // Back to Top Button
    const backToTop = document.getElementById("backToTop");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTop.style.display = "flex";
        } else {
            backToTop.style.display = "none";
        }
    });
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
