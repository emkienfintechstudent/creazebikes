(() => {
    ( async function () {
        "use strict";
        let pieCharts = $(".pie-chart-orders-by-category");
        const response = await fetch('/admin/chart/data/ordersbycategory');
           const data = await response.json();
           const category= []
           const  total_orders = []
           data.ordersByCategory.forEach(element => {
            category.push(element.category)
            total_orders.push(element. total_orders)

           });
           console.log(category)
           console.log(total_orders)
        if (pieCharts.length) {
            pieCharts.each(function () {
                let context = $(this)[0].getContext("2d");
                let dataValues = total_orders;
                let getColors = () => [
                    getColor("pending", .9),
                    getColor("warning", .9),
                    getColor("primary", .9),
                    getColor("info", .9)

                ];
                let pieChart = new Chart(context, {
                    type: "pie",
                    data: {
                        labels: category,
                        datasets: [{
                            data: dataValues,
                            backgroundColor: getColors(),
                            hoverBackgroundColor: getColors(),
                            borderWidth: 5,
                            borderColor: getColor("white")
                        }]
                    },
                    options: {
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                labels: {
                                    color: getColor("slate.500", .8)
                                }
                            }
                        }
                    }
                });

                helper.watchCssVariables("html", ["color-pending", "color-warning", "color-info",], updatedColors => {
                    pieChart.data.datasets[0].backgroundColor = getColors();
                    pieChart.update();
                });
            });
        }
    })();
})();
