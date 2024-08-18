<?php include_once  "./handlers/get_list_of_cryptos.php"?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/chart.css">
    <title>Historical Data</title>
</head>

<body>
    <div class="wrapper">
        <canvas id="myChart"></canvas>
    </div>
    <?php if($cryptos): ?>
    <div>
        Compared Crypto:
        <select id="compared-crypto">
            <option value="X:ETHUSD" selected>X:ETHUSD</option>
            <?php foreach($cryptos as $crypto): ?>
            <option value="<?= htmlspecialchars($crypto["Symbol"])?>" selected><?= htmlspecialchars($crypto["Symbol"])?></option>
            <?php endforeach; ?>
        </select>
    </div>
    <?php endif; ?>
    <button type="button" id="reset-zoom">Reset Zoom</button>

    <script src="https://cdn.jsdelivr.net/npm/luxon@^2"></script>
    <script src="./local_cdn/hammer.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-zoom/2.0.1/chartjs-plugin-zoom.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-luxon@^1"></script>
    <script src="./local_cdn/chartjs-chart-financial.js"></script>
    <script src="./javascript/ajax.js"></script>
    <script src="./javascript/comparison.js"></script>
</body>

</html>