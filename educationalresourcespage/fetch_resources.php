<?php
// TODO: check if this works

include "../db/db_connect.php"; // Include your database connection script
session_start();

// Create a SQL query to fetch all resources
$sql = "SELECT * FROM educational_resource WHERE email = ?"; // TODO: update query with user email
$email = $_SESSION["email"];
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$stmt->close();

// Fetch all resources as an associative array
$resources = mysqli_fetch_all($result, MYSQLI_ASSOC);

// Encode the resources as a JSON string
$json = json_encode($resources);

// Output the JSON string
echo $json;
