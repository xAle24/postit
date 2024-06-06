<?php
// Include your database connection file here
include '../db/db_connect.php';

// Prepare a SQL query to fetch all groups' names
$sql = "SELECT groups.name FROM groups JOIN student ON student.email = groups.email WHERE student.email = ?";
$stmt = $conn->prepare($sql); 
$stmt->bind_param("s", $_SESSION["email"]);
$stmt->execute();
$result = $stmt->get_result();

error_log("groupsContent" . print_r($result, true) . "\n", 3, "error.log");

// Fetch all groups' names as an associative array
// $groups = $result->fetch_all(MYSQLI_ASSOC);
$groups = array();
while ($row = $result->fetch_assoc()) {
    $groups[] = $row;
    error_log("groupsContent" . print_r($row, true) . "\n", 3, "error.log");
}

// Encode the groups' names as a JSON string
$json = json_encode($groups);

// Output the JSON string
echo $json;
