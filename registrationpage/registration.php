<?php
include '../db/db_connect.php';

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "INSERT INTO student (name, password)
VALUES ('$username', '$password')";

if ($conn->query($sql) === TRUE) {
    header('Location: ../homepage/homepage.html');
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
