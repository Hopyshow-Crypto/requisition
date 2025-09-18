<?php
// Application configuration
session_start();

// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Timezone
date_default_timezone_set('Africa/Lagos');

// Application constants
define('APP_NAME', 'Payment Requisition System');
define('APP_VERSION', '1.0.0');
define('BASE_URL', 'http://localhost/requisition');
define('UPLOAD_PATH', 'uploads/');
define('MAX_FILE_SIZE', 10485760); // 10MB

// Include database configuration
require_once 'database.php';

// Autoload classes
spl_autoload_register(function ($class) {
    $paths = [
        'classes/',
        'models/',
        'controllers/'
    ];
    
    foreach ($paths as $path) {
        $file = $path . $class . '.php';
        if (file_exists($file)) {
            require_once $file;
            break;
        }
    }
});

// Helper functions
function redirect($url) {
    header("Location: " . BASE_URL . "/" . $url);
    exit();
}

function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

function requireLogin() {
    if (!isLoggedIn()) {
        redirect('login.php');
    }
}

function formatCurrency($amount, $currency = 'NGN') {
    $formatter = new NumberFormatter('en_NG', NumberFormatter::CURRENCY);
    return $formatter->formatCurrency($amount, $currency);
}

function sanitizeInput($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

function generateReference($prefix = 'REQ') {
    return $prefix . '-' . date('Y') . '-' . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);
}
?>