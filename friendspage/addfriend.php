<?php
    include '../db/db_connect.php';
    session_start();
    $toFollow = $_GET['email'];
    $sql = "INSERT INTO adds(first_stu_email, second_stu_email) VALUES (?,?)";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("ss", $_SESSION["email"], $toFollow);
    $stmt->execute();
    $result = $stmt->get_result();
    echo "Success";
    $stmt->close();
    $conn->close();
?>