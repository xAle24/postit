<?php

include "../db/db_connect.php";
session_start();

$userEmail = $_SESSION["email"];
$postID = $_SESSION["postID"];
$reactionStringName = $_POST["reaction"];

$reactionType = getNumericCodeFromReactionName($reactionStringName);

if (isReactionAlreadyPresent($conn, $userEmail, $postID)) {
    $currentReactionType = getReactionType($conn, $userEmail, $postID);
    if($currentReactionType == $reactionType) {
        deleteReaction($conn, $userEmail, $postID);
        sendResponse(null); // no selected button
    } else {
        updateReaction($conn, $userEmail, $postID, $reactionType);
        sendResponse($reactionStringName);
    }
} else {
    $sql = "INSERT INTO react (email, meetingID, type) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssi", $userEmail, $postID, $reactionType);
    $stmt->execute();
    $stmt->close();
    sendResponse($reactionStringName);
}

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

function isReactionAlreadyPresent($conn, $userEmail, $postID) {
    $sql = "SELECT * FROM react WHERE email = '$userEmail' AND meetingID = '$postID'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    return $result->num_rows > 0;
}

function getReactionType($conn, $userEmail, $postID) {
    $sql = "SELECT type FROM react WHERE email = '$userEmail' AND meetingID = '$postID'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    return $result->fetch_assoc()["type"];
}

function deleteReaction($conn, $userEmail, $postID) {
    $sql = "DELETE FROM react WHERE email = '$userEmail' AND meetingID = '$postID'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $stmt->close();
}

function updateReaction($conn, $userEmail, $postID, $reactionType) {
    $sql = "UPDATE react SET type = $reactionType WHERE email = '$userEmail' AND meetingID = '$postID'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $stmt->close();
}

function sendResponse($selectedButton) {
    echo json_encode($selectedButton);
}

/**
 * Approccio Kiss perché alin è una pera
 * Pulsante premuto -> chiama update in php
 * 1) C'è già una reazione?
 *      - Sì: update
 *              La reazione è la stessa che è appena stata cliccata?
 *              - Sì: delete
 *              - No: cambia reazione
 *      - No: insert
 */