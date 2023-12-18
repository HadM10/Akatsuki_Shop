<?php
// Include your database connection code
include 'connect_db.php';

// Fetch messages from the database
$query = "SELECT id, name, email, phone, message, image FROM messages";

$result = mysqli_query($conn, $query);

if ($result) {
    $messages = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $message_id = $row['id'];
        $messages[$message_id]['name'] = $row['name'];
        $messages[$message_id]['email'] = $row['email'];
        $messages[$message_id]['phone'] = $row['phone'];
        $messages[$message_id]['message'] = $row['message'];
        $messages[$message_id]['image'] = $row['image'];
    }

    // Return JSON response
    header('Content-Type: application/json');
    echo json_encode($messages);
} else {
    // Handle the case when the query fails
    echo json_encode(['error' => 'Failed to fetch messages']);
}

// Close the database connection
$conn->close();
?>