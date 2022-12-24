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

class todoTheme {

    constructor(theme) {
        this.theme = theme;
        this.editButton = this.theme.querySelector("#main__card__header__edit_button");
        this.validateButton = this.theme.querySelector("#main__card__header__validate_button");
        this.addPeopleButton = this.theme.querySelector("#main__card__header__add_people_button");
        this.toggleContentButton = this.theme.querySelector("#main__card__header__toggle_content_button");
        this.deleteButton = this.theme.querySelector("#main__card__header__delete_button");
        this.title = this.theme.querySelector("#main__card__header__title");
        this.content = this.theme.querySelector("#main__card__content");
        this.contentTasksParent = this.content.querySelector("#main__card__content__tasks");
        this.contentTasksChildren = this.contentTasksParent.querySelectorAll("#main__card__content__tasks__task");
        this.contentButtons = this.content.querySelector("#main__card__content__interactive");
        this.contentNewTaskInput = this.contentButtons.querySelector("#main__card__content__interactive__input");
        this.contentNewTaskButton = this.contentButtons.querySelector("#main__card__content__interactive__add_task_button");

        this.titleString = this.title.textContent;

        this.OPENED = false;
        this.EDITING = false;
        this.INVITING = false;


        this.contentTasksChildren.forEach((child) => {
            const tdTask = new todoTask(child);

            tdTask.getTaskEditButton.addEventListener("click", () => {
                tdTask.editClick();
            });

            tdTask.getTaskValidateButton.addEventListener("click", () => {
                tdTask.validateClick();
            });

            tdTask.getTaskDeleteButton.addEventListener("click", () => {
                tdTask.deleteClick();
            });
        });
    }

    toggleContentClick() {
        if (this.content.style.display === "flex" && this.OPENED) {
            this.OPENED = false;
            this.content.style.display = "none";
            this.toggleContentButton.textContent = "▾";
            if (this.INVITING || this.EDITING) {
                return;
            }
            this.editButton.style.display = "none";
            this.addPeopleButton.style.display = "flex";
        } else {
            this.OPENED = true;
            this.content.style.display = "flex";
            this.toggleContentButton.textContent = "◂";
            if (this.INVITING || this.EDITING) {
                return;
            }
            this.editButton.style.display = "flex";
            this.addPeopleButton.style.display = "none";
        }
    }

    deleteClick() {

        this.theme.parentNode.removeChild(this.theme);

        delete this.theme;
        delete this.editButton;
        delete this.validateButton;
        delete this.addPeopleButton;
        delete this.toggleContentButton;
        delete this.deleteButton;
        delete this.title;
        delete this.content;
        delete this.contentTasksParent;
        delete this.contentTasksChildren;
        delete this.contentButtons;
        delete this.contentNewTaskInput;
        delete this.contentNewTaskButton;
        delete this.titleString;
        delete this.OPENED;
        delete this.EDITING;
        delete this.INVITING;
        delete this;
    }

    editClick() {
        this.EDITING = true;
        this.editButton.style.display = "none";
        this.validateButton.style.display = "flex";

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Nouveau titre";
        input.setAttribute("class", "editTitle");
        input.value = this.title.textContent;

        this.title.textContent = "";
        this.title.appendChild(input);
    }

    validateClick() {
        if (this.EDITING) {
            this.validateButton.style.display = "none";
            this.editButton.style.display = "flex";
            const input = this.title.querySelector("input");
            if (input.value.trim()) {
                this.title.textContent = input.value;
                this.titleString = this.title.textContent;
            }
            this.EDITING = false;
        } else if (this.INVITING) {
            this.validateButton.style.display = "none";
            this.addPeopleButton.style.display = "flex";
            const input = this.title.querySelector("input");
            if (input.value.trim()) {
                const username = input.value;
                $.ajax({
                    url: "add_people.php",
                    type: "POST",
                    data: {username: username},
                    success: function(response) {
                        //todo
                    }
                });
            }
            this.title.textContent = this.titleString;
            this.INVITING = false;
        }
        if (this.OPENED) {
            this.toggleContentClick();
        }
    }

    invitePeopleClick() {
        this.INVITING = true
        this.addPeopleButton.style.display = "none";
        this.validateButton.style.display = "flex";
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Nom d\"utilisateur";
        input.setAttribute("class", "addPeople");
        this.title.textContent = "";
        this.title.appendChild(input);
    }

