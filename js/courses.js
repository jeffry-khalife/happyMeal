function afficherListeDeCourses() {
    const listeDeCourses = JSON.parse(localStorage.getItem('liste_de_courses')) || [];
    const container = document.getElementById('shopping-list');
    container.innerHTML = ''; 

    listeDeCourses.forEach((ingredient, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('flex', 'justify-between', 'items-center', 'mb-2');
        listItem.innerHTML = `
            <span>${ingredient.quantite} ${ingredient.nom}</span>
            <button onclick="supprimerDeListeDeCourses(${index})" class="text-red-500 hover:text-red-700">Supprimer</button>
        `;
        container.appendChild(listItem);
    });
}

function supprimerDeListeDeCourses(index) {
    let listeDeCourses = JSON.parse(localStorage.getItem('liste_de_courses')) || [];

    listeDeCourses.splice(index, 1);

    localStorage.setItem('liste_de_courses', JSON.stringify(listeDeCourses));

    afficherListeDeCourses();
}

window.onload = function() {
    afficherListeDeCourses();
};