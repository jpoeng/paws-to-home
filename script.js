/**
 * Helper functions
 * 1. setAttribute()
 */
function setAttributes(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
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

            for (var i = dogList.length - 1; i >= 0; i--) {
                var imgUrl = dogList[i].image;
                var imgUrlSource = dogList[i].source;

                var imageContainer = document.createElement('a');
                imageContainer.classList.add('dog', 'col-xs-12', 'col-sm-4');
                setAttributes(imageContainer, {
                    'data-toggle': 'lightbox',
                    'data-type': 'image',
                    'data-footer': 'source: <a href="' + imgUrlSource + '">' + imgUrlSource + '</a>',
                    'href': imgUrl
                });
                document.getElementById("gallery").appendChild(imageContainer);

                var image = document.createElement('img');
                image.setAttribute('src', imgUrl);
                image.classList.add('img-fluid');
                imageContainer.appendChild(image);
            }
        }
    };
    xmlhttp.open('GET', 'assets/data/dogs.json', true);
    xmlhttp.send();
}
buildGallery();
