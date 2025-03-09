<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    // Replace these with your actual InfinityFree credentials
    $host = 'sql205.infinityfree.com';
    $dbname = 'if0_38460379_real_estate'; // Replace with your actual database name
    $username = 'if0_38460379'; // Replace with your actual username
    $password = 'pNPpRhUyjafV'; // Replace with your actual password
    
    echo "Testing database connection...\n";
    echo "Host: $host\n";
    echo "Database: $dbname\n";
    echo "Username: $username\n";
    
    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_TIMEOUT => 10,
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => true,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
    ]);
    
    echo "\nConnection successful!\n";
    
    // Test if we can query the database
    echo "\nTesting database query...\n";
    $result = $pdo->query("SHOW TABLES");
    $tables = $result->fetchAll(PDO::FETCH_COLUMN);
    
    echo "Tables in database:\n";
    foreach ($tables as $table) {
        echo "- $table\n";
    }
    
} catch (PDOException $e) {
    echo "\nConnection failed!\n";
    echo "Error: " . $e->getMessage() . "\n";
    echo "Error code: " . $e->getCode() . "\n";
} 