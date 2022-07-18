const display = document.getElementById('watch-diplay')
const lapTimes = document.querySelector('.lap-time')

let timer = null;
let millisecond = 0
let second = 0
let minute = 0
let hour = 0


function start() {
    if (timer !== null) {
        clearInterval(timer);
    }
    timer = setInterval(update, 10)

}

function update() {
    millisecond += 10
    if (millisecond == 1000) {
        millisecond = 0;
        second++;
        if (second == 60) {
            second = 0;
            minute++;
            if (minute == 60) {
                minute = 0
                hour++
            }
        }
    }
    let h = hour < 10 ? "0" + hour : hour;
    let m = minute < 10 ? "0" + minute : minute;
    let s = second < 10 ? "0" + second : second;
    let ms = millisecond < 10 ? "00" + millisecond : millisecond < 100 ? "0" + millisecond : millisecond;

    // display.innerHTML = `${h}:${m}:${s}:${ms}`
    display.innerHTML = `<span id = "time-display" > ${h}:</span ><span id="time-display">${m}:</span><span
                id="time-display">${s}:</span><span id="time-display">${ms}</span>`
}

function reset() {
    clearInterval(timer)
    removeAllChildNodes(lapTimes)
    millisecond = 0
    second = 0
    minute = 0
    hour = 0
    display.innerHTML = '00:00:00:00'

}

function pause() {
    clearInterval(timer)

}

function lap() {
    const lis = document.createElement('li')
    lis.setAttribute('class', 'laps')

    if (display.innerHTML == '00:00:00:00' || checkExistingLap(display.textContent) == true) {
        return
    } else {
        lis.innerHTML = display.innerHTML
        lapTimes.append(lis)
    }
}

function checkExistingLap(time) {
    let laps = document.querySelectorAll('.laps')
    let result
    if (laps.length == 0) {
        result = false
    } else {
        for (let i = 0; i < laps.length; i++) {
            if (laps[i].textContent == time) {
                result = true
            } else {
                result = false
            }
        }
        return result
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}