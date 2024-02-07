// Fonction recipesTemplate qui prend un objet de données en paramètre
function appareilsTemplate(recipes) {
    function fillDropdown() {
        const appareilsDropdown = document.getElementById('appareilsDropdown');
        appareilsDropdown.innerText = '';
        // Ajouter l'option statique pour le titre "appareils"
        const appareilsTitleOption = document.createElement('option');
        appareilsTitleOption.textContent = 'Appareils';
        appareilsDropdown.appendChild(appareilsTitleOption);
        let optionTemp = [];
        // Ajouter chaque appareil au dropdown
        recipes.forEach(recipe => {
            const option = document.createElement('option');
            option.textContent = recipe.appliance;
            option.value = recipe.appliance;
           if (!optionTemp.includes(option.value.toLowerCase())) {
                appareilsDropdown.appendChild(option);
                optionTemp.push(option.value.toLowerCase());
           }

        });
    }
    return { fillDropdown };
}