// Three.js 3D Scene Setup
let scene, camera, renderer, mouse, raycaster;
let objects = [];
let particles = [];
let isHovering = false;
let hoveredObject = null;

// Initialize Three.js Scene
function initThreeJS() {
    console.log('Initializing Three.js...');

    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        throw new Error('Three.js library not loaded');
    }

    // Check if canvas exists
    const canvas = document.getElementById('threejs-canvas');
    if (!canvas) {
        throw new Error('Three.js canvas not found');
    }

    try {
        // Create scene
        scene = new THREE.Scene();
        console.log('Scene created');

        // Create camera
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // Create renderer
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: window.devicePixelRatio <= 1 // Reduce antialiasing on high DPI
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio

        console.log('Renderer created');

        // Mouse and raycaster for interactions
        mouse = new THREE.Vector2();
        raycaster = new THREE.Raycaster();

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        // Create floating objects (reduced count for performance)
        createFloatingObjects();

        // Create particle system
        createParticleSystem();

        // Add event listeners
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onWindowResize);

        console.log('Three.js initialized successfully');

        // Start animation loop
        animate();

    } catch (error) {
        console.error('Three.js initialization error:', error);
        // Hide canvas if initialization fails
        const canvas = document.getElementById('threejs-canvas');
        if (canvas) {
            canvas.style.display = 'none';
        }
        throw error;
    }
}

// Create floating geometric objects
function createFloatingObjects() {
    const geometries = [
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.SphereGeometry(0.5, 32, 32),
        new THREE.CylinderGeometry(0.5, 0.5, 1, 32),
        new THREE.TetrahedronGeometry(0.8),
        new THREE.OctahedronGeometry(0.7),
        new THREE.IcosahedronGeometry(0.6)
    ];

    const materials = [
        new THREE.MeshPhongMaterial({ color: 0xff6b35, transparent: true, opacity: 0.8 }),
        new THREE.MeshPhongMaterial({ color: 0x667eea, transparent: true, opacity: 0.8 }),
        new THREE.MeshPhongMaterial({ color: 0x764ba2, transparent: true, opacity: 0.8 }),
        new THREE.MeshPhongMaterial({ color: 0xffecd2, transparent: true, opacity: 0.8 }),
        new THREE.MeshPhongMaterial({ color: 0xcb997e, transparent: true, opacity: 0.8 }),
        new THREE.MeshPhongMaterial({ color: 0xddbea9, transparent: true, opacity: 0.8 })
    ];

    // Reduce objects on mobile for performance
    const objectCount = isMobileDevice() ? 4 : 6;

    for (let i = 0; i < objectCount; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = materials[Math.floor(Math.random() * materials.length)].clone();
        const mesh = new THREE.Mesh(geometry, material);

        // Random position
        mesh.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        );

        // Random rotation
        mesh.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );

        // Store original scale for hover effects
        mesh.userData.originalScale = mesh.scale.clone();
        mesh.userData.rotationSpeed = {
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02
        };

        scene.add(mesh);
        objects.push(mesh);
    }
}

// Create particle system
function createParticleSystem() {
    const particleSystem = createOptimizedParticleSystem();
    particles.push(particleSystem);
}

// Mouse move handler for hover effects
function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(objects);

    // Reset previous hovered object
    if (hoveredObject && hoveredObject !== intersects[0]?.object) {
        hoveredObject.scale.copy(hoveredObject.userData.originalScale);
        hoveredObject.material.opacity = 0.8;
        isHovering = false;
    }

    if (intersects.length > 0) {
        const object = intersects[0].object;
        if (object !== hoveredObject) {
            hoveredObject = object;
            isHovering = true;

            // Change cursor to pointer
            document.body.style.cursor = 'pointer';

            // Hover effect - scale up and increase opacity
            object.scale.set(
                object.userData.originalScale.x * 1.3,
                object.userData.originalScale.y * 1.3,
                object.userData.originalScale.z * 1.3
            );
            object.material.opacity = 1.0;

            // Add some fun effects
            createHoverParticles(object.position);
            createEnhancedHoverEffect(object);
        }
    } else {
        if (hoveredObject) {
            // Reset cursor
            document.body.style.cursor = 'auto';
        }
        hoveredObject = null;
        isHovering = false;
    }
}

