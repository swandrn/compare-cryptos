const ctx = document.getElementById('myChart').getContext('2d');
async function main() {
    let resp = await getRequest("./handlers/chart_handler.php", "X:BTCUSD");
    let cryptos = JSON.parse(resp.responseText);

    let btcData = [];
    let lineData = [];
    let labels = [];
    for (let i = 0; i < cryptos.length; i++) {
        btcData.push({});
        lineData.push({});
        labels.push(luxon.DateTime.fromMillis(cryptos[i].Timestamp, {zone: "UTC"}).toISODate())
    }

    const config = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'X:BTCUSD',
                    data: btcData,
                },
                {
                    label: 'X:ETHUSD',
                    type: 'line',
                    data: lineData,
                    hidden: true,
                }
            ]
        },
        options: {
            responsive: true,
            
            plugins: {
                zoom: {
                    pan: {
                        enabled: true,
                        modifierKey: 'shift',
                    },
                    zoom: {
                        wheel: {
                            enabled: true,
                        },
                        pinch: {
                            enabled: true,
                        },
                        mode: 'xy',
                    },
                    limits: {
                        y: {
                            min: 'original',
                            max: 'original',
                        },
                        x: {
                            min: 'original',
                            max: 'original',
                        },
                    },
                },
            },
        },
    };

    let createLine = function (target, i) {
        Object.assign(target[i], {
            x: luxon.DateTime.fromMillis(cryptos[i].Timestamp, {
                zone: "UTC"
            }).valueOf(),
            y: cryptos[i].PercentChange,
        });
    }

    for (let i = 0; i < btcData.length; i++) {
        createLine(btcData, i)
    }

    let changeComparedCrypto = async function (target, symbol) {
        let resp = await getRequest("./handlers/chart_handler.php", symbol);
        let comparedCrypto = JSON.parse(resp.responseText);
        
        for (let i = 0; i < comparedCrypto.length; i++) {
            target[i] = {
                x: luxon.DateTime.fromMillis(comparedCrypto[i].Timestamp, {
                    zone: "UTC"
                }).valueOf(),
                y: comparedCrypto[i].PercentChange,
            };
        }
        
        config.data.datasets[1].hidden = false;
        config.data.datasets[1].label = symbol;
        lineChart.update();
    }

    const lineChart = new Chart(ctx, config);

    changeComparedCrypto(lineData, document.getElementById('compared-crypto').value);

    let resetChartZoom = function(){
        lineChart.resetZoom();
    }

    document.getElementById('compared-crypto').addEventListener('change', function(){
        changeComparedCrypto(lineData, document.getElementById('compared-crypto').value);
    })

    document.getElementById('reset-zoom').addEventListener('click', resetChartZoom);
}

main();