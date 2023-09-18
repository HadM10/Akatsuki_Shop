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

    // if (window.location.pathname === '/akatsuki_shop/Frontend/HTML/products.html') {
    //     var xhr = new XMLHttpRequest();
    //     xhr.open("GET", "../../Backend/php/products.php", true);
    //     xhr.onreadystatechange = function () {
    //         if (xhr.readyState === 4 && xhr.status === 200) {
    //             var response = JSON.parse(xhr.responseText);
    //             displayProducts(response);
    //         }
    //     };
    //     xhr.send();


    //     // display products from database

    //     function displayProducts(products) {
    //         var productContainer = document.getElementById("product-container");

    //         for (var i = 0; i < products.length; i++) {
    //             var product = products[i];
    //             var productElement = document.createElement("div");
    //             productElement.classList.add("products-card");
    //             productElement.innerHTML = `
    //         <div class="products-img">
    //         <img src="${product.image}" alt="Product ${i}">
    //         </div>
    //         <h3>${product.name}</h3>
    //         <p>${product.description}</p>
    //         <span class="prices">$${product.price}</span>
    //     `;
    //             productContainer.appendChild(productElement);
    //         }
    //     }
    // }

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

        // Check if there are no results
        if (results.length === 0) {
            var noResultsMessage = document.createElement("h1");
            noResultsMessage.innerHTML = "No results found.";
            resultsContainer.appendChild(noResultsMessage);
        } else {
            // Loop through the results and create HTML elements to display them
            results.forEach(function (result) {
                var resultElement = document.createElement("div");
                resultElement.classList.add("products-card");
                resultElement.setAttribute("data-product-id", result.id);
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
        var categoriesContainer = document.getElementById("categories-container");

        if (categoryParam == 1)
            categoryName = "Accessories"
        else if (categoryParam == 2)
            categoryName = "Shirts"
        else if (categoryParam == 4)
            categoryName = "Books"
        else
            categoryName = "Games"

        // Clear any previous results
        resultsContainer.innerHTML = "";

        var categoryResults = document.createElement("h2");
        categoryResults.innerHTML = `${categoryName}`;

        categoriesContainer.insertBefore(categoryResults, categoriesContainer.firstChild);

        // Loop through the results and create HTML elements to display them
        results.forEach(function (result) {
            var resultElement = document.createElement("div");
            resultElement.classList.add("products-card");
            resultElement.setAttribute("data-product-id", result.id);
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


    // FILTERS RESULTS

    // Function to fetch and display products based on filters
    function displayFilteredProducts() {
        const category = document.getElementById("category-filter").value;
        const date = document.getElementById("date-filter").value;
        const price = document.getElementById("price-filter").value;

        console.log(price);

        // Create a new XMLHttpRequest object
        var xhr = new XMLHttpRequest();

        // Define the AJAX request to fetch filtered products
        xhr.open("GET", `../../Backend/php/filters.php?category=${encodeURIComponent(category)}&price=${encodeURIComponent(price)}&date=${encodeURIComponent(date)}`, true);

        // Set up the event listener for when the request is complete
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                displayProducts(response);
            }
        };

        // Send the AJAX request
        xhr.send();
    }

    // Function to display products in the product-container
    function displayProducts(products) {
        var productContainer = document.getElementById("product-container");
        productContainer.innerHTML = ""; // Clear previous results

        products.forEach(function (product) {
            var productElement = document.createElement("div");
            productElement.classList.add("products-card");
            productElement.setAttribute("data-product-id", product.id);
            productElement.innerHTML = `
            <div class="products-img">
            <img src="${product.image}" alt="Product image">
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span class="prices">$${product.price}</span>
        `;
            productContainer.appendChild(productElement);
        });
    }

    if (window.location.pathname === '/akatsuki_shop/Frontend/HTML/products.html') {
        // Attach change event listeners to the filter elements
        document.getElementById("category-filter").addEventListener("change", displayFilteredProducts);
        document.getElementById("date-filter").addEventListener("change", displayFilteredProducts);
        document.getElementById("price-filter").addEventListener("change", displayFilteredProducts);

        // Initial load of products
        displayFilteredProducts();
    }


    // PRODUCTS DETAILS

    // Event listener for when a user clicks on a product
    document.addEventListener("click", function (event) {
        if (event.target.closest(".products-card")) {
            // Get the productId of the selected product
            const productId = event.target.closest(".products-card").getAttribute("data-product-id");

            window.location.href = `products-details.html?productId=${productId}`;


        }
    });

    // Check if there's a category parameter in the URL
    const details_Params = new URLSearchParams(window.location.search);
    const detailsParam = details_Params.get("productId");


    // Function to fetch and display product details based on productId

    if (detailsParam) {
        // Create a new XMLHttpRequest object
        var xhr = new XMLHttpRequest();

        // Define the AJAX request to fetch product details based on productId
        xhr.open("GET", `../../Backend/php/products-details.php?productId=${detailsParam}`, true);

        // Set up the event listener for when the request is complete
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Parse the JSON response from the server
                var productDetails = JSON.parse(xhr.responseText);

                // Call a function to display the product details on your webpage
                displayProductDetails(productDetails);
            }
        };

        // Send the AJAX request
        xhr.send();
    }

    // Function to display product details on the webpage
    function displayProductDetails(productDetails) {
        // Assuming you have an HTML element where you want to display the details
        var detailsContainer = document.getElementById("products-details-results");

        // Clear any previous details
        detailsContainer.innerHTML = "";

        // Create elements to display the product details
        var productElement = document.createElement("div");
        productElement.classList.add("products-card");


        productElement.innerHTML = `
        <div class="products-img">
            <img src="${productDetails.image}" alt="Product image">
        </div>
        <h3>${productDetails.name}</h3>
        <p>${productDetails.description}</p>
        <p>Price: $${productDetails.price}</p>
        <p>Stock: ${productDetails.stock}</p>
    `;

        // Append the product details to the details container
        detailsContainer.appendChild(productElement);

        // Depending on the category, you can conditionally render additional details here
        if (productDetails.category_id === "2") {
            // Add code to display size, color options, and quantity input for shirts
            // For example:
            var sizeSelect = document.createElement("select");
            sizeSelect.innerHTML = `<option value="S">Small</option><option value="M">Medium</option><option value="L">Large</option>`;
            sizeSelect.id = "size-select";
            detailsContainer.appendChild(sizeSelect);

            var colorSelect = document.createElement("select");
            colorSelect.innerHTML = `<option value="Black">Black</option><option value="White">White</option>`;
            colorSelect.id = "color-select";
            detailsContainer.appendChild(colorSelect);

            var quantityInput = document.createElement("input");
            quantityInput.type = "number";
            quantityInput.min = "1";
            quantityInput.value = "1";
            quantityInput.id = "quantity-input";
            detailsContainer.appendChild(quantityInput);

            var addToCartButton = document.createElement("button");
            addToCartButton.textContent = "Add to Cart";
            addToCartButton.addEventListener("click", function () {
                // Get selected size, color, and quantity
                var selectedSize = document.getElementById("size-select").value;
                var selectedColor = document.getElementById("color-select").value;
                var selectedQuantity = document.getElementById("quantity-input").value;

                // Add the selected product to the cart with details
                addToCart(productDetails, selectedSize, selectedColor, selectedQuantity);
            });
            detailsContainer.appendChild(addToCartButton);
        } else if (productDetails.category_id === "1") {
            // Add code to display simpler details for accessories
            // For example, just display an "Add to Cart" button
            var addToCartButton = document.createElement("button");
            addToCartButton.textContent = "Add to Cart";
            addToCartButton.addEventListener("click", function () {
                // Add the selected product to the cart (simpler case for accessories)
                addToCart(productDetails, null, null, 1);
            });
            detailsContainer.appendChild(addToCartButton);
        }
    }









});



