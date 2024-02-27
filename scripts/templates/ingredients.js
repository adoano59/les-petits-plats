// Fonction recipesTemplate qui prend un objet de données en paramètre
function ingredientsTemplate(recipes) {
    function fillDropdown() {
        const ingredientsDropdown = document.getElementById('ingredientsDropdown');
        ingredientsDropdown.innerText = '';
        // Ajouter l'option statique pour le titre "ingredients"
        const ingredientsTitleOption = document.createElement('option');
        ingredientsTitleOption.textContent = 'Ingredients';
        ingredientsDropdown.appendChild(ingredientsTitleOption);
        let optionTemp = [];
        // Ajouter chaque ingredient au dropdown
        recipes.forEach(r => r.ingredients.forEach(e =>{
            const option = document.createElement('option');
            option.textContent = e.ingredient;
            option.value = e.ingredient;
            if (!optionTemp.includes(option.value.toLowerCase())) {
                ingredientsDropdown.appendChild(option);
                optionTemp.push(option.value.toLowerCase());

            }

        }));
    }
    return { fillDropdown };
};