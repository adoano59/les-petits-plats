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

};
displayRecipes(recipes);
updateListFilter(recipes);
// Fonction de recherche
function rechercherRecettes(rechercheTerm) {
    // Filtrer les recettes en fonction du terme de recherche
    const term = rechercheTerm.toLowerCase();
    const resultats = recipes.filter(recette =>
        recette.name.toLowerCase().includes(term) ||
        recette.ingredients.find(ingredient => typeof ingredient === 'string' && ingredient.toLowerCase().includes(term)) ||
        recette.description.toLowerCase().includes(term)
        //|| ustensilsCliked.length >0 && recette.ustensils.some(u=> ustensilsClicked.includes(u))
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

};


// Événement de saisie dans le champ de recherche
const champRecherche = document.getElementById('champ-recherche'); // Supposez que 'champ-recherche' est l'ID de votre champ de recherche
//a l'entree de l'input 
champRecherche.addEventListener("focusin", () => {
    if (champRecherche.value === `Rechercher une recette, un ingrédient, ...`) {

        champRecherche.value = ""
    }
});
//a la sortie de l'input 
champRecherche.addEventListener("focusout", () => {
    if (champRecherche.value === ``) {

        champRecherche.value = "Rechercher une recette, un ingrédient, ..."
    }
});
champRecherche.addEventListener('input', () => {
    const saisieUtilisateur = champRecherche.value.trim();
    if (saisieUtilisateur.length >= 3) { // Filtre les recherches à partir de 3 caractères
        rechercherRecettes(saisieUtilisateur);
    } else {
        // Si la saisie est inférieure à trois caractères, afficher toutes les recettes
        displayRecipes(recipes);
        updateListFilter(recipes);
        const nombreRecettesAffichees = recipes.length;
        const nombreRecettesElement = document.querySelector(".nombre-recette");
        nombreRecettesElement.innerText = +`${nombreRecettesAffichees}` + ` recettes`;
    }
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
// Tableau pour stocker les valeurs sélectionnées
let selectedValues = [];
ustensilesDropdown.addEventListener('change', event => {
    const selectedUstensil = event.target.value;
    addChip(selectedUstensil);
});

appareilsDropdown.addEventListener('change', event => {
    const selectedAppareil = event.target.value;
    addChip(selectedAppareil);
});

ingredientsDropdown.addEventListener('change', event => {
    const selectedIngredient = event.target.value;
    addChip(selectedIngredient);
});
function addChip(value) {
    // Vérifier si la valeur est déjà présente dans le tableau
    if (!selectedValues.includes(value)) {
        const chip = document.createElement('div');
        chip.textContent = value;
        chip.innerHTML += `<i class="fa-solid fa-xmark"></i>`;
        chipsSection.appendChild(chip);
        // Ajouter la valeur au tableau
        selectedValues.push(value);
        chip.querySelector('.fa-xmark').addEventListener('click', () => {
            chip.remove();
            // Retirer la valeur du tableau selectedValues
            const index = selectedValues.indexOf(value);
            if (index !== -1) {
                selectedValues.splice(index, 1);
            }

        });
    };



};
