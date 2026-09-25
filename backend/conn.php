<?php

$host = "localhost";
$username = "root";
$password = "";
$database = "tcc_lanamari";

$conn = new mysqli( $host, $username, $password, $database );

if( $conn->connect_error ){
    die("Conexao Falhou");
}

?>