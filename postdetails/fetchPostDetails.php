<?php
    // Todo: change this to fetch actual post details

    /**
     * This file does the heavy-lifting to fetch all the post details from the database.
     * It must include:
     * - post title, author picture, autor name and surname
     * - counts of each reaction
     * - the single availability related to this post, with the count of people that already joined
     * - the comments related to this post
     */
    include '../db/db_connect.php';
    session_start();

    $sql = "SELECT * FROM `message` WHERE (Sen_email = ? AND rec_email = ?) OR (Sen_email = ? AND rec_email = ?) ORDER BY timestamp";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("ssss", $_SESSION["email"], $_SESSION["recipientEmail"], $_SESSION["recipientEmail"], $_SESSION["email"],);
    $stmt->execute();
    $result = $stmt->get_result();
    $messages = array();
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }
    echo json_encode($messages);
    $stmt->close();
    $conn->close();
?>