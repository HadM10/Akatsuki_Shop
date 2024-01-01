<?php
include 'connect_db.php';

function getProductCount($conn)
{
    $countQuery = "SELECT COUNT(*) AS totalItems FROM products";
    $result = $conn->query($countQuery);

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return $row['totalItems'];
    } else {
        return 0; // Default to 0 if there's an issue with the query
    }
}

// Get filter criteria from AJAX request
$category = isset($_GET['category']) ? $_GET['category'] : 'All Categories';
$date = isset($_GET['date']) ? $_GET['date'] : 'default';
$price = isset($_GET['price']) ? $_GET['price'] : 'All Prices';

// Initialize the category ID
$categoryID = null;

// If a specific category name is selected, retrieve its ID
if ($category !== 'All Categories') {
    $categoryQuery = "SELECT categories.id FROM categories WHERE categories.name = '$category'";
    $categoryResult = $conn->query($categoryQuery);

    if ($categoryResult && $categoryResult->num_rows > 0) {
        $categoryRow = $categoryResult->fetch_assoc();
        $categoryID = $categoryRow['id'];
    }
}


// Build the SQL query based on filter criteria
$query = "SELECT * FROM products WHERE 1=1";

if ($category !== 'All Categories') {
    // Filter by category
    $query .= " AND category_id = '$categoryID'";
} elseif ($category == 'All Categories') {
    $query .= " ";
}



if ($price === 'low-to-high') {
    // Filter by price low to high
    $query .= "ORDER BY price ASC";
} elseif ($price === 'high-to-low') {
    // Filter by price high to low
    $query .= "ORDER BY price DESC";
} else if ($price === '$0 - $25') {
    $query .= " AND price BETWEEN 0.00 AND 25.00 ORDER BY price ASC";
} elseif ($price === '$25 - $50') {
    $query .= " AND price BETWEEN 25.00 AND 50.00 ORDER BY price ASC ";
} elseif ($price === '$50 - $100') {
    $query .= " AND price BETWEEN 50.00 AND 100.00 ORDER BY price ASC ";
} elseif ($price === 'All Prices') {
    $query .= "ORDER BY price ASC";
}

if ($date === 'latest') {
    // Filter by the latest date
    $query .= ",updated_at DESC";
} elseif ($date === 'oldest') {
    // Filter by the oldest date
    $query .= ",updated_at ASC";
} elseif ($date === 'default') {
    // Default sorting (e.g., by date)
    $query .= " ,updated_at DESC";
}

$result = $conn->query($query);

if ($result) {
    // Query successful
    $totalItems = getProductCount($conn); // Get total product count
    if ($result->num_rows > 0) {
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        // Include total product count in the JSON response
        $response = ['items' => $data, 'totalItems' => $totalItems];

        header('Content-Type: application/json');
        echo json_encode($response);
    } else {
        // No results found for the selected criteria
        echo json_encode(['items' => [], 'totalItems' => $totalItems]);
    }
} else {
    // Query failed
    echo json_encode(['error' => mysqli_error($conn)]);
}


$conn->close();
?>