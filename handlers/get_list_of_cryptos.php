<?php
$PROJECT_DIR = $_SERVER['DOCUMENT_ROOT'];
require_once "{$PROJECT_DIR}/utils/database.php";

$cryptos = get_all_crypto_pairs();
?>