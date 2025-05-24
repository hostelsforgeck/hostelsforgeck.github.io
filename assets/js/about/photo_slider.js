// Optimized Photo Slider Implementation
document.addEventListener('DOMContentLoaded', () => {
    const photoSlide = document.getElementById('photo-slide');
    const photoDots = document.querySelectorAll('.photo-navigation .photo-nav-dot');
    const prevArrow = document.querySelector('.photo-nav-arrow.prev');
    const nextArrow = document.querySelector('.photo-nav-arrow.next');
    
    // Photo URLs - replace these with your actual photo URLs
    const photoUrls = [
        "../assets/img/me_img/me.jpg",
        "../assets/img/me_img/me_2.jpg",
        "../assets/img/me_img/me_3.jpg"
    ];
    
    let currentPhotoIndex = 0;
    let preloadedPhotos = [];
    let isTransitioning = false;
    let autoRotateInterval;

    // Preload all photos for instant switching
    function preloadPhotos() {
        photoUrls.forEach((url, index) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                console.log(`Photo ${index + 1} preloaded successfully`);
            };
            img.onerror = () => {
                console.warn(`Failed to preload photo ${index + 1}: ${url}`);
            };
            preloadedPhotos[index] = img;
        });
    }

    // Fast update function - no fade delay
    function updatePhotoSlide(index) {
        if (isTransitioning || index === currentPhotoIndex || !photoSlide) return;
        
        isTransitioning = true;
        
        // Quick opacity transition for smooth effect
        photoSlide.style.opacity = '0.7';
        
        // Use requestAnimationFrame for smooth transition
        requestAnimationFrame(() => {
            photoSlide.src = photoUrls[index];
            photoSlide.alt = `Profile Photo ${index + 1}`;
            photoSlide.style.opacity = '1';
            
            // Update active dot
            updateActiveDot(index);
            currentPhotoIndex = index;
            
            // Reset transition flag after a short delay
            setTimeout(() => {
                isTransitioning = false;
            }, 100);
        });
    }

    // Separate function to update dots for better performance
    function updateActiveDot(activeIndex) {
        photoDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeIndex);
        });
    }

    // Setup event listeners
    function setupEventListeners() {
        // Dot click events
        photoDots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                updatePhotoSlide(index);
            });
        });

        // Arrow click events with null checks
        if (prevArrow) {
            prevArrow.addEventListener('click', (e) => {
                e.preventDefault();
                const newIndex = currentPhotoIndex === 0 ? photoUrls.length - 1 : currentPhotoIndex - 1;
                updatePhotoSlide(newIndex);
            });
        }

        if (nextArrow) {
            nextArrow.addEventListener('click', (e) => {
                e.preventDefault();
                const newIndex = currentPhotoIndex === photoUrls.length - 1 ? 0 : currentPhotoIndex + 1;
                updatePhotoSlide(newIndex);
            });
        }

        // Keyboard navigation for accessibility
        document.addEventListener('keydown', (e) => {
            const photoCard = document.querySelector('.photo-card');
            if (photoCard && photoCard.matches(':hover')) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const newIndex = currentPhotoIndex === 0 ? photoUrls.length - 1 : currentPhotoIndex - 1;
                    updatePhotoSlide(newIndex);
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    const newIndex = currentPhotoIndex === photoUrls.length - 1 ? 0 : currentPhotoIndex + 1;
                    updatePhotoSlide(newIndex);
                }
            }
        });
    }

    // Auto-rotate functionality
    function startAutoRotate() {
        if (photoUrls.length <= 1) return; // Don't auto-rotate if only one photo
        
        autoRotateInterval = setInterval(() => {
            if (!isTransitioning) {
                const newIndex = (currentPhotoIndex + 1) % photoUrls.length;
                updatePhotoSlide(newIndex);
            }
        }, 4000); // Slightly faster rotation for better engagement
    }

    function stopAutoRotate() {
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
            autoRotateInterval = null;
        }
    }

    // Setup hover events for auto-rotate
    function setupAutoRotate() {
        const photoCard = document.querySelector('.photo-card');
        if (photoCard) {
            photoCard.addEventListener('mouseenter', stopAutoRotate);
            photoCard.addEventListener('mouseleave', startAutoRotate);
            
            // Start auto-rotate initially
            startAutoRotate();
        }
    }

    // Initialize everything
    function initializePhotoSlider() {
        // Add transition style to the image
        if (photoSlide) {
            photoSlide.style.transition = 'opacity 0.15s ease'; // Faster transition
            
            // Set initial photo
            if (photoUrls.length > 0) {
                photoSlide.src = photoUrls[0];
                photoSlide.alt = 'Profile Photo 1';
            }
        }

        // Preload all photos
        preloadPhotos();
        
        // Setup event listeners
        setupEventListeners();
        
        // Initialize with the first photo and update dots
        updateActiveDot(0);
        
        // Setup auto-rotate
        setupAutoRotate();
    }

    // Start initialization
    initializePhotoSlider();

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        stopAutoRotate();
    });

    // Handle visibility change (when user switches tabs)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoRotate();
        } else {
            const photoCard = document.querySelector('.photo-card');
            if (photoCard && !photoCard.matches(':hover')) {
                startAutoRotate();
            }
        }
    });
});