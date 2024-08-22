<?php
$PROJECT_DIR = $_SERVER['DOCUMENT_ROOT'];
require_once "{$PROJECT_DIR}/utils/database.php";
$symbol = $_GET["symbol"] ?? null;

if($symbol != null){
    $cryptos = get_crypto($symbol);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($cryptos);
}
?>