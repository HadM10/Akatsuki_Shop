<?php
include 'connect_db.php'; // Include your database connection script

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve customer information from the form
    $firstName = $_POST["first-name"];
    $lastName = $_POST["last-name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $address = $_POST["address"];

    // Check if a customer with the same phone number already exists
    $checkCustomerQuery = "SELECT id FROM customers WHERE phone_number = '$phone'";
    $checkCustomerResult = mysqli_query($conn, $checkCustomerQuery);

    if ($checkCustomerResult) {
        // Query successful
        if (mysqli_num_rows($checkCustomerResult) > 0) {
            // Customer with the same phone number already exists
            $row = mysqli_fetch_assoc($checkCustomerResult);
            $customerId = $row['id'];

            // Update customer information in the 'customers' table
            $updateCustomerQuery = "UPDATE customers SET 
                                    first_name = '$firstName', 
                                    last_name = '$lastName', 
                                    email = '$email' 
                                    WHERE id = '$customerId'";

            mysqli_query($conn, $updateCustomerQuery);
        } else {
            // Customer does not exist, insert a new record
            $insertCustomerQuery = "INSERT INTO customers (first_name, last_name, email, phone_number, address) 
                                    VALUES ('$firstName', '$lastName', '$email', '$phone', '$address')";

            mysqli_query($conn, $insertCustomerQuery);

            // Get the customer ID of the newly inserted record
            $customerId = mysqli_insert_id($conn);
        }

        // Access cart items from cookies
        if (isset($_COOKIE['cart'])) {
            $cartItems = json_decode($_COOKIE['cart'], true);
            $totalPrice = 0.00; // Initialize the total price

            // Create a single order for the customer
            $createOrderQuery = "INSERT INTO orders (customer_id) VALUES ('$customerId')";
            mysqli_query($conn, $createOrderQuery);

            // Get the order ID of the newly created order
            $orderId = mysqli_insert_id($conn);

            // Iterate through the cart items to insert order details and calculate total price
            foreach ($cartItems as $cartItemId => $cartItem) {
                $productId = $cartItem['product']['id'];
                $quantity = $cartItem['quantity'];
                $price = $cartItem['product']['price'];

                // Additional data for shirts
                $color = isset($cartItem['color']) ? $cartItem['color'] : '';
                $size = isset($cartItem['size']) ? $cartItem['size'] : '';

                // Calculate the price for this item and add it to the total price
                $itemPrice = $quantity * $price;
                $totalPrice += $itemPrice;

                // Insert order details into the 'order_items' table with the corresponding order ID
                $orderItemQuery = "INSERT INTO order_items (order_id, product_id, quantity, price, color, size) 
                                   VALUES ('$orderId', '$productId', '$quantity', '$itemPrice', '$color', '$size')";

                mysqli_query($conn, $orderItemQuery);
            }

            // Update the total price in the 'orders' table
            $updateTotalPriceQuery = "UPDATE orders SET total_price = '$totalPrice' WHERE id = '$orderId'";
            mysqli_query($conn, $updateTotalPriceQuery);
        }

        // Clear the cart after placing the order
        $_COOKIE['cart'] = array();
        error_log(json_encode(['success' => true, 'message' => 'Order placed successfully']));

        // Redirect to a thank you page or display a success message
        header('Content-Type: application/json');
        echo json_encode(['success' => true, 'message' => 'Order placed successfully']);


    } else {
        // Query failed
        echo json_encode(['error' => mysqli_error($conn)]);
    }

    // Close the database connection
    mysqli_close($conn);
}

?>