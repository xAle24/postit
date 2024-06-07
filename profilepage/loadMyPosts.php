<?php
include "../db/db_connect.php";
session_start();

$sql = "SELECT meeting.meetingID, meeting.title, student.imagePath, student.name, student.surname
        FROM meeting
        JOIN student ON student.email = meeting.email
        WHERE meeting.email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $_SESSION["email"]);
$stmt->execute();
$result = $stmt->get_result();
$postBriefDetails = array();
while ($row = $result->fetch_assoc()) {
    $postBriefDetails[] = $row;
}
echo json_encode($postBriefDetails);

error_log("loadMyPosts.php: " . json_encode($postBriefDetails) . "\n", 3, "error.log");

$stmt->close();
$conn->close();
