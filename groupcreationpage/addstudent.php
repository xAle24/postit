<?php
    include '../db/db_connect.php';
    session_start();
    $groupID = $_GET["groupID"];
    $sql = "INSERT INTO is_in(email, groupID) VALUES (?,?)";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("ss", $_SESSION["email"], $groupID);
    $stmt->execute();
    $result = $stmt->get_result();
    echo "Success";
    $stmt->close();
    $conn->close();
?>