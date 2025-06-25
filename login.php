<?php
session_start();

// Benutzername & Passwort-Hash
$valid_username = 'praesident';
$valid_password_hash = '$2y$10$n0uyIz3GRBPNPR3oJjt0WueJAGx13P1Uj4.9QHpj5YJqwVYttfQpW';

// Ziel: RICHTIGER Adminbereich im Hauptverzeichnis!
$redirect_target = '/BC_Stotzheim_Webseite/admin.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if (
        $username === $valid_username &&
        password_verify($password, $valid_password_hash)
    ) {
        $_SESSION['username'] = $username;
        header('Location: ' . $redirect_target);
        exit();
    } else {
        echo "<strong>Login fehlgeschlagen.</strong>";
    }
}
?>
