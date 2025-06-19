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
  <meta charset="UTF-8" />
  <title>Adminbereich</title>
  <link rel="stylesheet" href="/BC_Stotzheim_Webseite/css/styles.css" />
</head>
<body>

  <!-- NAVIGATION -->
  <header class="site-header">
    <nav class="main-nav">
      <div class="nav-logo">
        <a href="/BC_Stotzheim_Webseite/index.html">
          <img src="/BC_Stotzheim_Webseite/img/Logo/bcs_logo.png" alt="BC Stotzheim Logo" class="logo-ball" />
        </a>
      </div>
      <ul id="nav-links">
        <li><a href="/BC_Stotzheim_Webseite/index.html">Startseite</a></li>
        <li><a href="/BC_Stotzheim_Webseite/news.html">News</a></li>
        <li><a href="/BC_Stotzheim_Webseite/about.html">Über uns</a></li>
        <li><a href="/BC_Stotzheim_Webseite/teams_senioren.html">Senioren</a></li>
        <li><a href="/BC_Stotzheim_Webseite/teams_junioren.html">Junioren</a></li>
        <li><a href="/BC_Stotzheim_Webseite/games.html">Spiele</a></li>
        <li><a href="/BC_Stotzheim_Webseite/downloads.html">Downloads</a></li>
        <li><a href="/BC_Stotzheim_Webseite/admin.php" class="active">Admin</a></li>
      </ul>
    </nav>
  </header>

  <!-- INHALT -->
  <main>
    <section class="admin-dashboard">
      <h1>Willkommen, Präsident!</h1>
      <div class="admin-actions">
        <a class="admin-button" href="/BC_Stotzheim_Webseite/admin_news.html">📰 News verwalten</a>
        <a class="admin-button" href="/BC_Stotzheim_Webseite/admin_teams.html">👥 Teams verwalten</a>
        <a class="admin-button" href="/BC_Stotzheim_Webseite/admin_about.html">📄 Über uns bearbeiten</a>
      </div>
      <p style="text-align: center;">
        <a href="/BC_Stotzheim_Webseite/php/admin/logout.php">Abmelden</a>
      </p>
    </section>
  </main>

  <!-- FOOTER -->
  <footer class="site-footer">
    <div class="footer-content">
      <p>&copy; 2025 BC Stotzheim</p>
      <a href="/BC_Stotzheim_Webseite/impressum.html">Impressum</a>
    </div>
  </footer>

</body>
</html>