// Create hover particles effect
function createHoverParticles(position) {
    const particleCount = 20;
    const tempParticles = [];

    for (let i = 0; i < particleCount; i++) {
        const geometry = new THREE.SphereGeometry(0.02, 8, 8);
        const material = new THREE.MeshBasicMaterial({
            color: Math.random() > 0.5 ? 0xff6b35 : 0x667eea,
            transparent: true,
            opacity: 1
        });
        const particle = new THREE.Mesh(geometry, material);

        particle.position.set(
            position.x + (Math.random() - 0.5) * 2,
            position.y + (Math.random() - 0.5) * 2,
            position.z + (Math.random() - 0.5) * 2
        );

        particle.userData.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.1,
            (Math.random() - 0.5) * 0.1,
            (Math.random() - 0.5) * 0.1
        );

        particle.userData.life = 1.0;

        scene.add(particle);
        tempParticles.push(particle);
    }

    // Animate and remove particles after a short time
    setTimeout(() => {
        tempParticles.forEach(particle => {
            scene.remove(particle);
        });
    }, 2000);
}

// Window resize handler
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate objects
    objects.forEach((obj, index) => {
        obj.rotation.x += obj.userData.rotationSpeed.x;
        obj.rotation.y += obj.userData.rotationSpeed.y;
        obj.rotation.z += obj.userData.rotationSpeed.z;

        // Add floating motion
        obj.position.y += Math.sin(Date.now() * 0.001 + index) * 0.005;
    });

    // Animate particles
    particles.forEach(particleSystem => {
        if (particleSystem.material.uniforms) {
            particleSystem.material.uniforms.time.value = Date.now() * 0.001;
        }

        const positions = particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] += Math.sin(Date.now() * 0.001 + i * 0.1) * 0.005;
            positions[i + 1] += Math.cos(Date.now() * 0.001 + i * 0.1) * 0.005;
            positions[i + 2] += Math.sin(Date.now() * 0.0005 + i * 0.1) * 0.003;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
    });

    // Camera subtle movement based on mouse
    camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;
    camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

// Performance optimization - reduce particle count on mobile
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth < 768;
}

// Loading screen functions (global scope)
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
        loadingScreen.style.opacity = '1';
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }
        }, 500);
    }
}

// Enhanced particle system with better performance
function createOptimizedParticleSystem() {
    const particleCount = isMobileDevice() ? 100 : 300; // Reduce particles on mobile

    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 25;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 25;

        colors[i * 3] = Math.random() * 0.5 + 0.5; // Brighter colors
        colors[i * 3 + 1] = Math.random() * 0.5 + 0.5;
        colors[i * 3 + 2] = Math.random() * 0.5 + 0.5;

        sizes[i] = Math.random() * 0.05 + 0.02;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 }
        },
        vertexShader: `
            attribute float size;
            uniform float time;
            varying vec3 vColor;

            void main() {
                vColor = color;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z) * (1.0 + sin(time + position.x * 0.1) * 0.3);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;

            void main() {
                float r = distance(gl_PointCoord, vec2(0.5, 0.5));
                if (r > 0.5) discard;

                gl_FragColor = vec4(vColor, 1.0 - r * 2.0);
            }
        `,
        transparent: true,
        vertexColors: true,
        blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    return particleSystem;
}

