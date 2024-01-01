<?php
include 'connect_db.php';

// Fetch orders count
$queryOrdersCount = "SELECT COUNT(*) AS order_count FROM orders";
$resultOrdersCount = mysqli_query($conn, $queryOrdersCount);
$orderCount = mysqli_fetch_assoc($resultOrdersCount)['order_count'];

echo json_encode(['orderCount' => $orderCount]);

$conn->close();
?>