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
    $achievements = array();
    while ($row = $result->fetch_assoc()) {
        $achievements[] = $row;
    }
    echo json_encode($achievements);
    $stmt->close();
    $conn->close();
?>