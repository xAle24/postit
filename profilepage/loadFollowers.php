<?php
include "../db/db_connect.php";
session_start();

$sql = "SELECT 
    (SELECT COUNT(*) FROM adds WHERE first_stu_email = ?) AS following,
    (SELECT COUNT(*) FROM adds WHERE second_stu_email = ?) AS followers";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $_SESSION["email"], $_SESSION["email"]);
$stmt->execute();
$result = $stmt->get_result();
$followerDetails = $result->fetch_assoc();

echo json_encode($followerDetails);

error_log("followerDetails.php: " . json_encode($followerDetails) . "\n", 3, "error.log");

$stmt->close();
$conn->close();