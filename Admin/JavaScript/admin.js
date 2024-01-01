// PRODUCTS SECTION

const adminMain = document.querySelector(".admin-main");
const productList = document.getElementById("products-section");
const productSection = document.querySelector(".products");
const viewProducts = document.querySelector(".view-products");
const addProducts = document.querySelector(".add-products");
const productForm = document.getElementById("add-product-form");
const ordersList = document.querySelector(".orders");
const ordersSection = document.getElementById("orders-section");
const messagesList = document.querySelector(".messages");
const messagesSection = document.getElementById('messages-section');

function hideAllSections() {
    productList.style.display = "none";
    productForm.style.display = "none";
    ordersSection.style.display = "none";
    messagesSection.style.display = "none";
}

function fetchAndDisplayProducts() {
    // Make an AJAX request to fetch products from admin-fetch-products.php
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "../PHP/admin-products.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // console.log(xhr.responseText);
            const products = JSON.parse(xhr.responseText);
            displayProducts(products);
        }
    };
    xhr.send();
}


function displayProducts(products) {
    productList.innerHTML = "";

    products.forEach((product) => {
        const productItem = document.createElement("div");
        productItem.className = "products-card";
        productItem.dataset.productId = product.id; // Add data attribute

        productItem.innerHTML = `
            <div class="products-img">
                <img src="../../Frontend/HTML/${product.image}" alt="${product.name}">
            </div>
            <div class='products-card-info'>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span class="prices">$${product.price}</span>
            </div>
            <div class = 'products-admin-actions'>
                <button class="edit-product">Edit</button>
                <button class="delete-product">Delete</button>
            </div>
        `;
        productList.appendChild(productItem);
    });
}

let subOn = false;
let submenuProducts = document.querySelector(".submenu");

productSection.addEventListener('click', function () {
    subOn = !subOn;

    if (subOn)
        submenuProducts.style.display = "block";
    else
        submenuProducts.style.display = "none";
});

viewProducts.addEventListener('click', function () {
    // Fetch and display products when the page loads
    hideAllSections()
    fetchAndDisplayProducts();
    productList.style.display = 'flex';
});


// ADD PRODUCT SECTION

addProducts.addEventListener('click', function () {
    // Fetch and display products when the page loads
    hideAllSections()
    productForm.style.display = 'block';
});


// Function to populate the category dropdown with category names
function populateCategoryDropdown() {
    const categoryDropdown = document.getElementById("product-category");

    // Make an AJAX request to fetch categories from your database
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "../PHP/get-categories.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const categories = JSON.parse(xhr.responseText);
            categories.forEach((category) => {
                const option = document.createElement("option");
                option.value = category.id;
                option.textContent = category.name;
                categoryDropdown.appendChild(option);
            });
        }
    };
    xhr.send();
}

populateCategoryDropdown();

// Function to handle form submission
document.getElementById("product-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    // Make an AJAX request to send the form data to your PHP script
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../PHP/add-product.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            // Process the response, e.g., show a success message or handle errors
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
                alert("Product added successfully.");
            } else {
                alert("Error: " + response.error);
            }
        }
    };
    xhr.send(formData);
});


//DELETE PRODUCT

// Add an event listener to handle product deletion
productList.addEventListener('click', function (event) {
    if (event.target.textContent === 'Delete') {
        // Identify the product's ID (you may add it as a data attribute in the HTML)
        const productId = event.target.closest('.products-card').dataset.productId;

        // Send an AJAX request to delete the product
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '../PHP/delete-product.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    // Product deleted successfully
                    // Remove the product card from the page
                    productList.removeChild(event.target.closest('.products-card'));
                } else {
                    // Display an error message if deletion fails
                    console.error('Failed to delete product:', response.error);
                }
            }
        };
        // Send the request with the product ID
        xhr.send(`productId=${productId}`);
    }
});


// EDIT PRODUCT

productList.addEventListener('click', function (event) {
    const productItem = event.target.closest('.products-card');
    if (productItem) {
        const editButton = productItem.querySelector('.edit-product');
        if (event.target === editButton) {
            if (!productItem.classList.contains('editing')) {
                const productName = productItem.querySelector('h3');
                const productDescription = productItem.querySelector('p');
                const productPrice = productItem.querySelector('.prices');

                // Make the product information editable
                productName.contentEditable = true;
                productDescription.contentEditable = true;
                productPrice.contentEditable = true;

                // Change the button text to "Save"
                editButton.textContent = 'Save';
                productItem.classList.add('editing');
            } else {
                // Handle the save action here
                // Extract product data and send an AJAX request
                const productId = productItem.dataset.productId;
                const productName = productItem.querySelector('h3').textContent;
                const productDescription = productItem.querySelector('p').textContent;
                const productPrice = productItem.querySelector('.prices').textContent.replace('$', '');

                console.log(productId, productName, productDescription, productPrice);

                // Perform validation if needed

                // Create a FormData object and append data
                const formData = new FormData();
                formData.append('productId', productId);
                formData.append('productName', productName);
                formData.append('productDescription', productDescription);
                formData.append('productPrice', productPrice);

                console.log(Array.from(formData.entries()));

                //Send the request with the product ID and updated data
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '../PHP/update-product.php', true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        console.log(xhr.responseText);
                        const response = JSON.parse(xhr.responseText);
                        if (response.success) {
                            // Product updated successfully
                            // Disable editing and change the button text back to "Edit"
                            productName.contentEditable = false;
                            productDescription.contentEditable = false;
                            productPrice.contentEditable = false;
                            editButton.textContent = 'Edit';
                            productItem.classList.remove('editing');
                        } else {
                            // Display an error message if the update fails
                            console.error('Failed to update product:', response.error);
                        }
                    }
                };

                // Send the request with the FormData object
                xhr.send(formData);
            }
        }
    }
});

