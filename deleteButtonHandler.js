import { shifts } from "./index.js"
import { render } from "./render.js"

export default function deleteButtonHandler(id) {  
    shifts.splice(id, 1)
        render()
}