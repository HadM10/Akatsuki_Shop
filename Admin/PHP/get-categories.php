<?php
// Include your database connection code
include 'connect_db.php';

// Query to fetch category data
$query = "SELECT id, name FROM categories";
$result = $conn->query($query);

if ($result) {
    $categories = array();

    while ($row = $result->fetch_assoc()) {
        $categories[] = array(
            'id' => $row['id'],
            'name' => $row['name']
        );
    }

    // Return categories as a JSON response
    header('Content-Type: application/json');
    echo json_encode($categories);
} else {
    // Handle the case when the query fails
    echo json_encode(['error' => 'Failed to fetch categories']);
}

// Close the database connection
$conn->close();
?>