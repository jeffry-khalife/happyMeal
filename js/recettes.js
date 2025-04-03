fetch('../json/data.json')
    .then(response => response.json())
    .then(data => {
        const recettesContainer = document.getElementById('recettes-container');

        data.recettes.forEach(recette => {
            // Créez un conteneur pour chaque recette
            const recetteDiv = document.createElement('div');
            recetteDiv.id = recette.nom; // Utilisez le nom comme ID
            recetteDiv.className = 'recette bg-indigo-200 p-4 rounded-lg shadow-md';

                // Ajoutez le contenu de la recette
                recetteDiv.innerHTML = `
                    <img src="${recette.image}" alt="${recette.nom}" class="w-full h-40 object-cover rounded-lg mb-4">
                    <h2 class="text-xl font-bold text-blue-950 mb-2">${recette.nom}</h2>
                    <p class="text-sm text-gray-600 mb-2">Catégorie : ${recette.categorie || 'Non spécifiée'}</p>
                    <p class="text-sm text-gray-600 mb-2">Temps de préparation : ${recette.temps_preparation || 'Non spécifié'}</p>
                    <button onclick="window.location.hash='${encodeURIComponent(recette.nom)}'" class="bg-blue-950 text-white rounded-full px-4 py-2 hover:bg-green-700 transition">Voir plus</button>
                `;

                // Ajoutez la recette au conteneur principal
                recettesContainer.appendChild(recetteDiv);
            });
        })
.catch(error => console.error('Erreur lors du chargement des recettes :', error));