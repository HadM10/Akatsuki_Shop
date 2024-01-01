<?php
include 'connect_db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the product ID from the AJAX request
    $productId = $_POST['productId'];

    // Construct the SQL query to delete the product
    $query = "DELETE FROM products WHERE id = '$productId'";

    // Execute the SQL query
    $result = $conn->query($query);

    if ($result) {
        // Product deleted successfully
        echo json_encode(['success' => true]);
    } else {
        // Product deletion failed
        echo json_encode(['success' => false, 'error' => mysqli_error($conn)]);
    }

    $conn->close();
}
?>