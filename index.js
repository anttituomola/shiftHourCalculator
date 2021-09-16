dayjs.extend(dayjs_plugin_weekday)
dayjs.extend(dayjs_plugin_dayOfYear)

//import Todo from "./todo.js";

const blah = new Todo();

let shifts = []
let hours = 0
let eveningHours = 0
let shiftEveningHours = 0
let shiftHour = 0

//global variables
let startDate = dayjs().hour(0).minute(0).format()
let startHour = dayjs(startDate).hour(12).minute(0)
let endHour = dayjs(startDate).hour(19).minute(30)
let button = document.getElementById("submitButton")
let sortedShifts = shifts.sort((a, b) => b.startHour - a.startHour)


//input field placeholder values
document.getElementById("startDateEl").value = dayjs(startDate).format("YYYY-MM-DD")
document.getElementById("startHourEl").value = dayjs(startHour).format("HH:mm")
document.getElementById("endHourEl").value = dayjs(endHour).format("HH:mm")


function getValues() {
    let startHourValue = document.getElementById("startHourEl").value
    startHourValue = startHourValue.split(":")
    let endHourValue = document.getElementById("endHourEl").value
    endHourValue = endHourValue.split(":")
    startDate = dayjs(document.getElementById("startDateEl").value)
    startHour = dayjs(startDate).hour(startHourValue[0]).minute(startHourValue[1])
    endHour = dayjs(startDate).hour(endHourValue[0]).minute(endHourValue[1])
    shiftHour = dayjs(endHour).diff(startHour, "h", true)
    document.getElementById("calculation").textContent = (Math.round(shiftHour * 100) / 100).toFixed(2)
}

//check if date already submitted
function checkDate() {
    getValues()
    let thisDate = dayjs(startDate).format("DD.MM.YYYY")
    let found = false
    for (let i = 0; i < shifts.length; i++) {
        if (shifts[i].startDate === thisDate) {
            found = true
            alert("This date already submitted!")
            break
        }
    }
    if (shifts.length === 0 || (!found)) {
        updateHours()
    }
    console.log(shifts)
}

function countEveningHours() {
    let eveningStarts = dayjs(startDate).hour(18)
    if (dayjs(startHour).isAfter(eveningStarts)) {
        shiftEveningHour = endHour.diff(startHour, "hour", true)
    } else {
        shiftEveningHour = endHour.diff(eveningStarts, "hour", true)
    }
}

function updateHours() {
    countEveningHours()
    //fix this: remove formatting from class element
    let todoEl = new Todo(startDate, startHour, endHour, shiftHour, shiftEveningHour)
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
        shiftList.innerHTML += 
        //TODO: instead of a float, render hours and minutes
        `
        <div class="aShitf">
        <b>${sortedShifts[i].startDate.format("dddd DD.MM.YYYY")}:</b> ${(Math.round(sortedShifts[i].shiftHour * 100) / 100).toFixed(2)} h (${(Math.round(sortedShifts[i].shiftEveningHour * 100) / 100).toFixed(2)} evening hours)
        <button class="deleteButton button" onclick="deleteButtonHandler(${i})">DELETE</button></div>`
    }
    //update date selector to the next day
    startDate = dayjs(startDate).add(1, "d")
    document.getElementById("startDateEl").value = dayjs(startDate).format("YYYY-MM-DD")

    //render total hours
    totalHoursEl.textContent = `${(Math.round(hours * 100) / 100).toFixed(2)} h (${(Math.round(eveningHours * 100) / 100).toFixed(2)} evening hours)`
}

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

    //TODO: What if the shift continues over midnight? (idea: if endHour < Starthour => add(1, "day"))

    //TODO: add sunday hours counter

    //TODO: fetch Finnish calendar via API to get national holidays: https://holidayapi.com/countries/fi/2021

    //TODO: sort shifts under months?

    //TODO: add "send this month" option to sent the shift list via email

    // splitting code up, using ES6 modules