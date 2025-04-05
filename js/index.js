fetch('json/datas.json')
.then(response => response.json())
.then(data => {

    const recipesContainer = document.getElementById('random-recipes-container');

    // Mélangez les recettes pour un affichage aléatoire
    const shuffledRecipes = data.recettes.sort(() => 0.5 - Math.random());

    // Sélectionnez les 3 premières recettes après mélange
    const randomRecipes = shuffledRecipes.slice(0, 3);

    randomRecipes.forEach(recette => {
        const recetteDiv = document.createElement('div');
        recetteDiv.className = 'recette bg-grey-200 p-4 rounded-lg shadow-md';

        recetteDiv.innerHTML = `
            <img src="${recette.image}" alt="${recette.nom}" class="w-full h-40 object-cover rounded-lg mb-4">
            <h2 class="text-lg font-bold text-green-500 mb-2">${recette.nom}</h2>
            <p class="text-sm text-gray-600 mb-2">Catégorie : ${recette.categorie || 'Non spécifiée'}</p>
            <p class="text-sm text-gray-600 mb-2">Temps de préparation : ${recette.temps_preparation || 'Non spécifié'}</p>
        `;

        recetteDiv.addEventListener('click', function() {
            ouvrirModal(recette);
        });

        recipesContainer.appendChild(recetteDiv);
    });
})
.catch(error => console.error('Erreur lors du chargement des données :', error));