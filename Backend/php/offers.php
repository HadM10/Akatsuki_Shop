<?php
// Include the database connection file
include 'connect_db.php';

// Define the SQL query to retrieve offers
$query = "SELECT * FROM offers";

// Execute the query
$result = $conn->query($query);

// Fetch the results as an associative array
$data = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Output the data as JSON
header('Content-Type: application/json');
echo json_encode($data);

// Close the database connection
$conn->close();
?>