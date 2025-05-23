// Photo Slider Implementation
document.addEventListener('DOMContentLoaded', () => {
    // Photo slider functionality
    const photoSlide = document.getElementById('photo-slide');
    const photoDots = document.querySelectorAll('.photo-navigation .photo-nav-dot');
    const prevArrow = document.querySelector('.photo-nav-arrow.prev');
    const nextArrow = document.querySelector('.photo-nav-arrow.next');
    
    // Sample photo URLs - replace these with your actual photo URLs
    const photoUrls = [
        "../assets/img/me_img/me.jpg",
        "../assets/img/me_img/me_2.jpg",
        "../assets/img/me_img/me_3.jpg"
    ];
    
    let currentPhotoIndex = 0;
    
    // Function to update the photo display
    function updatePhotoSlide(index) {
        // Update the image source
        photoSlide.style.opacity = 0;
        
        setTimeout(() => {
            photoSlide.src = photoUrls[index];
            photoSlide.style.opacity = 1;
        }, 300);
        
        // Update the active dot
        photoDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Update current index
        currentPhotoIndex = index;
    }
    
    // Set up click events for the dots
    photoDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updatePhotoSlide(index);
        });
    });
    
    // Set up click events for arrows
    prevArrow.addEventListener('click', () => {
        const newIndex = currentPhotoIndex === 0 ? photoUrls.length - 1 : currentPhotoIndex - 1;
        updatePhotoSlide(newIndex);
    });
    
    nextArrow.addEventListener('click', () => {
        const newIndex = currentPhotoIndex === photoUrls.length - 1 ? 0 : currentPhotoIndex + 1;
        updatePhotoSlide(newIndex);
    });
    
    // Add transition style to the image
    photoSlide.style.transition = 'opacity 0.3s ease';
    
    // Initialize with the first photo
    updatePhotoSlide(0);
    
    // Optional: Auto-rotate photos every 5 seconds
    let autoRotateInterval = setInterval(() => {
        const newIndex = (currentPhotoIndex + 1) % photoUrls.length;
        updatePhotoSlide(newIndex);
    }, 5000);
    
    // Stop auto-rotate when user interacts with the slider
    const photoCard = document.querySelector('.photo-card');
    photoCard.addEventListener('mouseenter', () => {
        clearInterval(autoRotateInterval);
    });
    
    // Resume auto-rotate when user leaves the slider
    photoCard.addEventListener('mouseleave', () => {
        autoRotateInterval = setInterval(() => {
            const newIndex = (currentPhotoIndex + 1) % photoUrls.length;
            updatePhotoSlide(newIndex);
        }, 5000);
    });
});
