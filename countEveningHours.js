function countEveningHours() {
    getValues()
    eveningStarts = new Date(startHour)
    eveningStarts.setHours(18)
    eveningS = 18
    let startEveningHours = new Date(document.getElementById("startHourEl").value).getHours()
    let endEveningHours = new Date(document.getElementById("endHourEl").value).getHours()
    if (startEveningHours >= eveningS || endEveningHours >= eveningS) {
        if (startEveningHours > eveningS) {
            eveningHours = endHour - startHour
        } else {
            eveningMilliseconds = eveningStarts.getTime()
            eveningHours = endHour - eveningMilliseconds
        }
    }
}