let shifts = []
let hours  = 0

function getValues() {
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
    getValues()
    let thisDate = startDate
    if (shifts.length === 0) {
        shifts.push({ startDate, renderHours })
        render()
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
            shifts.push({ startDate, renderHours })
            render()
        }
    }
}

function deleteButtonHandler(i) {
    shifts.splice(i,1)
    render()
}

function render() {
    let shiftList = document.getElementById("shift-list")
    shiftList.textContent = ""
    for (let i = 0; i < shifts.length; i++) {
        shiftList.innerHTML += `
        <div class="aShitf">
        ${shifts[i].startDate}: ${shifts[i].renderHours}
        <button class="deleteButton" onclick="deleteButtonHandler(${i})">DELETE</button></div>`
    }
}

document.getElementById("endHourEl").addEventListener("blur", () => {
    getValues()
    document.getElementById("calculation").textContent = renderHours
})
document.getElementById("startHourEl").addEventListener("blur", () => {
    getValues()
    document.getElementById("calculation").textContent = renderHours
})


