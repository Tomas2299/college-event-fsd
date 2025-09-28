/**
 * HENOSIS 2K25 - ULTIMATE CYBERPUNK JAVASCRIPT
 * The Most Spectacular Interactive Experience Ever Created
 */

class UltimateCyberpunkSystem {
  constructor() {
    this.isLoaded = false;
    this.audioEnabled = false;
    this.trails = [];
    this.particles = [];
    this.countdownTarget = new Date('December 15, 2025 09:00:00').getTime();
    this.registrationCount = 3247;
    this.animationFrames = new Set();
    this.intervals = new Set();
    this.timeouts = new Set();
    
    this.init();
  }

  // ULTIMATE INITIALIZATION
  init() {
    this.showLoadingScreen();
    this.setupUltimateCursor();
    this.setupMatrixRain();
    this.setupNeuralNetwork();
    this.setupNavigation();
    this.setupCountdown();
    this.setupFormSystem();
    this.setupAudioSystem();
    this.setupVRSystem();
    this.setupScrollEffects();
    this.setupInteractions();
    
    // Complete loading
    setTimeout(() => {
      this.completeLoading();
    }, 4000);
  }

  // SPECTACULAR LOADING SCREEN
  showLoadingScreen() {
    const progressBar = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const statValues = document.querySelectorAll('.loading-stats .stat-value');
    
    let progress = 0;
    
    const updateProgress = () => {
      progress += Math.random() * 8 + 2;
      if (progress > 100) progress = 100;
      
      if (progressBar) progressBar.style.width = progress + '%';
      if (progressText) progressText.textContent = Math.floor(progress) + '%';
      
      // Animate stat counters
      statValues.forEach((stat, index) => {
        const target = parseInt(stat.dataset.target);
        const current = Math.floor((progress / 100) * target);
        stat.textContent = current;
      });
      
      if (progress < 100) {
        const timeout = setTimeout(updateProgress, 100 + Math.random() * 200);
        this.timeouts.add(timeout);
      }
    };
    
    updateProgress();
  }

