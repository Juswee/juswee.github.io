<?php
    $mysqli = false;

    function connectBD {
        global $mysqli;
        $mysqli = new mysqli("localhost", "root", "", "choko");
        $mysqli->query("SET NAMES 'utf-8");
    }

    function closeBD {
        global $mysqli;
        $mysqli->close ();
    }
?>