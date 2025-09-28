<?php
/**
 * HENOSIS 2K25 - CONTACT API
 * Neural Communication Interface
 */

require_once 'config.php';

setJsonHeader();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(generateNeuralResponse(
        false, 
        'Neural communication only accepts POST transmissions', 
        [], 
        'METHOD_NOT_ALLOWED'
    ));
    exit();
}

try {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        $input = $_POST;
    }
    
    $name = sanitizeInput($input['name'] ?? '');
    $email = sanitizeInput($input['email'] ?? '');
    $subject = sanitizeInput($input['subject'] ?? '');
    $message = sanitizeInput($input['message'] ?? '');
    
    // Validation
    $errors = [];
    
    if (empty($name) || strlen($name) < 2) {
        $errors['name'] = 'Name is required (minimum 2 characters)';
    }
    
    if (!validateEmail($email)) {
        $errors['email'] = 'Valid email is required';
    }
    
    if (empty($message) || strlen($message) < 10) {
        $errors['message'] = 'Message must be at least 10 characters';
    }
    
    if (!empty($errors)) {
        echo json_encode(generateNeuralResponse(
            false,
            'Neural communication validation failed',
            ['errors' => $errors],
            'VALIDATION_FAILED'
        ));
        exit();
    }
    
    // Database operations
    $db = DatabaseConnection::getInstance();
    $conn = $db->getConnection();
    
    $insertStmt = $conn->prepare("
        INSERT INTO contact_messages (name, email, subject, message) 
        VALUES (?, ?, ?, ?)
    ");
    
    $result = $insertStmt->execute([$name, $email, $subject, $message]);
    
    if ($result) {
        echo json_encode(generateNeuralResponse(
            true,
            'Neural communication transmitted successfully! We will respond within 24 hours.',
            [
                'message_id' => $conn->lastInsertId(),
                'status' => 'transmitted'
            ],
            'CONTACT_SUCCESS'
        ));
    } else {
        throw new Exception('Failed to transmit neural communication');
    }
    
} catch (Exception $e) {
    error_log("Contact API Error: " . $e->getMessage());
    echo json_encode(generateNeuralResponse(
        false,
        'Neural communication system malfunction. Please try again.',
        [],
        'CONTACT_ERROR'
    ));
}
?>
