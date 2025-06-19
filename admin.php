<?php
session_start();
if (!isset($_SESSION['username']) || $_SESSION['username'] !== 'praesident') {
  header("Location: /BC_Stotzheim_Webseite/login.html");
  exit;
}
?>


<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Adminbereich</title>
</head>
<body>
  <h1>Willkommen, Präsident!</h1>
  <p><a href="logout.php">Abmelden</a></p>

  <!-- hier dein bisheriger Admin-Bereich -->

</body>
</html>
