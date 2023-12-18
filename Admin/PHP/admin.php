<?php
session_start();

// Check if the session variable is not set (admin is not authenticated)
if (!isset($_SESSION['admin_username'])) {
    // Redirect the user back to the login page
    header("Location: admin-login.php");
    exit();
}

// Check the time since the user's last activity
$inactive = 1800; // 1800 seconds = 30 minutes
if (isset($_SESSION['timeout'])) {
    $session_life = time() - $_SESSION['timeout'];
    if ($session_life > $inactive) {
        session_destroy(); // Destroy session if inactive for a specific time
        header("Location: admin-login.php");
        exit();
    }
}
$_SESSION['timeout'] = time(); // Update session timeout on user activity
?>

<!DOCTYPE html>
<html>

<head>
    <title>Admin Panel</title>
    <link rel="stylesheet" type="text/css" href="../CSS/admin.css">
</head>

<body>
    <div class="admin-container">
        <aside class="admin-sidebar">
            <h2>Admin Panel</h2>
            <ul>
                <ul>
                    <li class="dashboard">Dashboard</li>
                    <li class="products">Products &#9660;
                    </li>
                    <ul class="submenu">
                        <li class="view-products">View Products</li>
                        <li class="add-products">Add Products</li>
                    </ul>
                    <li class="offers">Offers</li>
                    <li class="now-trending">Now Trending</li>
                    <li class="orders">Orders <span id="ordersCount"></span></li>
                    <li class="messages">Messages <span id="messagesCount"></span></li>
                </ul>
            </ul>
        </aside>
        <main class="admin-content">
            <header>
                <div id="logo" class="logo">
                    <img src="../../Frontend/Images/AkatsukiShopLogo.PNG" alt="Akatsuki Shop">
                    <h1>Welcome, Admin!</h1>
                </div>


            </header>
            <section class="admin-main">
                <div id="products-section">

                </div>
                <!-- Add Product Form -->
                <div id="add-product-form" style="display: none;">
                    <h2>Add New Product</h2>
                    <form id="product-form" enctype="multipart/form-data">
                        <div class="form-row">
                            <label for="product-name">Name:</label>
                            <input type="text" id="product-name" name="product-name" required>
                        </div>

                        <div class="form-row">
                            <label for="product-description">Description:</label>
                            <textarea id="product-description" name="product-description" rows="4" required></textarea>
                        </div>

                        <div class="form-row">
                            <label for="product-price">Price:</label>
                            <input type="number" id="product-price" name="product-price" step="0.01" required>
                        </div>

                        <div class="form-row">
                            <label for="product-category">Category:</label>
                            <select id="product-category" name="product-category" required>
                                <option value="">Select Category</option>
                                <!-- You can populate the options dynamically using JavaScript -->
                            </select>
                        </div>

                        <div class="form-row">
                            <label for="product-image">Image:</label>
                            <input type="file" id="product-image" name="product-image" accept="image/*" required>
                        </div>

                        <div class="form-row">
                            <input type="submit" value="Add Product">
                        </div>
                    </form>
                </div>
                <div id="orders-section">

                </div>

                <div id="messages-section">

                </div>

            </section>
        </main>
    </div>
</body>

<script src="../JavaScript/admin.js"></script>

</html>