// Enhanced hover effects with sound-like visual feedback
function createEnhancedHoverEffect(object) {
    // Create ripple effect
    const rippleGeometry = new THREE.RingGeometry(0.5, 1.5, 32);
    const rippleMaterial = new THREE.MeshBasicMaterial({
        color: object.material.color,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
    });

    const ripple = new THREE.Mesh(rippleGeometry, rippleMaterial);
    ripple.position.copy(object.position);
    ripple.lookAt(camera.position);

    scene.add(ripple);

    // Animate ripple
    const startTime = Date.now();
    const animateRipple = () => {
        const elapsed = Date.now() - startTime;
        const scale = 1 + elapsed * 0.01;
        ripple.scale.setScalar(scale);
        ripple.material.opacity = Math.max(0, 0.6 - elapsed * 0.005);

        if (ripple.material.opacity > 0) {
            requestAnimationFrame(animateRipple);
        } else {
            scene.remove(ripple);
        }
    };
    animateRipple();
}

// Initialize Three.js when DOM is loaded
let threeJSInitialized = false;

document.addEventListener('DOMContentLoaded', () => {
    // Show loading screen
    showLoadingScreen();

    // Wait for Three.js library to load
    function tryInitThreeJS() {
        if (typeof THREE !== 'undefined' && !threeJSInitialized) {
            try {
                initThreeJS();
                threeJSInitialized = true;
                console.log('3D Experience loaded successfully!');
                hideLoadingScreen();
            } catch (error) {
                console.error('Three.js initialization failed:', error);
                console.log('Continuing without 3D effects...');
                const canvas = document.getElementById('threejs-canvas');
                if (canvas) {
                    canvas.style.display = 'none';
                }
                hideLoadingScreen();
            }
        } else if (typeof THREE === 'undefined') {
            // Three.js not loaded yet, try again
            setTimeout(tryInitThreeJS, 100);
        }
    }

    // Start trying to initialize
    setTimeout(tryInitThreeJS, 500);

    // Fallback: hide loading screen after 3 seconds regardless
    setTimeout(() => {
        if (!threeJSInitialized) {
            console.log('Three.js timeout - hiding loading screen');
            hideLoadingScreen();
            const canvas = document.getElementById('threejs-canvas');
            if (canvas) {
                canvas.style.display = 'none';
            }
        }
    }, 3000);
});

// Additional fallback for window load
window.addEventListener('load', () => {
    setTimeout(() => {
        hideLoadingScreen();
    }, 2000);
});

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const heroContent = document.querySelector('.hero-content');
const productCards = document.querySelectorAll('.product-card');
const featureItems = document.querySelectorAll('.feature-item');
const contactItems = document.querySelectorAll('.contact-item');
const contactForm = document.querySelector('.contact-form form');

// Mobile Menu Toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
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

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animations
if (heroContent) observer.observe(heroContent);
productCards.forEach(card => observer.observe(card));
featureItems.forEach(item => observer.observe(item));
contactItems.forEach(item => observer.observe(item));

// Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name') || contactForm.querySelector('input[type="text"]').value;
        const email = formData.get('email') || contactForm.querySelector('input[type="email"]').value;
        const message = formData.get('message') || contactForm.querySelector('textarea').value;

        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');

        // Reset form
        contactForm.reset();
    });
}

// Notification System
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: 'Poppins', sans-serif;
        max-width: 400px;
    `;

    // Style notification content
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;

    const icon = content.querySelector('i');
    icon.style.cssText = `
        font-size: 1.2rem;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Product Card Hover Effects
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.backgroundPosition = `center ${rate}px`;
    }
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation to hero content
    setTimeout(() => {
        if (heroContent) {
            heroContent.classList.add('animate');
        }
    }, 300);

    // Add stagger animation to product cards
    productCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate');
        }, 300 + (index * 100));
    });

    // Add stagger animation to feature items
    featureItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, 500 + (index * 150));
    });
});

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    .notification.success {
        background: #4CAF50 !important;
    }

    .notification.error {
        background: #f44336 !important;
    }

    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Back to Top Button
const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #ff6b35;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
    `;

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(button);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
};

// Initialize back to top button
createBackToTopButton();