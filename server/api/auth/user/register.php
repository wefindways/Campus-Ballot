<?php
require_once __DIR__ . "../../../helpers/cors.php";
require_once __DIR__ . "../../../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

$student_id = trim($data['student_id'] ?? '');
$first_name = trim($data['first_name'] ?? '');
$last_name = trim($data['last_name'] ?? '');
$department = trim($data['department'] ?? '');
$password = trim($data['password'] ?? '');

if (!$student_id || !$first_name || !$last_name || !$department || !$password) {
    echo json_encode(["success" => false, "message" => "All fields are required"]);
    exit;
}

try {
    // 1. Check if the student exists
    $stmt = $pdo->prepare("SELECT * FROM student_records WHERE student_id = ? AND first_name = ? AND last_name = ? AND department = ?");
    $stmt->execute([$student_id, $first_name, $last_name, $department]);
    $student = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$student) {
        echo json_encode(["success" => false, "message" => "No matching student record was found"]);
        exit;
    }

    // 2. Check if a user account already exists
    $stmt = $pdo->prepare("SELECT * FROM users WHERE student_id = ?");
    $stmt->execute([$student_id]);
    $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existingUser) {
        echo json_encode(["success" => false, "message" => "You already have an account. Please login."]);
        exit;
    }

    // 3. Insert into users table
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $insertStmt = $pdo->prepare("INSERT INTO users (student_id, password) VALUES (?, ?)");
    $insertStmt->execute([$student_id, $hashedPassword]);

    echo json_encode([
        "success" => true,
        "message" => "Registration successful. Redirecting to login...",
        "redirect" => "Login.jsx"
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Server error, please try again later",
        "error" => $e->getMessage()
    ]);
}
?>
