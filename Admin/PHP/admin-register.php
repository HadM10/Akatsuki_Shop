<!-- admin_register.php -->
<!DOCTYPE html>
<html>

<head>
    <title>Admin Registration</title>
</head>

<body>
    <h2>Admin Registration</h2>
    <form action="admin-process-registration.php" method="post">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required><br><br>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br><br>

        <input type="submit" value="Register">
    </form>
</body>

</html>