<?php
include 'connect_db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // This block will execute only for POST requests


    // Check if the necessary data is present in the POST request
    if (isset($_POST['productId'], $_POST['productName'], $_POST['productDescription'], $_POST['productPrice'])) {
        // Retrieve data from the POST request
        $productId = $_POST['productId'];
        $productName = $_POST['productName'];
        $productDescription = $_POST['productDescription'];
        $productPrice = $_POST['productPrice'];

        // Perform data validation and sanitization here, if necessary

        // Update the product data in the database
        $query = "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?";
        if ($stmt = $conn->prepare($query)) {
            $stmt->bind_param("ssdi", $productName, $productDescription, $productPrice, $productId);
            if ($stmt->execute()) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => $stmt->error]);
            }
        } else {
            echo json_encode(['success' => false, 'error' => $conn->error]);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Missing POST data']);
    }
}


$conn->close();
?>