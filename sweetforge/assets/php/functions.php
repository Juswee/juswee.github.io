<?php
    require_once "connect.php";

    function get() {
        global $mysqli;
        connectDB();
        $result = $mysqli->query("SELECT FROM * ");
        closeDB();
    }
?>