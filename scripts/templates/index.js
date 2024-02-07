// Fonction recipesTemplate qui prend un objet de données en paramètre
function recipesTemplate(data) {
    // Destructuration de l'objet de données pour extraire les propriétés pertinentes

    const { id, image, name, servings, ingredients, time, description, appliance, ustensils } = data;
    // Fonction interne pour créer la carte de la recette
    function createrecipesCard() {
        // Création d'une balise dédiée à une fiche de la recette
        const ficheElement = document.createElement("div");
        ficheElement.className = ("recette-card");
        //box pour la photo de la recette
        const cardImg = document.createElement("section");
        cardImg.tabIndex = 0;
        //box pour les infos de la recette
        const cardInfo = document.createElement("section");
        cardInfo.className = ("info-recette");
        cardInfo.tabIndex = 0;
        // Création des balises pour les différentes informations de la recette
        const imageDiv = document.createElement("div");
        imageDiv.className = ("image-container");
        const imageElement = document.createElement("img");
        imageElement.className = ("photos-plat");
        imageElement.src = image;
        imageElement.alt = name;
        const timeElement = document.createElement("span");
        timeElement.className = ("time-plat");
        timeElement.innerText = time + `min`;
        imageDiv.appendChild(imageElement);
        imageDiv.appendChild(timeElement);
        const nomElement = document.createElement("h2");
        nomElement.innerText = name;
        const nomCategorie1 = document.createElement("h3");
        nomCategorie1.innerText = "RECETTE";
        const descriptionElement = document.createElement("span");
        descriptionElement.className = ("text-description");
        descriptionElement.innerText = description;
        const nomCategorie2 = document.createElement("h3");
        nomCategorie2.innerText = "INGREDIENTS";
        const ingredientListElement = document.createElement("div");
        ingredientListElement.className = "section-ingredient";
        ingredients.forEach(ingredient => {
            const ingredientItem = document.createElement("p");
            const ingredientName = document.createElement("span");
            ingredientName.className = ("ingredient-name");
            ingredientName.innerText = ingredient.ingredient;

            // Créer des éléments pour la quantité et l'unité
            if (ingredient.quantity && ingredient.unit) {
                const ingredientQuantity = document.createElement("span");
                ingredientQuantity.className = ("ingredient-quantity");
                ingredientQuantity.innerText = `${ingredient.quantity} ${ingredient.unit}`;

                // Ajouter la quantité et l'unité en tant qu'enfants de l'élément d'ingrédient
                ingredientItem.appendChild(ingredientName);
                ingredientItem.appendChild(document.createElement("br")); // Ajouter un saut de ligne
                ingredientItem.appendChild(ingredientQuantity);
            } else if (ingredient.quantity) {
                const ingredientQuantity = document.createElement("span");
                ingredientQuantity.className = ("ingredient-quantity");
                ingredientQuantity.innerText = ` ${ingredient.quantity}`;
                ingredientItem.appendChild(ingredientName);
                ingredientItem.appendChild(document.createElement("br"));
                ingredientItem.appendChild(ingredientQuantity);
            } else {
                ingredientItem.appendChild(ingredientName);
            }

            ingredientListElement.appendChild(ingredientItem);
        });



        // Ajout des éléments à la fiche du photographe
        cardImg.appendChild(imageDiv);
        cardInfo.appendChild(nomElement);
        cardInfo.appendChild(nomCategorie1);
        cardInfo.appendChild(descriptionElement);
        cardInfo.appendChild(nomCategorie2);
        cardInfo.appendChild(ingredientListElement);
        ficheElement.appendChild(cardImg);
        ficheElement.appendChild(cardInfo);

        // Retourne la fiche de la recette
        return ficheElement;
    }
    return { createrecipesCard };
}