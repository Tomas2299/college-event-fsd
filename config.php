<?php
/**
 * HENOSIS 2K25 - ULTIMATE DATABASE CONFIGURATION
 * Cyberpunk Neural Network Database Connection
 */

// Database Configuration
define('DB_HOST', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', ''); // Default XAMPP password is empty
define('DB_NAME', 'henosis2k25_db');
define('DB_CHARSET', 'utf8mb4');

// Security Configuration
define('HASH_ALGO', 'sha256');
define('ENCRYPTION_KEY', 'HENOSIS2K25_NEURAL_ENCRYPTION_KEY_' . date('Y'));

// API Configuration
define('API_VERSION', '1.0');
define('API_RATE_LIMIT', 100); // Requests per minute
define('MAX_UPLOAD_SIZE', 5242880); // 5MB

// Neural Network Settings
define('NEURAL_SYNC_TIMEOUT', 30);
define('QUANTUM_LINK_RETRY', 3);

class DatabaseConnection {
    private static $instance = null;
    private $connection;
    private $host = DB_HOST;
    private $username = DB_USERNAME;
    private $password = DB_PASSWORD;
    private $database = DB_NAME;
    
    private function __construct() {
        try {
            $dsn = "mysql:host={$this->host};dbname={$this->database};charset=" . DB_CHARSET;
            
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES " . DB_CHARSET,
                PDO::ATTR_PERSISTENT => true,
                PDO::ATTR_TIMEOUT => NEURAL_SYNC_TIMEOUT
            ];
            
            $this->connection = new PDO($dsn, $this->username, $this->password, $options);
            
            // Log successful connection
            $this->logActivity('system', 'database_connected', [
                'timestamp' => date('Y-m-d H:i:s'),
                'host' => $this->host,
                'database' => $this->database
            ]);
            
        } catch (PDOException $e) {
            $this->handleDatabaseError($e);
        }
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function getConnection() {
        return $this->connection;
    }
    
    private function handleDatabaseError($e) {
        $error_log = [
            'timestamp' => date('Y-m-d H:i:s'),
            'error_code' => $e->getCode(),
            'error_message' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine()
        ];
        
        error_log("HENOSIS 2K25 Database Error: " . json_encode($error_log));
        
        // Return user-friendly error for production
        die(json_encode([
            'success' => false,
            'error' => 'Neural network connection failed. Please try again.',
            'error_code' => 'DB_CONNECTION_FAILED',
            'timestamp' => date('c')
        ]));
    }
    
    private function logActivity($type, $action, $data) {
        try {
            $stmt = $this->connection->prepare("
                INSERT INTO neural_activity (activity_type, activity_data, ip_address, user_agent) 
                VALUES (?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $type . '_' . $action,
                json_encode($data),
                $_SERVER['REMOTE_ADDR'] ?? 'unknown',
                $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
            ]);
        } catch (Exception $e) {
            error_log("Activity logging failed: " . $e->getMessage());
        }
    }
    
    // Prevent cloning and unserialization
    private function __clone() {}
    public function __wakeup() {}
}

// Utility Functions
function sanitizeInput($input) {
    if (is_array($input)) {
        return array_map('sanitizeInput', $input);
    }
    
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
    return $input;
}

function generateNeuralResponse($success, $message, $data = [], $code = null) {
    $response = [
        'success' => $success,
        'message' => $message,
        'data' => $data,
        'timestamp' => date('c'),
        'neural_sync' => true,
        'quantum_link' => 'active'
    ];
    
    if ($code) {
        $response['code'] = $code;
    }
    
    return $response;
}

function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) && 
           preg_match('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/', $email);
}

function validatePhone($phone) {
    $phone = preg_replace('/[^0-9+\-\s\(\)]/', '', $phone);
    return preg_match('/^[+]?[\d\s\-\(\)]{10,15}$/', $phone);
}

// Set JSON header for API responses
function setJsonHeader() {
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    
    // Handle preflight OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
}

// Initialize database connection
try {
    $db = DatabaseConnection::getInstance();
} catch (Exception $e) {
    error_log("Failed to initialize database: " . $e->getMessage());
}
?>
