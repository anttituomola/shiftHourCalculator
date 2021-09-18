dayjs.extend(dayjs_plugin_weekday)
dayjs.extend(dayjs_plugin_dayOfYear)
dayjs.extend(dayjs_plugin_duration)

import Todo from "./todo.js";
import deleteButtonHandler from "./deleteButtonHandler.js"
import { render } from "./render.js";
import { checkDate } from "./checkDate.js";

export let shifts = []
export let hours = 0
export let eveningHours = 0
let shiftEveningHour = 0
let shiftNightHour = 0
export let nightHours = 0
let shiftHour = 0

//global variables
export let startDate = dayjs().hour(0).minute(0).format()
let startHour = dayjs(startDate).hour(12).minute(0)
let endHour = dayjs(startDate).hour(19).minute(30)
let button = document.getElementById("submitButton")
export let sortedShifts = shifts.sort((a, b) => b.startHour - a.startHour)


//input field placeholder values
document.getElementById("startDateEl").value = dayjs(startDate).format("YYYY-MM-DD")
document.getElementById("startHourEl").value = dayjs(startHour).format("HH:mm")
document.getElementById("endHourEl").value = dayjs(endHour).format("HH:mm")

export function getValues() {
    let startHourValue = document.getElementById("startHourEl").value
    startHourValue = startHourValue.split(":")
    let endHourValue = document.getElementById("endHourEl").value
    endHourValue = endHourValue.split(":")
    startDate = dayjs(document.getElementById("startDateEl").value)
    startHour = dayjs(startDate).hour(startHourValue[0]).minute(startHourValue[1])
    endHour = dayjs(startDate).hour(endHourValue[0]).minute(endHourValue[1])
    if (dayjs(endHour).isBefore(dayjs(startHour))) {
        endHour = dayjs(endHour).add(1, "day")
    }
    shiftHour = dayjs(endHour).diff(startHour, "h", true)
    document.getElementById("calculation").textContent = (Math.round(shiftHour * 100) / 100).toFixed(2)
}

function countEveningHours() {
    let eveningStarts = dayjs(startDate).hour(18)
    if (dayjs(startHour).isAfter(eveningStarts)) {
        shiftEveningHour = endHour.diff(startHour, "hour", true)
    } else {
        shiftEveningHour = endHour.diff(eveningStarts, "hour", true)
    }
    //night hours
    if (dayjs(endHour).isAfter(dayjs(startDate), "day")) {
        let shiftNightStarts = dayjs(endHour).hour(0).minute(0)
        let nightShiftEnds = dayjs(endHour)
        shiftNightHour = nightShiftEnds.diff(shiftNightStarts, "hour", true)
    }
}

export function updateHours() {
    countEveningHours()
    //fix this: remove formatting from class element
    let todoEl = new Todo(startDate, startHour, endHour, shiftHour, shiftEveningHour, shiftNightHour)
    shifts.push(todoEl)
    sortedShifts = shifts.sort((a, b) => b.startHour - a.startHour)

    //Update total hours count
    hours = 0
    for (let i = 0; i < shifts.length; i++) {
        hours += shifts[i].shiftHour
    }
    eveningHours = 0
    for (let i = 0; i < shifts.length; i++) {
        eveningHours += shifts[i].shiftEveningHour
    }
    nightHours = 0
    for (let i = 0; i < shifts.length; i++) {
        nightHours += shifts[i].shiftNightHour
    }
    render()
}

document.getElementById("shift-list").addEventListener("click", e => {
    while(e.target != null){
        if(e.target.classList.contains("deleteButton")) {deleteButtonHandler(e.target.id)}
        break
    }
})

//listen for changes
document.getElementById("startDateEl").addEventListener("input", getValues)
document.getElementById("startHourEl").addEventListener("input", getValues)
document.getElementById("endHourEl").addEventListener("input", getValues)

//listen for click & enter {
button.addEventListener("click", checkDate)

endHourEl.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkDate()
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

// splitting code up, using ES6 modules

// TODO: prevent reporting of future dates

//TODO: What if the shift continues over midnight? (idea: if endHour < Starthour => add(1, "day"))
    //DONE: