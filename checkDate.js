import { getValues, startDate, shifts, updateHours } from "./index.js"

//check if date already submitted
export function checkDate() {
    getValues()
    let thisDate = dayjs(startDate).format("DD-MM-YYYY")
    let found = false
    for (let i = 0; i < shifts.length; i++) {
        let thatDate = shifts[i].startDate.format("DD-MM-YYYY")
        if (thatDate === thisDate) {
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