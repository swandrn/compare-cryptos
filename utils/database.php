<?php
$PROJECT_DIR = $_SERVER['DOCUMENT_ROOT'] . "view_historical_data/";
$env = parse_ini_file($PROJECT_DIR . ".env");

function open_connection()
{
    try {
        global $env;
        $pdo = new PDO("mysql:host={$env["DB_ADDR"]};dbname={$env["DB_NAME"]}", $env["DB_USER"], $env["DB_PWD"]);
        $pdo->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);

        return $pdo;
    } catch (PDOException $e) {
        echo "error: " . $e->getMessage();
    }
}

function get_crypto($symbol)
{
    try {
        $conn = open_connection();

        $stmt = $conn->prepare("SELECT OpenPrice, ClosePrice, HighPrice, LowPrice, DailyVolume, Timestamp, PercentChange FROM crypto WHERE Symbol = :symbol ORDER BY Timestamp ASC");
        $stmt->bindParam(":symbol", $symbol);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $conn = null;
        return $result;
    } catch (PDOException $e) {
        echo "error: " . $e->getMessage();
    }
}

function get_all_crypto_pairs()
{
    try {
        $conn = open_connection();

        $stmt = $conn->prepare("SELECT DISTINCT Symbol FROM crypto ORDER BY Symbol ASC");
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $conn = null;
        return $result;
    } catch (PDOException $e) {
        echo "error: " . $e->getMessage();
    }
}
