<?php

include "../db/db_connect.php";
session_start();

$userEmail = $_SESSION["email"];
$postID = $_SESSION["postID"];
$reactionStringName = $_POST["reaction"];

$reactionType = getNumericCodeFromReactionName($reactionStringName);

$sql = "INSERT INTO react (meetingID, email, type) VALUES ('$postID', '$userEmail', ?) ON DUPLICATE KEY UPDATE reaction = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $reactionType);
$stmt->execute();
$result = $stmt->get_result();

if(!$result) {
    error_log("In postdetails/updateUserReaction.php, query failed: " . mysqli_error($conn) . "\n", 3, "error.log");
}

error_log("In postdetails/updateUserReaction.php: reaction updated!\n", 3, "error.log");
$stmt->close();

function getNumericCodeFromReactionName($reactionStringName) {
    switch($reactionStringName) {
        case "likeButton":
            return 0;
        case "dislikeButton":
            return 1;
        case "starryEyesButton":
            return 2;
        case "heartButton":
            return 3;
        case "moaiButton":
            return 4;
        default:
            return -1;
    }
}