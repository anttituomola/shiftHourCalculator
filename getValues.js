

export let startDate = dayjs().hour(0).minute(0).format()
export let startHour = dayjs(startDate).hour(12).minute(0)
export let endHour = dayjs(startDate).hour(19).minute(30)
export let shiftHour = 0

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
    document.getElementById("calculation").innerHTML = `<h3>This shift: ${(Math.round(shiftHour * 100) / 100).toFixed(2)}</h3>`
}