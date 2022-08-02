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
    pauseClicked = false
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

    display.innerHTML = `<span id = "time-display" >${h}:</span ><span id="time-display">${m}:</span><span
                id="time-display">${s}:</span><span id="time-display">${ms}</span>`
}

//function to reset the timer
function reset() {
    clearInterval(timer)
    millisecond = 0
    second = 0
    minute = 0
    hour = 0
    display.textContent = '00:00:00:00'
    timer = null
    displayList = []
}

//function to pause the timer
function pause() {
    clearInterval(timer)
    timer = null
    pauseClicked = true
}


let displayList = []
let pauseClicked = false



//function to create the laps and save the data to LocalStorage
function lap() {
    const lis = document.createElement('li')

    lis.setAttribute('class', 'laps')
    if (display.textContent == '00:00:00:00' || pauseClicked == true) {
        return
    } else {
        displayList.push(display.textContent)

        if (displayList[1] == null) {
            console.log(true)
            lis.textContent = msToStr(strToMs(display.textContent) - strToMs('00:00:00:00'))
            saveToLocalStorage('localLogs', lis.textContent)
            lapTimes.append(lis)

        } else {
            for (let i = 1; i < displayList.length; i++) {
                lis.textContent = msToStr(strToMs(displayList[i]) - strToMs(displayList[i - 1]))

            }
            saveToLocalStorage('localLogs', lis.textContent)
            lapTimes.append(lis)
        }
    }
}

// change time string to ms for lap subtract
function strToMs(s) {
    const splitStr = s.split(":")
    return Number(splitStr[0]) * 3600000 + Number(splitStr[1] * 60000) + Number(splitStr[2] * 1000) + Number(splitStr[3]);
}

//change ms back to time format string
function msToStr(ms) {
    let hour = Math.floor(ms / 3600000)
    let min = Math.floor((ms / 3600000 - hour) * 60)
    let sec = Math.floor(((ms / 3600000 - hour) * 60 - min) * 60)
    let msec = Math.round(ms % 1000)

    let h = hour < 10 ? "0" + hour : hour;
    let m = min < 10 ? "0" + min : min;
    let s = sec < 10 ? "0" + sec : sec;
    let msecs = msec < 10 ? "00" + msec : msec < 100 ? "0" + msec : msec;

    return h + ':' + m + ":" + s + ":" + msecs
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
    displayList = []
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

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}