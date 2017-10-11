


(function main() {
    var mili = 0;
    var sec = 0;
    var min = 0;
    var running = 'new';
    var timer;
    var mph = 0;
    var distanceTraveledPrevious = 0;
    var distanceTraveledAtSpeed = 0;
    var totalDistance = 0;
    var startTime = 0;
    var totalTime = 0;
    var runTime = 0;
    var newTime = 0;
    var selectType;

    var xStart;
    var xEnd;

    //const navbar = document.getElementById('navbar');
    const time = document.getElementById('time');
    const elapsedTime = document.getElementById('time');
    const up = document.getElementById('increase');
    const down = document.getElementById('decrease');
    const runSpeed = document.getElementById('speed');
    const distance = document.getElementById('distance');
    const speedRow = document.getElementById('speedRow');


    function startTimer(newTime) {

        timer = setInterval(() => {
                var endTime = new Date().getTime();
                runTime = endTime - newTime + totalTime;
                var lap = endTime - newTime;


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

                    distanceTraveledAtSpeed = (lap/(1000*60*60) * mph);
                    totalDistance = distanceTraveledPrevious + distanceTraveledAtSpeed

                }
                if (sec < 10) {
                    var strSec = `0${sec}`;
                }
                else {
                    strSec = `${sec}`;
                }
                if (min < 10) {
                    var strMin = `0${min}`;
                }
                else {
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

                elapsedTime.innerHTML = `${strMin}:${strSec}:${strMili}`;

                distance.innerHTML = `${(totalDistance).toFixed(2)} miles`;
            }
            , 40);
    }




    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        selectType = 'touchend'
    } else {selectType = 'click'}
    

    document.addEventListener('touchstart', (e) => {
        xStart = e.changedTouches[0].pageX;
    });


    time.addEventListener(selectType, (e) => {
        if (running === 'new') {
            running = 'running';
            startTime = new Date().getTime();
            startTimer(startTime);

        } else if (running === 'running') {
            running = 'stopped';
            clearInterval(timer);
            totalTime = runTime;
            distanceTraveledPrevious = totalDistance;
        } else if (running === 'stopped') {
            running = 'running';
            newTime = new Date().getTime();
            startTimer(newTime);
        }
    });

    up.addEventListener(selectType, (e) => {

        e.preventDefault();
        mph += 0.5;
        runSpeed.innerHTML = `${mph.toFixed(1)} mph`;
        if(running === 'running'){
            clearInterval(timer);
            totalTime = runTime;
            distanceTraveledPrevious = totalDistance;
            newTime = new Date().getTime();
            startTimer(newTime);
        }

    });

    down.addEventListener(selectType, (e) => {
        e.preventDefault();
        if (mph >= 0.5) {
            mph -= 0.5;
            runSpeed.innerHTML = `${mph.toFixed(1)} mph`;
            if(running === 'running'){
                clearInterval(timer);
                totalTime = runTime;
                distanceTraveledPrevious = totalDistance;
                newTime = new Date().getTime();
                startTimer(newTime);
            }
        }
    });

    speedRow.addEventListener('touchmove', (e) => {
        xEnd = e.changedTouches[0].pageX;
        if (xStart < xEnd) {
            mph += (Math.abs(xEnd - xStart) / 1500)
        }
        else if (xStart > xEnd && mph > 0) {
            mph -= (Math.abs(xEnd - xStart) / 1500)
        }
        runSpeed.innerHTML = `${mph.toFixed(1)} mph`;
        if(running === 'running'){
            clearInterval(timer);
            totalTime = runTime;
            distanceTraveledPrevious = totalDistance;
            newTime = new Date().getTime();
            startTimer(newTime);
        }
    });
})();


// addEventListener('DOMContentLoaded', () => {
//     main()
// });







