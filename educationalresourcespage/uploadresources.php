<?php

include "../db/db_connect.php";
session_start();

$target_dir = "../database-content/uploads/"; // Specify the directory where file is going to be placed

// Build an html page
echo "<!DOCTYPE html>
<html>
    <head>
        <meta charset=\"UTF-8\">
        <title>ServerResponse</title>
        <link rel=\"stylesheet\" href=\"serverresponse.css\">
        <style>
            button {
                width: fit-content;
                height: 5vh;
                font-size: large;
                background-color: #273043;
                color: white;
            }

            button:hover {
                border: 2px solid white;
                outline: 1px solid black;
            }
        </style>
    </head>
    <body>
        <main>
            <button id=\"backBtn\" onclick=\"location.href='../homepage/homepage.html'\">Torna alla home</button>
            <div class=\"responseContainer\">
                <h2 id=\"responseTitle\">Risposta del server</h2>
                <hr>";

foreach ($_FILES as $key => $value) {
    // $value["name"] is an array, so we need to iterate over it
    for ($i = 0; $i < count($value["name"]); $i++) {
        $target_file_path = $target_dir . basename($value["name"][$i]); // Specify the path of the file to be uploaded

        // Check if file already exists
        if (file_exists($target_file_path)) {
            echo "Il file " . $value["name"][$i] . " esiste già. <br/>";
            continue; // Skip to the next file
        }

        // Attempt to move the uploaded file to your desired location
        if (move_uploaded_file($value["tmp_name"][$i], $target_file_path)) {
            $subject = $_POST["subject"]; // Assuming the subject is submitted via a form
            // echo "Found subject: " . $subject . "<br/>";
            $description = $_POST["description"]; // Assuming the description is submitted via a form
            // echo "Found description: " . $description . "<br/>";
            $subjectID = getSubjectUUID($subject, $conn); // Fetch the subjectID using the getSubjectUUID function
            $resourceUUID = uniqid(); // Generate a UUID for resourceID

            $sql = "INSERT INTO educational_resource (resourceID, resourceName, filePath, `type`, email, subjectID) VALUES (?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            //echo $stmt->field_count . "<br/>";
            $stmt->bind_param("ssssss", $resourceUUID, $value["name"][$i], $target_file_path, $value["type"][$i], $_SESSION["email"], $subjectID);
            $stmt->execute();
            $stmt->close();
            echo "Il file " . $value["name"][$i] . " è stato caricato. <br/>";
        } else {
            echo "Si è verificato un errore nel caricamento del file " . $value["name"][$i] . "<br/>";
        }
    }
}

echo "      <hr>
            <button id=\"backToResourcesBtn\" onclick=\"location.href='educationalresourcespage.html'\">Torna alla pagina dei materiali</button>
        </div>
    </main>
</html>";

$conn->close();

function getSubjectUUID($subject, $conn) {
    $sql = "SELECT subjectID FROM `subject` WHERE `name` = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $subject);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();
    return $result->fetch_assoc()["subjectID"];
}

// NOT NEEDED

/**
 * Create a new subject in the database.
 * $subject: the name of the subject
 * $cfu: the number of CFUs of the subject
 * $conn: the connection to the database
 */
/* function createSubject($subject, $cfu, $conn) {
    $sql = "INSERT INTO subject (subjectID, name, CFU) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $subjectID = uniqid(); // Generate a UUID for subjectID
    $stmt->bind_param("ssi", $subjectID, $subject, $cfu);
    $stmt->execute();
    $stmt->close();
} 

function doesSubjectExist($subject, $conn) {
    $sql = "SELECT * FROM subject WHERE name = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $subject);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();
    return $result->num_rows > 0;
} */
