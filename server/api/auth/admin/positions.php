<?php
require_once __DIR__ . "../../../helpers/cors.php";
require_once __DIR__ . '../../../../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // CREATE
    $data = json_decode(file_get_contents("php://input"), true);
    $description = trim($data['description'] ?? '');
    $max_vote = intval($data['max_vote'] ?? 0);

    // Input validation
    if (!$description || !$max_vote || is_numeric($description)) {
        echo json_encode(['success' => false, 'message' => '⚠️ Invalid Input, please try again']);
        exit;
    }

    // Normalize description (case-insensitive uniqueness check)
    $stmt = $pdo->prepare("SELECT id FROM positions WHERE LOWER(description) = LOWER(?) LIMIT 1");
    $stmt->execute([$description]);
    if ($stmt->fetch()) {
        echo json_encode(["success" => false, "message" => "⚠️ Position already exists"]);
        exit;
    }

    // Insert new record
    $stmt = $pdo->prepare("INSERT INTO positions (description, max_vote) VALUES (?, ?)");
    if ($stmt->execute([$description, $max_vote])) {
        $id = $pdo->lastInsertId();
        $stmt = $pdo->prepare("SELECT id, description, max_vote FROM positions WHERE id = ?");
        $stmt->execute([$id]);
        $newRow = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode(['success' => true, 'position' => $newRow]);
    } else {
        echo json_encode(['success' => false, 'message' => '⚠️ Insert failed, please try again']);
    }
}


if ($method === 'GET') {
    // READ
    $stmt = $pdo->query("SELECT id, description, max_vote FROM positions ORDER BY id DESC");
    $positions = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($positions);
}

if ($method === 'PUT') {
    // UPDATE
    $data = json_decode(file_get_contents("php://input"), true);
    $id = intval($data['id'] ?? 0);
    $description = trim($data['description'] ?? '');
    $max_vote = intval($data['max_vote'] ?? 0);

    // Input validation
    if (!$id || !$description || !$max_vote || is_numeric($description)) {
        echo json_encode(['success' => false, 'message' => '⚠️ Invalid Input, please try again']);
        exit;
    }

    // Check for duplicate description (exclude current row)
    $stmt = $pdo->prepare("
        SELECT id 
        FROM positions 
        WHERE LOWER(description) = LOWER(?) AND id != ? 
        LIMIT 1
    ");
    $stmt->execute([$description, $id]);
    if ($stmt->fetch()) {
        echo json_encode(["success" => false, "message" => "⚠️ Position already exists"]);
        exit;
    }

    // Update record
    $stmt = $pdo->prepare("UPDATE positions SET description = ?, max_vote = ? WHERE id = ?");
    if ($stmt->execute([$description, $max_vote, $id])) {
        $stmt = $pdo->prepare("SELECT id, description, max_vote FROM positions WHERE id = ?");
        $stmt->execute([$id]);
        $updatedRow = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode(['success' => true, 'position' => $updatedRow]);
    } else {
        echo json_encode(['success' => false, 'message' => '⚠️ Update failed, please try again']);
    }
}

if ($method === 'DELETE') {
    // DELETE
    $data = json_decode(file_get_contents("php://input"), true);
    $id = intval($data['id'] ?? 0);

    if (!$id) {
        echo json_encode(['success' => false, 'message' => '⚠️ Invalid Id, please try again']);
        exit;
    }

    $stmt = $pdo->prepare("DELETE FROM positions WHERE id = ?");
    $result = $stmt->execute([$id]);

    if ($result) {
        echo json_encode(['success' => true, 'id' => $id]);
    } else {
        echo json_encode(['success' => false, 'message' => '⚠️ Delete failed, please try again']);
    }
}
