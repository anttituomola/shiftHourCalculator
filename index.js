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
}

function calculateHours() {
    //This function is terrible with all the nested conditionals. How can we make it better?
    getValues()
    let thisDate = startDate
    if (shifts.length === 0) {
        countEveningHours()
        updateHours()
    } else {
        let found = false
        for (let i = 0; i < shifts.length; i++) {
            if (shifts[i].startDate === thisDate) {
                found = true
                alert("This date already submitted!")
                break
            }
        }
        if (!found) {
            countEveningHours()
            updateHours()
        }
    }
}

function countEveningHours() {
    //This works for hours, but how can we count minutes also?
    //The idea is that hours between 18 and 24 are paid more so we need a count of them
    eveningStarts = 18
    let startEveningHours = new Date(document.getElementById("startHourEl").value).getHours()
    let endEveningHours = new Date(document.getElementById("endHourEl").value).getHours()
    if(startEveningHours >= eveningStarts || endEveningHours >= eveningStarts) {
        if(startEveningHours > eveningStarts) {
            eveningHours = endEveningHours - startEveningHours
        } else {
            eveningHours = endEveningHours - eveningStarts
        }
    }

}

function updateHours() {
    countEveningHours()
    shifts.push({ startDate, renderHours, hoursTotal, startHour, endHour, eveningHours })
    /* how to set the date selector for the next day?
    nextDay = startDateValue.getDate() + 1
    startDateValue.setDate(nextDay) */
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
    //TODO: filter with date
    for (let i = 0; i < shifts.length; i++) {
        shiftList.innerHTML += `
        <div class="aShitf">
        ${shifts[i].startDate}: ${shifts[i].renderHours} (${shifts[i].eveningHours} evening hours)
        <button class="deleteButton button" onclick="deleteButtonHandler(${i})">DELETE</button></div>`
    }
    //Update total hours count
    hours = 0
    for (let i = 0; i < shifts.length; i++) {
        hours += shifts[i].hoursTotal
    }
    eveningHours = 0
    for (let i=0;i<shifts.length;i++) {
        eveningHours += shifts[i].eveningHours
    }

    totalHoursEl.textContent = Math.round(hours / (1000 * 60 * 60)*100) / 100 + " h (" + eveningHours + " evening hours)"
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


