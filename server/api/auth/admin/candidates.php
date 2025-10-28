<?php
require_once __DIR__ . "../../../helpers/cors.php";
require_once __DIR__ . '../../../../config/db.php';
$uploadDir = __DIR__ . "/../../../uploads/";

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // CREATE
    $firstname = trim($_POST['firstname'] ?? '');
    $lastname = trim($_POST['lastname'] ?? '');
    $position_id = intval($_POST['position_id'] ?? 0);
    $platform = trim($_POST['platform'] ?? '');
    $photo = null;

    // Handle photo upload if provided
    if (!empty($_FILES['photo']['name'])) {
        $uploadDir = __DIR__ . "/../../../uploads/";
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        $fileName = time() . "_" . basename($_FILES['photo']['name']);
        $targetPath = $uploadDir . $fileName;

        if (move_uploaded_file($_FILES['photo']['tmp_name'], $targetPath)) {
            $photo = $fileName;
        }
    }

    if (!$firstname || !$lastname || !$position_id) {
        echo json_encode(['success' => false, 'message' => '⚠️ Missing required fields']);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO candidates (firstname, lastname, position_id, photo, platform) VALUES (?, ?, ?, ?, ?)");
    if ($stmt->execute([$firstname, $lastname, $position_id, $photo, $platform])) {
        $id = $pdo->lastInsertId();
        $stmt = $pdo->prepare("
            SELECT c.id, c.firstname, c.lastname, c.photo, c.platform, p.description AS position
            FROM candidates c
            JOIN positions p ON c.position_id = p.id
            WHERE c.id = ?
        ");
        $stmt->execute([$id]);
        $newRow = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode(['success' => true, 'candidate' => $newRow]);
    } else {
        echo json_encode(['success' => false, 'message' => '⚠️ Insert failed, please try again']);
    }
}

if ($method === 'GET') {
    // READ
    $stmt = $pdo->query("
        SELECT c.id, c.firstname, c.lastname, c.photo, c.platform, 
        c.position_id, p.description AS position
        FROM candidates c
        JOIN positions p ON c.position_id = p.id
        ORDER BY c.id DESC
    ");
    $candidates = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($candidates as &$c) {
        if($c['photo']) {
            $c['photo_url'] = "http://localhost/online-voting-system/project/server/uploads/" . $c['photo'];
        } else {
            $c['photo_url'] = null;
        }
    }
    echo json_encode($candidates);
}

if ($method === 'PUT') {
    // UPDATE
    $data = json_decode(file_get_contents("php://input"), true);
    $id = intval($data['id'] ?? 0);
    $firstname = trim($data['firstname'] ?? '');
    $lastname = trim($data['lastname'] ?? '');
    $position_id = intval($data['position_id'] ?? 0);
    $platform = trim($data['platform'] ?? '');

    if (!$id || !$firstname || !$lastname || !$position_id) {
        echo json_encode(['success' => false, 'message' => '⚠️ Invalid Input, please try again']);
        exit;
    }

    $stmt = $pdo->prepare("UPDATE candidates SET firstname = ?, lastname = ?, position_id = ?, platform = ? WHERE id = ?");
    if ($stmt->execute([$firstname, $lastname, $position_id, $platform, $id])) {
        $stmt = $pdo->prepare("
            SELECT c.id, c.firstname, c.lastname, c.photo, c.platform, p.description AS position
            FROM candidates c
            JOIN positions p ON c.position_id = p.id
            WHERE c.id = ?
        ");
        $stmt->execute([$id]);
        $updatedRow = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode(['success' => true, 'candidate' => $updatedRow]);
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

    $stmt = $pdo->prepare("DELETE FROM candidates WHERE id = ?");
    $result = $stmt->execute([$id]);

    if ($result) {
        echo json_encode(['success' => true, 'id' => $id]);
    } else {
        echo json_encode(['success' => false, 'message' => '⚠️ Delete failed, please try again']);
    }
}
