(() => {
    (async function () {
        "use strict";
        let charts = $(".line-chart-total-customers");
        // Lấy dữ liệu từ endpoint '/api/chart-data'
        const response = await fetch('/admin/chart/data/totalcustomers');
        const data = await response.json();
        const year_month = []
        const total_customers= []
        const target_total_customers  = []
        data.totalCustomers.forEach(element => {
            year_month.push(element.year_month)
          total_customers.push(element.total_customers)
          target_total_customers.push(element.target_total_customers )

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
                                label: "Total Customers",
                                data: total_customers,
                                borderWidth: 2,
                                borderColor: getColor("primary"),
                                backgroundColor: "transparent",
                                pointBorderColor: "transparent",
                                tension: 0.4
                            },
                            {
                                label: "Total Customers Target",
                                data: target_total_customers,
                                borderWidth: 2,
                                borderDash: [2, 2],
                                borderColor: getColor("slate.400"),
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
                                    callback: function (value) { return  + value; }
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
