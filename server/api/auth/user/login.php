<?php
require_once __DIR__ . "../../../helpers/cors.php";
require_once __DIR__ . "../../../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

$student_id = trim($data['student_id'] ?? '');
$password = trim($data['password'] ?? '');

if (!$student_id || !$password) {
    echo json_encode(["success" => false, "message" => "Student ID and password required"]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE student_id = ?");
    $stmt->execute([$student_id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "⚠️ Invalid login, please try again"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "⚠️ Server error, please try again later"]);
}
?>