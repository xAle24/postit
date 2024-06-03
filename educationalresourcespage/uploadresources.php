<?php

include "../db/db_connect.php";
session_start();

// echo "<script>console.log(" . var_dump($_FILES) . ")</script>";

$target_dir = "../database-content/uploads/"; // Specify the directory where file is going to be placed
$i = 0;

// $value is of type Array, so we need to iterate over it
foreach ($_FILES as $key => $value) {
    $target_file = $target_dir . basename($value["name"][$i]); // Specify the path of the file to be uploaded
    
    // Check if file already exists
    if (file_exists($target_file)) {
        echo "Sorry, file " . $value["name"][$i] . " already exists.";
        continue; // Skip to the next file
    }
    
    // Attempt to move the uploaded file to your desired location
    if (move_uploaded_file($value["tmp_name"][$i], $target_file)) {
        echo "The file ". $value["name"][$i]. " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading the file " . $value["name"][$i];
    }
    $i++;
}

?>