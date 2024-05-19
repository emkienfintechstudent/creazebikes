(() => {
    (async function () {
        "use strict";
        let a = $(".horizontal-bar-chart-orders-by-category-detail");
           // Lấy dữ liệu từ endpoint '/api/chart-data'
           const response = await fetch('/admin/chart/data/ordersbycategory');
           const data = await response.json();
           const category= []
           const  total_orders = []
           data.ordersByCategory.forEach(element => {
            category.push(element.category)
            total_orders.push(element. total_orders)

           });
         
        a.length && a.each(function () {
            let r = $(this)[0].getContext("2d"),
                e = new Chart(r, {
                    type: "bar",
                    data: {
                        labels: category,
                        datasets: [
                            {
                                label: "Total Orders",
                                barPercentage: 0.5,
                                barThickness: 6,
                                maxBarThickness: 8,
                                minBarLength: 2,
                                data: total_orders,
                                backgroundColor: getColor("primary")
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
                                    callback: function (t) { return  + t }
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
