<?php
include "conn.php";

header('Content-Type: application/json');

$json = file_get_contents('php://input');
$json= json_decode($json);

$sql = "SELECT id, nome FROM tbsistemaoperacional WHERE nome LIKE '%". $json->soname ."%'";
$result = $conn->query( $sql );
$arr = [];

while( $row = $result->fetch_assoc() ){
    $arr[] = $row;
}

echo json_encode($arr);

?>