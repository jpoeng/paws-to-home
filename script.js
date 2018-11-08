// When the user scrolls down 200px from the top of the document, show the scroll up button
function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.getElementById("scrollUpBtn").style.display = "block";
    } else {
        document.getElementById("scrollUpBtn").style.display = "none";
    }
}

// When the user clicks on the scroll up button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// This function sets element attributes/values
function setAttributes(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

// This function returns a random number value
function getRandomSize(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// This function is used to load JSON data
function loadJSON(callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
        }
    };
    xmlhttp.open('GET', 'assets/data/dogs.json', true);
    xmlhttp.send();
}

// This function is used to build the image gallery
function buildGallery() {
    loadJSON(function(response) {
        var data = JSON.parse(response);
        var dogList = data.dogs;
        var totalImages = dogList.length;
        var imagesRemaining = totalImages;
        var maxImages = 10;

        // Build all-images div to collect all images
        var allImages = document.createElement('div');
        allImages.classList.add('all-images');
        document.getElementById('gallery').appendChild(allImages);

        for (i = 0; i < totalImages; i++) {
            var dog = dogList[i];
            var imageUrl = dog.imageCompressed;

            // Calculate random image sizes
            var width = getRandomSize(200, 400);
            var height =  getRandomSize(200, 400);

            // Build image element
            var imageContainer = document.createElement('a');
            imageContainer.classList.add('dog', 'image-container');
            setAttributes(imageContainer, {
                'data-toggle': 'lightbox',
                'data-type': 'image',
                'href': imageUrl
            });

            var imageContainerInner = document.createElement('div');
            imageContainerInner.classList.add('inner');
            imageContainer.appendChild(imageContainerInner);

            var image = document.createElement('img');
            setAttributes(image, {
                'height': height,
                'width': width,
                'data-src': imageUrl
            });
            image.classList.add('image', 'lozad');
            imageContainerInner.appendChild(image);

            // Text overlay
            var textOverlay = document.createElement('div');
            textOverlay.classList.add('text-container');
            imageContainerInner.appendChild(textOverlay);

            // Info container
            var infoContainer = document.createElement('div');
            infoContainer.classList.add('info-container');
            textOverlay.appendChild(infoContainer);

            // Row 1 info: name
            var name = document.createElement('div');
            name.classList.add('name');
            name.textContent = dog.name;
            infoContainer.appendChild(name);

            // Row 2 info: breed, gender, age
            var wrapper = document.createElement('div');
            wrapper.classList.add('wrapper');
            infoContainer.appendChild(wrapper);

            var breed = document.createElement('div');
            breed.classList.add('breed');
            breed.textContent = dog.breed;
            wrapper.appendChild(breed);

            var gender = document.createElement('div');
            gender.classList.add('gender');
            gender.textContent = dog.gender;
            wrapper.appendChild(gender);
            
            var age = document.createElement('div');
            age.classList.add('age');
            age.textContent = dog.age;
            wrapper.appendChild(age);

            // Add image to gallery
            allImages.appendChild(imageContainer);

            // Keep track of images left to display
            imagesRemaining--;

            // Display 'x' images on the home page
            if (window.location.pathname == '/' || window.location.pathname == '/index.html') {
                if (i >= (maxImages - 1)) {
                    break;
                }
            }
        }

        // Observe newly added elements for lazy loading
        observer.observe();

        // Add 'meet all' button for remaining images
        if (imagesRemaining > 0) {
            var meetAllContainer = document.createElement('div');
            meetAllContainer.classList.add('btn-container', 'meet-all');
            document.getElementById('gallery').appendChild(meetAllContainer);

            var meetAllBtn = document.createElement('a');
            meetAllBtn.setAttribute('href', 'fullgallery.html');
            meetAllBtn.classList.add('btn');
            meetAllBtn.textContent = 'Meet all paws';
            meetAllContainer.appendChild(meetAllBtn);
        }
    });
}

/**
 * Lightbox for Bootstrap
 * @description Opens images in modal on click
 * Source: http://ashleydw.github.io/lightbox/
 */
$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});

/**
 * Lozad JS
 * @description Lazy loads elements performantly
 * Source: https://github.com/ApoorvSaxena/lozad.js
 */
const observer = lozad();
observer.observe();

// Build adorable dog gallery <3
buildGallery();

// Scroll to top
window.onscroll = function() {
    scrollFunction();
};
