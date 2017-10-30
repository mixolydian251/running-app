
(function main() {
 // time vars
    var mili = 0;
    var sec = 0;
    var min = 0;
    var startTime = 0;
    var totalTime = 0;
    var runTime = 0;
    var newTime = 0;
    var lap = 0;
    var printedTime = '00.00.00';

 // state vars
    var running = 'new';
    var timer;
    var checkDistance;

 //speed & distance vars
    var distanceCheck = 0;
    var mph = 0;
    var distanceTraveledPrevious = 0;
    var distanceTraveledAtSpeed = 0;
    var totalDistance = 0;

 // event vars
    var selectType;
    var xStart;
    var xEnd;

 // Data-sets
    var distanceInterval = [];

 // Elements for listeners/ manip
    const upload = document.getElementById('upload');
    const time = document.getElementById('time');
    const elapsedTime = document.getElementById('time');
    const up = document.getElementById('increase');
    const down = document.getElementById('decrease');
    const runSpeed = document.getElementById('speed');
    const distance = document.getElementById('distance');
    const speedRow = document.getElementById('speedRow');

 // Submits run data to API
    function submission() {
        console.log('submit function running..');
        var run = {
            run_time: {
                total_time: totalTime,
                formatted_time: printedTime
            },
            distance: totalDistance,
            mile_marks: distanceInterval,
            upload_time: new Date().getTime()
        };

     // sends run to app.js
        axios.post('/uploads', run)
            .then(function(response){
                console.log('saved successfully', response)
            }).catch((error) => {
            console.log(error)
        });
    }

 // Resets time point on ∆v for cumulative distance
    function newRelativeTime () {
        clearInterval(timer);
        totalTime = runTime;
        distanceTraveledPrevious = totalDistance;
        newTime = new Date().getTime();
        startTimer(newTime);
    }

 // Checks runners time every 0.05 miles, stores in distanceInterval array
    function check_distance() {
        checkDistance = setInterval(() => {
            if (totalDistance >= (distanceCheck + 0.05)){
                distanceInterval.push(runTime);
                distanceCheck = totalDistance;
            }
        }, 500);
    }

 // Starts Timer and Calculates distance
    function startTimer(newTime) {

        timer = setInterval(() => {
                var endTime = new Date().getTime();
                runTime = endTime - newTime + totalTime;
                lap = endTime - newTime;

             // Converts ms into sec and min
                if (runTime > 999) {
                    if (min > 0){
                        sec = Math.floor(runTime / 1000) - (min * 60)
                    } else{
                        sec = Math.floor(runTime / 1000);
                    }
                    if(min > 0){
                       mili = runTime - (min * 60000) - (sec * 1000);

                    } else {
                        mili = runTime - (sec * 1000);
                    }
                    if (sec > 59) {
                        sec = 0;
                        min += 1;
                    }
                }

             // Calculates Distance
                distanceTraveledAtSpeed = (lap/(1000*60*60) * mph);
                totalDistance = distanceTraveledPrevious + distanceTraveledAtSpeed;

             // Formats time and distance
                if (sec < 10) {
                    var strSec = `0${sec}`;
                } else {
                    strSec = `${sec}`;
                }
                if (min < 10) {
                    var strMin = `0${min}`;
                } else {
                    strMin = `${min}`;
                }
                if (runTime < 999) {
                    mili = runTime;
                    var strMili = `${mili}`;
                    strMili = strMili.slice(0, -1);

                } else if(mili < 100){
                    if(mili < 10){
                        strMili = '00'
                    } else {
                        strMili = `0${mili}`;
                        strMili = strMili.slice(0, -1);
                    }

                } else {
                    strMili = `${mili}`;
                    strMili = strMili.slice(0, -1);
                }


                printedTime = `${strMin}:${strSec}:${strMili}`;
             // Print Time & Distance
                elapsedTime.innerHTML = printedTime ;
                distance.innerHTML = `${(totalDistance).toFixed(2)} miles`;
            }
            , 40);
    }

 // Event compatibility for mobile or desktop
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        selectType = 'touchend'
    } else {selectType = 'click'}
    

 ///////////////////Listeners//////////////////////////

 // Uploads
    function listenForUpload (){
        upload.addEventListener(selectType, () => {
            var push = confirm('Do you want to save this run?');
            if (push === true){
                submission();
                window.location.replace("http://" + window.location.host + "/data");
            }
        });
    }

 // Find initial touch location
    document.addEventListener('touchstart', (e) => {
        xStart = e.changedTouches[0].pageX;
    });

 // Starts or Stops timer based on running state.
    time.addEventListener(selectType, (e) => {
        e.preventDefault();
        if (running === 'new') {
            running = 'running';
            startTime = new Date().getTime();
            startTimer(startTime);
            check_distance();
        } else if (running === 'running') {
            running = 'stopped';
            clearInterval(timer);
            clearInterval(checkDistance);
            totalTime = runTime;
            distanceTraveledPrevious = totalDistance;
         // Uploads
            listenForUpload();
        } else if (running === 'stopped') {
            running = 'running';
            newTime = new Date().getTime();
            startTimer(newTime);
            check_distance();
        }
    });

 // Increases speed by the '+' control.
    up.addEventListener(selectType, (e) => {
        e.preventDefault();
        if(running === 'running'){
            newRelativeTime()
        }
        mph += 0.5;
        runSpeed.innerHTML = `${mph.toFixed(1)} mph`;
    });

 // Increases speed by the '-' control.
    down.addEventListener(selectType, (e) => {
        e.preventDefault();
        if (mph >= 0.5) {
            if(running === 'running'){
                newRelativeTime()
            }
            mph -= 0.5;
            runSpeed.innerHTML = `${mph.toFixed(1)} mph`;
        }
    });

 // // Slide finger on mph element to inc/dec (Mobile feature)
 //    speedRow.addEventListener('touchmove', (e) => {
 //        xEnd = e.changedTouches[0].pageX;
 //        if (xStart < xEnd) {
 //            mph += (Math.abs(xEnd - xStart) / 1500)
 //        } else if (xStart > xEnd && mph > 0) {
 //            mph -= (Math.abs(xEnd - xStart) / 1500)
 //        }
 //        runSpeed.innerHTML = `${mph.toFixed(1)} mph`;
 //        if(running === 'running'){
 //            newRelativeTime()
 //        }
 //    });

})();








