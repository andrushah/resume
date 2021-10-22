/* seting default value time/date */
let dd = new Date();
let hh = dd.getHours() > 9 ? dd.getHours() : `0${dd.getHours()}`;
let mm = dd.getMinutes() > 9 ? dd.getMinutes() : `0${dd.getMinutes()}`;
let ss = dd.getSeconds() > 9 ? dd.getSeconds() : `0${dd.getSeconds()}`;
let day = dd.getDate() > 9 ? dd.getDate() : `0${dd.getDate()}`;
let mounth = dd.getMonth() > 9 ? dd.getMonth() : `0${dd.getMonth()}`;
let year = dd.getFullYear() > 9 ? dd.getFullYear() : `0${dd.getFullYear()}`;
document.querySelector('.date').innerHTML = `${day}.${mounth}.${year}`;
document.querySelector('.time').innerHTML = `${hh}:${mm}:${ss}`;

/* end seting default value time/date */

/* seting current value time/date */
let clock = setInterval(() => {
    dd = new Date();
    hh = dd.getHours() > 9 ? dd.getHours() : `0${dd.getHours()}`;
    mm = dd.getMinutes() > 9 ? dd.getMinutes() : `0${dd.getMinutes()}`;
    ss = dd.getSeconds() > 9 ? dd.getSeconds() : `0${dd.getSeconds()}`;
    day = dd.getDate() > 9 ? dd.getDate() : `0${dd.getDate()}`;
    mounth = dd.getMonth() > 9 ? dd.getMonth() : `0${dd.getMonth()}`;
    year = dd.getFullYear() > 9 ? dd.getFullYear() : `0${dd.getFullYear()}`;
    document.querySelector('.date').innerHTML = `${day}.${mounth}.${year}`
    document.querySelector('.time').innerHTML = `${hh}:${mm}:${ss}`
}, 1000);
/* end seting current value time/date */

// starts stopWach functions
let timeBegan = null,
    timeStopped = null,
    stoppedDuration = 0,
    started = null;
document.querySelector('.start').onclick = function () {
    if (timeBegan === null) {
        timeBegan = new Date();
    }
    if (timeStopped !== null) {
        stoppedDuration += (new Date() - timeStopped);
    }
    startedID = setInterval(startWach, 10);
    this.disabled = true;
    document.querySelector('.loop').disabled = false;
    document.querySelector('.stop').disabled = false;
    document.querySelector('.reset').disabled = false;
}
// start stopWach setInterval function
function startWach() {
    let currentTime = new Date(),
        timeElapsed = new Date(currentTime - timeBegan - stoppedDuration),
        hour = timeElapsed.getUTCHours(),
        min = timeElapsed.getUTCMinutes(),
        sec = timeElapsed.getUTCSeconds(),
        ms = timeElapsed.getUTCMilliseconds();
    document.querySelector(".screen").innerHTML =
        (hour > 9 ? hour : "0" + hour) + ":" +
        (min > 9 ? min : "0" + min) + ":" +
        (sec > 9 ? sec : "0" + sec) + "." +
        (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + ms);
};
// stop stopWach functions
document.querySelector('.stop').onclick = function () {
    timeStopped = new Date();
    clearInterval(startedID);
    this.disabled = true;
    document.querySelector('.start').disabled = false;

}
// reset stopWach functions
document.querySelector('.reset').onclick = function () {
    clearInterval(startedID);
    stoppedDuration = 0;
    timeBegan = null;
    timeStopped = null;
    document.querySelector('.results').innerHTML = '';
    document.querySelector('.screen').innerHTML = '00:00:00:000';
    document.querySelector('.start').disabled = false;
    document.querySelector('.loop').disabled = true;
    document.querySelector('.stop').disabled = true;
    document.querySelector('.results').style.borderColor = '#1f273f';
    this.disabled = true;
}
// loop stopWach functions
document.querySelector('.loop').onclick = () => {
    let h4 = document.createElement('p');
    h4.textContent += document.querySelector('.stopWachScreen').textContent;
    document.querySelector('.results').append(h4);
    document.querySelector('.results').style.borderColor = '#2f3b5f';
}


/* ------------ Start Timer functions ------------ */
let timerID;
let timerBegun = null;
let stoppedTimerDuration = 0;
let stoppedTimer = null;
let minutes = Number.parseInt(document.querySelector('.minutes').textContent);
let futureTime = null;

document.querySelector('.startTimer').onclick = function () {
    if (futureTime === null) {
        futureTime = new Date();
        futureTime.setMinutes(futureTime.getMinutes() + minutes);
        console.log(futureTime.getMinutes());
    }
    if (stoppedTimer !== null) {
        stoppedTimerDuration += (new Date() - stoppedTimer)
    }
    console.log(stoppedTimerDuration / 1000);

    timerID = setInterval(function () {
        let currentDate = new Date(),
            timeElapsed = new Date(futureTime - currentDate + stoppedTimerDuration),
            min = timeElapsed.getMinutes(),
            sec = timeElapsed.getSeconds();
        if (min == 0 && sec == 0) {
            clearInterval(timerID);
        }
        document.querySelector('.timerScreen').innerHTML = 
        (min > 9 ? min : "0" + min) + ":" +
        (sec > 9 ? sec : "0" + sec);
        console.log(min+':'+sec);
    }, 10)
    this.disabled = true;
    document.querySelector('.stopTimer').disabled = false;
    document.querySelector('.resetTimer').disabled = false;
}

/* stop timer function */
document.querySelector('.stopTimer').onclick = function () {
    stoppedTimer = new Date();
    clearInterval(timerID);
    document.querySelector('.startTimer').disabled = false;
    this.disabled = true;
}
/*reset timer function*/
document.querySelector('.resetTimer').onclick = function () {
   clearInterval(timerID);
   //reset variables
   futureTime = null;
   stoppedTimer = null;
   stoppedTimerDuration = 0;
    //reset blocks
    document.querySelector('.timerScreen').innerHTML = '00:00';
    document.querySelector('.startTimer').disabled = false;
    document.querySelector('.stopTimer').disabled = true;
    this.disabled = true;
}
/* Buttons add time interval to timeout */
let timerField = document.querySelector('.minutes');
document.querySelector('.setSontrols').onclick = function () {
    if (event.target.className === 'plus') {
        timerField.innerHTML = parseInt(timerField.innerHTML) + 1;
    } else if (event.target.className === 'minus') {
        timerField.innerHTML = parseInt(timerField.innerHTML) - 1;
    }
    if (Number.parseInt(timerField.textContent) < 2) {
        document.querySelector('.minus').disabled = true;
    } else {
        document.querySelector('.minus').disabled = false;
    }
    //reset variables for start interval funuction
    minutes = Number.parseInt(document.querySelector('.minutes').textContent);
    
}