function displayRecipes(recipes) {
    const sectionFiches = document.querySelector(".recipes_section");
    // Supprimer tous les enfants de la section pour vider l'affichage
    sectionFiches.innerHTML = '';
    for (let i = 0; i < recipes.length; i++) {
        const carte = recipes[i];
        const recetteModel = recipesTemplate(carte);
        const ficheElement = recetteModel.createrecipesCard();
        sectionFiches.appendChild(ficheElement);

    }
    const nombreRecettesAffichees = recipes.length;
    const nombreRecettesElement = document.querySelector(".nombre-recette");
    nombreRecettesElement.innerText = +`${nombreRecettesAffichees}` + ` recettes`;

};
displayRecipes(recipes);
updateListFilter(recipes);

let selectedUstensils = []
let selectedIngredients = []
let selectedAppareils = []


// Événement de saisie dans le champ de recherche
const champRecherche = document.getElementById('champ-recherche');


// Fonction de recherche
function searchRecipes() {
    const rechercheTerm = champRecherche.value.trim();
    // Filtre les recherches à partir de 3 caractères
    if (rechercheTerm.length >= 3 || selectedIngredients.length > 0 || selectedAppareils.length > 0 || selectedUstensils.length > 0) { 
        // Filtrer les recettes en fonction du terme de recherche
        const term = rechercheTerm.toLowerCase();
        const resultats = recipes.filter(recette =>
            (recette.name.toLowerCase().includes(term) ||
                recette.ingredients.find(ingredient => typeof ingredient === 'string' && ingredient.toLowerCase().includes(term)) ||
                recette.description.toLowerCase().includes(term))
            && (selectedIngredients.length <= 0 || selectedIngredients.length > 0 && recette.ingredients.some(i => selectedIngredients.includes(i.ingredient.toLowerCase())))
            && (selectedUstensils.length <= 0 || selectedUstensils.length > 0 && recette.ustensils.some(u => selectedUstensils.includes(u.toLowerCase())))
            && (selectedAppareils.length <= 0 || selectedAppareils.length > 0 && selectedAppareils.includes(recette.appliance.toLowerCase()))
        );
        // Afficher les résultats de la recherche
        displayRecipes(resultats);
        updateListFilter(resultats);
        const nombreRecettesAffichees = resultats.length;
        const nombreRecettesElement = document.querySelector(".nombre-recette");
        if (nombreRecettesAffichees < 2) {
            nombreRecettesElement.innerText = +`${nombreRecettesAffichees}` + ` recette`;
        } else
            nombreRecettesElement.innerText = +`${nombreRecettesAffichees}` + ` recettes`;
    } else {
        // Si la saisie est inférieure à trois caractères, afficher toutes les recettes
        displayRecipes(recipes);
        updateListFilter(recipes);
        const nombreRecettesAffichees = recipes.length;
        const nombreRecettesElement = document.querySelector(".nombre-recette");
        nombreRecettesElement.innerText = +`${nombreRecettesAffichees}` + ` recettes`;
    }

};


champRecherche.addEventListener('input', () => {
    searchRecipes();
});

function updateListFilter(recipes) {
    const appareilModel = appareilsTemplate(recipes);
    const appareilElement = appareilModel.fillDropdown();
    const ustensilModel = ustensilsTemplate(recipes);
    const ustensilElement = ustensilModel.fillDropdown();
    const ingredientModel = ingredientsTemplate(recipes);
    const ingredientElement = ingredientModel.fillDropdown();


};
const ingredientsDropdown = document.getElementById('ingredientsDropdown');
const appareilsDropdown = document.getElementById('appareilsDropdown');
const ustensilesDropdown = document.getElementById('ustensilsDropdown');
const chipsSection = document.getElementById('sectionChips');
chipsSection.innerHTML = '';
ustensilesDropdown.addEventListener('change', event => {
    const selectedUstensil = event.target.value;
    addChipUstensil(selectedUstensil);
    searchRecipes();
});

appareilsDropdown.addEventListener('change', event => {
    const selectedAppareil = event.target.value;
    addChipAppareil(selectedAppareil);
    searchRecipes();
});

ingredientsDropdown.addEventListener('change', event => {
    const selectedIngredient = event.target.value;
    addChipIngredient(selectedIngredient);
    searchRecipes();
});

function addChipUstensil(value) {
    // Vérifier si la valeur est déjà présente dans le tableau
    if (!selectedUstensils.includes(value)) {
        const chip = document.createElement('div');
        chip.textContent = value;
        chip.innerHTML += `<i class="fa-solid fa-xmark"></i>`;
        chipsSection.appendChild(chip);
        // Ajouter la valeur au tableau
        selectedUstensils.push(value.toLowerCase());
        chip.querySelector('.fa-xmark').addEventListener('click', () => {
            chip.remove();
            // Retirer la valeur du tableau selectedValues
            const indexU = selectedUstensils.indexOf(value.toLowerCase());
            if (indexU !== -1) {
                selectedUstensils.splice(indexU, 1);
                searchRecipes();
            }

        });
    };
};

function addChipIngredient(value) {
    // Vérifier si la valeur est déjà présente dans le tableau
    if (!selectedIngredients.includes(value)) {
        const chip = document.createElement('div');
        chip.textContent = value;
        chip.innerHTML += `<i class="fa-solid fa-xmark"></i>`;
        chipsSection.appendChild(chip);
        // Ajouter la valeur au tableau
        selectedIngredients.push(value.toLowerCase());
        chip.querySelector('.fa-xmark').addEventListener('click', () => {
            chip.remove();
            // Retirer la valeur du tableau selectedValues
            const indexI = selectedIngredients.indexOf(value.toLowerCase());
            if (indexI !== -1) {
                selectedIngredients.splice(indexI, 1);
                searchRecipes();
            }

        });
    };
};

function addChipAppareil(value) {
    // Vérifier si la valeur est déjà présente dans le tableau
    if (!selectedAppareils.includes(value)) {
        const chip = document.createElement('div');
        chip.textContent = value;
        chip.innerHTML += `<i class="fa-solid fa-xmark"></i>`;
        chipsSection.appendChild(chip);
        // Ajouter la valeur au tableau
        selectedAppareils.push(value.toLowerCase());
        chip.querySelector('.fa-xmark').addEventListener('click', () => {
            chip.remove();
            // Retirer la valeur du tableau selectedValues
            const indexA = selectedAppareils.indexOf(value.toLowerCase());
            if (indexA !== -1) {
                selectedAppareils.splice(indexA, 1);
                searchRecipes();
            }

        });

    };
};
