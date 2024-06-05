<?php
include "../db/db_connect.php";

$sql = "SELECT `resourceName`, student.name, student.surname, `filePath`, subject.name as subject FROM `educational_resource`
JOIN subject ON educational_resource.`subjectID` = subject.subjectID
JOIN student ON student.email = educational_resource.email
ORDER BY resourceName ASC";
$queryResult = $conn->query($sql);

$result = null;

while ($row = $queryResult->fetch_assoc()) {
    $result[] = $row;
}

$queryResult->close();
$conn->close();

error_log("Query result in fetch_searched_resources.php: " . print_r($result, true) . "\n", 3, "error.log");
$json = json_encode($result);
error_log("JSON format in fetch_searched_resources.php: " . $json . "\n", 3, "error.log");

echo $json;
