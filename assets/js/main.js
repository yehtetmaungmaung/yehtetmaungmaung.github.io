// Responsive Design and Mobile Optimization
document.addEventListener('DOMContentLoaded', function() {
  // Set CSS custom property for viewport height (mobile browser fix)
  function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  setViewportHeight();
  window.addEventListener('resize', setViewportHeight);
  
  // Detect touch device
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    document.documentElement.classList.add('touch-device');
  } else {
    document.documentElement.classList.add('no-touch');
  }
  
  // Detect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.documentElement.classList.add('reduced-motion');
  }
  
  // Performance optimization: Passive event listeners
  const passiveSupported = (() => {
    let passive = false;
    try {
      const options = {
        get passive() {
          passive = true;
          return false;
        }
      };
      window.addEventListener('test', null, options);
      window.removeEventListener('test', null, options);
    } catch (err) {
      passive = false;
    }
    return passive;
  })();
  
  // Performance: Preload critical resources
  function preloadCriticalResources() {
    // Preload critical fonts
    const fontPreloads = [
      '/assets/fonts/inter-var.woff2'
    ];
    
    fontPreloads.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = font;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }
  
  // Performance: Resource hints for external domains
  function addResourceHints() {
    const domains = [
      'fonts.googleapis.com',
      'fonts.gstatic.com'
    ];
    
    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = `//${domain}`;
      document.head.appendChild(link);
    });
  }
  
  // Responsive breakpoint detection
  function updateBreakpointClasses() {
    const width = window.innerWidth;
    const body = document.body;
    
    // Remove existing breakpoint classes
    body.classList.remove('is-mobile', 'is-tablet', 'is-desktop', 'is-large-desktop');
    
    // Add current breakpoint class
    if (width < 768) {
      body.classList.add('is-mobile');
    } else if (width < 992) {
      body.classList.add('is-tablet');
    } else if (width < 1200) {
      body.classList.add('is-desktop');
    } else {
      body.classList.add('is-large-desktop');
    }
  }
  
  // Initialize performance optimizations
  preloadCriticalResources();
  addResourceHints();
  updateBreakpointClasses();
  
  // Mobile Navigation Toggle
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  
  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', function() {
      const isExpanded = navbarToggle.getAttribute('aria-expanded') === 'true';
      
      // Toggle aria-expanded attribute
      navbarToggle.setAttribute('aria-expanded', !isExpanded);
      
      // Toggle menu visibility
      navbarMenu.classList.toggle('show');
      
      // Update button text for screen readers
      const buttonText = isExpanded ? 'Open navigation menu' : 'Close navigation menu';
      navbarToggle.setAttribute('aria-label', buttonText);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navbarToggle.contains(event.target) || navbarMenu.contains(event.target);
      
      if (!isClickInsideNav && navbarMenu.classList.contains('show')) {
        navbarToggle.setAttribute('aria-expanded', 'false');
        navbarMenu.classList.remove('show');
        navbarToggle.setAttribute('aria-label', 'Open navigation menu');
      }
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && navbarMenu.classList.contains('show')) {
        navbarToggle.setAttribute('aria-expanded', 'false');
        navbarMenu.classList.remove('show');
        navbarToggle.setAttribute('aria-label', 'Open navigation menu');
        navbarToggle.focus(); // Return focus to toggle button
      }
    });
    
    // Enhanced window resize handling with debouncing
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const currentWidth = window.innerWidth;
        
        // Close mobile menu on desktop
        if (currentWidth >= 768) { // md breakpoint
          navbarToggle.setAttribute('aria-expanded', 'false');
          navbarMenu.classList.remove('show');
          navbarToggle.setAttribute('aria-label', 'Toggle navigation menu');
        }
        
        // Update viewport height for mobile browsers
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
        
        // Update breakpoint classes on body
        updateBreakpointClasses();
        
        // Trigger custom resize event for other components
        window.dispatchEvent(new CustomEvent('optimizedResize'));
      }, 250);
    });
  }
  
  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update focus for accessibility
        targetElement.focus();
      }
    });
  });
  
  // Add focus management for skip link
  const skipLink = document.querySelector('.skip-link');
  const mainContent = document.querySelector('#main-content');
  
  if (skipLink && mainContent) {
    skipLink.addEventListener('click', function(e) {
      e.preventDefault();
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    });
  }
  
  // Animated typing effect
  const typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    const typingData = typingElement.getAttribute('data-typing');
    if (typingData) {
      try {
        const phrases = JSON.parse(typingData);
        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeText() {
          const currentPhrase = phrases[currentPhraseIndex];
          
          if (isDeleting) {
            // Remove characters
            typingElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50;
          } else {
            // Add characters
            typingElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100;
          }
          
          // Check if word is complete
          if (!isDeleting && currentCharIndex === currentPhrase.length) {
            // Pause at end of word
            typingSpeed = 2000;
            isDeleting = true;
          } else if (isDeleting && currentCharIndex === 0) {
            // Move to next phrase
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500;
          }
          
          setTimeout(typeText, typingSpeed);
        }
        
        // Start typing animation
        typeText();
      } catch (e) {
        console.warn('Error parsing typing data:', e);
        typingElement.textContent = 'Developer';
      }
    }
  }
  
  // Smooth scroll for hero buttons
  const heroButtons = document.querySelectorAll('.hero-btn[href^="#"]');
  heroButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Experience Timeline Expand/Collapse Functionality
  const expandButtons = document.querySelectorAll('.expand-btn');
  expandButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
      const icon = this.querySelector('.expand-icon');
      
      if (targetElement) {
        const isExpanded = targetElement.classList.contains('expanded');
        
        if (isExpanded) {
          // Collapse
          targetElement.classList.remove('expanded');
          this.classList.remove('expanded');
          icon.textContent = '+';
          this.setAttribute('aria-expanded', 'false');
          this.setAttribute('aria-label', 'Expand job details');
        } else {
          // Expand
          targetElement.classList.add('expanded');
          this.classList.add('expanded');
          icon.textContent = '−';
          this.setAttribute('aria-expanded', 'true');
          this.setAttribute('aria-label', 'Collapse job details');
        }
      }
    });
    
    // Initialize button attributes
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Expand job details');
  });
  
  // Timeline intersection observer for animations
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (timelineItems.length > 0) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);
    
    // Initialize timeline items with animation styles
    timelineItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      timelineObserver.observe(item);
    });
  }
  
  // Keyboard navigation for timeline
  expandButtons.forEach(button => {
    button.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
  
  // Skills Matrix Functionality
  const skillsMatrix = document.querySelector('.skills-matrix');
  if (skillsMatrix) {
    const filterButtons = skillsMatrix.querySelectorAll('.filter-btn');
    const skillCategories = skillsMatrix.querySelectorAll('.skill-category');
    const skillItems = skillsMatrix.querySelectorAll('.skill-item');
    
    // Skills filtering functionality
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const targetCategory = this.getAttribute('data-category');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Filter skill categories
        skillCategories.forEach(category => {
          const categorySlug = category.getAttribute('data-category');
          
          if (targetCategory === 'all' || targetCategory === categorySlug) {
            category.classList.remove('filtered-out');
            // Animate skill bars when category becomes visible
            setTimeout(() => {
              animateSkillBars(category);
            }, 300);
          } else {
            category.classList.add('filtered-out');
          }
        });
      });
    });
    
    // Animate skill progress bars
    function animateSkillBars(container = skillsMatrix) {
      const skillProgressBars = container.querySelectorAll('.skill-progress');
      
      skillProgressBars.forEach((bar, index) => {
        const level = bar.getAttribute('data-level');
        
        // Reset animation
        bar.style.width = '0%';
        
        // Animate with delay
        setTimeout(() => {
          bar.style.width = level + '%';
        }, index * 100);
      });
    }
    
    // Intersection Observer for skills animation
    const skillsObserverOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Animate skill bars when section comes into view
          setTimeout(() => {
            animateSkillBars(entry.target);
          }, 300);
          
          // Only animate once
          skillsObserver.unobserve(entry.target);
        }
      });
    }, skillsObserverOptions);
    
    // Observe skill categories for animation
    skillCategories.forEach(category => {
      skillsObserver.observe(category);
    });
    
    // Keyboard navigation for filter buttons
    filterButtons.forEach(button => {
      button.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });
    
    // Enhanced hover effects for skill items
    skillItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        const skillBar = this.querySelector('.skill-progress');
        const level = skillBar.getAttribute('data-level');
        
        // Add pulse effect to skill bar
        skillBar.style.boxShadow = `0 0 20px rgba(var(--secondary-color-rgb), 0.4)`;
        
        // Show skill details
        const details = this.querySelector('.skill-details');
        if (details) {
          details.style.opacity = '1';
          details.style.maxHeight = '30px';
        }
      });
      
      item.addEventListener('mouseleave', function() {
        const skillBar = this.querySelector('.skill-progress');
        skillBar.style.boxShadow = '';
        
        // Hide skill details
        const details = this.querySelector('.skill-details');
        if (details) {
          details.style.opacity = '0';
          details.style.maxHeight = '0';
        }
      });
    });
    
    // Initialize skill bars animation on page load
    setTimeout(() => {
      // Check if skills section is already in viewport
      const skillsSection = document.querySelector('.skills-matrix');
      const rect = skillsSection.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInViewport) {
        animateSkillBars();
      }
    }, 500);
  }
  
  // Blog Search and Filter Functionality
  const blogSearch = document.getElementById('blog-search');
  const categoryFilter = document.getElementById('category-filter');
  const tagFilter = document.getElementById('tag-filter');
  const blogPosts = document.getElementById('blog-posts');
  
  if (blogSearch && blogPosts) {
    const postCards = blogPosts.querySelectorAll('.post-card');
    
    // Search functionality
    function filterPosts() {
      const searchTerm = blogSearch.value.toLowerCase();
      const selectedCategory = categoryFilter ? categoryFilter.value.toLowerCase() : '';
      const selectedTag = tagFilter ? tagFilter.value.toLowerCase() : '';
      
      let visibleCount = 0;
      
      postCards.forEach(card => {
        const title = card.querySelector('.post-title a').textContent.toLowerCase();
        const excerpt = card.querySelector('.post-excerpt');
        const excerptText = excerpt ? excerpt.textContent.toLowerCase() : '';
        const categories = card.getAttribute('data-categories').toLowerCase();
        const tags = card.getAttribute('data-tags').toLowerCase();
        
        // Check search term
        const matchesSearch = !searchTerm || 
          title.includes(searchTerm) || 
          excerptText.includes(searchTerm);
        
        // Check category filter
        const matchesCategory = !selectedCategory || 
          categories.includes(selectedCategory);
        
        // Check tag filter
        const matchesTag = !selectedTag || 
          tags.includes(selectedTag);
        
        // Show/hide post based on all filters
        if (matchesSearch && matchesCategory && matchesTag) {
          card.style.display = 'block';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });
      
      // Show "no results" message if no posts match
      let noResultsMsg = blogPosts.querySelector('.no-results');
      if (visibleCount === 0 && postCards.length > 0) {
        if (!noResultsMsg) {
          noResultsMsg = document.createElement('div');
          noResultsMsg.className = 'no-results';
          noResultsMsg.innerHTML = `
            <h3>No posts found</h3>
            <p>Try adjusting your search terms or filters.</p>
          `;
          blogPosts.appendChild(noResultsMsg);
        }
        noResultsMsg.style.display = 'block';
      } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
      }
    }
    
    // Add event listeners
    blogSearch.addEventListener('input', filterPosts);
    if (categoryFilter) categoryFilter.addEventListener('change', filterPosts);
    if (tagFilter) tagFilter.addEventListener('change', filterPosts);
    
    // Clear search functionality
    blogSearch.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        this.value = '';
        filterPosts();
      }
    });
  }
  
  // Social Sharing Functions
  window.copyToClipboard = function(text) {
    if (navigator.clipboard && window.isSecureContext) {
      // Use modern clipboard API
      navigator.clipboard.writeText(text).then(() => {
        showCopyFeedback();
      }).catch(err => {
        console.error('Failed to copy: ', err);
        fallbackCopyToClipboard(text);
      });
    } else {
      // Fallback for older browsers
      fallbackCopyToClipboard(text);
    }
  };
  
  function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      showCopyFeedback();
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
    
    document.body.removeChild(textArea);
  }
  
  function showCopyFeedback() {
    const copyBtn = document.querySelector('.share-copy');
    if (copyBtn) {
      const originalContent = copyBtn.innerHTML;
      copyBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
      `;
      copyBtn.style.background = '#10b981';
      
      setTimeout(() => {
        copyBtn.innerHTML = originalContent;
        copyBtn.style.background = '';
      }, 2000);
    }
  }
  
  // Reading Progress Indicator (for blog posts)
  const postContent = document.querySelector('.post-content');
  if (postContent) {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    const progressBarFill = progressBar.querySelector('.reading-progress-bar');
    
    // Throttled update progress on scroll for better performance
    let ticking = false;
    function updateReadingProgress() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const postRect = postContent.getBoundingClientRect();
          const postHeight = postContent.offsetHeight;
          const windowHeight = window.innerHeight;
          const scrolled = Math.max(0, -postRect.top);
          const progress = Math.min(100, (scrolled / (postHeight - windowHeight)) * 100);
          
          progressBarFill.style.width = progress + '%';
          
          // Show/hide progress bar based on scroll position
          if (scrolled > 100) {
            progressBar.classList.add('visible');
          } else {
            progressBar.classList.remove('visible');
          }
          
          ticking = false;
        });
        ticking = true;
      }
    }
    
    // Use passive listener for better scroll performance
    const scrollOptions = passiveSupported ? { passive: true } : false;
    window.addEventListener('scroll', updateReadingProgress, scrollOptions);
    updateReadingProgress(); // Initial call
  }
  
  // Simple Error Handling System - prevents infinite loops
  window.ErrorHandler = {
    // Handle image loading errors with a simple fallback
    handleImageError: function(img, fallbackType = 'default') {
      // Prevent infinite loops by checking if we already handled this image
      if (img.dataset.errorHandled) {
        return;
      }
      
      // Mark as handled to prevent loops
      img.dataset.errorHandled = 'true';
      
      // Create a simple SVG placeholder
      const svgPlaceholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1IiBzdHJva2U9IiNkZGQiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgdW5hdmFpbGFibGU8L3RleHQ+PC9zdmc+';
      
      // Replace with placeholder
      img.src = svgPlaceholder;
      img.alt = 'Image unavailable';
      
      console.warn('Image failed to load, replaced with placeholder:', img.dataset.originalSrc || img.src);
    },
    
    // Replace failed image with text placeholder
    replaceWithTextPlaceholder: function(img) {
      const placeholder = document.createElement('div');
      placeholder.className = 'image-placeholder';
      placeholder.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21,15 16,10 5,21"></polyline>
        </svg>
        <span>Image unavailable</span>
      `;
      
      // Copy relevant classes and styles
      placeholder.className += ' ' + img.className;
      if (img.style.width) placeholder.style.width = img.style.width;
      if (img.style.height) placeholder.style.height = img.style.height;
      
      img.parentNode.replaceChild(placeholder, img);
    },
    
    // Handle API call errors
    handleApiError: function(error, context = 'API call') {
      console.error(`${context} failed:`, error);
      
      // Show user-friendly error message
      this.showErrorMessage(`Unable to load content. Please try again later.`, 'warning');
      
      return {
        success: false,
        error: error.message || 'Unknown error occurred',
        timestamp: new Date().toISOString()
      };
    },
    
    // Show error messages to user
    showErrorMessage: function(message, type = 'error') {
      const existingAlert = document.querySelector('.error-alert');
      if (existingAlert) {
        existingAlert.remove();
      }
      
      const alert = document.createElement('div');
      alert.className = `error-alert error-alert-${type}`;
      alert.innerHTML = `
        <div class="error-alert-content">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            ${type === 'error' ? 
              '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>' :
              '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>'
            }
          </svg>
          <span>${message}</span>
          <button type="button" class="error-alert-close" aria-label="Close alert">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      `;
      
      document.body.appendChild(alert);
      
      // Auto-remove after 5 seconds
      setTimeout(() => {
        if (alert.parentNode) {
          alert.remove();
        }
      }, 5000);
      
      // Add close button functionality
      const closeBtn = alert.querySelector('.error-alert-close');
      closeBtn.addEventListener('click', () => alert.remove());
    },
    
    // Retry mechanism for failed operations
    retry: async function(operation, maxRetries = 3, delay = 1000) {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          return await operation();
        } catch (error) {
          if (attempt === maxRetries) {
            throw error;
          }
          
          console.warn(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2; // Exponential backoff
        }
      }
    }
  };
  
  // Enhanced Lazy loading for all images with error handling
  const lazyImages = document.querySelectorAll('img[data-src], picture source[data-srcset]');
  
  if (lazyImages.length > 0 && 'IntersectionObserver' in window) {
    const imageObserverOptions = {
      root: null,
      rootMargin: '50px 0px',
      threshold: 0.01
    };
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          if (element.tagName === 'IMG') {
            // Handle img elements
            if (element.dataset.src) {
              // Store original src for error handling
              element.dataset.originalSrc = element.dataset.src;
              
              // Add loading class for smooth transition
              element.classList.add('img-loading');
              
              // Create a new image to preload
              const tempImg = new Image();
              tempImg.onload = () => {
                element.src = element.dataset.src;
                element.classList.remove('img-loading');
                element.classList.add('loaded');
                element.removeAttribute('data-src');
              };
              tempImg.onerror = () => {
                element.classList.remove('img-loading');
                // Use our error handler to prevent loops
                window.ErrorHandler.handleImageError(element);
              };
              tempImg.src = element.dataset.src;
            }
            
            if (element.dataset.srcset) {
              element.srcset = element.dataset.srcset;
              element.removeAttribute('data-srcset');
            }
          } else if (element.tagName === 'SOURCE') {
            // Handle source elements in picture tags
            if (element.dataset.srcset) {
              element.srcset = element.dataset.srcset;
              element.removeAttribute('data-srcset');
            }
          }
          
          imageObserver.unobserve(element);
        }
      });
    }, imageObserverOptions);
    
    lazyImages.forEach(element => {
      imageObserver.observe(element);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach(element => {
      if (element.tagName === 'IMG' && element.dataset.src) {
        element.src = element.dataset.src;
        element.removeAttribute('data-src');
      }
      if (element.dataset.srcset) {
        element.srcset = element.dataset.srcset;
        element.removeAttribute('data-srcset');
      }
    });
  }
  
  // Global image error handler for all images (including non-lazy loaded)
  document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
      const img = e.target;
      
      // Determine fallback type
      let fallbackType = 'post';
      if (img.classList.contains('avatar') || img.closest('.author-info')) {
        fallbackType = 'avatar';
      } else if (img.classList.contains('social-share') || img.closest('.social-share')) {
        fallbackType = 'social';
      } else if (img.closest('.project-card')) {
        fallbackType = 'project';
      }
      
      window.ErrorHandler.handleImageError(img, fallbackType);
    }
  }, true); // Use capture phase to catch all image errors
  
  // Blog post card hover effects
  const postCards = document.querySelectorAll('.post-card');
  postCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(-4px)';
    });
  });
  
  // Table of Contents generation for blog posts
  const postContentForTOC = document.querySelector('.post-content');
  if (postContentForTOC) {
    const headings = postContentForTOC.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    if (headings.length > 3) { // Only show TOC if there are enough headings
      const tocContainer = document.createElement('div');
      tocContainer.className = 'table-of-contents';
      tocContainer.innerHTML = '<h3>Table of Contents</h3><ul class="toc-list"></ul>';
      
      const tocList = tocContainer.querySelector('.toc-list');
      
      headings.forEach((heading, index) => {
        // Add ID to heading if it doesn't have one
        if (!heading.id) {
          heading.id = `heading-${index}`;
        }
        
        const tocItem = document.createElement('li');
        tocItem.className = `toc-item toc-${heading.tagName.toLowerCase()}`;
        
        const tocLink = document.createElement('a');
        tocLink.href = `#${heading.id}`;
        tocLink.textContent = heading.textContent;
        tocLink.className = 'toc-link';
        
        tocItem.appendChild(tocLink);
        tocList.appendChild(tocItem);
        
        // Smooth scroll for TOC links
        tocLink.addEventListener('click', function(e) {
          e.preventDefault();
          heading.scrollIntoView({ behavior: 'smooth' });
        });
      });
      
      // Insert TOC after the first paragraph or at the beginning
      const firstParagraph = postContentForTOC.querySelector('p');
      if (firstParagraph) {
        firstParagraph.parentNode.insertBefore(tocContainer, firstParagraph.nextSibling);
      } else {
        postContentForTOC.insertBefore(tocContainer, postContentForTOC.firstChild);
      }
    }
  }

  // Network Status Monitoring
  function initNetworkMonitoring() {
    // Create network status indicator
    const networkStatus = document.createElement('div');
    networkStatus.className = 'network-status';
    networkStatus.id = 'network-status';
    document.body.appendChild(networkStatus);
    
    // Check initial connection status
    updateNetworkStatus();
    
    // Listen for online/offline events
    window.addEventListener('online', () => {
      updateNetworkStatus();
      // Retry failed operations when back online
      retryFailedOperations();
    });
    
    window.addEventListener('offline', () => {
      updateNetworkStatus();
    });
    
    function updateNetworkStatus() {
      const isOnline = navigator.onLine;
      const statusElement = document.getElementById('network-status');
      
      if (isOnline) {
        statusElement.className = 'network-status online';
        statusElement.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 12l2 2 4-4"></path>
            <circle cx="12" cy="12" r="9"></circle>
          </svg>
          Back online
        `;
        
        // Hide after 3 seconds
        setTimeout(() => {
          statusElement.style.display = 'none';
        }, 3000);
      } else {
        statusElement.className = 'network-status offline';
        statusElement.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
          </svg>
          You're offline
        `;
        statusElement.style.display = 'block';
      }
    }
  }
  
  // Failed operations queue for retry when back online
  let failedOperations = [];
  
  function addFailedOperation(operation, context) {
    failedOperations.push({ operation, context, timestamp: Date.now() });
  }
  
  function retryFailedOperations() {
    if (failedOperations.length === 0) return;
    
    console.log(`Retrying ${failedOperations.length} failed operations...`);
    
    const operationsToRetry = [...failedOperations];
    failedOperations = [];
    
    operationsToRetry.forEach(async ({ operation, context }) => {
      try {
        await operation();
        console.log(`Successfully retried: ${context}`);
      } catch (error) {
        console.warn(`Retry failed for: ${context}`, error);
        // Add back to queue if still failing
        addFailedOperation(operation, context);
      }
    });
  }
  
  // Enhanced fetch wrapper with error handling and retry
  window.safeFetch = async function(url, options = {}) {
    const maxRetries = options.maxRetries || 3;
    const retryDelay = options.retryDelay || 1000;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), options.timeout || 10000);
        
        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return response;
      } catch (error) {
        console.warn(`Fetch attempt ${attempt} failed:`, error.message);
        
        if (attempt === maxRetries) {
          // Add to failed operations queue for retry when online
          if (!navigator.onLine) {
            addFailedOperation(
              () => safeFetch(url, options),
              `Fetch: ${url}`
            );
          }
          
          throw error;
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
      }
    }
  };
  
  // API Error Handler with user feedback
  window.handleApiError = function(error, context = 'API request', showToUser = true) {
    const errorInfo = {
      message: error.message || 'Unknown error',
      context,
      timestamp: new Date().toISOString(),
      online: navigator.onLine,
      userAgent: navigator.userAgent
    };
    
    // Log detailed error for debugging
    console.error('API Error:', errorInfo);
    
    // Show user-friendly message
    if (showToUser) {
      let userMessage = 'Something went wrong. Please try again.';
      
      if (!navigator.onLine) {
        userMessage = 'You appear to be offline. Please check your connection.';
      } else if (error.name === 'AbortError') {
        userMessage = 'Request timed out. Please try again.';
      } else if (error.message.includes('404')) {
        userMessage = 'The requested content was not found.';
      } else if (error.message.includes('500')) {
        userMessage = 'Server error. Please try again later.';
      }
      
      window.ErrorHandler.showErrorMessage(userMessage, 'error');
    }
    
    return errorInfo;
  };
  
  // Global error handler for unhandled promise rejections
  window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    
    // Prevent the default browser error handling
    event.preventDefault();
    
    // Show user-friendly error message
    window.ErrorHandler.showErrorMessage(
      'An unexpected error occurred. Please refresh the page if problems persist.',
      'error'
    );
  });
  
  // Global error handler for JavaScript errors
  window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
    
    // Don't show alerts for minor errors or third-party scripts
    if (event.filename && !event.filename.includes(window.location.origin)) {
      return;
    }
    
    // Show error for critical failures
    if (event.error && event.error.stack) {
      window.ErrorHandler.showErrorMessage(
        'A technical error occurred. Please refresh the page.',
        'error'
      );
    }
  });
  
  // Unregister any existing service workers to prevent caching issues
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for(let registration of registrations) {
        registration.unregister();
        console.log('Service Worker unregistered:', registration);
      }
    });
  }
  
  // Enhanced form submission with error handling
  window.submitFormSafely = async function(form, options = {}) {
    const formData = new FormData(form);
    const submitButton = form.querySelector('[type="submit"]');
    const originalText = submitButton ? submitButton.textContent : '';
    
    try {
      // Show loading state
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = options.loadingText || 'Submitting...';
      }
      
      const response = await safeFetch(form.action || window.location.href, {
        method: form.method || 'POST',
        body: formData,
        timeout: options.timeout || 15000
      });
      
      const result = await response.json();
      
      // Show success message
      window.ErrorHandler.showErrorMessage(
        options.successMessage || 'Form submitted successfully!',
        'success'
      );
      
      // Reset form if successful
      if (options.resetOnSuccess !== false) {
        form.reset();
      }
      
      return result;
    } catch (error) {
      window.handleApiError(error, 'Form submission');
      throw error;
    } finally {
      // Restore button state
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    }
  };
  
  // Auto-retry for critical resources
  function retryResourceLoad(element, maxRetries = 2) {
    let retryCount = 0;
    
    function attemptLoad() {
      if (retryCount >= maxRetries) {
        console.warn('Max retries reached for resource:', element.src || element.href);
        return;
      }
      
      retryCount++;
      
      // Add timestamp to bypass cache
      const url = new URL(element.src || element.href);
      url.searchParams.set('retry', retryCount);
      
      if (element.tagName === 'IMG') {
        element.src = url.toString();
      } else if (element.tagName === 'LINK') {
        element.href = url.toString();
      }
    }
    
    element.addEventListener('error', attemptLoad);
  }
  
  // Apply auto-retry to critical resources
  document.querySelectorAll('img[data-critical], link[data-critical]').forEach(element => {
    retryResourceLoad(element);
  });

  // Initialize error handling systems
  initNetworkMonitoring();
});