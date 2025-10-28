<?php
require_once __DIR__ . "../../../helpers/cors.php";
require_once __DIR__ . "../../../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

$username = trim($data['username'] ?? '');
$password = trim($data['password'] ?? '');

if (!$username || !$password) {
  echo json_encode(["success" => false, "message" => "All fields are required"]);
  exit;
}

try {
  $stmt = $pdo->prepare("SELECT * FROM admin WHERE username = ?");
  $stmt->execute([$username]);
  $admin = $stmt->fetch(PDO::FETCH_ASSOC);

  if ($admin && password_verify($password, $admin['password'])){
    echo json_encode([
      "success" => true,
      "admin_id" => $admin['id']
    ]);
  } else {
    echo json_encode(["success" => false, "message" => "Invalid login, please try again"]);
  }

} catch(Exception $e){
  echo json_encode(["success" => false, "message" => "Server error: " .$e->getMessage()]);
}