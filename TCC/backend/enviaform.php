<?php
include "conn.php";

header('Content-Type: application/json');

$json = file_get_contents('php://input');
$json= json_decode($json);

$sql = "INSERT INTO teste (id, assunto, texto) VALUES(null, '". $json->assunto ."', '". $json->texto ."' )";
$result = $conn->query( $sql );

if($result){
    $data = "{'estado': 'sucesso'}";
}else{
   $data = "{'estado': 'erro'}";
}

echo json_encode($data);

?>