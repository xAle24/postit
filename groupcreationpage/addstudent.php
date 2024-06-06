<?php
    include '../db/db_connect.php';
    session_start();
    $groupname = $_POST["groupName"];
    $sql = "INSERT INTO groups(name, email) VALUES (?,?)";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("ss", $groupname, $_SESSION["email"]);
    $stmt->execute();
    $result = $stmt->get_result();
    echo "Success";
    $stmt->close();
    $conn->close();
?>