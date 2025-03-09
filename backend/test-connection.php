<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Disable MongoDB warnings
error_reporting(E_ALL & ~E_WARNING);

try {
    $dsn = "mysql:host=sql205.infinityfree.com;dbname=if0_38460379_XXX;charset=utf8mb4";
    $username = "if0_38460379";
    $password = "pNPpRhUyjafV";
    
    echo "Attempting to connect to database...\n";
    echo "DSN: " . $dsn . "\n";
    echo "Username: " . $username . "\n";
    
    // Test if we can resolve the host
    echo "Testing host resolution...\n";
    $host = gethostbyname('sql205.infinityfree.com');
    echo "Host IP: " . $host . "\n";
    
    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_TIMEOUT => 10,
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => true,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
    ]);
    
    echo "Connection successful!\n";
    
    // Try to get some information about the connection
    $version = $pdo->query('SELECT VERSION()')->fetchColumn();
    echo "MySQL Version: " . $version . "\n";
    
    // Try to list tables
    echo "\nListing tables in database:\n";
    $tables = $pdo->query('SHOW TABLES')->fetchAll(PDO::FETCH_COLUMN);
    foreach ($tables as $table) {
        echo "- " . $table . "\n";
    }
    
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage() . "\n";
    echo "Error code: " . $e->getCode() . "\n";
    echo "Error trace:\n" . $e->getTraceAsString() . "\n";
} catch (Exception $e) {
    echo "General error: " . $e->getMessage() . "\n";
    echo "Error code: " . $e->getCode() . "\n";
    echo "Error trace:\n" . $e->getTraceAsString() . "\n";
} 