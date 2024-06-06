<?php
    include '../db/db_connect.php';
    session_start();
    $friendEmail = $_GET["email"];
    $groupName = $_GET["groupName"];
    error_log($friendEmail . $groupName);
    $sql = "SELECT groups.groupID FROM groups WHERE groups.name = ?";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("s", $groupName);
    $stmt->execute();
    $groupID = $stmt->get_result()->fetch_assoc();
    error_log(json_encode($groupID));
    $stmt->close();

    
    $sql = "INSERT INTO is_in(email, groupID) VALUES (?,?)";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("ss", $friendEmail, $groupID["groupID"]);
    $stmt->execute();
    $result = $stmt->get_result();
    echo "Success";
    $stmt->close();
    $conn->close();
?>