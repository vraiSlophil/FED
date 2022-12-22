function toggleVisibilityNicknameEdit(){
    const element = document.getElementById("nicknameedit");

    if (element.classList.contains("hide")){
        element.classList.remove("hide");
        element.classList.add("show");
    } else {
        element.classList.remove("show");
        element.classList.add("hide");
    }
    
}

function toggleVisibilityPasswordEdit(){
    const element = document.getElementById("passwordedit");

    if (element.classList.contains("hide")){
        element.classList.remove("hide");
        element.classList.add("show");
    } else {
        element.classList.remove("show");
        element.classList.add("hide");
    }
    
}

function toggleVisibilityEmailEdit() {
    const element = document.getElementById("emailedit");

    if (element.classList.contains("hide")){
        element.classList.remove("hide");
        element.classList.add("show");
    } else {
        element.classList.remove("show");
        element.classList.add("hide");
    }
}

const cards = document.querySelectorAll('#main__card');

cards.forEach((card) => {
    // Récupère les boutons de modification et de validation, ainsi que le titre de la carte
    const editButton = card.querySelector('#main__card__header__edit_button');
    const validateButton = card.querySelector('#main__card__header__validate_button');
    const addPeopleButton = card.querySelector('#main__card__header__add_people_button');
    const toggleButton = card.querySelector('#main__card__header__toggle_button');
    const cardTitle = card.querySelector('#main__card__header h3');
    const cardContent = card.querySelector('#main__card__content');

    toggleButton.addEventListener('click', () => {
        if (cardContent.style.display === 'flex') {
            cardContent.style.display = 'none';
            toggleButton.innerHTML = '▾';
            // Masque le bouton de validation de l'ajout de personnes et affiche le bouton d'ajout de personnes
            // si aucun champ d'édition du titre ou d'ajout de personne n'est présent
            if (cardTitle.querySelector('input[type="text"]') == null) {
                addPeopleButton.style.display = 'block';
            }
        } else {
            cardContent.style.display = 'flex';
            toggleButton.innerHTML = '◂';
            // Masque le bouton d'ajout de personnes et affiche le bouton de validation de l'ajout de personnes
            // si aucun champ d'édition du titre ou d'ajout de personne n'est présent
            if (cardTitle.querySelector('input[type="text"]') == null) {
                addPeopleButton.style.display = 'none';
            }
        }
    });

    editButton.addEventListener('click', () => {
        // Masque le bouton de modification et affiche le bouton de validation
        editButton.style.display = 'none';
        validateButton.style.display = 'block';

        // Remplace le titre par un champ de saisie
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Nouveau titre';
        input.setAttribute("class", "editTitle");
        input.value = cardTitle.textContent;
        cardTitle.textContent = '';
        cardTitle.appendChild(input);
    });

    validateButton.addEventListener('click', () => {
        // Masque le bouton de validation et affiche le bouton de modification
        validateButton.style.display = 'none';
        editButton.style.display = 'inline-block';

        // Récupère la valeur du champ de saisie et l'affiche dans le titre
        const input = cardTitle.querySelector('input');
        cardTitle.textContent = input.value;
    });
    
    addPeopleButton.addEventListener('click', () => {
        // Masque le bouton d'ajout de personnes et affiche le bouton de validation de l'ajout de personnes
        addPeopleButton.style.display = 'none';
        validateButton.style.display = 'inline-block';

        // Remplace le titre par un champ de saisie
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Nom d\'utilisateur';
        input.setAttribute("class", "addPeople");
        cardTitle.textContent = '';
        cardTitle.appendChild(input);
    });

    validateButton.addEventListener('click', () => {
        // Récupère la valeur du champ de saisie
        const username = input.value;

        // Envoie la valeur du champ de saisie au fichier "add_people.php" en utilisant une requête AJAX
        $.ajax({
            url: 'add_people.php',
            type: 'POST',
            data: {username: username},
            success: function(response) {
                // Supprime le champ de saisie
                input.parentNode.removeChild(input);
                // Remplace le bouton de validation de l'ajout de personnes par un bouton d'ajout de personnes
                const newAddPeopleButton = document.createElement('button');
                newAddPeopleButton.id = 'main__card__header__add_people_button';
                newAddPeopleButton.textContent = 'Ajouter des personnes';
                validateButton.parentNode.replaceChild(newAddPeopleButton, validateButton);
            }
        });
    });


});

$(document).ready(function(){

});
