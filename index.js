let shifts = []
let hours = 0
let eveningHours = 0

let startDateValue = new Date(document.getElementById("startHourEl").value)

function getValues() {
    //is this the best way to get global variables that get the lates data from input? Or should we use an even data somehow?
    window.startHour = new Date(document.getElementById("startHourEl").value).getTime()
    window.endHour = new Date(document.getElementById("endHourEl").value).getTime()
    window.startDay = new Date(startHour).getDate()
    window.startMonth = new Date(startHour).getMonth() + 1
    window.startYear = new Date(startHour).getFullYear()
    window.startDate = startDay + "." + startMonth + "." + startYear
    window.hoursTotal = endHour - startHour
    window.renderHours = Math.floor(hoursTotal / (1000 * 60 * 60)) + "h " + Math.floor(hoursTotal / (1000 * 60)) % 60 + "m"
    window.renderEveningHours = Math.floor(eveningHours / (1000 * 60 * 60)) + "h" + Math.floor(eveningHours / (1000 * 60)) % 60 + "min"
    window.sortedShifts = shifts.sort((a,b) => b.startHour - a.startHour)

}

//TODO: change input fields so, that you only have one for date and two for times!

function calculateHours() {
    getValues()
    let thisDate = startDate
    let found = false
    for (let i = 0; i < shifts.length; i++) {
        if (shifts[i].startDate === thisDate) {
            found = true
            alert("This date already submitted!")
            break
        }
    }
    if (shifts.length === 0 || (!found)) {
        countEveningHours()
        updateHours()
    }
}


function countEveningHours() {
    getValues()
    eveningStarts = new Date(startHour)
    eveningStarts.setHours(18)
    eveningS = 18
    let startEveningHours = new Date(document.getElementById("startHourEl").value).getHours()
    let endEveningHours = new Date(document.getElementById("endHourEl").value).getHours()
    if (startEveningHours >= eveningS || endEveningHours >= eveningS) {
        if (startEveningHours > eveningS) {
            eveningHours = endHour - startHour
        } else {
            eveningMilliseconds = eveningStarts.getTime()
            eveningHours = endHour - eveningMilliseconds
        }
    }
}

function updateHours() {
    countEveningHours()
    shifts.push({ startDate, renderHours, hoursTotal, startHour, endHour, eveningHours, renderEveningHours })

    //how to set the date selector for the next day?
    /* let today = new Date(startDateValue)
    console.log(today)
    let tomorrow = new Date(today.setDate(today.getDate() +1 ))
    let newDate = document.getElementById("startHourEl")
    newDate.value = tomorrow.toLocaleString("fi-FI", options)
    console.log(tomorrow.toLocaleString()) */

    render()
}

function deleteButtonHandler(i) {
    shifts.splice(i, 1)
    render()
}

function render() {
    let shiftList = document.getElementById("shift-list")
    let totalHoursEl = document.getElementById("calculationTotal")
    shiftList.textContent = ""
    for (let i = 0; i < sortedShifts.length; i++) {
        shiftList.innerHTML += `
        <div class="aShitf">
        ${sortedShifts[i].startDate}: ${sortedShifts[i].renderHours} (${sortedShifts[i].renderEveningHours} evening hours)
        <button class="deleteButton button" onclick="deleteButtonHandler(${i})">DELETE</button></div>`
    }
    //Update total hours count
    hours = 0
    for (let i = 0; i < shifts.length; i++) {
        hours += shifts[i].hoursTotal
    }
    eveningHours = 0
    for (let i = 0; i < shifts.length; i++) {
        eveningHours += shifts[i].eveningHours
    }

    totalHoursEl.textContent = Math.round(hours / (1000 * 60 * 60) * 100) / 100 + " h (" + Math.round(eveningHours / (1000 * 60 * 60) * 100) / 100 + " evening hours)"
}

//Listen for input fields
let endHourEl = document.getElementById("endHourEl")
endHourEl.addEventListener("input", () => {
    getValues()
    document.getElementById("calculation").textContent = renderHours
})
document.getElementById("startHourEl").addEventListener("input", () => {
    getValues()
    document.getElementById("calculation").textContent = renderHours
})

//listen for enter {
endHourEl.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        calculateHours()
    }
})

//There's plenty of stuff in this single JS file. Should we break it down to pieces like we did with React applications? How do we do that with JS?