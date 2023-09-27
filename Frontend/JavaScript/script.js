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
        searchInput.focus();
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

                // Update the product count
                const itemCount = document.getElementById("item-count");
                const totalItems = document.getElementById("total-items");
                itemCount.textContent = response.items.length; // Update with the number of filtered items
                totalItems.textContent = response.totalItems; // Update with the total number of items

                displayProducts(response.items);
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

        detailsContainer.innerHTML = `
        <div class="products-details-img">
            <img src="${productDetails.image}" alt="Product image">
        </div>
        <div id="products-details-info">
            <h3>${productDetails.name}</h3>
            <p>${productDetails.description}</p>
            <p>$${productDetails.price}</p>
        </div>
    `;

        var productsInfo = document.getElementById("products-details-info");
        // Depending on the category, you can conditionally render additional details here
        if (productDetails.category_id === "2") {
            // Add code to display size, color options, and quantity input for shirts
            // For example:
            var sizeSelect = document.createElement("select");
            sizeSelect.innerHTML = `<option value="Size">Select Size</option><option value="S">Small</option><option value="M">Medium</option><option value="L">Large</option>`;
            sizeSelect.id = "size-select";
            productsInfo.appendChild(sizeSelect);

            var colorSelect = document.createElement("select");
            colorSelect.innerHTML = `<option value="Color">Select Color</option><option value="Black">Black</option><option value="White">White</option>`;
            colorSelect.id = "color-select";
            productsInfo.appendChild(colorSelect);

            var quantityInput = document.createElement("input");
            quantityInput.type = "number";
            quantityInput.min = "1";
            quantityInput.value = "1";
            quantityInput.id = "quantity-input";
            productsInfo.appendChild(quantityInput);

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
            productsInfo.appendChild(addToCartButton);
        } else if (productDetails.category_id === "1") {
            // Add code to display quantity input for accessories
            var quantityInput = document.createElement("input");
            quantityInput.type = "number";
            quantityInput.min = "1";
            quantityInput.value = "1";
            quantityInput.id = "quantity-input";
            productsInfo.appendChild(quantityInput);

            var addToCartButton = document.createElement("button");
            addToCartButton.textContent = "Add to Cart";
            addToCartButton.addEventListener("click", function () {
                // Get selected quantity
                var selectedQuantity = document.getElementById("quantity-input").value;

                // Add the selected product to the cart with details (simpler case for accessories)
                addToCart(productDetails, null, null, selectedQuantity);
            });
            productsInfo.appendChild(addToCartButton);
        }
    }


    // CART FUNCTIONALITY AND STORING IN COOKIES

    // Function to add an item to the cart
    function addToCart(productDetails, size, color, quantity) {
        // Check if a shopping cart exists in cookies, or create an empty one
        let cart = getCartFromCookies();

        // Create a unique identifier for this cart item (you can use a timestamp, for example)
        const cartItemId = Date.now().toString();

        // Create a new cart item object
        const cartItem = {
            product: {
                id: productDetails.id,
                name: productDetails.name,
                image: productDetails.image,
                price: productDetails.price
            },
            size: size,
            color: color,
            quantity: parseInt(quantity)
        };

        const selectedSize = document.getElementById("size-select").value;
        const selectedColor = document.getElementById("color-select").value;
        const selectedQuantity = document.getElementById("quantity-input").value;

        // Ensure that required fields are selected
        if (selectedSize === "Size" || selectedColor === "Color" || selectedQuantity < 1) {
            alert("Please select size, color, and quantity.");
            return;
        }

        else {
            cart[cartItemId] = cartItem;

            // Store the updated cart in cookies
            saveCartToCookies(cart);

            // Optional: Show a confirmation message to the user
            alert("Item added to cart!");

            console.log(cart);

        }
    }


    // Function to retrieve the cart from cookies
    function getCartFromCookies() {
        const cartJSON = getCookie("cart");
        return cartJSON ? JSON.parse(cartJSON) : {};
    }

    // Function to save the cart to cookies
    function saveCartToCookies(cart) {
        setCookie("cart", JSON.stringify(cart), 30); // Cookie expires in 7 days
    }

    // Function to get a cookie by name
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    // Function to set a cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/`;
    }

    // Function to remove an item from the cart by cart item ID
    function removeItemFromCart(productIdToRemove) {
        const cart = getCartFromCookies();

        // Check if the cart item exists
        if (cart.hasOwnProperty(productIdToRemove)) {
            delete cart[productIdToRemove];
            saveCartToCookies(cart);
            // Clear the cartContainer and then update the display
            const cartContainer = document.getElementById("cart-container");
            cartContainer.innerHTML = ""; // Clear the container
            updateCartDisplay(); // Update the cart display
        }
    }



    // Function to update the cart display (you can customize this)
    function updateCartDisplay() {
        const cart = getCartFromCookies();
        const cartContainer = document.getElementById("cart-container");
        const totalPriceCheckout = document.getElementById("checkout-btn");

        // Initialize total price
        let totalPrice = 0;

        // Check if the cart is empty
        if (Object.keys(cart).length === 0) {
            const emptyCartMessage = document.createElement("p");
            emptyCartMessage.textContent = "Your cart is empty.";
            cartContainer.appendChild(emptyCartMessage);
        } else {
            // Iterate through cart items using a for...in loop
            for (const productId in cart) {
                if (cart.hasOwnProperty(productId)) {
                    const item = cart[productId];
                    const cartItemContainer = document.createElement("div");
                    cartItemContainer.classList.add("cartItemCard");
                    cartItemContainer.innerHTML = `
                    <div class="cart-item-img">
                        <img src="${item.product.image}" alt="Product image">
                    </div>
                    <div id="cart-item-info">
                        <h3>${item.product.name}</h3>
                        <p><span class='cart-info-span'>Size:</span> ${item.size}</p>
                        <p><span class='cart-info-span'>Color:</span> ${item.color}</p>
                        <p><span class='cart-info-span'>Price:</span> $${(item.product.price * item.quantity).toFixed(2)}</p>
                        <p><span class='cart-info-span'>Quantity:</span> ${item.quantity}</p>
                        <button class="remove-item" data-product-id="${productId}">Remove</button>
                    </div>
                `;
                    // Update the total price
                    totalPrice += item.product.price * item.quantity;

                    cartContainer.appendChild(cartItemContainer);
                }
            }
            console.log(cart);

            // Update the total price checkout
            totalPriceCheckout.textContent = `$${totalPrice.toFixed(2)}`;

            // Add event listeners to remove items from the cart
            document.addEventListener("click", function (event) {
                if (event.target.classList.contains("remove-item")) {
                    const productIdToRemove = event.target.getAttribute("data-product-id");
                    removeItemFromCart(productIdToRemove);
                }
            });
        }
    }

    if (window.location.pathname === '/akatsuki_shop/Frontend/HTML/cart.html') {
        updateCartDisplay();
    }


    // Select all input fields
    const inputs = document.querySelectorAll('.input-checkout');

    // Add focus and blur event listeners to each input
    inputs.forEach((input) => {
        input.addEventListener('focus', () => {
            input.previousElementSibling.style.transform = 'translateY(-8px)';
            input.previousElementSibling.style.fontSize = 'calc(1px + 0.50625vw)';
            input.previousElementSibling.style.color = '#333';
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.previousElementSibling.style.transform = 'translateY(0)';
                input.previousElementSibling.style.fontSize = 'calc(5px + 0.50625vw)';
                input.previousElementSibling.style.color = '#666';
            }
        });
    });

    // ORDER INFO SUMMARY

    // Function to update the order summary
    function updateOrderSummary(cart) {
        const orderItems = document.getElementById('order-items');
        const totalPrice = document.getElementById('total-price');
        let total = 0;


        // Iterate through cart items using a for...in loop
        for (const productId in cart) {
            if (cart.hasOwnProperty(productId)) {
                const item = cart[productId];
                const listItem = document.createElement('li');
                listItem.classList.add('order-list-item');

                // Create an image element
                const image = document.createElement('img');
                image.src = item.product.image; // Set the image source
                image.alt = item.product.name; // Set the image alt text
                image.classList.add('order-item-image');

                // Create a div for item details
                const itemDetails = document.createElement('div');
                itemDetails.classList.add('order-item-details');
                itemDetails.innerHTML = `
                <div class='order-name-size'>
                <p><strong> ${item.product.name}</strong></p>
                <p>${item.size}</p>
                </div>
                <div class='order-item-price'>
                <p><span> $${(item.product.price * item.quantity).toFixed(2)}</span></p>
                </div>
            `;

                listItem.appendChild(image);
                listItem.appendChild(itemDetails);

                orderItems.appendChild(listItem);

                // Update the total price
                total += item.product.price * item.quantity;
            }
        }

        // Update the total price display
        totalPrice.textContent = `$${total.toFixed(2)}`;
    }

    // Call the updateOrderSummary function to populate the order summary initially
    if (window.location.pathname === '/akatsuki_shop/Frontend/HTML/checkout.html') {
        const cart = getCartFromCookies();
        updateOrderSummary(cart);
    }

});



