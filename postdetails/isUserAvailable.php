<?php
    /**
     * This sees if the user is available for this meeting
     */
    include '../db/db_connect.php';
    session_start();

    $sql = "SELECT *
            FROM 
                availability
            WHERE 
                availability.meetingID = ? AND availability.email = ?";
    $stmt = $conn->prepare($sql); 

    error_log("In file isUserAvailable.php, ready to bind postID: ".$_SESSION["postID"] . "\n", 3, "error.log");

    $stmt->bind_param("ss", $_SESSION["postID"], $_SESSION["email"]);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();
    
    error_log("In file isUserAvailable.php, result: ". json_encode($result) . "\n", 3, "error.log");

    /* If result contains something, then the currently logged user is available and the
    checkbox has to be checked. */
    if ($result) {
        echo json_encode(true);
    } else {
        echo json_encode(false);
    }
    $stmt->close();
    $conn->close();