// 3D Effects JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize 3D effects
    initialize3DEffects();
});

function initialize3DEffects() {
    // Initialize hero 3D background
    initHero3DBackground();
    
    // Initialize category 3D background if on category page
    if (document.querySelector('#category-canvas-container')) {
        initCategory3DBackground();
    }
    
    // Initialize 3D product hover effects
    init3DProductHover();
}

function initHero3DBackground() {
    const container = document.getElementById('hero-canvas-container');
    if (!container) return;
    
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Create grid of particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 2000;
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const colorOptions = [
        new THREE.Color(0x0066ff), // primary-blue
        new THREE.Color(0x00a8ff), // light-blue
        new THREE.Color(0x00eeff)  // neon-blue
    ];
    
for (let i = 0; i < particleCount; i++) {

        // Position
        const x = (Math.random() - 0.5) * 100;
        const y = (Math.random() - 0.5) * 100;
        const z = (Math.random() - 0.5) * 50;
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        
        // Color
        const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Create material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    // Create points
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Add some light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x00a8ff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) / 100;
        mouseY = (event.clientY - windowHalfY) / 100;
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Smooth camera movement
        targetX = mouseX * 0.2;
        targetY = -mouseY * 0.2;
        
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (targetY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        
        // Rotate particles
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0005;
        
        // Render scene
        renderer.render(scene, camera);
    }
    
    animate();
}

function initCategory3DBackground() {
    const container = document.getElementById('category-canvas-container');
    if (!container) return;
    
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Create a grid
    const gridSize = 20;
    const gridDivisions = 20;
    const gridColor = 0x00a8ff;
    
    const grid = new THREE.GridHelper(gridSize, gridDivisions, gridColor, gridColor);
    grid.rotation.x = Math.PI / 2;
    grid.position.z = -5;
    scene.add(grid);
    
    // Create floating cubes
    const cubes = [];
    const cubeCount = 20;
    
for (let i = 0; i < cubeCount; i++) {

        const size = Math.random() * 0.5 + 0.2;
        const geometry = new THREE.BoxGeometry(size, size, size);
        
        const material = new THREE.MeshPhongMaterial({
            color: 0x00a8ff,
            transparent: true,
            opacity: 0.7,
            emissive: 0x00eeff,
            emissiveIntensity: 0.2
        });
        
        const cube = new THREE.Mesh(geometry, material);
        
        // Random position
        cube.position.x = (Math.random() - 0.5) * 20;
        cube.position.y = (Math.random() - 0.5) * 10;
        cube.position.z = (Math.random() - 0.5) * 10 - 5;
        
        // Random rotation
        cube.rotation.x = Math.random() * Math.PI;
        cube.rotation.y = Math.random() * Math.PI;
        
        // Store animation parameters
        cube.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            },
            floatSpeed: Math.random() * 0.01 + 0.005,
            floatOffset: Math.random() * Math.PI * 2
        };
        
        scene.add(cube);
        cubes.push(cube);
    }
    
    // Add some light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x00a8ff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) / 100;
        mouseY = (event.clientY - windowHalfY) / 100;
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Smooth camera movement
        targetX = mouseX * 0.2;
        targetY = -mouseY * 0.2;
        
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (targetY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        
        // Animate cubes
        const time = Date.now() * 0.001;
        
        cubes.forEach(cube => {
            // Rotate
            cube.rotation.x += cube.userData.rotationSpeed.x;
            cube.rotation.y += cube.userData.rotationSpeed.y;
            cube.rotation.z += cube.userData.rotationSpeed.z;
            
            // Float up and down
            cube.position.y += Math.sin(time + cube.userData.floatOffset) * cube.userData.floatSpeed;
        });
        
        // Rotate grid
        grid.rotation.z += 0.001;
        
        // Render scene
        renderer.render(scene, camera);
    }
    
    animate();
}

function init3DProductHover() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 20;
            const rotateX = (centerY - y) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            
            // Add dynamic shadow
            card.style.boxShadow = `
                ${-rotateY}px ${rotateX}px 20px rgba(0, 102, 255, 0.2),
                0 15px 40px rgba(0, 102, 255, 0.3)
            `;
            
            // Add shine effect
            const shine = card.querySelector('.holographic-effect');
            if (shine) {
                shine.style.background = `
                    radial-gradient(
                        circle at ${x}px ${y}px,
                        rgba(0, 238, 255, 0.4) 0%,
                        rgba(0, 168, 255, 0.1) 50%,
                        rgba(0, 102, 255, 0) 100%
                    )
                `;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
            
            const shine = card.querySelector('.holographic-effect');
            if (shine) {
                shine.style.background = '';
            }
        });
    });
}

// Create a 3D floating logo effect
function createFloatingLogo() {
    const logo = document.querySelector('.logo');
    if (!logo) return;
    
    logo.addEventListener('mousemove', (e) => {
        const rect = logo.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = (x - centerX) / 10;
        const rotateX = (centerY - y) / 10;
        
        logo.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    logo.addEventListener('mouseleave', () => {
        logo.style.transform = '';
    });
}

createFloatingLogo();

// Create 3D parallax effect for hero section
function createHeroParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const heroContent = document.querySelector('.hero-content');
    
    hero.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const moveX = (x - 0.5) * 20;
        const moveY = (y - 0.5) * 20;
        
        heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    hero.addEventListener('mouseleave', () => {
        heroContent.style.transform = '';
    });
}

createHeroParallax();

// Create 3D tilt effect for buttons
function createButtonTiltEffect() {
    const buttons = document.querySelectorAll('.cta-button, .add-to-cart, .learn-more');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 10;
            const rotateX = (centerY - y) / 10;
            
            button.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
}

createButtonTiltEffect();

// Create 3D depth effect for category cards
function createCategoryDepthEffect() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        const image = card.querySelector('.category-image');
        const overlay = card.querySelector('.category-overlay');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 20;
            const rotateX = (centerY - y) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

createCategoryDepthEffect();
