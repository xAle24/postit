<?php

include "../db/db_connect.php";
session_start();

$userEmail = $_SESSION["email"];
$postID = $_SESSION["postID"];

$sql = "SELECT * FROM react WHERE meetingID = '$postID' AND email = '$userEmail'";
$result = mysqli_query($conn, $sql)->fetch_assoc();

error_log("In postdetails/fetchUserReaction.php, result: " . json_encode($result) . "\n", 3, "error.log");

echo json_encode($result);

