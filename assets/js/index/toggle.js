     // Theme toggle functionality
        document.addEventListener('DOMContentLoaded', function () {
            const themeToggle = document.getElementById('theme-toggle');

            if (themeToggle) {
                themeToggle.addEventListener('click', function () {
                    this.classList.toggle('active');
                });
            }

        });