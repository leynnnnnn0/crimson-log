<?php
session_start();

// these would be stored in a database with proper hashing
$admin_accounts = [
    ['username' => 'admin1', 'password' => password_hash('Admin123', PASSWORD_DEFAULT)],
    ['username' => 'admin2', 'password' => password_hash('Admin456', PASSWORD_DEFAULT)],
    ['username' => 'admin3', 'password' => password_hash('Admin789', PASSWORD_DEFAULT)]
];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    $authenticated = false;
    
    foreach ($admin_accounts as $admin) {
        if ($admin['username'] === $username && password_verify($password, $admin['password'])) {
            $authenticated = true;
            break;
        }
    }
    
    if ($authenticated) {
        // set session variables
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_username'] = $username;
        
        // redirect to admin dashboard
        header("Location: admin_dashboard.html");
        exit();
    } else {
        // failed login
        header("Location: admin_login.html?error=invalid");
        exit();
    }
}
?>