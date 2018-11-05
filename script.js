/**
 * Helper functions
 * 1. setAttribute()
 * 2. getRandomSize()
 */
function setAttributes(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

function getRandomSize(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Lightbox for Bootstrap
 * Description: Opens images in modal on click
 * Source: http://ashleydw.github.io/lightbox/
 */
$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});

/**
 * Lozad JS
 * Description: lazy loads elements performantly
 * Source: https://github.com/ApoorvSaxena/lozad.js
 */
const observer = lozad();
observer.observe();

/**
 * Image Gallery of Adorable Dogs <3
 * 1. Load local json file
 * 2. Build image gallery
 */
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

function buildGallery() {
    loadJSON(function(response) {
        var data = JSON.parse(response);
        var dogList = data.dogs;

        for (var i = dogList.length - 1; i >= 0; i--) {
            var dog = dogList[i];
            var dogName = dog.name;
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
                'data-footer': dogName,
                'href': imageUrl
            });

            var image = document.createElement('img');
            setAttributes(image, {
                'height': height,
                'width': width,
                'data-src': imageUrl
            });
            image.classList.add('image', 'lozad');
            imageContainer.appendChild(image);

            var textOverlay = document.createElement('div');
            textOverlay.classList.add('text-container');
            var text = document.createElement('div');
            text.classList.add('text');
            text.textContent = dogName;
            textOverlay.appendChild(text);
            imageContainer.appendChild(textOverlay);

            // Add image to gallery
            document.getElementById('gallery').appendChild(imageContainer);
        }

        // Observe newly added elements for lazy loading
        observer.observe();
    });
}

buildGallery();
