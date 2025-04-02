document.getElementById('search-button').addEventListener('click', () => {
    const searchInput = document.getElementById('search-recette').value.trim().toLowerCase();
    const recettesList = document.getElementById('recettes-list').options;

    let recetteFound = false;

    for (let i = 0; i < recettesList.length; i++) {
        if (recettesList[i].value.toLowerCase() === searchInput) {
            recetteFound = true;
            window.location.href = `recettes.html#${recettesList[i].value}`;
            break;
        }
    }
});

document.querySelectorAll('.recipe').forEach(item => {
    item.addEventListener('dragstart', drag);
});

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    let recipe = document.getElementById(data);
    event.target.appendChild(recipe);
}

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
    const dateInput = document.getElementById('date').value; 
    const message = document.getElementById('message');

    if (!dateInput) {
        message.textContent = "Veuillez choisir une date.";
        message.style.color = "red";
        return;
    }

    const formattedDate = new Date(dateInput).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const planningTable = document.getElementById('planning');
    const planningBody = planningTable.querySelector('tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="px-4 py-2 border border-blue-950">${formattedDate}</td>
        <td class="px-4 py-2 border border-blue-950">${recette}</td>
    `;
    planningBody.appendChild(newRow);

    planningTable.classList.remove('hidden');

    message.textContent = "";
});