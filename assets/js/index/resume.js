document.addEventListener('DOMContentLoaded', function () {
            const viewResumeBtn = document.getElementById('view-resume-btn');
            const resumeButtonText = document.getElementById('resume-button-text');
            const buttonContent = document.getElementById('button-content');
            const resetTimeout = 5000; // 5 seconds

            let isClicked = false;
            let resetTimer;

            viewResumeBtn.addEventListener('click', function () {
                if (isClicked) return;
                isClicked = true;

                // Add ripple effect
                viewResumeBtn.classList.add('clicked');

                // Animate content change
                buttonContent.classList.add('changing');

                setTimeout(() => {
                    // Change text to "Viewed"
                    resumeButtonText.textContent = 'Viewed Resume';
                    buttonContent.classList.remove('changing');

                    // Start reset timer
                    resetTimer = setTimeout(resetButton, resetTimeout);

                    // Optional: open resume in new tab
                    window.open('https://drive.google.com/your-resume-link', '_blank');
                }, 200);
            });

            function resetButton() {
                // Animate content change
                buttonContent.classList.add('changing');

                setTimeout(() => {
                    // Reset text and remove clicked class
                    resumeButtonText.textContent = 'View Resume';
                    viewResumeBtn.classList.remove('clicked');
                    buttonContent.classList.remove('changing');
                    isClicked = false;
                }, 200);
            }
        });