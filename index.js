let shifts = []
let hours = 0
let eveningHours = 0
let testDay = moment().add(1, 'days').format("dd mm yyyy")
console.log(testDay)

var startHour;

let startDateValue = new Date(document.getElementById("startHourEl").value)


//TODO: change input fields so, that you only have one for date and two for times!
//as this will be a major change to the structure of the app, what's the best way to do it?


class Shift {
    startDate = null;
    renderHours = null;
    hoursTotal = null;
    startHour = null;
    endHour = null;
    eveningHours = null;
    renderEveningHours = null;

    constructor(startDate, renderHours, hoursTotal, startHour, endHour, eveningHours, renderEveningHours)     {
        this.startDate = startDate;
        this.renderHours = renderHours;
        this.hoursTotal = hoursTotal;
        this.startHour = startHour;
        this.endHour = endHour;
        this.eveningHours = eveningHours;
        this.renderEveningHours = renderEveningHours;
    }
}

function updateHours() {
    countEveningHours()
    //should I use classes instead?
    shifts.push({ startDate, renderHours, hoursTotal, startHour, endHour, eveningHours, renderEveningHours })

    //how to set the date selector for the next day?
    /* let today = new Date(startDateValue)
    console.log(today)
    let tomorrow = new Date(today.setDate(today.getDate() +1 ))
    let newDate = document.getElementById("startHourEl")
    newDate.value = tomorrow.toLocaleString("fi-FI", options)
    console.log(tomorrow.toLocaleString()) */

    render()
}

function deleteButtonHandler(i) {
    shifts.splice(i, 1)
    render()
}

//Listen for input fields
function listeners() {
    let endHourEl = document.getElementById("endHourEl")
    endHourEl.addEventListener("input", () => {
        getValues()
        document.getElementById("calculation").textContent = renderHours
    })
    document.getElementById("startHourEl").addEventListener("input", () => {
        getValues()
        document.getElementById("calculation").textContent = renderHours
    })
    
    //listen for enter {
    endHourEl.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            calculateHours()
        }
    })
}

listeners()

//There's plenty of stuff in this single JS file. Should we break it down to pieces like we did with React applications? How do we do that with JS?
//So this works with import/export, but when I tried that, I got this error: 
//Uncaught SyntaxError: Cannot use import statement outside a module
//Todo.js:1 Uncaught SyntaxError: Unexpected token 'export'
//something about type: module, maybe?

//Switch to moment.js
//change the input to have just one date field & and two time fields
//use class instead of object in Shifts
//everything in a class