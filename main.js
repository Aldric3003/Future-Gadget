// Main JavaScript File

document.addEventListener("DOMContentLoaded", () => {
    // Initialize the website
    initializeWebsite()
  })
  
  function initializeWebsite() {
    // Hide loading screen after content is loaded
    setTimeout(() => {
      const loadingScreen = document.querySelector(".loading-screen")
      loadingScreen.style.opacity = "0"
      setTimeout(() => {
        loadingScreen.style.display = "none"
      }, 500)
    }, 2000)
  
    // Initialize header scroll effect
    initHeaderScroll()
  
    // Initialize mobile menu
    initMobileMenu()
  
    // Initialize product card animations
    initProductCards()
  
    // Initialize scroll animations
    initScrollAnimations()
  
    // Initialize particle effects
    initParticleEffects()
  
    // Initialize button effects
    initButtonEffects()
  }
  
  function initHeaderScroll() {
    const header = document.querySelector("header")
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  }
  
  function initMobileMenu() {
    const menuToggle = document.querySelector(".menu-toggle")
    const navLinks = document.querySelector(".nav-links")
  
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  
    // Close menu when clicking on a link
    const navItems = document.querySelectorAll(".nav-links a")
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        menuToggle.classList.remove("active")
        navLinks.classList.remove("active")
      })
    })
  }
  
  function initProductCards() {
    const productCards = document.querySelectorAll(".product-card")
  
    productCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        const holographicEffect = card.querySelector(".holographic-effect")
        holographicEffect.style.opacity = "0.8"
      })
  
      card.addEventListener("mouseleave", () => {
        const holographicEffect = card.querySelector(".holographic-effect")
        holographicEffect.style.opacity = "0.5"
      })
    })
  }
  
  function initScrollAnimations() {
    // Add animation to elements when they come into view
    const animatedElements = document.querySelectorAll(
      ".section-title, .product-card, .category-card, .showcase-container, .newsletter-content",
    )
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated-element", "visible")
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
      },
    )
  
    animatedElements.forEach((element) => {
      observer.observe(element)
    })
  }
  
  function initParticleEffects() {
    // Create particles on mouse move
    const body = document.querySelector("body")
  
    body.addEventListener("mousemove", (e) => {
      if (Math.random() > 0.9) {
        createParticle(e.clientX, e.clientY)
      }
    })
  
    // Create particles on touch move for mobile
    body.addEventListener("touchmove", (e) => {
      if (Math.random() > 0.9) {
        createParticle(e.touches[0].clientX, e.touches[0].clientY)
      }
    })
  }
  
  function createParticle(x, y) {
    const particle = document.createElement("div")
    particle.className = "particle"
  
    // Random size
    const size = Math.random() * 5 + 2
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
  
    // Random color
    const colors = ["var(--primary-blue)", "var(--light-blue)", "var(--neon-blue)"]
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
  
    // Position
    particle.style.left = `${x}px`
    particle.style.top = `${y}px`
  
    // Random movement
    const destinationX = x + (Math.random() - 0.5) * 100
    const destinationY = y + (Math.random() - 0.5) * 100
  
    // Animation
    particle.style.transition = "all 1s ease"
  
    document.body.appendChild(particle)
  
    // Start animation in the next frame
    requestAnimationFrame(() => {
      particle.style.transform = `translate(${destinationX - x}px, ${destinationY - y}px)`
      particle.style.opacity = "0"
    })
  
    // Remove particle after animation
    setTimeout(() => {
      particle.remove()
    }, 1000)
  }
  
  function initButtonEffects() {
    const buttons = document.querySelectorAll(".cta-button, .add-to-cart, .learn-more")
  
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", (e) => {
        createRippleEffect(e, button)
      })
    })
  }
  
  function createRippleEffect(e, button) {
    const ripple = document.createElement("span")
    ripple.className = "ripple"
  
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
  
    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`
  
    button.appendChild(ripple)
  
    setTimeout(() => {
      ripple.remove()
    }, 600)
  }
  
  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
  
      const targetId = this.getAttribute("href")
      if (targetId === "#") return
  
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })
  
  // Page transition effect
  window.addEventListener("beforeunload", () => {
    document.body.classList.add("page-transition")
  })
  
  // Add to cart functionality
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const productName = this.closest(".product-card").querySelector("h3").textContent
  
      // Create notification
      const notification = document.createElement("div")
      notification.className = "notification"
      notification.innerHTML = `<i class="fas fa-check-circle"></i> ${productName} added to cart`
  
      document.body.appendChild(notification)
  
      // Show notification
      setTimeout(() => {
        notification.classList.add("show")
      }, 10)
  
      // Hide and remove notification
      setTimeout(() => {
        notification.classList.remove("show")
        setTimeout(() => {
          notification.remove()
        }, 300)
      }, 3000)
    })
  })
  
  // Newsletter form submission
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
  
      const emailInput = this.querySelector('input[type="email"]')
      const email = emailInput.value
  
      if (email) {
        // Create success message
        const successMessage = document.createElement("div")
        successMessage.className = "success-message"
        successMessage.textContent = "Thank you for subscribing!"
  
        // Replace form with success message
        this.innerHTML = ""
        this.appendChild(successMessage)
      }
    })
  }
  
  // Initialize filter buttons on category pages
  const filterButtons = document.querySelectorAll(".filter-button")
  if (filterButtons.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"))
  
        // Add active class to clicked button
        this.classList.add("active")
  
        // Filter logic would go here
      })
    })
  }
  
  // Initialize sort select on category pages
  const sortSelect = document.querySelector(".futuristic-select")
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      // Sort logic would go here
    })
  }
  
  // Horizontal page transition effect
  function navigateToPage(url) {
    // Create transition overlay
    const overlay = document.createElement("div")
    overlay.className = "page-transition-overlay"
    document.body.appendChild(overlay)
  
    // Animate overlay
    setTimeout(() => {
      overlay.classList.add("active")
  
      // Navigate to new page
      setTimeout(() => {
        window.location.href = url
      }, 500)
    }, 10)
  }
  
  // Apply page transition to all internal links
  document.querySelectorAll("a").forEach((link) => {
    // Only apply to internal links
    if (link.href.includes(window.location.hostname) && !link.getAttribute("href").startsWith("#")) {
      link.addEventListener("click", function (e) {
        e.preventDefault()
        navigateToPage(this.href)
      })
    }
  })
  
  // Add CSS for notifications and page transitions
  const style = document.createElement("style")
  style.textContent = `
      .notification {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: var(--card-bg);
          color: var(--text-color);
          padding: 15px 20px;
          border-radius: 5px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-color);
          transform: translateY(100px);
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 1000;
      }
      
      .notification.show {
          transform: translateY(0);
          opacity: 1;
      }
      
      .notification i {
          color: var(--neon-blue);
          margin-right: 10px;
      }
      
      .success-message {
          color: var(--neon-blue);
          font-size: 18px;
          text-align: center;
          animation: fadeIn 0.5s forwards;
      }
      
      .page-transition-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: var(--background);
          transform: translateX(-100%);
          z-index: 9999;
          transition: transform 0.5s ease;
      }
      
      .page-transition-overlay.active {
          transform: translateX(0);
      }
      
      .ripple {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.3);
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
      }
      
      @keyframes ripple {
          to {
              transform: scale(4);
              opacity: 0;
          }
      }
  `
  
  document.head.appendChild(style)
  
  