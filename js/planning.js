fetch('../json/data.json')
    .then(response => response.json())
    .then(data => {
        const recetteSelect = document.getElementById('recette');
        data.recettes.forEach(recette => {
            const option = document.createElement('option');
            option.value = recette.nom; 
            option.textContent = recette.nom; 
            recetteSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Erreur lors du chargement des recettes :', error));

document.getElementById('ajouter').addEventListener('click', (e) => {
    e.preventDefault();

    const recetteSelect = document.getElementById('recette');
    const recette = recetteSelect.options[recetteSelect.selectedIndex].text;
    const date = document.getElementById('date').value;
    const message = document.getElementById('message');
    const today = new Date().toISOString().split('T')[0];

    if (!date) {
        message.textContent = "Veuillez choisir une date.";
        message.style.color = "red";
        return;
    }

    const planningTable = document.getElementById('planning');
    const planningBody = planningTable.querySelector('tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="px-4 py-2 border border-blue-950">${date}</td>
        <td class="px-4 py-2 border border-blue-950">${recette}</td>
    `;
    planningBody.appendChild(newRow);

    planningTable.classList.remove('hidden');

    message.textContent = "";
});