const recettesParPage = 9;
let recettes = [];
let pageCourante = 1;
let recetteSelectionnee = null;

fetch('../json/data.json')
    .then(response => response.json())
    .then(data => {
        recettes = data.recettes;
        afficherRecettes();
    })
    .catch(error => {
        console.error('Erreur de chargement des données:', error);
    });

function afficherRecettes() {
    const startIndex = (pageCourante - 1) * recettesParPage;
    const endIndex = startIndex + recettesParPage;
    const recettesPage = recettes.slice(startIndex, endIndex);

    const container = document.getElementById('recettes-container');
    container.innerHTML = '';

    recettesPage.forEach((recette, index) => {
        const recetteDiv = document.createElement('article');
        recetteDiv.className = 'recette bg-white p-4 rounded-lg shadow-md';
        recetteDiv.innerHTML = `
                <img src="${recette.image}" alt="${recette.nom}" class="w-full h-40 object-cover rounded-lg mb-4">
                <h2 class="text-lg font-bold text-green-500 mb-2">${recette.nom}</h2>
                <p class="text-sm text-gray-600 mb-2">Catégorie : ${recette.categorie || 'Non spécifiée'}</p>
                <p class="text-sm text-gray-600 mb-2">Temps de préparation : ${recette.temps_preparation || 'Non spécifié'}</p>
                <div class="flex justify-between items-center">
                <button class="bg-green-500 text-white rounded-full px-4 py-2 hover:bg-lime-400 transition">Voir plus</button>
                <div class="justify-self-end">
                    <img src="../assets/images/off.jpg" alt="Bookmark" class="w-8 sm:relative sm:top-0 sm:right-0 cursor-pointer" id="favori-${startIndex + index}">
                </div>
                </div>
        `;

        const favoriIcon = recetteDiv.querySelector(`#favori-${startIndex + index}`);
        favoriIcon.addEventListener('click', function(event) {
            event.stopPropagation();
            ajouterAuxFavoris(startIndex + index);                    
        });

        recetteDiv.addEventListener('click', function() {
            ouvrirModal(recette);
        });

        container.appendChild(recetteDiv);
    });

    afficherPagination();
}

function afficherPagination() {
    const totalPages = Math.ceil(recettes.length / recettesParPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.className = `px-4 py-2 mx-1 bg-green-500 text-white rounded-full ${i === pageCourante ? 'bg-gray-600' : ''}`;
        button.textContent = i;
        button.onclick = () => changerPage(i);
        paginationContainer.appendChild(button);
    }
}

function changerPage(page) {
    pageCourante = page;
    afficherRecettes();
}

function ouvrirModal(recette) {
    recetteSelectionnee = recette;

    document.getElementById('popup-title').textContent = recette.nom;
    document.getElementById('popup-image').src = recette.image;
    document.getElementById('popup-category').textContent = `Catégorie: ${recette.categorie}`;
    document.getElementById('popup-time').textContent = `Temps de préparation: ${recette.temps_preparation}`;

    const ingredientsList = document.getElementById('popup-ingredients');
    ingredientsList.innerHTML = recette.ingredients.map((ingredient, index) => {
        return `
            <li>
                <label>
                    <input type="checkbox" class="ingredient-checkbox" data-index="${index}" data-nom="${ingredient.nom}" data-quantite="${ingredient.quantite}">
                    ${ingredient.quantite} ${ingredient.nom}
                </label>
            </li>
        `;
    }).join('');

    // const stepsList = document.getElementById('popup-steps');
    // stepsList.innerHTML = recette.etapes.map(etape => `<li>${etape}</li>`).join('');

    openModal('modelConfirm');
}

function ajouterAuxFavoris(index) {
    const recetteFavori = recettes[index];

    let favoris = JSON.parse(localStorage.getItem('favoris')) || [];

    if (!favoris.some(r => r.nom === recetteFavori.nom)) {
        favoris.push(recetteFavori);
        localStorage.setItem('favoris', JSON.stringify(favoris));

        afficherToast('Recette ajoutée aux favoris!');
    } else {
        afficherToast('Cette recette est déjà dans vos favoris.');
    }
}

function afficherToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    toastMessage.textContent = message;  

    toast.classList.remove('hidden');
    toast.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-4');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 300);  
    }, 3000);  
}

window.openModal = function(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.classList.add('overflow-y-hidden');
};

window.closeModal = function(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.classList.remove('overflow-y-hidden');
};

document.onkeydown = function(event) {
    event = event || window.event;
    if (event.keyCode === 27) {
        document.body.classList.remove('overflow-y-hidden');
        document.getElementById('modelConfirm').style.display = 'none';
    }
};

function ajouterAListeDeCourses() {
    const checkboxes = document.querySelectorAll('.ingredient-checkbox:checked');
    
    const listeDeCourses = [];
    
    checkboxes.forEach(checkbox => {
        const ingredient = {
            nom: checkbox.getAttribute('data-nom'),
            quantite: checkbox.getAttribute('data-quantite')
        };
        listeDeCourses.push(ingredient);
    });
    
    let courses = JSON.parse(localStorage.getItem('liste_de_courses')) || [];
    courses = [...courses, ...listeDeCourses];
    
    localStorage.setItem('liste_de_courses', JSON.stringify(courses));
    
    afficherToast('Ingrédients ajoutés à votre liste de courses!');
}

document.getElementById('add-to-shopping-list').addEventListener('click', ajouterAListeDeCourses);


//autocompletion pour accéder à une recette via la barre de navigation
document.getElementById("search-button").addEventListener("click", function () {
    const searchQuery = document.getElementById("search-recette").value.toLowerCase().trim();

    // Charger le fichier JSON contenant les recettes
    fetch("../json/data.json")
        .then(response => response.json())
        .then(data => {
            // Trouver la recette correspondant à la recherche
            const recetteTrouvee = data.recettes.find(recette => recette.nom.toLowerCase() === searchQuery);

            if (recetteTrouvee) {
                // Rediriger vers l'ancre de la recette sur la page
                const recetteId = encodeURIComponent(recetteTrouvee.nom); // Encodage pour éviter les problèmes avec les caractères spéciaux
                window.location.href = `#${recetteId}`;
            } else {
                alert("Recette non trouvée !");
            }
        })
        .catch(error => console.error("Erreur de chargement des recettes :", error));
});