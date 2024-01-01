<?php
include 'connect_db.php';

if (isset($_GET['productId'])) {
    $productId = $_GET['productId'];

    // Build the SQL query to fetch product details for "Now Trending" based on productId
    $query = "SELECT * FROM now_trending_products WHERE id = '$productId'";

    $result = $conn->query($query);

    if ($result) {
        // Query successful
        if ($result->num_rows > 0) {
            $productDetails = $result->fetch_assoc();

            header('Content-Type: application/json');
            echo json_encode($productDetails);
        } else {
            // No results found for the selected product
            echo json_encode(['error' => 'Product not found']);
        }
    } else {
        // Query failed
        echo json_encode(['error' => mysqli_error($conn)]);
    }

    $conn->close();
}
?>