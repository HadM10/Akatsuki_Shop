document.addEventListener("DOMContentLoaded", function () {
    //LOGO LINK
    document.getElementById('logo').addEventListener('click', function () {
        window.location = 'index.html';
    })

    // Get the search icon and search bar elements
    const searchIcon = document.querySelector('.search-icon');
    const searchBar = document.querySelector('.search-bar');

    // Add click event listener to the search icon
    searchIcon.addEventListener('click', () => {
        searchBar.style.display = searchBar.style.display === 'block' ? 'none' : 'block';
    });

    //Slider
    $(document).ready(function () {
        $('.slider').slick({
            autoplay: false, // Enable autoplay
            dots: true,     // Show navigation dots
            prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>'
        });
    });

    //Close Search Bar
    const searchInput = document.querySelector('.search-bar input');
    const closeBtn = document.querySelector('.close-btn');

    closeBtn.addEventListener('click', function () {
        searchInput.value = ''; // Clear the input field
        searchBar.style.display = 'none';
    });

    //BLUR CARDS

    // Get all offer cards
    const offerCards = document.querySelectorAll('.offer-card');

    // Add mouseenter event listener to each offer card
    offerCards.forEach((card, index) => {
        card.addEventListener('mouseover', () => {
            // Apply blur to all other offer cards except the one being hovered
            offerCards.forEach((otherCard, otherIndex) => {
                if (index !== otherIndex) {
                    otherCard.style.filter = 'blur(3px)';
                    otherCard.style.transition = 'filter 1s';
                }
            });
        });

        // Add mouseleave event listener to remove the blur effect
        card.addEventListener('mouseleave', () => {
            // Remove blur from all offer cards
            offerCards.forEach(otherCard => {
                otherCard.style.filter = 'none';
                otherCard.style.transition = 'transform 0.5s';
            });
        });
    });


    //GET PRODUCTS FROM DATABASE

    // ajax get

    if (window.location.pathname === '/akatsuki_shop/Frontend/HTML/products.html') {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "../../Backend/php/products.php", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                displayProducts(response);
            }
        };
        xhr.send();


        // display products from database

        function displayProducts(products) {
            var productContainer = document.getElementById("product-container");

            for (var i = 0; i < products.length; i++) {
                var product = products[i];
                var productElement = document.createElement("div");
                productElement.classList.add("products-card");
                productElement.innerHTML = `
            <div class="products-img">
            <img src="${product.image}" alt="Product ${i}">
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span class="prices">$${product.price}</span>
        `;
                productContainer.appendChild(productElement);
            }
        }
    }

    // SEARCH AND DISPLAY RESULT FROM DATABASE

    // AJAX Search
    const searchButton = document.getElementById("search-button");

    searchButton.addEventListener("click", function () {
        const searchTerm = document.getElementById("search-input").value;

        // Create a new XMLHttpRequest object
        var xhr = new XMLHttpRequest();

        // Define the AJAX request
        xhr.open("GET", "../../Backend/php/search.php?term=" + searchTerm, true);

        // Set up the event listener for when the request is complete
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText);
                // Parse the JSON response from the server
                var searchResults = JSON.parse(xhr.responseText);

                // Call a function to display the search results on your webpage
                displaySearchResults(searchResults);
            }
        };

        // Send the AJAX request
        xhr.send();
    });


    function displaySearchResults(results) {
        // Assuming you have an HTML element where you want to display the results
        var resultsContainer = document.getElementById("search-results");

        // Clear any previous results
        resultsContainer.innerHTML = "";

        var productContainer = document.getElementById("product-container");
        productContainer.style.display = "none";

        // Loop through the results and create HTML elements to display them
        results.forEach(function (result) {
            var resultElement = document.createElement("div");
            resultElement.classList.add("products-card");
            resultElement.innerHTML = `
           <div class="products-img">
           <img src="${result.image}" alt="Product Image">
           </div>
           <h3>${result.name}</h3>
           <p>${result.description}</p>
           <span class="prices">$${result.price}</span>
           `;
            resultsContainer.appendChild(resultElement);
        });
    }

});