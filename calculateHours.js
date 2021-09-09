function calculateHours() {
    getValues()
    let thisDate = startDate
    let found = false
    for (let i = 0; i < shifts.length; i++) {
        if (shifts[i].startDate === thisDate) {
            found = true
            alert("This date already submitted!")
            break
        }
    }
    if (shifts.length === 0 || (!found)) {
        countEveningHours()
        updateHours()
    }
}