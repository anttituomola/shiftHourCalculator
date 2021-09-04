let shifts = []
let hours = 0

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
            updateHours()
        }
    }
}

function updateHours() {
    shifts.push({ startDate, renderHours, hoursTotal })
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
    for (let i = 0; i < shifts.length; i++) {
        shiftList.innerHTML += `
        <div class="aShitf">
        ${shifts[i].startDate}: ${shifts[i].renderHours}
        <button class="deleteButton button" onclick="deleteButtonHandler(${i})">DELETE</button></div>`
    }
    //Update total hours count
    hours = 0
    for (let i = 0; i < shifts.length; i++) {
        hours += shifts[i].hoursTotal
    }
    totalHoursEl.textContent = hours / (1000 * 60 * 60)
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


