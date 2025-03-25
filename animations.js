// Animations JavaScript File

document.addEventListener("DOMContentLoaded", () => {
    // Initialize animations
    initializeAnimations()
  })
  
  function initializeAnimations() {
    // Initialize glitch effect
    initGlitchEffect()
  
    // Initialize floating elements
    initFloatingElements()
  
    // Initialize scroll animations
    initScrollAnimations()
  
    // Initialize hover effects
    initHoverEffects()
  
    // Initialize typing animation
    initTypingAnimation()
  
    // Initialize neon flicker
    initNeonFlicker()
  }
  
  function initGlitchEffect() {
    const glitchElements = document.querySelectorAll(".glitch")
  
    glitchElements.forEach((element) => {
      // Make sure the data-text attribute is set
      if (!element.getAttribute("data-text")) {
        element.setAttribute("data-text", element.textContent)
      }
  
      // Add random glitch intervals
      setInterval(() => {
        if (Math.random() > 0.9) {
          element.classList.add("active-glitch")
          setTimeout(() => {
            element.classList.remove("active-glitch")
          }, 200)
        }
      }, 3000)
    })
  }
  
  function initFloatingElements() {
    const floatingElements = document.querySelectorAll(".product-image, .category-image")
  
    floatingElements.forEach((element, index) => {
      // Add floating animation with different delays
      element.style.animation = `float 4s ease-in-out ${index * 0.5}s infinite`
    })
  }
  
  function initScrollAnimations() {
    // Fade in elements as they come into view
    const fadeElements = document.querySelectorAll(".product-card, .category-card, .section-title, .showcase-container")
  
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "0"
            entry.target.style.transform = "translateY(20px)"
  
            // Add animation with delay based on index
            setTimeout(() => {
              entry.target.style.transition = "opacity 0.8s ease, transform 0.8s ease"
              entry.target.style.opacity = "1"
              entry.target.style.transform = "translateY(0)"
            }, 100)
  
            fadeObserver.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
      },
    )
  
    fadeElements.forEach((element) => {
      element.style.opacity = "0"
      fadeObserver.observe(element)
    })
  
    // Staggered animations for grid items
    const gridContainers = document.querySelectorAll(".products-grid, .categories-container")
  
    gridContainers.forEach((container) => {
      const items = container.children
  
      const gridObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            Array.from(items).forEach((item, index) => {
              item.style.opacity = "0"
              item.style.transform = "translateY(20px)"
  
              setTimeout(
                () => {
                  item.style.transition = "opacity 0.5s ease, transform 0.5s ease"
                  item.style.opacity = "1"
                  item.style.transform = "translateY(0)"
                },
                100 + index * 100,
              )
            })
  
            gridObserver.unobserve(container)
          }
        },
        {
          threshold: 0.1,
        },
      )
  
      gridObserver.observe(container)
    })
  }
  
  function initHoverEffects() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll(".cta-button, .add-to-cart, .learn-more")
  
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        button.classList.add("hover-glow")
      })
  
      button.addEventListener("mouseleave", () => {
        button.classList.remove("hover-glow")
      })
    })
  
    // Add hover effects to cards
    const cards = document.querySelectorAll(".product-card, .category-card")
  
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.classList.add("hover-glow-card")
      })
  
      card.addEventListener("mouseleave", () => {
        card.classList.remove("hover-glow-card")
      })
    })
  }
  
  function initTypingAnimation() {
    const typingElements = document.querySelectorAll(".typing-animation")
  
    typingElements.forEach((element) => {
      const text = element.textContent
      element.textContent = ""
  
      let i = 0
      const typeWriter = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i)
          i++
          setTimeout(typeWriter, 100)
        }
      }
  
      // Start typing animation when element is in view
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            typeWriter()
            observer.unobserve(element)
          }
        },
        {
          threshold: 0.5,
        },
      )
  
      observer.observe(element)
    })
  }
  
  function initNeonFlicker() {
    const neonElements = document.querySelectorAll(".neon-text, .highlight")
  
    neonElements.forEach((element) => {
      // Random flicker intervals
      setInterval(() => {
        if (Math.random() > 0.95) {
          element.style.opacity = "0.5"
          setTimeout(() => {
            element.style.opacity = "1"
          }, 100)
        }
      }, 2000)
    })
  }
  
  // Add CSS for additional animation effects
  const animationStyles = document.createElement("style")
  animationStyles.textContent = `
      .active-glitch::before {
          animation: glitch-anim-1 0.2s infinite linear alternate-reverse !important;
      }
      
      .active-glitch::after {
          animation: glitch-anim-2 0.2s infinite linear alternate-reverse !important;
      }
      
      .hover-glow {
          box-shadow: 0 0 10px var(--primary-blue), 0 0 20px var(--light-blue) !important;
      }
      
      .hover-glow-card {
          box-shadow: 0 15px 40px rgba(0, 102, 255, 0.5) !important;
      }
      
      @keyframes scan {
          0% {
              background-position: 0% 0%;
          }
          100% {
              background-position: 0% 100%;
          }
      }
      
      .scan-effect {
          position: relative;
          overflow: hidden;
      }
      
      .scan-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(90deg, transparent, var(--neon-blue), transparent);
          animation: scan 3s linear infinite;
      }
  `
  
  document.head.appendChild(animationStyles)
  
  // Create animated background grid
  function createGrid() {
    const grid = document.createElement("div")
    grid.className = "background-grid"
    grid.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
              linear-gradient(rgba(0, 102, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 102, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
          z-index: -1;
          opacity: 0.3;
      `
  
    document.body.appendChild(grid)
  
    // Animate grid
    let offset = 0
    setInterval(() => {
      offset += 0.5
      grid.style.backgroundPosition = `${offset}px ${offset}px`
    }, 50)
  }
  
  createGrid()
  
  // Create random floating particles
  function createParticles() {
    const particleContainer = document.createElement("div")
    particleContainer.className = "particle-container"
    particleContainer.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
      `
  
    document.body.appendChild(particleContainer)
  
    // Create particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div")
  
      // Random size
      const size = Math.random() * 3 + 1
  
      // Random position
      const posX = Math.random() * 100
      const posY = Math.random() * 100
  
      // Random opacity
      const opacity = Math.random() * 0.5 + 0.2
  
      // Random animation duration
      const duration = Math.random() * 20 + 10
  
      // Random animation delay
      const delay = Math.random() * 10
  
      particle.style.cssText = `
              position: absolute;
              width: ${size}px;
              height: ${size}px;
              background-color: var(--neon-blue);
              border-radius: 50%;
              left: ${posX}%;
              top: ${posY}%;
              opacity: ${opacity};
              animation: float ${duration}s ease-in-out ${delay}s infinite;
          `
  
      particleContainer.appendChild(particle)
    }
  }
  
  createParticles()
  
  // Add data flow lines
  function createDataFlowLines() {
    const linesContainer = document.createElement("div")
    linesContainer.className = "data-flow-lines"
    linesContainer.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
      `
  
    document.body.appendChild(linesContainer)
  
    // Create horizontal and vertical lines
    for (let i = 0; i < 10; i++) {
      // Horizontal line
      const hLine = document.createElement("div")
      const hPos = Math.random() * 100
      const hWidth = Math.random() * 200 + 100
      const hDuration = Math.random() * 10 + 5
      const hDelay = Math.random() * 5
  
      hLine.style.cssText = `
              position: absolute;
              height: 1px;
              width: ${hWidth}px;
              background: linear-gradient(90deg, transparent, var(--light-blue), transparent);
              top: ${hPos}%;
              left: -${hWidth}px;
              opacity: 0.3;
              animation: moveRight ${hDuration}s linear ${hDelay}s infinite;
          `
  
      linesContainer.appendChild(hLine)
  
      // Vertical line
      const vLine = document.createElement("div")
      const vPos = Math.random() * 100
      const vHeight = Math.random() * 200 + 100
      const vDuration = Math.random() * 10 + 5
      const vDelay = Math.random() * 5
  
      vLine.style.cssText = `
              position: absolute;
              width: 1px;
              height: ${vHeight}px;
              background: linear-gradient(transparent, var(--light-blue), transparent);
              left: ${vPos}%;
              top: -${vHeight}px;
              opacity: 0.3;
              animation: moveDown ${vDuration}s linear ${vDelay}s infinite;
          `
  
      linesContainer.appendChild(vLine)
    }
  
    // Add keyframes for animations
    const keyframes = document.createElement("style")
    keyframes.textContent = `
          @keyframes moveRight {
              0% {
                  transform: translateX(0);
              }
              100% {
                  transform: translateX(calc(100vw + 100%));
              }
          }
          
          @keyframes moveDown {
              0% {
                  transform: translateY(0);
              }
              100% {
                  transform: translateY(calc(100vh + 100%));
              }
          }
      `
  
    document.head.appendChild(keyframes)
  }
  
  createDataFlowLines()
  
  // Animations JavaScript file
  
  document.addEventListener("DOMContentLoaded", () => {
    // Glitch effect enhancement
    const glitchElements = document.querySelectorAll(".glitch")
  
    glitchElements.forEach((element) => {
      // Randomly trigger glitch effect
      setInterval(
        () => {
          element.classList.add("active-glitch")
          setTimeout(() => {
            element.classList.remove("active-glitch")
          }, 200)
        },
        Math.random() * 5000 + 3000,
      )
    })
  
    // Parallax effect for hero section
    const heroSection = document.querySelector(".hero, .category-hero")
    const heroContent = document.querySelector(".hero-content, .category-hero-content")
  
    if (heroSection && heroContent) {
      window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY
        if (scrollPosition < heroSection.offsetHeight) {
          heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`
          heroContent.style.opacity = 1 - scrollPosition / (heroSection.offsetHeight / 1.5)
        }
      })
    }
  
    // Hover effect for product cards
    const productCards = document.querySelectorAll(".product-card")
  
    productCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        const holographicEffect = card.querySelector(".holographic-effect")
        holographicEffect.style.opacity = "1"
  
        // 3D tilt effect
        card.addEventListener("mousemove", tiltCard)
      })
  
      card.addEventListener("mouseleave", () => {
        const holographicEffect = card.querySelector(".holographic-effect")
        holographicEffect.style.opacity = "0"
  
        // Remove 3D tilt effect
        card.removeEventListener("mousemove", tiltCard)
        card.style.transform = "translateY(-10px)"
      })
    })
  
    // 3D tilt effect function
    function tiltCard(e) {
      
      const cardRect = this.getBoundingClientRect()
      const cardWidth = cardRect.width
      const cardHeight = cardRect.height
  
      const centerX = cardRect.left + cardWidth / 2
      const centerY = cardRect.top + cardHeight / 2
  
      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY
  
      const rotateX = (mouseY / (cardHeight / 2)) * -5
      const rotateY = (mouseX / (cardWidth / 2)) * 5
  
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`
    }
  
    // Typing animation for subtitle
    const subtitles = document.querySelectorAll(".subtitle")
  
    subtitles.forEach((subtitle) => {
      const text = subtitle.textContent
      subtitle.textContent = ""
      subtitle.classList.add("typing")
  
      let i = 0
      const typeWriter = () => {
        if (i < text.length) {
          subtitle.textContent += text.charAt(i)
          i++
          setTimeout(typeWriter, 50)
        }
      }
  
      setTimeout(typeWriter, 1000)
    })
  
    // Glow effect for buttons
    const buttons = document.querySelectorAll(".cta-button, .add-to-cart, .learn-more")
  
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        button.classList.add("glow-pulse")
      })
  
      button.addEventListener("mouseleave", () => {
        button.classList.remove("glow-pulse")
      })
    })
  
    // Shimmer effect for section titles
    const sectionTitles = document.querySelectorAll(".section-title")
  
    sectionTitles.forEach((title) => {
      title.classList.add("shimmer")
    })
  
    // Floating animation for featured technology images
    const techImages = document.querySelectorAll(".tech-image")
  
    techImages.forEach((image) => {
      image.classList.add("floating")
    })
  
    // Stagger animation for product cards
    const productsGrid = document.querySelector(".products-grid")
  
    if (productsGrid) {
      const productCards = productsGrid.querySelectorAll(".product-card")
  
      productCards.forEach((card, index) => {
        card.classList.add("stagger-item")
        card.style.animationDelay = `${index * 0.1}s`
      })
    }
  
    // Neon flicker effect for highlight elements
    const highlightElements = document.querySelectorAll(".highlight")
  
    highlightElements.forEach((element) => {
      // Randomly trigger flicker effect
      setInterval(
        () => {
          element.classList.add("neon-flicker")
          setTimeout(() => {
            element.classList.remove("neon-flicker")
          }, 2000)
        },
        Math.random() * 10000 + 5000,
      )
    })
  
    // Scroll indicator
    const createScrollIndicator = () => {
      const indicator = document.createElement("div")
      indicator.className = "scroll-indicator"
      indicator.innerHTML = '<i class="fas fa-chevron-down"></i>'
  
      // Style the indicator
      indicator.style.position = "absolute"
      indicator.style.bottom = "30px"
      indicator.style.left = "50%"
      indicator.style.transform = "translateX(-50%)"
      indicator.style.color = "var(--text-color)"
      indicator.style.fontSize = "24px"
      indicator.style.cursor = "pointer"
      indicator.style.animation = "bounce 2s infinite"
  
      // Add click event
      indicator.addEventListener("click", () => {
        window.scrollTo({
          top: window.innerHeight,
          behavior: "smooth",
        })
      })
  
      // Add to hero section
      const heroSection = document.querySelector(".hero, .category-hero")
      if (heroSection) {
        heroSection.appendChild(indicator)
      }
    }
  
    createScrollIndicator()
  
    // Intersection Observer for animations
    const observeElements = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate")
            }
          })
        },
        { threshold: 0.1 },
      )
  
      const elements = document.querySelectorAll(".fade-in, .fade-in-up, .slide-in-left, .slide-in-right, .stagger-item")
      elements.forEach((element) => {
        observer.observe(element)
      })
    }
  
    observeElements()
  })
  
  