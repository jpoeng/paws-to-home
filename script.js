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
 * Image Gallery of Adorable Dogs <3
 * 1. Load local json file
 * 2. Build image gallery
 */
function buildGallery() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            var dogList = data.dogs;
            var gallery = document.getElementById('gallery');

            for (var i = dogList.length - 1; i >= 0; i--) {
                var dog = dogList[i];
                var imageUrl = dog.image;
                var imageUrlSource = dog.source;

                // Calculate random image sizes
                var width = getRandomSize(200, 400);
                var height =  getRandomSize(200, 400);

                // Build image element
                var imageContainer = document.createElement('a');
                imageContainer.classList.add('dog', 'image-container');
                setAttributes(imageContainer, {
                    'data-toggle': 'lightbox',
                    'data-type': 'image',
                    'data-footer': 'source: <a href="' + imageUrlSource + '">' + imageUrlSource + '</a>',
                    'href': imageUrl
                });

                var image = document.createElement('img');
                setAttributes(image, {
                    'height': height,
                    'width': width,
                    'src': imageUrl
                });
                image.classList.add('image');
                imageContainer.appendChild(image);

                // Add image to gallery
                gallery.appendChild(imageContainer);
            }
        }
    };
    xmlhttp.open('GET', 'assets/data/dogs.json', true);
    xmlhttp.send();
}
buildGallery();
