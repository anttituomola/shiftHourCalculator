import { startHour, endHour } from "./getValues.js"
export let shiftEveningHour = 0
export let shiftNightHour = 0
import { startDate } from "./getValues.js"


export function countEveningHours() {
    let eveningStarts = dayjs(startDate).hour(18)
    let eveningEnds = dayjs(startHour).add(1, "day").hour(0).minute(0)
    //if shift starts after 6pm and ends before midnight
    if (dayjs(startHour).isAfter(eveningStarts) && dayjs(endHour).isBefore(eveningEnds)) {
        shiftEveningHour = endHour.diff(startHour, "hour", true)
        //if shift starts before 6pm ends between 6pm and midnight
    } else if (dayjs(startHour).isBefore(eveningStarts) && (dayjs(endHour).isAfter(eveningStarts) && dayjs(endHour).isBefore(eveningEnds))) {
        shiftEveningHour = endHour.diff(eveningStarts, "hour", true)
        //if shift starts before 6pm and ends after midnight
    } else if (dayjs(startHour).isBefore(eveningStarts) && (dayjs(endHour).isAfter(eveningEnds))) {
        shiftEveningHour = eveningEnds.diff(eveningStarts, "hour", true)
        //if shift starts after 6pm and ends after midnight
    } else if (dayjs(startHour).isAfter(eveningStarts) && (dayjs(endHour).isAfter(eveningEnds))) {
        shiftEveningHour = eveningEnds.diff(startHour, "hour", true)
    } else {
        shiftEveningHour = 0
    }
    //night hours
    if (dayjs(endHour).isAfter(dayjs(startDate), "day")) {
        let shiftNightStarts = dayjs(endHour).hour(0).minute(0)
        let nightEnds = dayjs(endHour).hour(6).minute(0)
        let nightShiftEnds = dayjs(endHour)
        if (dayjs(endHour).isAfter(nightEnds)) {
            shiftNightHour = nightEnds.diff(shiftNightStarts, "hour", true)
        }
        shiftNightHour = nightShiftEnds.diff(shiftNightStarts, "hour", true)
    }
}