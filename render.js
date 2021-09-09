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