    newTaskClick() {
        if (this.contentNewTaskInput.value.trim()) {
            const div = document.createElement("div");

            const p = document.createElement("p");

            const editButton = document.createElement('button');
            editButton.id = 'main__card__content__tasks__task__edit_button';
            editButton.innerHTML = '<img src="images/edit.png" alt="edit task content">';

            const validateButton = document.createElement('button');
            validateButton.id = 'main__card__content__tasks__task__validate_button';
            validateButton.style.display = 'none';
            validateButton.innerHTML = '<img src="images/check.png" alt="validate task">';

            const deleteButton = document.createElement('button');
            deleteButton.id = 'main__card__content__tasks__task__delete_button';
            deleteButton.innerHTML = '<img src="images/poubelle.png" alt="delete task">';

            div.setAttribute("id", "main__card__content__tasks__task");
            p.textContent = this.contentNewTaskInput.value;
            div.appendChild(p);
            div.appendChild(editButton);
            div.appendChild(validateButton);
            div.appendChild(deleteButton);

            this.contentTasksParent.appendChild(div);
            this.contentNewTaskInput.value = "";

            const tdTask = new todoTask(div);

            tdTask.getTaskEditButton.addEventListener("click", () => {
                tdTask.editClick();
            });

            tdTask.getTaskValidateButton.addEventListener("click", () => {
                tdTask.validateClick();
            });

            tdTask.getTaskDeleteButton.addEventListener("click", () => {
                tdTask.deleteClick();
            });
        }
    }

    get getEditButton() {
        return this.editButton;
    }

    get getValidateButton() {
        return this.validateButton;
    }

    get getDeleteButton() {
        return this.deleteButton;
    }

    get getAddPeopleButton() {
        return this.addPeopleButton
    }

    get getToggleContentButton() {
        return this.toggleContentButton;
    }

    get getContentNewTaskButton() {
        return this.contentNewTaskButton;
    }

}

class todoTask {
    constructor(task) {
        this.task = task;

        this.taskTitle = this.task.querySelector("p");
        this.taskEditButton = this.task.querySelector("#main__card__content__tasks__task__edit_button");
        this.taskValidateButton = this.task.querySelector("#main__card__content__tasks__task__validate_button");
        this.taskDeleteButton = this.task.querySelector("#main__card__content__tasks__task__delete_button");

        this.taskTitleString = this.taskTitle.textContent;
        this.EDITING = false;
    }

    editClick() {
        this.taskEditButton.style.display = "none";
        this.taskValidateButton.style.display = "flex";
        const input = document.createElement("input");
        input.type = "text";
        input.value = this.taskTitleString;
        this.taskTitle.textContent = "";
        this.taskTitle.appendChild(input);
        this.EDITING = true;
    }

    validateClick() {
        if (this.EDITING) {
            const input = this.taskTitle.querySelector("input");
            this.taskTitle.textContent = input.value;
            this.taskTitleString = input.value;
            $.ajax({
                url: "edit_task.php",
                type: "POST",
                data: {title: this.taskTitleString},
                success: function(response) {
                    //todo
                }
            });
            this.taskValidateButton.style.display = "none";
            this.taskEditButton.style.display = "block";
            this.EDITING = false;
        }
    }

    deleteClick() {

        this.task.parentNode.removeChild(this.task);

        delete this.task;
        delete this.taskTitle;
        delete this.taskEditButton;
        delete this.taskValidateButton;
        delete this.taskDeleteButton;
        delete this.taskTitleString;
        delete this.OPENED;
        delete this.EDITING;
        delete this;
    }

    get getTaskEditButton() {
        return this.taskEditButton;
    }

    get getTaskValidateButton() {
        return this.taskValidateButton;
    }

    get getTaskDeleteButton() {
        return this.taskDeleteButton;
    }
}

const todoThemes = document.querySelectorAll("#main__card");

todoThemes.forEach((child) => {

    const tdTheme = new todoTheme(child);

    tdTheme.getToggleContentButton.addEventListener("click", () => {
        tdTheme.toggleContentClick();
    });

    tdTheme.getAddPeopleButton.addEventListener("click", () => {
        tdTheme.invitePeopleClick();
    });

    tdTheme.getDeleteButton.addEventListener("click", () => {
        tdTheme.deleteClick();
    });

    tdTheme.getEditButton.addEventListener("click", () => {
        tdTheme.editClick();
    });

    tdTheme.getValidateButton.addEventListener("click", () => {
        tdTheme.validateClick();
    });

    tdTheme.getContentNewTaskButton.addEventListener("click", () => {
        tdTheme.newTaskClick();
    });
});

$(document).ready(function(){

});
