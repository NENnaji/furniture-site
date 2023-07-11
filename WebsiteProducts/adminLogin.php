<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Admin Login</title>

    <style>

        .login-box {

            display: inline-block;
            border: 1px solid green;
            padding: 20px;
        }

        .userInput {
            padding: 10px;
            width: 300px;
        }

        #submitBtn {
            margin: 5px;
            padding: 10px;
        }

    </style>


</head>
<body>

    <h1>Login to Manage your Store</h1>
    <div class="login-box">

        <form action="adminLogin.php" method="post">
            <div class="userInput">
                <label>Username: <input type="text" name="username" required></label>
            </div>

            <div class="userInput">
                <label>Password: <input type="password" name="password" required></label>
            </div>

            <div>
                <input id="submitBtn" type="submit" value="SUBMIT">
            </div>

        </form>


    </div>


</body>
</html>

<?php

// function to sanitize the data by removing spaces and html characters
    function sanitize_data($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;

    }

if ($_SERVER["REQUEST_METHOD"] =="POST") {

    require_once ("connect.php");

    // sanitize data for both username and password
    $adminUsername = sanitize_data($_POST["username"]);
    $adminPassword = sanitize_data($_POST["password"]);

    $result = $db->query("SELECT * FROM adminLogin");

    foreach ($result as $item) {

        // check to see if username and password matches with the username/password on the database
        if (($item['username'] == $adminUsername) && ($item['password'] == $adminPassword)) {
            header("Location: administrator.php");
        } else {

            echo "<script> alert('Wrong Username or Password');</script>";  // wrong username or password


        }
    }


}







?>
