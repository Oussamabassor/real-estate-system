<?php
/**
 * Set CORS headers for API responses
 * This file should be included at the top of any API endpoint file
 */

// Remove any existing CORS headers to prevent duplication
header_remove('Access-Control-Allow-Origin');

// Allow from frontend origin
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Cache-Control, Pragma, cache-control');
header('Access-Control-Allow-Credentials: true'); // Allow credentials
header('Access-Control-Max-Age: 86400'); // 24 hours cache for preflight requests

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Just return with headers, no content
    http_response_code(200);
    exit(0);
}
?>
