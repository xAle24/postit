<?php
    include '../db/db_connect.php';
    session_start();
    $sql = "SELECT achievement_student.*, achievement.* 
        FROM achievement_student JOIN achievement ON achievement_student.achievementID = achievement.achievementID 
        WHERE achievement_student.email = ?";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("s", $_SESSION["email"]);
    $stmt->execute();
    $result = $stmt->get_result();
    $postBriefDetails = array();
    while ($row = $result->fetch_assoc()) {
        $postBriefDetails[] = $row;
    }
    echo json_encode($postBriefDetails);
    $stmt->close();
    $conn->close();
?>