const ctx = document.getElementById('myChart').getContext('2d');
async function main() {
    let resp = await getRequest("./handlers/chart_handler.php", "X:BTCUSD");
    let cryptos = JSON.parse(resp.responseText);

    let candleData = [];
    let lineData = [];
    for (let i = 0; i < cryptos.length; i++) {
        candleData.push({});
        lineData.push({});
    }

    const config = {
        type: 'candlestick',
        data: {
            datasets: [
                {
                    label: 'X:BTCUSD',
                    data: candleData,
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
                },
            },
        },
    };

    let createCandle = function (target, i) {
        Object.assign(target[i], {
            x: luxon.DateTime.fromMillis(cryptos[i].Timestamp, {
                zone: "utc"
            }).toUTC().valueOf(),
            o: cryptos[i].OpenPrice,
            h: cryptos[i].HighPrice,
            l: cryptos[i].LowPrice,
            c: cryptos[i].ClosePrice,
        });
    }

    for (let i = 0; i < candleData.length; i++) {
        createCandle(candleData, i)
    }

    let changeComparedCrypto = async function (target, symbol) {
        let resp = await getRequest("./handlers/chart_handler.php", symbol);
        let comparedCrypto = JSON.parse(resp.responseText);
        console.log(target)
        console.log(symbol)
        console.log(comparedCrypto)
        
        for (let i = 0; i < comparedCrypto.length; i++) {
            target[i] = {
                x: luxon.DateTime.fromMillis(comparedCrypto[i].Timestamp, {
                    zone: "UTC"
                }).valueOf(),
                y: comparedCrypto[i].ClosePrice,
            };
        }
        
        console.log(target)
        config.data.datasets[1].hidden = false;
        config.data.datasets[1].label = symbol;
        candleChart.update();
    }

    const candleChart = new Chart(ctx, config);

    document.getElementById('compared-crypto').addEventListener('change', function(){
        changeComparedCrypto(lineData, document.getElementById('compared-crypto').value)
    })
}

main();