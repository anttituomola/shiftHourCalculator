import { shifts } from "./index.js"
import { updateHours } from "./updateHours.js"
import { getValues } from "./getValues.js"
import { startDate } from "./getValues.js"

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
            //update date selector to the newest, not reported day
            let lastDate = dayjs(shifts[0].startDate)
            let startDateRender = dayjs(lastDate).add(1, "d")
            document.getElementById("startDateEl").value = dayjs(startDateRender).format("YYYY-MM-DD")
            break
        }
    }
    if (shifts.length === 0 || (!found)) {
        updateHours()
    }
    console.log(shifts)
}