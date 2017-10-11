const navbar = document.getElementById('navbar');
const time = document.getElementById('time');
const elapsedTime = document.getElementById('time');
const up = document.getElementById('increase');
const down = document.getElementById('decrease');
const runSpeed = document.getElementById('speed');
const distance = document.getElementById('distance');
const speedRow = document.getElementById('speedRow');

document.addEventListener('touchstart', (e) => {
    xStart = e.changedTouches[0].pageX;
});


time.addEventListener('touchend', (e) => {
    e.preventDefault();
    if (running === false) {
        running = true;
        timer = setInterval(startTimer, 100);
    }
    else {
        running = false;
        clearInterval(timer);
    }
});

time.addEventListener('click', (e) => {
    e.preventDefault();
    if (running === false) {
        running = true;
        timer = setInterval(startTimer, 100);
    }
    else {
        running = false;
        clearInterval(timer);
    }
});

up.addEventListener('touchend', (e) => {
    e.preventDefault();
    mph += 0.5;
    runSpeed.innerHTML = `${mph.toFixed(1)} mph`
});

down.addEventListener('touchend', (e) => {
    e.preventDefault();
    if (mph >= 0.5) {
        mph -= 0.5;
        runSpeed.innerHTML = `${mph.toFixed(1)} mph`
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
    runSpeed.innerHTML = `${mph.toFixed(1)} mph`
});

