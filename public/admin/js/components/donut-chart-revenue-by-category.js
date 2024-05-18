(() => {
    (async function () {
        "use strict";
        let a = $(".donut-chart-revenue-by-category");
        const response = await fetch('/admin/chart/data/revenuebycategory');
        const data = await response.json();
        const category = []
        const revenue = []
        data.revenueByCategory.forEach(element => {
            category.push(element.category)
          revenue.push(element.revenue)

        });
        console.log(category)
        console.log(revenue)
        if (a.length) {
            a.each(function () {
                let r = $(this)[0].getContext("2d");
                let e = revenue;
                let t = () => [
                    getColor("pending", .9),
                    getColor("warning", .9),
                    getColor("primary", .9),
                    getColor("success", .9) // Thêm màu mới
                ];

                let o = new Chart(r, {
                    type: "doughnut",
                    data: {
                        labels:category,
                        datasets: [{
                            data: e,
                            backgroundColor: t(),
                            hoverBackgroundColor: t(),
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
                        },
                        cutout: "80%"
                    }
                });

                helper.watchCssVariables("html", ["color-pending", "color-warning", "color-primary","color-success"], n => {
                    o.data.datasets[0].backgroundColor = t();
                    o.data.datasets[0].hoverBackgroundColor = t();
                    o.update();
                });
            });
        }
    })();
})();