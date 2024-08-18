<?php
$PROJECT_DIR = $_SERVER['DOCUMENT_ROOT'] . "view_historical_data/";
require_once $PROJECT_DIR . "utils/database.php";

$cryptos = get_all_crypto_pairs();

?>