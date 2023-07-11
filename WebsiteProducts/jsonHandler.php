
<?php

    // create a date object to store in the database
    $date = date_create();
    $currentDate = date_format($date, "Y-m-d");

    require_once ("connect.php"); // establish a connection to the database

    $str_json = file_get_contents('php://input');   // get json content from the AJAX request

    $purchase = json_decode($str_json, true);   //decode JSON data into a PHP object

    $total_cost = 0;
    if ($purchase !== null) {

        // calculate total cost of order to add onto the productDrder table
        foreach ($purchase as $item) {
            $total_cost  = $total_cost + (floatval($item["price"] * $item["quantity"]));
        }

        $result = $db->query("INSERT INTO productOrder(totalCost, orderDate) VALUES('" .
            $total_cost . "', '" . $currentDate . "');");


        // retrieve the most recently inserted orderID
        $result = $db->query("SELECT orderID FROM productOrder ORDER BY orderID DESC LIMIT 1");
        $orderID = $result->fetch_array();
        $orderID = $orderID[0];


        // insert each cart item onto the cartItems table, with an associated orderID indicating which order it was part of
        foreach ($purchase as $item) {

            $productName = $item["name"];
            $quantity = $item["quantity"];
            $price = $item["price"];


            $result = $db->query("INSERT INTO cartItems(productName, quantity, price, orderID) VALUES('" .
                $productName . "', '" . $quantity . "', '" . $price . "', '" . $orderID . "');");

        }

        echo "DATA STORED ON DATABASE";


    }






?>
