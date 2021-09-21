
window.jsPDF = window.jspdf.jsPDF;
import { shifts } from "./index.js";

export function createPDF() {
    let doc = new jsPDF()
    let pdfMaterial = shifts.map(function(item) {
        return item["shiftHour"]
    })
    /* doc.text(pdfMaterial)
    doc.save("a4.pdf")   */  
    console.log(pdfMaterial)
}
