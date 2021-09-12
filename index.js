let shifts = []
let hours = 0
let eveningHours = 0

//global variables
let startDate = dayjs().hour(00).minute(00).format() 
let startHour = dayjs(startDate).add(11, "h")
let endHour = dayjs(startHour).add(8, "h")

//input field placeholder values
document.getElementById("startDateEl").value = dayjs(startDate).format("YYYY-MM-DD") //why does this shows in local format on the app (DD/MM/YYYY)
document.getElementById("startHourEl").value = dayjs(startHour).format("HH:mm")
document.getElementById("endHourEl").value = dayjs(endHour).format("HH:mm")


function getValues() {
    //is this the best way to get global variables that get the lates data from input? Or should we use an even data somehow?

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
    startDate = dayjs(startDate).add(1, "d")
    document.getElementById("startDateEl").value = dayjs(startDate).add(1, "d").format("YYYY-MM-DD")
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