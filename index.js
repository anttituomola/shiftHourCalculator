dayjs.extend(dayjs_plugin_weekday)
dayjs.extend(dayjs_plugin_dayOfYear)
dayjs.extend(dayjs_plugin_duration)

import deleteButtonHandler from "./deleteButtonHandler.js"
import { checkDate } from "./checkDate.js";
import { getValues } from "./getValues.js";
import { startDate, startHour, endHour } from "./getValues.js";


//global variables
export let shifts = []
let button = document.getElementById("submitButton")
export let sortedShifts = shifts.sort((a, b) => b.startHour - a.startHour)


//input field placeholder values
document.getElementById("startDateEl").value = dayjs(startDate).format("YYYY-MM-DD")
document.getElementById("startHourEl").value = dayjs(startHour).format("HH:mm")
document.getElementById("endHourEl").value = dayjs(endHour).format("HH:mm")

//listen for changes
document.getElementById("startDateEl").addEventListener("input", getValues)
document.getElementById("startHourEl").addEventListener("input", getValues)
document.getElementById("endHourEl").addEventListener("input", getValues)

//listen for clicks & enters {
button.addEventListener("click", checkDate)

endHourEl.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkDate()
    }
})

document.getElementById("shift-list").addEventListener("click", e => {
    while (e.target != null) {
        if (e.target.classList.contains("deleteButton")) { deleteButtonHandler(e.target.id) }
        break
    }
})

//Get values from input fields
window.onload = () => {
    getValues()
}


//TODO: add sunday hours counter

//TODO: fetch Finnish calendar via API to get national holidays: https://holidayapi.com/countries/fi/2021

//TODO: sort shifts under months?

//TODO: add "send this month" option to sent the shift list via email

// TODO: prevent reporting of future dates


//DONE:
//TODO: What if the shift continues over midnight? (idea: if endHour < Starthour => add(1, "day"))
// splitting code up, using ES6 modules