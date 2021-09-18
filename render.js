import { hours, eveningHours, nightHours, sortedShifts, sundayHours} from "./updateHours.js"
import { startDate } from "./getValues.js"
import { holidayHour } from "./countHolidayHours.js"

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
        ${sortedShifts[i].holidayHour ? `(<span class="holiday">${(Math.round(sortedShifts[i].holidayHour * 100) / 100).toFixed(2)} holiday hours</span>)` : ""}
        <button id="${i}" class="deleteButton button">DELETE</button>
        </div>`
    }
    //update date selector to the next day
    let startDateRender = dayjs(startDate).add(1, "d")
    document.getElementById("startDateEl").value = dayjs(startDateRender).format("YYYY-MM-DD")

    //render total hours
    totalHoursEl.innerHTML = `
    <b><h3>Total: ${(Math.round(hours * 100) / 100).toFixed(2)} hours</h3></b>
    Includes:
    <ul id="totalHoursList">
        <li>${(Math.round(eveningHours * 100) / 100).toFixed(2)} evening hours</li>
        <li>${(Math.round(nightHours * 100) / 100).toFixed(2)} night hours<br></li>
        <li>${(Math.round(sundayHours * 100) / 100).toFixed(2)} holiday hours</li>
    `
}