(() => {
    (async function () {
        "use strict";
        let a = $(".vertical-bar-chart-orders-by-month");
        // Lấy dữ liệu từ endpoint '/api/chart-data'
        const response = await fetch('/admin/chart/data/ordersbymonth');
        const data = await response.json();
        const year_month = []
        const  orders= []
        const  orders_target= []
        data.ordersByMonth.forEach(element => {
            year_month.push(element.year_month)
            orders.push(element.orders)
            orders_target.push(element.orders_target)
        });
     
        if (a.length) {
            a.each(function () {
                let r = $(this)[0].getContext("2d"),
                    e = new Chart(r, {
                        type: "bar",
                        data: {
                            labels: year_month,
                            datasets: [
                                {
                                    label: "Orders",
                                    barPercentage: 0.5,
                                    barThickness: 6,
                                    maxBarThickness: 8,
                                    minBarLength: 2,
                                    data:  orders,
                                    backgroundColor: getColor("primary")
                                },
                                {
                                    label: "Orders Target",
                                    barPercentage: 0.5,
                                    barThickness: 6,
                                    maxBarThickness: 8,
                                    minBarLength: 2,
                                    data:orders_target,
                                    backgroundColor: getColor("slate.300")
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
                                        callback: function (t) {
                                            return  + t;
                                        }
                                    },
                                    grid: { color: getColor("slate.300") },
                                    border: { display: false, dash: [2, 2] }
                                }
                            }
                        }
                    });
                helper.watchCssVariables("html", ["color-primary"], t => {
                    e.data.datasets[0].backgroundColor = getColor("primary");
                    e.update();
                });
            });
        }
    })();
})();
