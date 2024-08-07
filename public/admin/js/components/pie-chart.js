(() => {
    (function () {
        "use strict";
        let pieCharts = $(".pie-chart");
        if (pieCharts.length) {
            pieCharts.each(function () {
                let context = $(this)[0].getContext("2d");
                let dataValues = [15, 10, 65];
                let getColors = () => [
                    getColor("pending", .9),
                    getColor("warning", .9),
                    getColor("primary", .9)
                ];
                let pieChart = new Chart(context, {
                    type: "pie",
                    data: {
                        labels: ["Html", "Vuejs", "Laravel"],
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

                helper.watchCssVariables("html", ["color-pending", "color-warning", "color-primary"], updatedColors => {
                    pieChart.data.datasets[0].backgroundColor = getColors();
                    pieChart.update();
                });
            });
        }
    })();
})();
