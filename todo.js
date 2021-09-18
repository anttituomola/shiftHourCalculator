export default class Todo {
    constructor(startDate, startHour, endHour, shiftHour, shiftEveningHour, shiftNightHour, holidayHour) {
        this.startDate = startDate
        this.startHour = startHour
        this.endHour = endHour
        this.shiftHour = shiftHour
        this.shiftEveningHour = shiftEveningHour
        this.shiftNightHour = shiftNightHour
        this.holidayHour = holidayHour
    }
}