// ORDERS

// Function to fetch and display orders
function fetchAndDisplayOrders() {


    // Make an AJAX request to fetch orders from the server
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "../PHP/orders.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const orders = JSON.parse(xhr.responseText);
            displayOrders(orders);
        }
    };
    xhr.send();
}

// Function to display orders in the admin panel
function displayOrders(orders) {

    ordersSection.innerHTML = ""; // Clear previous content

    for (const order_id in orders) {
        if (orders.hasOwnProperty(order_id)) {
            const order = orders[order_id];
            const orderCard = document.createElement("div");
            orderCard.className = "order-card";

            const orderDetails = `
            <div class='customer-details'>
                <h3>Order ID: ${order_id}</h3>
                <p>Customer: ${order.customer_name}</p>
                <p> Email: ${order.email}</p>
                <p>Address: ${order.address}</p>
                <p>Order Date: ${order.order_date}</p>
                  
                </div>
            `;
            orderCard.innerHTML = orderDetails;

            const orderSummary = document.createElement("div");
            orderSummary.className = "order-summary";
            orderSummary.innerHTML = `
                <h2>Order Summary</h2>
            `;

            const itemsList = document.createElement("ul");
            itemsList.className = "order-items";

            order.items.forEach(item => {
                const listItem = document.createElement("li");
                listItem.classList.add('order-list-item');

                let detailsHTML = `
                    <img src="../../Frontend/HTML/${item.image}" alt="${item.name}" class="order-item-image">
                    <div class="order-item-details">
                        <h4>${item.name}</h4>
                        <p>${item.description}</p>
                        <p>Price: $${item.price}</p>
                        <p>Quantity: ${item.quantity}</p>
                `;

                if (item.size !== '') {
                    detailsHTML += `<p>Size: ${item.size}</p>`;
                }

                if (item.color !== '') {
                    detailsHTML += `<p>Color: ${item.color}</p>`;
                }

                detailsHTML += `</div>`;
                listItem.innerHTML = detailsHTML;

                itemsList.appendChild(listItem);
            });


            const totalPriceDiv = document.createElement("div");
            totalPriceDiv.id = 'total-price-div';
            totalPriceDiv.innerHTML = `<strong>Total Price:</strong> <span id="total-price">$${order.order_total_price}</span>`;

            orderSummary.appendChild(itemsList);
            orderSummary.appendChild(totalPriceDiv);
            orderCard.appendChild(orderSummary);
            ordersSection.appendChild(orderCard);
        }
    }
}



ordersList.addEventListener('click', function () {
    // Fetch and display products when the page loads
    hideAllSections();
    fetchAndDisplayOrders();
    ordersSection.style.display = "block";
});

// MESSAGES

// Function to fetch and display messages
function fetchAndDisplayMessages() {

    // Make an AJAX request to fetch messages from messages.php
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../PHP/messages.php', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const messages = JSON.parse(xhr.responseText);
            displayMessages(messages);
        }
    };
    xhr.send();
}

// Function to display messages
function displayMessages(messages) {
    messagesSection.innerHTML = ''; // Clear previous content

    for (const message_id in messages) {
        if (messages.hasOwnProperty(message_id)) {
            const message = messages[message_id];
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.innerHTML = `
            <div class="message-info">
            <h3>Name: ${message.name}</h3>
            <p>Email: ${message.email}</p>
            <p>Phone: ${message.phone}</p>
            <p>Message: ${message.message}</p>
            </div>
            <div class="message-img">
            ${message.image ? `<img src="../../Frontend/HTML/${message.image}" alt="Message Image">` : ''}
            </div>
        `;
            messagesSection.appendChild(messageDiv);
        };
    }
}


// Call fetchAndDisplayMessages function when the DOM content is loaded
messagesList.addEventListener('click', function () {
    hideAllSections();
    fetchAndDisplayMessages();
    messagesSection.style.display = "block";
}
);

// ORDERS AND MESSAGES COUNT 

// Function to update orders and messages count
function updateCounts() {
    // Fetch orders count
    fetch("../PHP/orders-count.php")
        .then(response => response.json())
        .then(data => {
            document.getElementById('ordersCount').innerText = `${data.orderCount}`;
        });

    // Fetch messages count
    fetch("../PHP/messages-count.php")
        .then(response => response.json())
        .then(data => {
            document.getElementById('messagesCount').innerText = `${data.messageCount}`;
        });
}

// Call the function to update counts on page load
updateCounts();







