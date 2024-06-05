<?php
    include '../db/db_connect.php';
    session_start();
    $sql = "SELECT * FROM notification WHERE email = ?";
    $stmt = $conn->prepare($sql); 
    $stmt->bind_param("s", $_SESSION["email"]);
    $stmt->execute();
    $result = $stmt->get_result();
    $notification = array();
    while ($row = $result->fetch_assoc()) {
        $notification[] = $row;
    }
    echo json_encode($notification);
    $stmt->close();
    $conn->close();
?>