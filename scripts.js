import fetch from 'node-fetch'; // Import the fetch function
        // Array to store the images
        let images = [];

        // Fetch random images from aibooru API
        function fetchRandomImages() {
            fetch('https://api.aibooru.org/images/random?count=3')
                .then(response => response.json())
                .then(data => {
                    // Clear the existing images
                    const carousel = document.querySelector('.carousel');
                    carousel.innerHTML = '';

                    // Add the new images to the carousel
                    data.forEach(image => {
                        const imageElement = document.createElement('img');
                        imageElement.src = image.url;
                        imageElement.alt = image.name;
                        imageElement.onclick = function() {
                            enlargeImage(this);
                        };

                        carousel.appendChild(imageElement);
                        images.push(imageElement);
                    });
                })
                .catch(error => console.error(error));
        }

        // Show previous set of images
        function showPreviousImages() {
            const carousel = document.querySelector('.carousel');
            carousel.innerHTML = '';

            // Get the previous set of images
            const previousImages = images.splice(0, 3);
            images = previousImages.concat(images);

            // Add the previous images to the carousel
            previousImages.forEach(image => {
                carousel.appendChild(image);
            });
        }

        // Show next set of images
        function showNextImages() {
            const carousel = document.querySelector('.carousel');
            carousel.innerHTML = '';

            // Get the next set of images
            const nextImages = images.splice(images.length - 3, 3);
            images = images.concat(nextImages);

            // Add the next images to the carousel
            nextImages.forEach(image => {
                carousel.appendChild(image);
            });
        }

        // Call the fetchRandomImages function to populate the carousel with initial images
        fetchRandomImages();

        // Function to enlarge the clicked image
        function enlargeImage(img) {
            img.classList.toggle("enlarged");
        }