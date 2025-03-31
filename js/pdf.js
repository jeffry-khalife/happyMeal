 function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const listeDeCourses = JSON.parse(localStorage.getItem('liste_de_courses')) || [];

  doc.setFontSize(18);
  doc.text("Liste de Courses", 20, 20);

  doc.setFontSize(12);
  let yPosition = 30;  
  listeDeCourses.forEach((ingredient, index) => {
      doc.text(`${ingredient.quantite} ${ingredient.nom}`, 20, yPosition);
      yPosition += 10;  
  });

  doc.save("liste_de_courses.pdf");
}

document.getElementById('download-pdf').addEventListener('click', downloadPDF);