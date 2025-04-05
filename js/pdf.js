function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Planning des repas", 20, 20);

    const planningTable = document.getElementById('planning');
    const rows = planningTable.querySelectorAll('tbody tr');

    doc.setFontSize(12);
    let yPosition = 30;

    rows.forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        const date = cells[0].textContent.trim();
        const recette = cells[1].textContent.trim();

        doc.text(`${index + 1}. ${date} - ${recette}`, 20, yPosition);
        yPosition += 10;
    });

    doc.save("planning_de_la_semaine.pdf");
}

document.getElementById('download-pdf').addEventListener('click', downloadPDF);