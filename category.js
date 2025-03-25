// Category Page JavaScript File

document.addEventListener("DOMContentLoaded", () => {
    // Initialize category page functionality
    initializeCategoryPage()
  })
  
  function initializeCategoryPage() {
    // Initialize filter buttons
    initFilterButtons()
  
    // Initialize sort select
    initSortSelect()
  
    // Initialize product animations
    initProductAnimations()
  }
  
  function initFilterButtons() {
    const filterButtons = document.querySelectorAll(".filter-button")
    const productCards = document.querySelectorAll(".product-card")
  
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"))
  
        // Add active class to clicked button
        button.classList.add("active")
  
        // Get filter value
        const filter = button.textContent.trim().toLowerCase()
  
        // Filter products
        if (filter === "all") {
          // Show all products
          productCards.forEach((card) => {
            card.style.display = "block"
  
            // Add fade-in animation
            card.style.opacity = "0"
            card.style.transform = "translateY(20px)"
  
            setTimeout(() => {
              card.style.transition = "opacity 0.5s ease, transform 0.5s ease"
              card.style.opacity = "1"
              card.style.transform = "translateY(0)"
            }, 10)
          })
        } else {
          // Filter products by category
          productCards.forEach((card) => {
            const productName = card.querySelector("h3").textContent.toLowerCase()
            const productDescription = card.querySelector(".product-description").textContent.toLowerCase()
  
            if (productName.includes(filter) || productDescription.includes(filter)) {
              card.style.display = "block"
  
              // Add fade-in animation
              card.style.opacity = "0"
              card.style.transform = "translateY(20px)"
  
              setTimeout(() => {
                card.style.transition = "opacity 0.5s ease, transform 0.5s ease"
                card.style.opacity = "1"
                card.style.transform = "translateY(0)"
              }, 10)
            } else {
              // Hide product with fade-out animation
              card.style.transition = "opacity 0.5s ease, transform 0.5s ease"
              card.style.opacity = "0"
              card.style.transform = "translateY(20px)"
  
              setTimeout(() => {
                card.style.display = "none"
              }, 500)
            }
          })
        }
      })
    })
  }
  
  function initSortSelect() {
    const sortSelect = document.querySelector(".futuristic-select")
    const productsGrid = document.querySelector(".products-grid")
  
    if (!sortSelect || !productsGrid) return
  
    sortSelect.addEventListener("change", () => {
      const sortValue = sortSelect.value.toLowerCase()
      const productCards = Array.from(document.querySelectorAll(".product-card"))
  
      // Sort products
      productCards.sort((a, b) => {
        if (sortValue.includes("price: low to high")) {
          const priceA = Number.parseFloat(
            a.querySelector(".product-price").textContent.replace("$", "").replace(",", ""),
          )
          const priceB = Number.parseFloat(
            b.querySelector(".product-price").textContent.replace("$", "").replace(",", ""),
          )
          return priceA - priceB
        } else if (sortValue.includes("price: high to low")) {
          const priceA = Number.parseFloat(
            a.querySelector(".product-price").textContent.replace("$", "").replace(",", ""),
          )
          const priceB = Number.parseFloat(
            b.querySelector(".product-price").textContent.replace("$", "").replace(",", ""),
          )
          return priceB - priceA
        } else if (sortValue.includes("newest")) {
          // For demo purposes, we'll just reverse the order
          return -1
        } else if (sortValue.includes("popularity")) {
          // For demo purposes, we'll just use a random order
          return Math.random() - 0.5
        }
  
        return 0
      })
  
      // Remove all products from grid
      while (productsGrid.firstChild) {
        productsGrid.removeChild(productsGrid.firstChild)
      }
  
      // Add sorted products back to grid with staggered animation
      productCards.forEach((card, index) => {
        productsGrid.appendChild(card)
  
        // Add staggered animation
        card.style.opacity = "0"
        card.style.transform = "translateY(20px)"
  
        setTimeout(() => {
          card.style.transition = "opacity 0.5s ease, transform 0.5s ease"
          card.style.opacity = "1"
          card.style.transform = "translateY(0)"
        }, 50 * index)
      })
    })
  }
  
  function initProductAnimations() {
    const productCards = document.querySelectorAll(".product-card")
  
    // Add staggered animation on page load
    productCards.forEach((card, index) => {
      card.style.opacity = "0"
      card.style.transform = "translateY(20px)"
  
      setTimeout(
        () => {
          card.style.transition = "opacity 0.5s ease, transform 0.5s ease"
          card.style.opacity = "1"
          card.style.transform = "translateY(0)"
        },
        100 + index * 50,
      )
    })
  
    // Add hover animation
    productCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        // Add glow effect
        card.style.boxShadow = "0 15px 40px rgba(0, 102, 255, 0.3)"
  
        // Scale up image
        const image = card.querySelector(".product-image")
        if (image) {
          image.style.transform = "scale(1.05)"
        }
  
        // Increase holographic effect opacity
        const holographicEffect = card.querySelector(".holographic-effect")
        if (holographicEffect) {
          holographicEffect.style.opacity = "0.8"
        }
      })
  
      card.addEventListener("mouseleave", () => {
        // Remove glow effect
        card.style.boxShadow = ""
  
        // Reset image scale
        const image = card.querySelector(".product-image")
        if (image) {
          image.style.transform = ""
        }
  
        // Reset holographic effect opacity
        const holographicEffect = card.querySelector(".holographic-effect")
        if (holographicEffect) {
          holographicEffect.style.opacity = "0.5"
        }
      })
    })
  }
  
  // Add tech showcase animation
  function initTechShowcaseAnimation() {
    const techShowcase = document.querySelector(".tech-showcase")
    if (!techShowcase) return
  
    const techImage = techShowcase.querySelector(".tech-image")
    const techInfo = techShowcase.querySelector(".tech-info")
  
    // Add animation on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Animate tech image
          techImage.style.opacity = "0"
          techImage.style.transform = "translateX(-50px)"
  
          setTimeout(() => {
            techImage.style.transition = "opacity 0.8s ease, transform 0.8s ease"
            techImage.style.opacity = "1"
            techImage.style.transform = "translateX(0)"
          }, 100)
  
          // Animate tech info with delay
          techInfo.style.opacity = "0"
          techInfo.style.transform = "translateX(50px)"
  
          setTimeout(() => {
            techInfo.style.transition = "opacity 0.8s ease, transform 0.8s ease"
            techInfo.style.opacity = "1"
            techInfo.style.transform = "translateX(0)"
          }, 300)
  
          observer.unobserve(techShowcase)
        }
      },
      {
        threshold: 0.2,
      },
    )
  
    observer.observe(techShowcase)
  }
  
  initTechShowcaseAnimation()
  
  // Add dynamic category header effect
  function initCategoryHeaderEffect() {
    const categoryHero = document.querySelector(".category-hero")
    if (!categoryHero) return
  
    const categoryHeroContent = categoryHero.querySelector(".category-hero-content")
  
    // Add parallax effect on mouse move
    categoryHero.addEventListener("mousemove", (e) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
  
      const moveX = (x - 0.5) * 30
      const moveY = (y - 0.5) * 30
  
      categoryHeroContent.style.transform = `translate(${moveX}px, ${moveY}px)`
    })
  
    categoryHero.addEventListener("mouseleave", () => {
      categoryHeroContent.style.transform = ""
    })
  }
  
  initCategoryHeaderEffect()
  
  // Add filter section animation
  function initFilterSectionAnimation() {
    const filterSection = document.querySelector(".filter-section")
    if (!filterSection) return
  
    // Add animation on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          filterSection.style.opacity = "0"
          filterSection.style.transform = "translateY(20px)"
  
          setTimeout(() => {
            filterSection.style.transition = "opacity 0.8s ease, transform 0.8s ease"
            filterSection.style.opacity = "1"
            filterSection.style.transform = "translateY(0)"
          }, 100)
  
          observer.unobserve(filterSection)
        }
      },
      {
        threshold: 0.2,
      },
    )
  
    observer.observe(filterSection)
  }
  
  initFilterSectionAnimation()
  
  // Add dynamic filter button effect
  function initFilterButtonEffect() {
    const filterButtons = document.querySelectorAll(".filter-button")
  
    filterButtons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        // Add glow effect
        button.style.boxShadow = "0 0 10px rgba(0, 168, 255, 0.5)"
        button.style.backgroundColor = "rgba(0, 102, 255, 0.2)"
      })
  
      button.addEventListener("mouseleave", () => {
        // Remove glow effect if not active
        if (!button.classList.contains("active")) {
          button.style.boxShadow = ""
          button.style.backgroundColor = ""
        }
      })
    })
  }
  
  initFilterButtonEffect()
  
  // Add dynamic select effect
  function initSelectEffect() {
    const select = document.querySelector(".futuristic-select")
    if (!select) return
  
    select.addEventListener("focus", () => {
      // Add glow effect
      select.style.boxShadow = "0 0 10px rgba(0, 168, 255, 0.5)"
      select.style.backgroundColor = "rgba(0, 30, 60, 0.7)"
    })
  
    select.addEventListener("blur", () => {
      // Remove glow effect
      select.style.boxShadow = ""
      select.style.backgroundColor = ""
    })
  }
  
  initSelectEffect()
  
  