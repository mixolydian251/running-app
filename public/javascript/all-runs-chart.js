var ctx = document.getElementById("allRuns").getContext('2d');

var runDates = [];
var runDistances = [];
var mileMarks = [];
var mileMarkTimes = ["0:00"];
var mileMarker = 0;

axios.get('/uploads', {})
    .then(function (res) {
        var lastRun = res.data.runs.length - 1;
        var lastRunMarks = res.data.runs[lastRun].mile_marks.length;

        res.data.runs.forEach((item) => {
            runDates.push(moment(item.upload_time).format("MM/D @h :mma"));
            runDistances.push(item.distance.toFixed(2));
        });

        res.data.runs[lastRun].mile_marks.forEach((item) => {
            var min = moment.duration(item).minutes();
            var sec = moment.duration(item).seconds();
            if (sec < 10){
                sec = `0${sec}`
            }
            mileMarkTimes.push(`${min}:${sec}`)
        });

        for (var i = 0; i < lastRunMarks; i++){
            mileMarks.push(mileMarker.toFixed(2));
            mileMarker += 0.05;
        }

        console.log(mileMarks);
        console.log(mileMarkTimes);

        drawGraphs();

    })
    .catch(function (error) {
        console.log(error);
    });

function drawGraphs() {
    var allRuns = new Chart(ctx, {
        type: 'line',
        data: {
            labels: runDates,
            datasets: [{
                label: 'Distance',
                data: runDistances,
                backgroundColor: [
                    'rgba(255, 255, 255, 0.07)'
                ],
                borderColor: [
                    'rgba(255, 255, 255, .6)',
                ],
                borderWidth: 2
            }]
        },
        options: {
            elements: {
                point: {
                    radius: 2,
                    borderWidth: 0,
                    pointStyle: 'circle',
                    hitRadius: 5,
                    hoverRadius: 5
                }
            },
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 12
                }
            },
            maintainAspectRatio: false,
            title: {
                display: true,
                text: "All Previous Runs",
                fontColor: "white",
                fontSize: 13
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        fontColor: "white",
                        fontSize: 12
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero:true,
                        fontColor: "white",
                        fontSize: 12
                    }
                }]
            }
        }
    });

    var ctx2 = document.getElementById("lastRun").getContext('2d');
    var lastRun = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: mileMarkTimes,
            datasets: [{
                label: 'Time for every 0.05 miles',
                data: mileMarks,
                backgroundColor: [
                    'rgba(255, 255, 255, 0.3)'
                ],
                borderColor: [
                    'rgba(255, 255, 255, .6)',
                ],
                borderWidth: 2
            }]
        },
        options: {
            elements: {
                point: {
                    radius: 3,
                    borderWidth: 0,
                    pointStyle: 'circle',
                    hitRadius: 20,
                    hoverRadius: 5
                }
            },
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 12
                }
            },
            maintainAspectRatio: false,
            title: {
                display: true,
                text: "Last Run",
                fontColor: "white",
                fontSize: 13
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        fontColor: "white",
                        fontSize: 12
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero:true,
                        fontColor: "white",
                        fontSize: 12
                    }
                }]
            }
        }
    });
}

