<?php
include "../db/db_connect.php";
session_start();

$sql = "(SELECT meeting.meetingID, meeting.title, student.imagePath, student.name, student.surname
        FROM meeting
        JOIN student ON student.email = meeting.email
        WHERE meeting.email = ?)
        UNION
        (SELECT meeting.meetingID, meeting.title, student.imagePath, student.name, student.surname
        FROM meeting
        JOIN adds ON meeting.email = adds.second_stu_email
        JOIN student ON student.email = meeting.email -- for the image path
        WHERE adds.first_stu_email = ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $_SESSION["email"], $_SESSION["email"]);
$stmt->execute();
$result = $stmt->get_result();
$postBriefDetails = array();
while ($row = $result->fetch_assoc()) {
    $postBriefDetails[] = $row;
}
echo json_encode($postBriefDetails);

error_log("loadPosts.php: " . json_encode($postBriefDetails) . "\n", 3, "error.log");

$stmt->close();
$conn->close();
