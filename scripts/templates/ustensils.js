// Fonction recipesTemplate qui prend un objet de données en paramètre
function ustensilsTemplate(recipes) {
    function fillDropdown() {
        const ustensilesDropdown = document.getElementById('ustensilsDropdown');
        ustensilesDropdown.innerText = '';
        // Ajouter l'option statique pour le titre "Ustensils"
        const ustensilsTitleOption = document.createElement('option');
        ustensilsTitleOption.textContent = 'Ustensils';
        ustensilesDropdown.appendChild(ustensilsTitleOption);
        let optionTemp = [];
        // Ajouter chaque ustensile au dropdown
        recipes.forEach(r => r.ustensils.forEach(ustensil => {
            const option = document.createElement('option');
            option.textContent = ustensil;
            option.value = ustensil;
            if (!optionTemp.includes(option.value.toLowerCase())) {
                ustensilesDropdown.appendChild(option);
                optionTemp.push(option.value.toLowerCase());
            }

        }));
      
    }
     return { fillDropdown };
};