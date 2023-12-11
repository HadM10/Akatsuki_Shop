<?php
// Include your database connection code
include 'connect_db.php';

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Fetch hashed password based on username
    $query = "SELECT * FROM admin WHERE username='$username'";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) == 1) {
        $adminData = mysqli_fetch_assoc($result);
        $hashedPassword = $adminData['password'];

        // Verify hashed password
        if (password_verify($password, $hashedPassword)) {
            // Admin authentication successful, start a session and store the username
            session_start();
            $_SESSION['admin_username'] = $username;

            // Redirect to admin panel
            header("Location: admin.php");
            exit();
        } else {
            // Invalid credentials, redirect back to login page with an error message
            header("Location: admin-login.php?error=InvalidCredentials");
            exit();
        }
    } else {
        // Invalid username, redirect back to login page with an error message
        header("Location: admin-login.php?error=InvalidUsername");
        exit();
    }
}

// Close the database connection
$conn->close();
?>