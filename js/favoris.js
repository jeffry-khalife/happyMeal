function chargerFavoris() {
    const favoris = JSON.parse(localStorage.getItem('favoris')) || [];
    const container = document.getElementById('favoris-container');
    container.innerHTML = ''; 

    favoris.forEach((recette, index) => {
    const recetteDiv = document.createElement('article');
    recetteDiv.className = 'sm:grid grid-cols-5 bg-white shadow-sm p-7 relative lg:max-w-2xl sm:p-4 rounded-lg lg:col-span-2 lg:ml-20 mb-6';
    recetteDiv.innerHTML = `
        <img src="${recette.image}" alt="${recette.nom}" class="w-full rounded-lg">
        <div class="pt-5 self-center sm:pt-0 sm:pl-10 col-span-3">
            <h2 class="text-gray-800 capitalize text-xl font-bold">${recette.nom}</h2>
            <p class="text-sm text-gray-600 mt-2">${recette.categorie}</p>
        </div>
        <div class="justify-self-end">
            <button onclick="supprimerFavori(${index})" class="text-red-500 hover:text-red-700 text-lg">
            Supprimer
            </button>
        </div>
        `;

        container.appendChild(recetteDiv);
        });
}

function supprimerFavori(index) {
    let favoris = JSON.parse(localStorage.getItem('favoris')) || [];
    favoris.splice(index, 1);
    localStorage.setItem('favoris', JSON.stringify(favoris));

    chargerFavoris();
}

window.onload = function() {
    chargerFavoris();
};