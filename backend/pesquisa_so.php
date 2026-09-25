<?php
include "conn.php";

header('Content-Type: application/json');

$json = file_get_contents('php://input');
$json= json_decode($json);

$sql = "SELECT valor, tbso.Nome FROM tbopcoes AS tbopc INNER JOIN tbcaracteristicas AS tbcat  ON tbopc.idCaracteristica = tbcat.id INNER JOIN tbsistemaoperacional AS tbso ON tbopc.idSistema  = tbso.id WHERE tbso.id =  '". $json->id ."' ORDER BY tbso.nome ASC ";

$result = $conn->query( $sql );
$arr = [];

$row = $result->fetch_assoc();
array_push( $arr, $row['Nome']);
array_push( $arr, $row['valor']);

while( $row = $result->fetch_assoc() ){
    array_push( $arr, $row['valor']);
}

echo json_encode($arr);

?>