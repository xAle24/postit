<?php
// TODO: check if this works

include "../db/db_connect.php"; // Include your database connection script

// Create a SQL query to fetch all resources
$sql = "SELECT * FROM educational_resource"; // TODO: update query with user email

// Execute the SQL query
$result = mysqli_query($conn, $sql);

// Fetch all resources as an associative array
$resources = mysqli_fetch_all($result, MYSQLI_ASSOC);

// Encode the resources as a JSON string
$json = json_encode($resources);

// Output the JSON string
echo $json;
?>