<?php

$host = "localhost";
$username = "root";
$password = "root";
$database = "teste";

$conn = new mysqli( $host, $username, $password, $database );

if( $conn->connect_error ){
    die("Conexao Falhou");
}


?>