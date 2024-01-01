<?php
include 'connect_db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $messageContent = $_POST['message'];
    $targetFile = null; // Set default value for $targetFile

    // Handle image upload if provided
    if (isset($_FILES['productImage']) && $_FILES['productImage']['error'] === UPLOAD_ERR_OK) {
        $targetDirectory = "../../Frontend/Images/";
        $targetFile = $targetDirectory . basename($_FILES['productImage']['name']);

        // Check if the file was successfully uploaded
        if (!move_uploaded_file($_FILES['productImage']['tmp_name'], $targetFile)) {
            echo json_encode(['success' => false, 'error' => 'Failed to upload image.']);
            exit;
        }
    }

    // Insert the data into the 'messages' table
    $query = "INSERT INTO messages (name, email, phone, message, image) VALUES (?, ?, ?, ?, ?)";

    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("sssss", $name, $email, $phone, $messageContent, $targetFile);

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => $stmt->error]);
        }
    } else {
        echo json_encode(['success' => false, 'error' => $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request']);
}

$conn->close();
?>