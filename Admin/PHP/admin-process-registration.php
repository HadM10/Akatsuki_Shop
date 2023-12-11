<?php
// Include your database connection code
include 'connect_db.php';

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Hash the password before storing it in the database
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT); // Using the default algorithm

    // Check if username already exists
    $checkQuery = "SELECT * FROM admin WHERE username='$username'";
    $checkResult = mysqli_query($conn, $checkQuery);

    if ($checkResult && mysqli_num_rows($checkResult) > 0) {
        // Username already exists, redirect back to registration page with an error message
        header("Location: admin-register.php?error=UsernameExists");
        exit();
    } else {
        // Insert the new admin account into the database
        $insertQuery = "INSERT INTO admin (username, password) VALUES ('$username', '$hashedPassword')";
        $insertResult = mysqli_query($conn, $insertQuery);

        if ($insertResult) {
            // Registration successful, redirect to login page
            header("Location: admin-login.php");
            exit();
        } else {
            // Error in inserting data, redirect back to registration page with an error message
            header("Location: admin-register.php?error=RegistrationFailed");
            exit();
        }
    }
}

// Close the database connection
$conn->close();
?>