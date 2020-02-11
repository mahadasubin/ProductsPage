/*** Created by Mahada subin on 2/10/20....*/
let productsData = [];

let ajax_get = (url, callback) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.setRequestHeader("Accept", "application/json");
    xmlhttp.send();
}

ajax_get('Products.json', function(data) {
    //url = https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json -->in real time with CORS settings
    //url = external .json file for unit testing
    productsData = data["groups"];

    document.querySelector('#productList').innerHTML = `<h1 class="product-list">Products (${productsData.length} results)</h1>
   ${productsData.map(productTemplate).join("")} <p class="footer">These ${productsData.length} products were added recently. Check back soon for updates.</p>`;
    document.querySelector('#overlay-carousel').innerHTML = `
    <div id="thumbnail" class="carousel slide" data-ride="carousel">
        <!-- Indicators -->
            <ul class="carousel-indicators">${productsData.map(carouselIndicators).join("")}</ul>
        <!-- The slideshow -->
            <div class="carousel-inner">${productsData.map(carouselTemplate).join("")}</div>
        <!-- Left and right controls -->
            <a class="carousel-control-prev" href="#thumbnail" title="go to revious" data-slide="prev">
            <span class="carousel-control-prev-icon"></span>
            </a>
            <a class="carousel-control-next" href="#thumbnail" title="go to next" data-slide="next">
            <span class="carousel-control-next-icon"></span>
            </a>
    </div>`

    document.querySelectorAll('.carousel-item')[0].classList.add('active');
});

let productTemplate = (product) => {
    return `
    <div class="product">
    <img class="product-photo" src="${product.hero.href}" alt="${product.name}" data-toggle="modal" data-target="#Overlay">
    <h2 class="product-name">${product.name} <p class="price">USD $${product.priceRange.regular.low}.00</p></h2>
    </div>
   `;
};

let carouselIndicators = (product,index) => {
    return `<li data-target="#thumbnail" data-slide-to="index"></li>`
};

let carouselTemplate = (product,index) => {
    return `
    <div class="carousel-item">
      <img src="${product.thumbnail.href}" alt="${product.name}">
    </div>
`
}