(() => {
    (async function () {
        "use strict";
        let a = $(".horizontal-bar-chart-revenue-profit");
           // Lấy dữ liệu từ endpoint '/api/chart-data'
           const response = await fetch('/admin/chart/data/revenueprofit12months');
           const data = await response.json();
           const yearMonth = []
           const profit = []
           const revenue = []
           data.revenueProfit12MonthsData.forEach(element => {
             yearMonth.push(element.year_month)
             profit.push(element.profit)
             revenue.push(element.revenue)

           });
         
        a.length && a.each(function () {
            let r = $(this)[0].getContext("2d"),
                e = new Chart(r, {
                    type: "bar",
                    data: {
                        labels: yearMonth,
                        datasets: [
                            {
                                label: "Revenue",
                                barPercentage: 0.5,
                                barThickness: 6,
                                maxBarThickness: 8,
                                minBarLength: 2,
                                data: revenue,
                                backgroundColor: getColor("primary")
                            },
                            {
                                label: "Profit",
                                barPercentage: 0.5,
                                barThickness: 6,
                                maxBarThickness: 8,
                                minBarLength: 2,
                                data: profit,
                                backgroundColor: getColor("slate.300")
                            }
                        ]
                    },
                    options: {
                        indexAxis: "y",
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                labels: {
                                    color: getColor("slate.500", 0.8)
                                }
                            }
                        },
                        scales: {
                            x: {
                                ticks: {
                                    font: { size: 12 },
                                    color: getColor("slate.500", 0.8),
                                    callback: function (t) { return "$" + t }
                                },
                                grid: { display: false },
                                border: { display: false }
                            },
                            y: {
                                ticks: {
                                    font: { size: 12 },
                                    color: getColor("slate.500", 0.8)
                                },
                                grid: { color: getColor("slate.300") },
                                border: {
                                    display: false,
                                    dash: [2, 2]
                                }
                            }
                        }
                    }
                });
            helper.watchCssVariables("html", ["color-primary"], t => {
                e.data.datasets[0].backgroundColor = getColor("primary");
                e.update();
            });
        });
    })();
})();
