<?php
/**
 * HENOSIS 2K25 - ULTIMATE REGISTRATION API
 * Neural Interface Registration System
 */

require_once 'config.php';

setJsonHeader();

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(generateNeuralResponse(
        false, 
        'Neural interface only accepts POST transmissions', 
        [], 
        'METHOD_NOT_ALLOWED'
    ));
    exit();
}

try {
    // Get and sanitize input data
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        $input = $_POST;
    }
    
    $name = sanitizeInput($input['name'] ?? '');
    $email = sanitizeInput($input['email'] ?? '');
    $phone = sanitizeInput($input['phone'] ?? '');
    $college = sanitizeInput($input['college'] ?? '');
    $event = sanitizeInput($input['event'] ?? '');
    
    // Validation
    $errors = [];
    
    if (empty($name) || strlen($name) < 2) {
        $errors['name'] = 'Neural ID must be at least 2 characters';
    }
    
    if (!validateEmail($email)) {
        $errors['email'] = 'Invalid quantum email format';
    }
    
    if (!validatePhone($phone)) {
        $errors['phone'] = 'Invalid neural frequency format';
    }
    
    if (empty($college) || strlen($college) < 2) {
        $errors['college'] = 'Institution code required';
    }
    
    if (empty($event)) {
        $errors['event'] = 'Neural path selection required';
    }
    
    if (!empty($errors)) {
        echo json_encode(generateNeuralResponse(
            false,
            'Neural validation failed',
            ['errors' => $errors],
            'VALIDATION_FAILED'
        ));
        exit();
    }
    
    // Database operations
    $db = DatabaseConnection::getInstance();
    $conn = $db->getConnection();
    
    // Check for existing email
    $checkStmt = $conn->prepare("SELECT id, email FROM registrations WHERE email = ?");
    $checkStmt->execute([$email]);
    
    if ($checkStmt->rowCount() > 0) {
        echo json_encode(generateNeuralResponse(
            false,
            'Neural signature already exists in the matrix',
            [],
            'DUPLICATE_EMAIL'
        ));
        exit();
    }
    
    // Insert new registration
    $insertStmt = $conn->prepare("
        INSERT INTO registrations (name, email, phone, college, event, sync_status) 
        VALUES (?, ?, ?, ?, ?, 'synced')
    ");
    
    $result = $insertStmt->execute([$name, $email, $phone, $college, $event]);
    
    if ($result) {
        $userId = $conn->lastInsertId();
        
        // Get the generated neural_id
        $neuralStmt = $conn->prepare("SELECT neural_id FROM registrations WHERE id = ?");
        $neuralStmt->execute([$userId]);
        $neuralData = $neuralStmt->fetch();
        
        // Log the registration activity
        $activityStmt = $conn->prepare("
            INSERT INTO neural_activity (user_id, activity_type, activity_data, ip_address, user_agent) 
            VALUES (?, ?, ?, ?, ?)
        ");
        
        $activityStmt->execute([
            $userId,
            'registration_completed',
            json_encode([
                'event' => $event,
                'college' => $college,
                'timestamp' => date('Y-m-d H:i:s')
            ]),
            $_SERVER['REMOTE_ADDR'] ?? 'unknown',
            $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
        ]);
        
        // Update system stats
        $updateStatsStmt = $conn->prepare("
            UPDATE system_stats 
            SET stat_value = stat_value + 1 
            WHERE stat_name = 'total_registrations'
        ");
        $updateStatsStmt->execute();
        
        // Get updated registration count
        $countStmt = $conn->prepare("SELECT stat_value FROM system_stats WHERE stat_name = 'total_registrations'");
        $countStmt->execute();
        $currentCount = $countStmt->fetch()['stat_value'] ?? 0;
        
        // Send success response
        echo json_encode(generateNeuralResponse(
            true,
            'Neural interface activated successfully! Welcome to HENOSIS 2K25.',
            [
                'user_id' => $userId,
                'neural_id' => $neuralData['neural_id'],
                'registration_count' => $currentCount,
                'event_registered' => $event,
                'sync_status' => 'synced'
            ],
            'REGISTRATION_SUCCESS'
        ));
        
        // Send welcome email (optional)
        sendWelcomeEmail($name, $email, $neuralData['neural_id'], $event);
        
    } else {
        throw new Exception('Failed to insert registration data');
    }
    
} catch (PDOException $e) {
    error_log("Registration Database Error: " . $e->getMessage());
    echo json_encode(generateNeuralResponse(
        false,
        'Neural network overload. Please try again.',
        [],
        'DATABASE_ERROR'
    ));
    
} catch (Exception $e) {
    error_log("Registration General Error: " . $e->getMessage());
    echo json_encode(generateNeuralResponse(
        false,
        'System malfunction detected. Neural technicians notified.',
        [],
        'SYSTEM_ERROR'
    ));
}

function sendWelcomeEmail($name, $email, $neuralId, $event) {
    // Email configuration (configure based on your SMTP settings)
    $to = $email;
    $subject = "🚀 HENOSIS 2K25 - Neural Interface Activated!";
    
    $message = "
    <html>
    <head>
        <title>Welcome to HENOSIS 2K25</title>
        <style>
            body { font-family: 'Arial', sans-serif; background: #000; color: #00ffff; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; background: linear-gradient(135deg, #ff0080, #8000ff); padding: 30px; border-radius: 15px; }
            .content { background: #111; padding: 30px; border: 1px solid #ff0080; border-radius: 15px; margin-top: 20px; }
            .neural-id { background: #ff0080; color: #000; padding: 10px; border-radius: 5px; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1 style='color: #fff; margin: 0;'>HENOSIS 2K25</h1>
                <p style='color: #fff; margin: 10px 0 0 0;'>Neural Interface Activated</p>
            </div>
            <div class='content'>
                <h2>Welcome to the Matrix, $name!</h2>
                <p>Your neural interface has been successfully activated. You are now connected to the HENOSIS 2K25 network.</p>
                
                <h3>Your Neural Credentials:</h3>
                <p><strong>Neural ID:</strong> <span class='neural-id'>$neuralId</span></p>
                <p><strong>Event Registered:</strong> $event</p>
                <p><strong>Sync Status:</strong> ✅ ACTIVE</p>
                
                <h3>Next Steps:</h3>
                <ul>
                    <li>Keep your Neural ID safe for event access</li>
                    <li>Check your email for event updates</li>
                    <li>Join our Discord for real-time neural communications</li>
                    <li>Prepare for the most spectacular AI & DS experience</li>
                </ul>
                
                <p style='margin-top: 30px;'>See you in the digital realm!</p>
                <p><strong>Team HENOSIS 2K25</strong><br>Neural Network Division</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: HENOSIS 2K25 <noreply@henosis2k25.com>" . "\r\n";
    $headers .= "Reply-To: support@henosis2k25.com" . "\r\n";
    
    // Uncomment to send actual emails
    // mail($to, $subject, $message, $headers);
}
?>
