<?php
    include "../db/db_connect.php"; // Include your database connection script
    session_start();

    $target_dir = "../database-content/profile-image/"; // Specify the directory where file is going to be placed

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
                // echo "Found description: " . $description . "<br/>";    
                $sql = "UPDATE student SET imagePath = ? WHERE email = ?";
                $stmt = $conn->prepare($sql);
                //echo $stmt->field_count . "<br/>";
                $stmt->bind_param("ss", $_POST["imagePath"], $_SESSION["email"]);
                $stmt->execute();
                $stmt->close();
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
    
?>