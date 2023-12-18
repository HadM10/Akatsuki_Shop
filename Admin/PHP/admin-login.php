<!DOCTYPE html>
<html>

<head>
    <title>Admin Sign-In</title>
    <link rel="stylesheet" type="text/css" href="../CSS/admin.css">
</head>

<body class="login-body">
    <div class="login-container">
        <h2>Admin Sign-In</h2>
        <form action="admin-process-login.php" method="post">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required><br><br>

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required><br><br>

            <input type="submit" value="Sign In">
        </form>
    </div>
</body>

</html>