<?php
session_start();
require_once __DIR__ . '/../_cors.php';

if (isset($_SESSION['student_id'])) {
    echo json_encode([
        "loggedIn" => true,
        "student" => [
            "id" => $_SESSION['student_id'],
            "name" => $_SESSION['student_name']
        ]
    ]);
} else {
    echo json_encode(["loggedIn" => false]);
}
?>