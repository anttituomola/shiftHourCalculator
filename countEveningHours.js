import { startHour, endHour } from "./getValues.js"
export let shiftEveningHour = 0
export let shiftNightHour = 0
import { startDate } from "./getValues.js"


export function countEveningHours() {
    let eveningStarts = dayjs(startDate).hour(18)
    if (dayjs(startHour).isAfter(eveningStarts)) {
        shiftEveningHour = endHour.diff(startHour, "hour", true)
    } else if (dayjs(endHour).isAfter(eveningStarts)) {
        shiftEveningHour = endHour.diff(eveningStarts, "hour", true)
    } else {
        shiftEveningHour = 0
    }
    //night hours
    if (dayjs(endHour).isAfter(dayjs(startDate), "day")) {
        let shiftNightStarts = dayjs(endHour).hour(0).minute(0)
        let nightShiftEnds = dayjs(endHour)
        shiftNightHour = nightShiftEnds.diff(shiftNightStarts, "hour", true)
    }
}