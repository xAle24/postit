<?php
    include '../db/db_connect.php';
    session_start();

    $name = $_POST['name'];
    $surname = $_POST['surname'];
    $birthdate = $_POST['date'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $repeatPassword = $_POST['repeatPassword'];

    // Prepare the SQL statement
    $stmt = $conn->prepare("SELECT * FROM student WHERE email = ?");
    $stmt->bind_param("s", $email);

    // Execute the statement
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if the email exists in the database
    if ($result->num_rows > 0) {
        echo "Email already exists";
    } else {
        $sql = "INSERT INTO student (name, surname, birthdate, password, email)
        VALUES ('$name', '$surname', '$birthdate', '$password', '$email')";
        $conn->query($sql);
        $_SESSION["name"] = $name;
        $_SESSION["surname"] = $surname;
        $_SESSION["birthdate"] = $birthdate;
        $_SESSION["email"] = $email;
        echo "Success";
    }
    $stmt->close();
    $conn->close();
?>
