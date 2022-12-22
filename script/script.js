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
let OPENED = false;
let EDITING = false;
let INVITING = false

cards.forEach((card) => {
    const editButton = card.querySelector('#main__card__header__edit_button');
    const validateButton = card.querySelector('#main__card__header__validate_button');
    const addPeopleButton = card.querySelector('#main__card__header__add_people_button');
    const toggleButton = card.querySelector('#main__card__header__toggle_button');
    const cardTitle = card.querySelector('#main__card__header__title');
    const cardContent = card.querySelector('#main__card__content');
    const tasksParent = cardContent.querySelector("#main__card__content__tasks");
    const interactiveParent = cardContent.querySelector("#main__card__content__interactive");
    const newTaskInput = interactiveParent.querySelector("#main__card__content__interactive__input");
    const newTaskButton = interactiveParent.querySelector("#main__card__content__interactive__add_task_button");
    let cardTitleString = cardTitle.textContent;
    toggleButton.addEventListener('click', () => {
        if (cardContent.style.display === 'flex' && OPENED) {
            OPENED = false;
            cardContent.style.display = 'none';
            toggleButton.textContent = '▾';
            if (INVITING || EDITING) {
                return;
            }
            editButton.style.display = "none";
            addPeopleButton.style.display = 'flex';
        } else {
            OPENED = true;
            cardContent.style.display = 'flex';
            toggleButton.textContent = '◂';
            if (INVITING || EDITING) {
                return;
            }
            editButton.style.display = "flex";
            addPeopleButton.style.display = 'none';
        }
    });
    editButton.addEventListener('click', () => {
        EDITING = true;
        editButton.style.display = 'none';
        validateButton.style.display = 'flex';
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Nouveau titre';
        input.setAttribute("class", "editTitle");
        input.value = cardTitle.textContent;
        cardTitle.textContent = '';
        cardTitle.appendChild(input);
    });
    validateButton.addEventListener('click', () => {
        validateButton.style.display = 'none';
        if (EDITING) {
            editButton.style.display = 'flex';
            const input = cardTitle.querySelector('input');
            if (input.value.trim()) {
                cardTitle.textContent = input.value;
                cardTitleString = cardTitle.textContent;
            }
            EDITING = false;
        } else if (INVITING) {
            addPeopleButton.style.display = 'flex';
            const input = cardTitle.querySelector('input');
            if (input.value.trim()) {
                const username = input.value;
                $.ajax({
                    url: 'add_people.php',
                    type: 'POST',
                    data: {username: username},
                    success: function(response) {
                        //todo
                    }
                });
            }
            cardTitle.textContent = cardTitleString;
            INVITING = false;
        }
        if (OPENED) {
            toggleButton.click();
        }
    });
    addPeopleButton.addEventListener('click', () => {
        INVITING = true
        addPeopleButton.style.display = 'none';
        validateButton.style.display = 'flex';
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Nom d\'utilisateur';
        input.setAttribute("class", "addPeople");
        cardTitle.textContent = '';
        cardTitle.appendChild(input);
    });
    newTaskButton.addEventListener('click', () => {
        if (newTaskInput.value.trim()) {
            const p = document.createElement('p');
            p.textContent = newTaskInput.value;
            tasksParent.appendChild(p);
            newTaskInput.value = '';
        }
    });
    tasksParent.querySelectorAll('#main__card__content__tasks__task').forEach((task) => {
        const taskEditButton = document.createElement('button');
        taskEditButton.textContent = 'Modifier';
        task.appendChild(taskEditButton);
        taskEditButton.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = task.querySelector("p").textContent;
            task.querySelector("p").textContent = '';
            task.querySelector("p").appendChild(input);
            taskEditButton.style.display = 'none';
            const taskValidateButton = document.createElement('button');
            taskValidateButton.textContent = 'Valider';
            task.appendChild(taskValidateButton);
            taskValidateButton.addEventListener('click', () => {
                task.querySelector("p").textContent = input.value;
                $.ajax({
                    url: 'edit_task.php',
                    type: 'POST',
                    data: {username: username},
                    success: function(response) {
                        //todo
                    }
                });
                taskValidateButton.style.display = 'none';
                taskEditButton.style.display = 'block';
            });
        });
    });
});

$(document).ready(function(){

});
