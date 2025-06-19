<?php
session_start();
session_destroy();
header("Location: /BC_Stotzheim_Webseite/login.html");
exit;
?>
