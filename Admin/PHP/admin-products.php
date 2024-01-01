<?php

include 'connect_db.php';

$query = "SELECT * FROM products";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $products = array();

    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    header('Content-Type: application/json');
    echo json_encode($products);
} else {
    echo json_encode(['error' => 'No products found']);
}

$conn->close();

?>