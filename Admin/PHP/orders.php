<?php
// Include your database connection code
include 'connect_db.php';

// Fetch order details including products and customer info
$query = "SELECT orders.id, orders.order_date, CONCAT(customers.first_name, ' ', customers.last_name) AS customer_name, customers.email, customers.address,
            orders.total_price AS order_total_price
          FROM orders
          INNER JOIN customers ON orders.customer_id = customers.id
          GROUP BY orders.id";

$result = mysqli_query($conn, $query);

if ($result) {
    $orders = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $order_id = $row['id'];
        $orders[$order_id]['order_date'] = $row['order_date'];
        $orders[$order_id]['customer_name'] = $row['customer_name'];
        $orders[$order_id]['email'] = $row['email'];
        $orders[$order_id]['address'] = $row['address'];
        $orders[$order_id]['order_total_price'] = $row['order_total_price'];

        // Fetch order items for each order
        $query_items = "SELECT order_items.quantity, 
                                products.image, 
                                products.name, 
                                products.description, 
                                products.price,
                                order_items.color,      -- Include color attribute if it exists
                                order_items.size         -- Include size attribute if it exists
                        FROM order_items
                        INNER JOIN products ON order_items.product_id = products.id
                        WHERE order_items.order_id = $order_id";

        $result_items = mysqli_query($conn, $query_items);
        if ($result_items) {
            $orders[$order_id]['items'] = array();
            while ($row_item = mysqli_fetch_assoc($result_items)) {
                $orders[$order_id]['items'][] = $row_item;
            }
        }
    }

    // Return JSON response
    header('Content-Type: application/json');
    echo json_encode($orders);
} else {
    // Handle the case when the query fails
    echo json_encode(['error' => 'Failed to fetch orders']);
}

// Close the database connection
$conn->close();

?>