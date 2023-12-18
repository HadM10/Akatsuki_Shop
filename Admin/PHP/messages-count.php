<?php
include 'connect_db.php';

// Fetch messages count
$queryMessagesCount = "SELECT COUNT(*) AS message_count FROM messages";
$resultMessagesCount = mysqli_query($conn, $queryMessagesCount);
$messageCount = mysqli_fetch_assoc($resultMessagesCount)['message_count'];

echo json_encode(['messageCount' => $messageCount]);

$conn->close();
?>