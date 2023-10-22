// PRODUCTS SECTION

const adminMain = document.querySelector(".admin-main");
const productList = document.getElementById("products-section");
const productSection = document.querySelector(".products");
const viewProducts = document.querySelector(".view-products");
const addProducts = document.querySelector(".add-products");
const productForm = document.getElementById("add-product-form");

function hideAllSections() {
    productList.style.display = "none";
    productForm.style.display = "none";
    // Add similar lines for other sections
}

function fetchAndDisplayProducts() {
    // Make an AJAX request to fetch products from admin-fetch-products.php
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "../PHP/admin-products.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
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
                <button>Edit</button>
                <button>Delete</button>
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



