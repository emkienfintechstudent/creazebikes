(() => {
    (async function () {
        "use strict";

        let charts = $(".report-line-chart-1");
          // Lấy dữ liệu từ endpoint '/api/chart-data'
          const response = await fetch('/api/chart-data');
          const data = await response.json();
          const yearMonth = []
          const profits = []
          data.DataReportLineChart1.forEach(element => {
            yearMonth.push(element.year_month)
            profits.push(element.profit)
          });
        if (charts.length) {
            charts.each(function () {
                let ctx = $(this)[0].getContext("2d");
                let gradient = () => {
                    let gradientCtx = document.createElement("canvas").getContext("2d")?.createLinearGradient(0, 0, 0, 400);
                    gradientCtx?.addColorStop(0, getColor("primary", .11));
                    gradientCtx?.addColorStop(1, $("html").hasClass("dark") ? "#28344e00" : "#ffffff01");
                    return gradientCtx;
                };

                let chart = new Chart(ctx, {
                    type: "line",
                    data: {
                        labels: yearMonth ,
                        datasets: [{
                            data: profits,
                            borderWidth: 1,
                            borderColor: getColor("primary", .7),
                            pointRadius: 3.5,
                            pointBorderColor: getColor("primary", .7),
                            pointBackgroundColor: $("html").hasClass("dark") ? getColor("darkmode.400") : "#ffffff",
                            backgroundColor: gradient(),
                            tension: .3,
                            fill: true
                        }]
                    },
                    options: {
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            x: {
                                ticks: {
                                    font: {
                                        size: 12
                                    },
                                    color: getColor("slate.500", .8)
                                },
                                grid: {
                                    display: false
                                },
                                border: {
                                    display: false
                                }
                            },
                            y: {
                                ticks: {
                                    font: {
                                        size: 12
                                    },
                                    color: getColor("slate.500", .8),
                                    callback: function (value, index, values) {
                                        return "$" + value;
                                    }
                                },
                                grid: {
                                    color: $("html").hasClass("dark") ? getColor("slate.500", .3) : getColor("slate.300")
                                },
                                border: {
                                    display: false,
                                    dash: [2, 2]
                                }
                            }
                        }
                    }
                });

                helper.watchCssVariables("html", ["color-primary"], (newValue) => {
                    chart.data.datasets[0].borderColor = getColor("primary", .7);
                    chart.data.datasets[0].pointBorderColor = getColor("primary", .7);
                    chart.update();
                });
            });
        }
    })();
})();
