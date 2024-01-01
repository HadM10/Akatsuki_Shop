<?php
include 'connect_db.php';

// Get data from the form
$productName = $_POST['product-name'];
$productDescription = $_POST['product-description'];
$productPrice = $_POST['product-price'];
$productCategory = $_POST['product-category'];

// Handle image upload
if (isset($_FILES['product-image'])) {
    $targetDirectory = "../../Frontend/Images/";
    $targetFile = $targetDirectory . basename($_FILES['product-image']['name']);

    // Check if the file was successfully uploaded
    if (move_uploaded_file($_FILES['product-image']['tmp_name'], $targetFile)) {
        // Image uploaded successfully
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to upload image.']);
        exit;
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Image not provided.']);
    exit;
}

// Insert the product into the database
$query = "INSERT INTO products (image, name, description, price, category_id) VALUES (?, ?, ?, ?, ?)";
if ($stmt = $conn->prepare($query)) {
    $stmt->bind_param("sssds", $targetFile, $productName, $productDescription, $productPrice, $productCategory);
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }
} else {
    echo json_encode(['success' => false, 'error' => $conn->error]);
}

$conn->close();
?>