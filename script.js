// Load local .json file and build image gallery
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        var dogList = data.dogs;

        for (var i = dogList.length - 1; i >= 0; i--) {
            var imageContainer = document.createElement('div');
            imageContainer.classList.add('dog', 'col-xs-12', 'col-sm-4');
            document.getElementById("gallery").appendChild(imageContainer);

            var image = document.createElement('img');
            image.setAttribute('src', dogList[i].image);
            image.classList.add('img-fluid');
            imageContainer.appendChild(image);
        }
    }
};
xmlhttp.open('GET', 'assets/data/dogs.json', true);
xmlhttp.send();
