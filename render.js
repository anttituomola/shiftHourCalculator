import { sortedShifts } from "./updateHours.js"
import { hours, eveningHours, nightHours } from "./updateHours.js"
import { startDate } from "./getValues.js"

export function render() {
    let shiftList = document.getElementById("shift-list")
    let totalHoursEl = document.getElementById("calculationTotal")
    shiftList.textContent = ""
    for (let i = 0; i < sortedShifts.length; i++) {
        shiftList.innerHTML +=
            //TODO: instead of a float, render hours and minutes
            `
        <div class="aShitf">
        <b>${sortedShifts[i].startDate.format("dddd DD.MM.YYYY")}:</b> ${(Math.round(sortedShifts[i].shiftHour * 100) / 100).toFixed(2)} h 
        (${(Math.round(sortedShifts[i].shiftEveningHour * 100) / 100).toFixed(2)} evening hours)
        <button id="${i}" class="deleteButton button">DELETE</button>
        </div>`
    }
    //update date selector to the next day
    let startDateRender = dayjs(startDate).add(1, "d")
    document.getElementById("startDateEl").value = dayjs(startDateRender).format("YYYY-MM-DD")

    //render total hours
    totalHoursEl.textContent = `${(Math.round(hours * 100) / 100).toFixed(2)} h (${(Math.round(eveningHours * 100) / 100).toFixed(2)} evening hours + ${(Math.round(nightHours * 100) / 100).toFixed(2)} night hours)`
}