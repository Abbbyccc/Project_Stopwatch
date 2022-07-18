const display = document.getElementById('watch-diplay')
const lapTimes = document.querySelector('.lap-time')

let timer;
let millisecond = 0
let second = 0
let minute = 0
let hour = 0


function start() {
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

    display.innerHTML = `${h}:${m}:${s}:${ms}`
}

function resetWatch() {
    clearInterval(timer)
    display.innerHTML = '00:00:00:00'
    removeAllChildNodes(lapTimes)
}

function pauseWatch() {
    clearInterval(timer)
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
            if (laps[i].innerHTML == time) {
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