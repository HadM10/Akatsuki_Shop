<?php
include 'connect_db.php';

if (isset($_GET['category'])) {
    $selectedCategory = $_GET['category'];

    $query = "SELECT * FROM products WHERE category_id = '$selectedCategory'";

    $result = $conn->query($query);

    if ($result) {
        // Query successful
        if ($result->num_rows > 0) {
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }

            header('Content-Type: application/json');
            echo json_encode($data);
        } else {
            // No results found for the selected category
            echo json_encode([]);
        }
    } else {
        // Query failed
        echo json_encode(['error' => mysqli_error($conn)]);
    }

    $conn->close();
}
?>