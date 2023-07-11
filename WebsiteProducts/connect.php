
<?php
$DB_USERNAME = "webgroup1";
// database you are accessing, it always must start with your userID
$DB_DATABASE = "webgroup1_finalProject";
//Remember : $_SERVER['CONTEXT_DOCUMENT_ROOT'] takes you into your path through public_html on an apache server
$dbpwdPath = $_SERVER['CONTEXT_DOCUMENT_ROOT'] . "/../db.txt";  //grabbing your database password
$db = false; //Mysqli Object

if (file_exists($dbpwdPath)) {
//DBPwd file exists
$DBPWD = trim(file_get_contents($dbpwdPath));  //trim extra whitespace in db.txt

//    echo file_get_contents($dbpwdPath);   // TO SEE THE PASSWORD, UNCOMMENT THIS LINE AND DISPLAY IN BROWSER

    

//request a mysqli object from mariadb
$db = new mysqli("localhost", $DB_USERNAME, $DBPWD, $DB_DATABASE );

    // if there is an error in connecting, fail and tell me how it failed
    if ($db->connect_errno) {
        echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
        exit();
    }


}

?>