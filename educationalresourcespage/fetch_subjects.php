<?php
// Include your database connection file here
include '../db/db_connect.php';

// Prepare a SQL query to fetch all subjects
$sql = "SELECT name FROM subject";
$result = $conn->query($sql);

// Fetch all subjects as an associative array
$subjects = $result->fetch_all(MYSQLI_ASSOC);

// Encode the subjects as a JSON string
$json = json_encode($subjects);

// Output the JSON string
echo $json;
