document.addEventListener('DOMContentLoaded', function () {
            // Icons data - you can replace these with your actual icons
            const icons = [
                { src: './p_assets/img/vscode.png', alt: '4' },
                { src: './p_assets/img/gpt.png', alt: '0' },
                { src: './p_assets/img/html.png', alt: '1' },
                { src: './p_assets/img/css.png', alt: '2' },
                { src: './p_assets/img/js.png', alt: '3' },
                { src: 'https://placehold.co/48x48?text=5', alt: '5' }
            ];
            const stackContainer = document.getElementById('stackContainer');
            const stackIconsScroll = document.getElementById('stackIconsScroll');
            let scrollPosition = 0;
            let animationId = null;

            // Speed control - adjust this value to control animation speed
            // Lower values = slower animation, Higher values = faster animation
            let scrollSpeed = 0.8; // Default speed

            // Function to change the scroll speed
            function setScrollSpeed(speed) {
                scrollSpeed = speed;
                // You can add logic here to update UI elements if you have a speed control slider
            }

            // Create icons and add them to the scroll container
            function createIcons() {
                icons.forEach(icon => {
                    const iconElement = document.createElement('div');
                    iconElement.className = 'stack-icon';

                    const img = document.createElement('img');
                    img.src = icon.src;
                    img.alt = icon.alt;

                    iconElement.appendChild(img);
                    stackIconsScroll.appendChild(iconElement);
                });
            }

            // Initialize the icons
            createIcons();

            // Calculate the width of one complete set of icons
            const iconElements = stackIconsScroll.querySelectorAll('.stack-icon');
            const iconWidth = iconElements[0].offsetWidth;
            const iconMargin = 16; // Gap between icons
            const totalIconWidth = iconWidth + iconMargin;
            const singleSetWidth = totalIconWidth * icons.length; // Width of one complete set of icons

            // Clone enough icons to ensure seamless scrolling
            // We need at least 2 sets of icons for smooth infinite scrolling
            const cloneIcons = () => {
                // Clear existing clones first
                const originalCount = icons.length;
                while (stackIconsScroll.children.length > originalCount) {
                    stackIconsScroll.removeChild(stackIconsScroll.lastChild);
                }

                // Clone all icons to create at least 2 full sets
                const containerWidth = stackContainer.offsetWidth;
                const setsNeeded = Math.ceil((containerWidth * 2) / singleSetWidth);

                // Create complete sets of icons (not individual icons)
                for (let i = 0; i < setsNeeded; i++) {
                    for (let j = 0; j < originalCount; j++) {
                        const original = iconElements[j];
                        const clone = original.cloneNode(true);
                        stackIconsScroll.appendChild(clone);
                    }
                }
            };

            cloneIcons();

            // Set the initial position of the scroll container
            stackIconsScroll.style.transform = `translateX(0px)`;

            // Timing variables for smoother animation
            let lastTime = 0;

            // Smooth scrolling animation with time-based movement
            function scrollIcons(timestamp) {
                if (!lastTime) lastTime = timestamp;

                // Calculate time elapsed since last frame
                const elapsed = timestamp - lastTime;
                lastTime = timestamp;

                // Apply speed as pixels per millisecond
                // This makes animation consistent regardless of frame rate
                scrollPosition -= scrollSpeed * (elapsed / 16); // Normalize to 60fps

                // Reset position when we've scrolled past a complete set of icons
                if (Math.abs(scrollPosition) >= singleSetWidth) {
                    // Instead of moving individual icons, adjust the position
                    scrollPosition += singleSetWidth;
                }

                // Apply the transform
                stackIconsScroll.style.transform = `translateX(${scrollPosition}px)`;

                // Continue the animation
                animationId = requestAnimationFrame(scrollIcons);
            }

            // Start the animation
            animationId = requestAnimationFrame(scrollIcons);

            // Pause animation on hover
            stackContainer.addEventListener('mouseenter', () => {
                cancelAnimationFrame(animationId);
                lastTime = 0; // Reset timing for smooth restart
            });

            // Resume animation on mouse leave
            stackContainer.addEventListener('mouseleave', () => {
                lastTime = 0; // Reset timing for smooth restart
                animationId = requestAnimationFrame(scrollIcons);
            });

            // Handle window resize to ensure enough icons
            window.addEventListener('resize', () => {
                cloneIcons();
            });

            window.stackScroll = {
                setSpeed: setScrollSpeed,
                getSpeed: () => scrollSpeed,
                pause: () => {
                    cancelAnimationFrame(animationId);
                    lastTime = 0;
                },
                resume: () => {
                    if (!animationId) {
                        lastTime = 0;
                        animationId = requestAnimationFrame(scrollIcons);
                    }
                }
            };
        });