function getValues() {
    //is this the best way to get global variables that get the lates data from input? Or should we use an even data somehow?
    startHour = new Date(document.getElementById("startHourEl").value).getTime()
    window.endHour = new Date(document.getElementById("endHourEl").value).getTime()
    window.startDay = new Date(startHour).getDate()
    window.startMonth = new Date(startHour).getMonth() + 1
    window.startYear = new Date(startHour).getFullYear()
    window.startDate = startDay + "." + startMonth + "." + startYear
    window.hoursTotal = endHour - startHour
    window.renderHours = Math.floor(hoursTotal / (1000 * 60 * 60)) + "h " + Math.floor(hoursTotal / (1000 * 60)) % 60 + "m"
    window.renderEveningHours = Math.floor(eveningHours / (1000 * 60 * 60)) + "h" + Math.floor(eveningHours / (1000 * 60)) % 60 + "min"
    window.sortedShifts = shifts.sort((a,b) => b.startHour - a.startHour)

}