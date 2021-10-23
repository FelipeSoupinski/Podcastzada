function getRandom(min, max) {
    return Math.trunc(Math.random() * (max - min) + min);
}


inscritos = getRandom(20, 40)
a = [ouvintes, favoritos, inscritos]
console.log(a)

const CHART = document.getElementById("lineChart");

Chart.defaults.global.animation.duration = 200;

let barChart = new Chart(CHART, {
    type: 'bar',
    data: {
        labels: ['Ouvintes', 'Favoritos', 'Inscritos'],
        datasets: [{
            borderWidth: 2,
            data: a,
            backgroundColor: [
                '#7d6161',
                '#ffffff',
                '#000000'
            ]
        }]
    },

    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                barPercentage: 0.5,
                categoryPercentage: 0.8
            }]
        },
        maintainAspectRatio: false,
        responsive: false,
        legend: {
            display: false
        }
    }


});