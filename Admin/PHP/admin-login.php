<!-- admin_login.php -->
<!DOCTYPE html>
<html>

<head>
    <title>Admin Sign-In</title>
</head>

<body>
    <h2>Admin Sign-In</h2>
    <form action="admin-process-login.php" method="post">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required><br><br>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br><br>

        <input type="submit" value="Sign In">
    </form>
</body>

</html>