(() => {
    (function () {
        "use strict";
        let a = $(".donut-chart");
        if (a.length) {
            a.each(function () {
                let r = $(this)[0].getContext("2d");
                let e = [15, 10, 65];
                let t = () => [
                    getColor("pending", .9),
                    getColor("warning", .9),
                    getColor("primary", .9)
                ];

                let o = new Chart(r, {
                    type: "doughnut",
                    data: {
                        labels: ["Html", "Vuejs", "Laravel"],
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

                helper.watchCssVariables("html", ["color-pending", "color-warning", "color-primary"], n => {
                    o.data.datasets[0].backgroundColor = t();
                    o.data.datasets[0].hoverBackgroundColor = t();
                    o.update();
                });
            });
        }
    })();
})();