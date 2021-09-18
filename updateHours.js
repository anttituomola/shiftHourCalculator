import { countEveningHours, shiftEveningHour, shiftNightHour } from "./countEveningHours.js"
import Todo from "./todo.js"
import { shifts } from "./index.js"
import { render } from "./render.js"
import { startDate } from "./getValues.js"
import { startHour, endHour, shiftHour } from "./getValues.js"

export let hours = 0
export let eveningHours = 0
export let nightHours = 0
export let sortedShifts


export function updateHours() {
    countEveningHours()
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