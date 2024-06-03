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
        $target_file = $target_dir . basename($value["name"][$i]); // Specify the path of the file to be uploaded

        // Check if file already exists
        if (file_exists($target_file)) {
            echo "Il file " . $value["name"][$i] . " esiste già. <br/>";
            continue; // Skip to the next file
        }

        // Attempt to move the uploaded file to your desired location
        if (move_uploaded_file($value["tmp_name"][$i], $target_file)) {
            echo "Il file ". $value["name"][$i]. " è stato caricato. <br/>";
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

?>