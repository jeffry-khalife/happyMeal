document.addEventListener("DOMContentLoaded", function() {
    let recettes = [];

    fetch("../json/data.json")
        .then(response => response.json())
        .then(data => {
            recettes = data.recettes;
        });

    function autocomplete(input, datalistId) {
        let datalist = document.getElementById(datalistId);
        input.addEventListener("input", function() {
            let value = this.value.toLowerCase();
            datalist.innerHTML = "";
            if (value.length > 1) {
                recettes.forEach(recette => {
                    let recetteNom = recette.nom.toLowerCase();
                    if (recetteNom.includes(value)) {
                        let option = document.createElement("option");
                        option.value = recette.nom;
                        datalist.appendChild(option);
                    }
                });
            }
        });
    }

    //c'est pour appliquer l'autocomplétion au champ de recherche
    autocomplete(document.getElementById("search-recette"), "recettes-list");
});