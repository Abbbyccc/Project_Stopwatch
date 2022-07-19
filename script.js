const display = document.getElementById('watch-diplay')
const lapTimes = document.querySelector('.lap-time')

let timer = null;
let millisecond = 0
let second = 0
let minute = 0
let hour = 0

//if the timer is already running we don't neet to run it again
function start() {
    if (timer !== null) {
        return
    }
    timer = setInterval(update, 10)
}

//function to update the timer
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

    display.innerHTML = `<span id = "time-display" > ${h}:</span ><span id="time-display">${m}:</span><span
                id="time-display">${s}:</span><span id="time-display">${ms}</span>`
}

//function to reset the timer
function reset() {
    clearInterval(timer)
    millisecond = 0
    second = 0
    minute = 0
    hour = 0
    display.innerHTML = '00:00:00:00'
}

//function to pause the timer
function pause() {
    clearInterval(timer)
    timer = null
}

//unction to create the laps and save the data to LocalStorage
function lap() {
    const lis = document.createElement('li')
    lis.setAttribute('class', 'laps')
    if (display.textContent == '00:00:00:00' || checkExistingLap(display.textContent) == true) {
        return
    } else {
        lis.innerHTML = display.innerHTML
        saveToLocalStorage('localLogs', lis.innerHTML)
        lapTimes.append(lis)

    }
}

//function to save data under a key to localStorage
function saveToLocalStorage(key, data) {
    const localLogs = JSON.parse(localStorage.getItem(key)) || []
    localLogs.push(data)
    localStorage.setItem(key, JSON.stringify(localLogs))
}

//function to clear lap time records
function clearLap() {
    window.localStorage.removeItem('localLogs');
    removeAllChildNodes(lapTimes)
}

//Call the data from localstorage when refreshing the page
window.onload = function () {
    const savedLogs = JSON.parse(localStorage.getItem('localLogs'))
    for (let i = 0; i < savedLogs.length; i++) {
        const lis = document.createElement('li')
        lis.setAttribute('class', 'laps')
        lis.innerHTML = savedLogs[i]
        lapTimes.append(lis)
    }
}

//function to check if lap already exist if yes then will not double lap
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