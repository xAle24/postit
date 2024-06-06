<?php

include "../db/db_connect.php";
session_start();

$userEmail = $_SESSION["email"];
$postID = $_SESSION["postID"];

$sql = "DELETE FROM react WHERE meetingID = '$postID' AND email = '$userEmail'";
$result = mysqli_query($conn, $sql);

if(!$result) {
    error_log("In postdetails/removeUserReaction.php, query failed: " . mysqli_error($conn) . "\n", 3, "error.log");
}

error_log("In postdetails/removeUserReaction.php: removal completed!\n", 3, "error.log");