  completeLoading() {
    const loadingScreen = document.getElementById('epic-loading');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        this.isLoaded = true;
        this.startUltimateEffects();
      }, 1000);
    }
  }

  startUltimateEffects() {
    this.animateCounters();
    this.setupIntersectionObserver();
    this.startRegistrationCounter();
    this.initializeActivityGraph();
  }

  // ULTIMATE CURSOR WITH PINK TRAILS
  setupUltimateCursor() {
    const cursorGlow = document.getElementById('cursor-glow');
    const cursorTrail = document.getElementById('cursor-trail');
    const cursorParticles = document.getElementById('cursor-particles');
    
    let mouseX = 0, mouseY = 0;
    let trailIndex = 0;
    
    // Create trail elements
    for (let i = 0; i < 20; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.opacity = (20 - i) / 20;
      trail.style.transform = `scale(${(20 - i) / 20})`;
      document.body.appendChild(trail);
      this.trails.push({
        element: trail,
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0
      });
    }
    
    const updateCursor = () => {
      // Update main cursor
      if (cursorGlow) {
        cursorGlow.style.transform = `translate3d(${mouseX - 20}px, ${mouseY - 20}px, 0)`;
      }
      
      // Update trails with smooth following
      this.trails.forEach((trail, index) => {
        const delay = index * 0.05;
        trail.targetX = mouseX;
        trail.targetY = mouseY;
        
        trail.x += (trail.targetX - trail.x) * (0.3 - delay);
        trail.y += (trail.targetY - trail.y) * (0.3 - delay);
        
        trail.element.style.transform = `translate3d(${trail.x - 4}px, ${trail.y - 4}px, 0)`;
      });
      
      const frame = requestAnimationFrame(updateCursor);
      this.animationFrames.add(frame);
    };
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Create particles on movement
      if (Math.random() > 0.7) {
        this.createCursorParticle(mouseX, mouseY);
      }
    }, { passive: true });
    
    document.addEventListener('click', (e) => {
      this.createClickExplosion(e.clientX, e.clientY);
    });
    
    updateCursor();
  }

  createCursorParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.setProperty('--random-x', (Math.random() - 0.5) * 100 + 'px');
    particle.style.setProperty('--random-y', (Math.random() - 0.5) * 100 + 'px');
    
    document.body.appendChild(particle);
    
    const timeout = setTimeout(() => {
      particle.remove();
    }, 2000);
    this.timeouts.add(timeout);
  }

  createClickExplosion(x, y) {
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.setProperty('--random-x', (Math.random() - 0.5) * 200 + 'px');
      particle.style.setProperty('--random-y', (Math.random() - 0.5) * 200 + 'px');
      particle.style.animationDelay = i * 0.05 + 's';
      
      document.body.appendChild(particle);
      
      const timeout = setTimeout(() => {
        particle.remove();
      }, 2000);
      this.timeouts.add(timeout);
    }
  }

  // MATRIX RAIN EFFECT
  setupMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = 'HENOSIS2K25AIDATASCIENCENEURALMATRIX01010110ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ';
    const matrix = chars.split('');
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);
    
    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = `${fontSize}px 'Orbitron', monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        const hue = 320 + Math.random() * 40; // Pink hues
        ctx.fillStyle = `hsl(${hue}, 100%, ${50 + Math.random() * 30}%)`;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      const frame = requestAnimationFrame(drawMatrix);
      this.animationFrames.add(frame);
    };
    
    drawMatrix();
    
    // Resize handler
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // NEURAL NETWORK VISUALIZATION
  setupNeuralNetwork() {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const nodes = [];
    for (let i = 0; i < 30; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        radius: Math.random() * 4 + 2,
        pulse: Math.random() * Math.PI * 2,
        color: Math.random() > 0.5 ? '#ff0080' : '#00ffff'
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.05;
        
        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Draw node
        const alpha = 0.5 + Math.sin(node.pulse) * 0.3;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        // Draw connections
        nodes.forEach((otherNode, j) => {
          if (i !== j) {
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(otherNode.x, otherNode.y);
              ctx.strokeStyle = `rgba(0, 255, 255, ${(150 - distance) / 150 * 0.5})`;
              ctx.lineWidth = 1;
              ctx.stroke();
              
              // Data flow animation
              const progress = (Date.now() * 0.001) % 1;
              const flowX = node.x + (otherNode.x - node.x) * progress;
              const flowY = node.y + (otherNode.y - node.y) * progress;
              
              ctx.beginPath();
              ctx.arc(flowX, flowY, 2, 0, Math.PI * 2);
              ctx.fillStyle = '#00ffff';
              ctx.fill();
            }
          }
        });
      });
      
      const frame = requestAnimationFrame(animate);
      this.animationFrames.add(frame);
    };
    
    animate();
  }

  // NAVIGATION SYSTEM
  setupNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Hamburger toggle
    hamburger?.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Smooth scroll navigation
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
          const navHeight = 100;
          const targetPos = target.offsetTop - navHeight;
          
          window.scrollTo({
            top: targetPos,
            behavior: 'smooth'
          });
          
          // Close mobile menu
          hamburger?.classList.remove('active');
          navMenu?.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });

    // Theme toggle
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
    });
  }

  // COUNTDOWN SYSTEM
  setupCountdown() {
    const elements = {
      days: document.getElementById('days'),
      hours: document.getElementById('hours'),
      minutes: document.getElementById('minutes'),
      seconds: document.getElementById('seconds')
    };
    
    let lastUpdate = { days: -1, hours: -1, minutes: -1, seconds: -1 };
    
    const updateCountdown = () => {
      const now = Date.now();
      const distance = this.countdownTarget - now;
      
      if (distance < 0) {
        this.handleEventStarted();
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      // Animate number changes
      Object.entries({ days, hours, minutes, seconds }).forEach(([key, value]) => {
        if (lastUpdate[key] !== value && elements[key]) {
          this.animateNumberChange(elements[key], value);
          lastUpdate[key] = value;
        }
      });
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    this.intervals.add(interval);
  }

  animateNumberChange(element, newValue) {
    const formattedValue = newValue.toString().padStart(2, '0');
    
    element.style.transform = 'rotateX(90deg)';
    element.style.transition = 'transform 0.3s ease';
    
    const timeout = setTimeout(() => {
      element.textContent = formattedValue;
      element.style.transform = 'rotateX(0deg)';
    }, 150);
    this.timeouts.add(timeout);
  }

  handleEventStarted() {
    const countdownDisplay = document.querySelector('.countdown-display');
    if (countdownDisplay) {
      countdownDisplay.innerHTML = `
        <div class="event-live" style="text-align: center; padding: 2rem; background: rgba(255, 0, 0, 0.1); border: 2px solid #ff0000; border-radius: 15px; animation: livePulse 2s infinite;">
          <div style="font-size: 2rem; color: #ff0000; margin-bottom: 1rem;">🔴 LIVE NOW</div>
          <div style="font-family: 'Orbitron', monospace; color: #00ffff; font-weight: 700;">NEURAL INTERFACE ACTIVE</div>
        </div>
      `;
    }
  }

  // FORM SYSTEM
  setupFormSystem() {
    const form = document.getElementById('registrationForm');
    if (!form) return;
    
    const validators = {
      name: (val) => val.length >= 2 && /^[a-zA-Z\s.'-]+$/.test(val),
      email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      phone: (val) => /^[+]?[\d\s\-()]{10,15}$/.test(val),
      college: (val) => val.length >= 2,
      event: (val) => val !== ''
    };
    
    // Real-time validation
    const inputs = form.querySelectorAll('.ultimate-input, .ultimate-select');
    inputs.forEach(input => {
      let timeout;
      
      input.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          const isValid = validators[input.name]?.(input.value.trim()) ?? true;
          input.classList.toggle('valid', isValid && input.value.trim());
          input.classList.toggle('error', !isValid);
          this.createInputParticles(input, isValid);
        }, 300);
        this.timeouts.add(timeout);
      }, { passive: true });
    });
    
    // Form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.handleFormSubmit(form);
    });
  }

  createInputParticles(input, isValid) {
    const container = input.closest('.input-container, .select-container');
    if (!container) return;
    
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 3px;
        height: 3px;
        background: ${isValid ? '#00ff41' : '#ff4444'};
        border-radius: 50%;
        pointer-events: none;
        z-index: 10;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: inputParticle 2s ease-out forwards;
      `;
      
      container.appendChild(particle);
      
      const timeout = setTimeout(() => {
        particle.remove();
      }, 2000);
      this.timeouts.add(timeout);
    }
  }

  async handleFormSubmit(form) {
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = document.getElementById('btnLoader');
    const formMessage = document.getElementById('formMessage');
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.innerHTML = '<i class="fas fa-cog fa-spin"></i> SYNCING NEURAL DATA...';
    if (btnLoader) btnLoader.style.display = 'inline-block';
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success
      if (formMessage) {
        formMessage.innerHTML = '🎉 Neural interface activated! Welcome to HENOSIS 2K25!';
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';
      }
      
      form.reset();
      this.registrationCount++;
      this.updateRegistrationDisplay();
      this.createSuccessExplosion();
      
      // Auto hide message
      const timeout = setTimeout(() => {
        if (formMessage) formMessage.style.display = 'none';
      }, 8000);
      this.timeouts.add(timeout);
      
    } catch (error) {
      if (formMessage) {
        formMessage.textContent = '❌ Neural sync failed. Please try again.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
      }
    } finally {
      submitBtn.disabled = false;
      btnText.innerHTML = '<i class="fas fa-bolt"></i> INITIALIZE NEURAL LINK';
      if (btnLoader) btnLoader.style.display = 'none';
    }
  }

  createSuccessExplosion() {
    const container = document.querySelector('.register-ultimate');
    if (!container) return;
    
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: #00ff41;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        pointer-events: none;
        z-index: 1000;
        box-shadow: 0 0 10px #00ff41;
        animation: successExplosion 3s ease-out forwards;
        animation-delay: ${i * 0.1}s;
      `;
      
      container.appendChild(particle);
      
      const timeout = setTimeout(() => {
        particle.remove();
      }, 3000);
      this.timeouts.add(timeout);
    }
  }

  // AUDIO SYSTEM
  setupAudioSystem() {
    const audioToggle = document.getElementById('audio-toggle');
    if (!audioToggle) return;
    
    let audioContext;
    
    audioToggle.addEventListener('click', () => {
      if (!this.audioEnabled) {
        try {
          audioContext = new (window.AudioContext || window.webkitAudioContext)();
          this.playAmbientSound(audioContext);
          audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
          this.audioEnabled = true;
        } catch (e) {
          console.log('Audio not supported');
        }
      } else {
        if (audioContext) {
          audioContext.close();
          audioContext = null;
        }
        audioToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        this.audioEnabled = false;
      }
    });
  }

  playAmbientSound(audioContext) {
    const createTone = (frequency, duration) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.005, audioContext.currentTime);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    };
    
    // Ambient cyberpunk sounds
    const interval = setInterval(() => {
      if (this.audioEnabled && Math.random() > 0.8) {
        createTone(200 + Math.random() * 400, 0.1);
      }
    }, 2000);
    this.intervals.add(interval);
  }

  // VR SYSTEM
  setupVRSystem() {
    const vrBtn = document.getElementById('vr-experience');
    const vrModal = document.getElementById('vr-modal');
    const closeVr = document.getElementById('close-vr');
    
    vrBtn?.addEventListener('click', () => {
      this.activateVRMode();
    });
    
    closeVr?.addEventListener('click', () => {
      this.deactivateVRMode();
    });
    
    // Close VR on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && vrModal?.classList.contains('active')) {
        this.deactivateVRMode();
      }
    });
  }

  activateVRMode() {
    const vrModal = document.getElementById('vr-modal');
    const vrLoading = document.getElementById('vr-loading');
    const vrContent = document.getElementById('vr-content');
    
    if (vrModal) {
      vrModal.classList.add('active');
      
      // Simulate VR loading
      const timeout = setTimeout(() => {
        if (vrLoading) vrLoading.style.display = 'none';
        if (vrContent) vrContent.style.display = 'block';
      }, 3000);
      this.timeouts.add(timeout);
    }
  }

  deactivateVRMode() {
    const vrModal = document.getElementById('vr-modal');
    const vrLoading = document.getElementById('vr-loading');
    const vrContent = document.getElementById('vr-content');
    
    if (vrModal) {
      vrModal.classList.remove('active');
      
      // Reset VR content
      const timeout = setTimeout(() => {
        if (vrLoading) vrLoading.style.display = 'block';
        if (vrContent) vrContent.style.display = 'none';
      }, 500);
      this.timeouts.add(timeout);
    }
  }

  // SCROLL EFFECTS
  setupScrollEffects() {
    let ticking = false;
    const navbar = document.querySelector('.ultimate-nav');
    
    const updateScroll = () => {
      const scrollY = window.pageYOffset;
      
      // Navbar effect
      if (navbar) {
        navbar.classList.toggle('scrolled', scrollY > 100);
      }
      
      // Parallax effects
      const parallaxElements = document.querySelectorAll('.hero-matrix, .floating-elements');
      parallaxElements.forEach(el => {
        el.style.transform = `translate3d(0, ${scrollY * 0.3}px, 0)`;
      });
      
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  // INTERACTIONS
  setupInteractions() {
    // Enter matrix button
    document.getElementById('enter-matrix')?.addEventListener('click', () => {
      document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Glitch effects on hover
    document.querySelectorAll('.glitch-effect, .glitch-master').forEach(element => {
      element.addEventListener('mouseenter', () => {
        element.style.animation = 'glitchEffect 0.5s ease-in-out';
        const timeout = setTimeout(() => {
          element.style.animation = '';
        }, 500);
        this.timeouts.add(timeout);
      });
    });
    
    // Card hover effects
    document.querySelectorAll('.stat-card, .ultimate-card, .event-card-3d').forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.createHoverRipple(card);
      });
    });
  }

  createHoverRipple(element) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,0,128,0.6) 0%, transparent 70%);
      width: 100px;
      height: 100px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0);
      animation: rippleEffect 1s ease-out;
      pointer-events: none;
      z-index: 10;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    const timeout = setTimeout(() => {
      ripple.remove();
    }, 1000);
    this.timeouts.add(timeout);
  }

  // COUNTER ANIMATIONS
  animateCounters() {
    document.querySelectorAll('.animated-counter').forEach(counter => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      });
      observer.observe(counter);
    });
  }

  animateCounter(element) {
    const target = parseInt(element.dataset.target) || parseInt(element.textContent);
    if (!target || isNaN(target)) return;
    
    let current = 0;
    const increment = target / 60; // 1 second at 60fps
    
    const updateCounter = () => {
      current += increment;
      if (current >= target) {
        element.textContent = target.toLocaleString();
        return;
      }
      
      element.textContent = Math.floor(current).toLocaleString();
      const frame = requestAnimationFrame(updateCounter);
      this.animationFrames.add(frame);
    };
    
    updateCounter();
  }

  // INTERSECTION OBSERVER
  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    
    // Observe all sections
    document.querySelectorAll('section, .ultimate-card, .stat-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(50px)';
      el.style.transition = 'all 0.8s ease';
      observer.observe(el);
    });
  }

  // REGISTRATION COUNTER
  startRegistrationCounter() {
    const interval = setInterval(() => {
      this.registrationCount += Math.floor(Math.random() * 3) + 1;
      this.updateRegistrationDisplay();
    }, 5000);
    this.intervals.add(interval);
  }

  updateRegistrationDisplay() {
    const countElement = document.getElementById('live-registrations');
    if (countElement) {
      countElement.textContent = this.registrationCount.toLocaleString();
    }
  }

  // ACTIVITY GRAPH
  initializeActivityGraph() {
    const canvas = document.getElementById('activity-graph');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    const dataPoints = [];
    for (let i = 0; i < 50; i++) {
      dataPoints.push(Math.random() * height * 0.8 + height * 0.1);
    }
    
    let animationFrame = 0;
    
    const drawGraph = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw grid
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < 5; i++) {
        const y = (height / 4) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      // Draw data line
      ctx.strokeStyle = '#ff0080';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      const pointWidth = width / (dataPoints.length - 1);
      
      dataPoints.forEach((point, i) => {
        const x = i * pointWidth;
        const y = point + Math.sin(animationFrame * 0.02 + i * 0.1) * 10;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
      
      // Add glow effect
      ctx.shadowColor = '#ff0080';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      animationFrame++;
      
      // Update data
      if (animationFrame % 30 === 0) {
        dataPoints.shift();
        dataPoints.push(Math.random() * height * 0.8 + height * 0.1);
      }
      
      const frame = requestAnimationFrame(drawGraph);
      this.animationFrames.add(frame);
    };
    
    drawGraph();
  }

  // CLEANUP
  destroy() {
    // Clear all animation frames
    this.animationFrames.forEach(frame => cancelAnimationFrame(frame));
    this.animationFrames.clear();
    
    // Clear all intervals
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals.clear();
    
    // Clear all timeouts
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts.clear();
    
    // Remove trail elements
    this.trails.forEach(trail => trail.element.remove());
    this.trails = [];
  }
}

// Add CSS animations dynamically
const ultimateStyles = document.createElement('style');
ultimateStyles.textContent = `
  @keyframes rippleEffect {
    0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
  }
  
  @keyframes inputParticle {
    0% { opacity: 1; transform: scale(0); }
    50% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(0) translateY(-20px); }
  }
  
  @keyframes successExplosion {
    0% { opacity: 1; transform: scale(0) rotate(0deg); }
    100% { opacity: 0; transform: scale(2) rotate(360deg) translate(200px, 200px); }
  }
  
  @keyframes livePulse {
    0%, 100% { box-shadow: 0 0 20px rgba(255, 0, 0, 0.5); }
    50% { box-shadow: 0 0 40px rgba(255, 0, 0, 1); }
  }
`;
document.head.appendChild(ultimateStyles);

// Initialize the Ultimate Cyberpunk System
document.addEventListener('DOMContentLoaded', () => {
  window.ultimateCyberpunkSystem = new UltimateCyberpunkSystem();
});

// Performance monitoring
window.addEventListener('load', () => {
  if (typeof performance !== 'undefined') {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`🚀 HENOSIS 2K25 Ultimate System loaded in ${loadTime}ms`);
  }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (window.ultimateCyberpunkSystem) {
    window.ultimateCyberpunkSystem.destroy();
  }
});

// Export for global access
window.UltimateCyberpunkSystem = UltimateCyberpunkSystem;
