<?php
    include '../db/db_connect.php';
    session_start();
    $toRemove = $_GET['email'];
    $sql = "DELETE FROM is_in WHERE groups.groupID = ?";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("ss", $toRemove, $_SESSION["groupID"]);
    $stmt->execute();
    $result = $stmt->get_result();
    echo "Success";
    $stmt->close();
    $conn->close();
?>