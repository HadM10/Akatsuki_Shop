<?php
include 'connect_db.php';

if (isset($_GET['term'])) {
    $searchTerm = strtolower($_GET['term']); // Convert the search term to lowercase

    $query = "SELECT * FROM products WHERE
              LOWER(name) LIKE LOWER('%$searchTerm%') OR
              LOWER(description) LIKE LOWER('%$searchTerm%')";

    $result = $conn->query($query);

    if ($result) {
        // Query successful
        if ($result->num_rows > 0) {
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }

            // Store the search results in a session variable
            $_SESSION['search_results'] = $data;

            header('Content-Type: application/json');
            echo json_encode($data);
        } else {
            // No results found
            echo json_encode([]);
        }
    } else {
        // Query failed
        echo json_encode(['error' => mysqli_error($conn)]);
    }

    $conn->close();
}

?>