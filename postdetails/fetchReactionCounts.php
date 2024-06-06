<?php
    /**
     * This file fetches the main post details, visible at the top of the page:
     * - title
     * - author name and surname
     * - author profile image
     */
    include '../db/db_connect.php';
    session_start();

    $sql = "SELECT 
                (SELECT COUNT(*) FROM react WHERE react.meetingID = meeting.meetingID AND type = 1) AS type1_count,
                (SELECT COUNT(*) FROM react WHERE react.meetingID = meeting.meetingID AND type = 2) AS type2_count,
                (SELECT COUNT(*) FROM react WHERE react.meetingID = meeting.meetingID AND type = 3) AS type3_count,
                (SELECT COUNT(*) FROM react WHERE react.meetingID = meeting.meetingID AND type = 4) AS type4_count,
                (SELECT COUNT(*) FROM react WHERE react.meetingID = meeting.meetingID AND type = 5) AS type5_count
            FROM 
                meeting
            WHERE 
                meeting.meetingID = ?";
    $stmt = $conn->prepare($sql); 

    error_log("In file fetchReactionCounts.php, ready to bind postID: ".$_SESSION["postID"] . "\n", 3, "error.log");

    $stmt->bind_param("s", $_SESSION["postID"]);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();
    
    error_log("In file fetchReactionCounts.php, result: ". json_encode($result) . "\n", 3, "error.log");

    echo json_encode($result);
    $stmt->close();
    $conn->close();