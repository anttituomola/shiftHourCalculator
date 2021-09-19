import { startHour, endHour } from "./getValues.js";
export let holidayHour = 0
let sundayShift

export function sundayHourCalc() {
    //shift starts and ends on Sunday
    if (dayjs(startHour).day() === 0 && dayjs(endHour).day() === 0) {
        sundayShift = dayjs(endHour).diff(startHour, "hour", true)
        holidayHour = sundayShift
        //shift starts on Saturday but ends on Sunday
    } else if (dayjs(startHour).day() != 0 && dayjs(endHour).day() === 0) {
        let sundayStarts = dayjs(endHour).hour(0).minute(0)
        sundayShift = dayjs(endHour).diff(sundayStarts, "hour", true)
        holidayHour = sundayShift
        //shift starts on Sunday but ends on Monday
    } else if (dayjs(startHour).day() === 0 && dayjs(endHour).day() != 0) {
        let sundayEnds = dayjs(endHour).hour(0).minute(0)
        sundayShift = dayjs(sundayEnds).diff(startHour, "hour", true)
    } else {
        sundayShift = 0
    }
    holidayHour = sundayShift
}

/* fetch("https://holidayapi.com/countries/fi/2021").then(response => response.json()).then(data => console.log(data))

import { HolidayAPI } from 'holidayapi';
const key = '4d92456e-8799-4c2d-b427-4a6f893bc480'
const holidayApi = new HolidayAPI({ key });
holidayApi.holidays({
  country: 'FI',
  year: '2021',
}); */