<?php
// Include your database connection file here
include '../db/db_connect.php';

// Prepare a SQL query to fetch all groups' names
$sql = "SELECT name FROM groups";
$result = $conn->query($sql);

// Fetch all groups' names as an associative array
$groups = $result->fetch_all(MYSQLI_ASSOC);
error_log("groupsContent" . print_r($groups, true) . "\n", 3, "error.log");

// Encode the groups' names as a JSON string
$json = json_encode($groups);

// Output the JSON string
echo $json;
