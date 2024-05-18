(() => {
    (async function () {
        "use strict";
        let charts = $(".line-chart-revenue-per-customer");
        // Lấy dữ liệu từ endpoint '/api/chart-data'
        const response = await fetch('/admin/chart/data/revenuepercustomer');
        const data = await response.json();
        const year_month = []
        const  revenue_per_customer= []
        data.revenuePerCustomer.forEach(element => {
            year_month.push(element.year_month)
            revenue_per_customer.push(element.revenue_per_customer)

        });
        if (charts.length) {
            charts.each(function () {
                let ctx = $(this)[0].getContext("2d");

                let chart = new Chart(ctx, {
                    type: "line",
                    data: {
                        labels: year_month,
                        datasets: [
                            {
                                label: "Revenue per customer",
                                data: revenue_per_customer,
                                borderWidth: 2,
                                borderColor: getColor("primary"),
                                backgroundColor: "transparent",
                                pointBorderColor: "transparent",
                                tension: 0.4
                            }
                           
                        ]
                    },
                    options: {
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
                                    color: getColor("slate.500", 0.8)
                                },
                                grid: { display: false },
                                border: { display: false }
                            },
                            y: {
                                ticks: {
                                    font: { size: 12 },
                                    color: getColor("slate.500", 0.8),
                                    callback: function (value) { return "$"  + value; }
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

                helper.watchCssVariables("html", ["color-primary"], updatedColor => {
                    chart.data.datasets[0].borderColor = getColor("primary");
                    chart.update();
                });
            });
        }
    })();
})();
