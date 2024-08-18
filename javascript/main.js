const ctx = document.getElementById('myChart').getContext('2d');
async function main() {
    let resp = await getRequest("./handlers/chart_handler.php", "X:BTCUSD");
    let cryptos = JSON.parse(resp.responseText);

    let candleData = [];
    for (let i = 0; i < cryptos.length; i++) {
        candleData.push({});
    }

    const config = {
        type: 'candlestick',
        data: {
            datasets: [
                {
                    label: 'X:BTCUSD',
                    data: candleData,
                },
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

    let createCandle = function (target, i) {
        const dateLocal = luxon.DateTime.fromMillis(cryptos[i].Timestamp);
        const dateUTC = dateLocal.minus({
            minutes: dateLocal.offset,
        });
        Object.assign(target[i], {
            x: dateUTC.valueOf(),
            o: cryptos[i].OpenPrice,
            h: cryptos[i].HighPrice,
            l: cryptos[i].LowPrice,
            c: cryptos[i].ClosePrice,
        });
    }

    for (let i = 0; i < candleData.length; i++) {
        createCandle(candleData, i)
    }
    
    const candleChart = new Chart(ctx, config);

    let resetChartZoom = function () {
        candleChart.resetZoom();
    }

    document.getElementById('reset-zoom').addEventListener('click', resetChartZoom);
}

main();