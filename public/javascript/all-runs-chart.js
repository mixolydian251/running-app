var ctx = document.getElementById("allRuns").getContext('2d');

var runDates = [];
var runDistances = [];
var mileMarks = [];
var mileMarkTimes = ["0:00"];
var mileMarkTimesMs = [0];
var mileMarker = 0;
var numberOfRunsDisplayed = 5;

axios.get('/uploads', {})
    .then(function (res) {
        var lastRun = res.data.runs.length - 1;
        var numberOfRuns = res.data.runs.length;
        var lastRunMarks = res.data.runs[lastRun].mile_marks.length;


        if (numberOfRuns < 5){
          //Gathers All past runs
            res.data.runs.forEach((item) => {
                 runDates.push(moment(item.upload_time).format("MM/D h:mma"));
                 runDistances.push(item.distance.toFixed(2));
            }); 
        } else {
         // Last 'X' runs
            for(i = (numberOfRuns - numberOfRunsDisplayed); i < numberOfRuns; i++ ){
                runDates.push(moment(res.data.runs[i].upload_time).format("MM/D h:mma"));
                runDistances.push(res.data.runs[i].distance.toFixed(2));
            }
        }

        res.data.runs[lastRun].mile_marks.forEach((item) => {
            var min = moment.duration(item).minutes();
            var sec = moment.duration(item).seconds();
            if (sec < 10){
                sec = `0${sec}`
            }
            mileMarkTimes.push(`${min}:${sec}`);
            mileMarkTimesMs.push(item/1000)
        });

        for (var i = 0; i < lastRunMarks; i++){
            mileMarks.push(mileMarker.toFixed(2));
            mileMarker += 0.05;
        }

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
                text: `Last ${numberOfRunsDisplayed} runs`,
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
            labels: mileMarks,
            datasets: [{
                label: 'time (seconds)',
                data: mileMarkTimesMs,
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

