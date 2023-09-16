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

    // Check if a search query is present in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');

    const searchForm = document.getElementById("search-form");
    const search_input = document.getElementById("search-input");

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const searchTerm = search_input.value.trim();
        if (searchTerm) {
            // Redirect to the products page with the search query as a parameter
            window.location.href = `search.html?search=${encodeURIComponent(searchTerm)}`;
        }
    });

    if (searchTerm) {
        // Create a new XMLHttpRequest object
        var xhr = new XMLHttpRequest();

        // Define the AJAX request
        xhr.open("GET", `../../Backend/php/search.php?term=${searchTerm}`, true);

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
    }

    function displaySearchResults(results) {
        // Assuming you have an HTML element where you want to display the results
        var resultsContainer = document.getElementById("search-results");
        var searchContainer = document.getElementById("search-container");

        // Clear any previous results
        resultsContainer.innerHTML = "";

        var searchResults = document.createElement("h2");
        searchResults.innerHTML = `search results for : ${searchTerm}`;

        searchContainer.insertBefore(searchResults, searchContainer.firstChild);

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


    // CATEGORIES RESULTS 

    // Check if there's a category parameter in the URL
    const url_Params = new URLSearchParams(window.location.search);
    const categoryParam = url_Params.get("category");

    if (categoryParam) {

        console.log("Fetching category: " + categoryParam);
        // Create a new XMLHttpRequest object
        var xhr = new XMLHttpRequest();

        // Define the AJAX request to fetch items based on the selected category
        xhr.open("GET", `../../Backend/php/category.php?category=${categoryParam}`, true);

        // Set up the event listener for when the request is complete
        xhr.onreadystatechange = function () {
            console.log("Ready state: " + xhr.readyState + ", Status: " + xhr.status);
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Parse the JSON response from the server
                var categoryResults = JSON.parse(xhr.responseText);

                // Call a function to display the category results on your webpage
                displayCategoryResults(categoryResults);
            }
        };

        // Send the AJAX request
        xhr.send();
    }

    function displayCategoryResults(results) {
        // Assuming you have an HTML element where you want to display the results
        var resultsContainer = document.getElementById("category-results");

        // Clear any previous results
        resultsContainer.innerHTML = "";

        // Loop through the results and create HTML elements to display them
        results.forEach(function (result) {
            var resultElement = document.createElement("div");
            resultElement.classList.add("products-card");
            resultElement.innerHTML = `
            <div class="products-img">
            <img src="${result.image}" alt="Product image">
            </div>
            <h3>${result.name}</h3>
            <p>${result.description}</p>
            <span class="prices">$${result.price}</span>
        `;
            resultsContainer.appendChild(resultElement);
        });
    }


});



