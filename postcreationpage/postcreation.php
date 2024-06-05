<?php
include "../db/db_connect.php";
session_start();

error_log("Content of \$_POST: " . print_r($_POST, true) . "\n", 3, "error-log");