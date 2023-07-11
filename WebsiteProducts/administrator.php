
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Administrator</title>

    <style>

        body {
            background-color: lavender;
        }

        h1 {
            border-bottom: 1px solid lightcoral;
            padding: 10px;
        }

        h2 {
            padding: 20px;
            margin: 20px;
        }

        h1,h2 {
            text-align: center;
            font-family: monospace;
            color: midnightblue;
        }


        /*center the form in the middle of the screen*/
        #formData {
            font-family: monospace;
            font-weight: bold;
            font-size: 20px;
            color: midnightblue;
            background-color: lightcoral;
            border: 1px solid green;
            width: 50%;
            margin: 0 auto;
        }

        form {
            margin-top: 20px;
        }

        form>div {
            margin-top: 10px;
            width: 150px;
            padding: 10px;

        }

        #submitBtn {
            background-color: lightblue;
            padding: 10px;
            margin: 10px;
            font-family: monospace;
            font-weight: bold;
            font-size: 16px;
            color: midnightblue;
        }

        #submitBtn:hover {
            background-color: darkcyan;
        }

        input:focus, textarea:focus {
            border-color: midnightblue;
            background-color: lightblue;
        }


    </style>




</head>
<body>

<h1>Welcome | Online Shopping Made Easier to Manage</h1>
<h2>Add More Products to the Store</h2>
<main id="formData">

<!--    Create a simple form that allows the administrator to add new products to the database-->

    <form method="post" action="administrator.php">
        <div>
            <label for="productID">Product ID:</label>
            <input id="productID" type="text" name="productID" required>
        </div>
        <div>
            <label for="productName">Product Name: </label>
            <input id="productName" type="text" name="productName" required>
        </div>
        <div>
            <label for="quantity">Quantity:</label>
            <input id="quantity" type="text" name="quantity" required>
        </div>
        <div>
            <label for="price">Price: </label>
            <input id="price" type="text" name="price" required>
        </div>
        <div>
            <label for="description">Description: </label>
            <textarea id="description" cols="50" rows="5" placeholder="Short Description..." required></textarea>
        </div>

        <input id="submitBtn" type="submit" value="SUBMIT">

    </form>

</main>


</body>
</html>



<?php

// Uses a POSTBACK to retrieve data submitted by the user

if ($_SERVER["REQUEST_METHOD"] =="POST") {

    $productID = $_POST["productID"];
    $productName = $_POST["productName"];
    $quantity = $_POST["quantity"];
    $price = $_POST["price"];

    require_once ("connect.php");   // establishes a connection to the database

    // insert the new product into the product table
    $result = $db->query("INSERT INTO product(productID, name, quantity, price) VALUES('" .
        $productID . "', '" . $productName . "', '" . $quantity . "', '" . $price . "');");

    if ($result) {
        echo "NEW PRODUCT ADDED";
    }

// if there is a problem with the query - die
    if (!$result) {
        die("Error executing query: ($db->errno) $db->error<br>");
    }

}


?>
