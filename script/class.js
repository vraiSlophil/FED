let todoThemeDict = {};
let todoTaskDict = {};

class todoTheme {

    constructor(theme, id = null, title = null, themeColor = "#FFFFFF") {
        this.theme = theme;
        this.header = this.theme.querySelector("#main__card__header");
        this.putInButton = this.theme.querySelector("#main__card__header__put_int_button");
        this.editButton = this.theme.querySelector("#main__card__header__edit_button");
        this.editColorButton = this.theme.querySelector("#main__card__header__edit_color_button");
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

        this.headerBackgroundColor = this.header.style.backgroundColor = themeColor;
        this.editColorButton.value = this.headerBackgroundColor;

        this.titleString = this.title.textContent;

        this.OPENED = false;
        this.EDITING = false;
        this.INVITING = false;

        this.id = id;
        if (this.id == null) {
            fetch('script_php/create_theme.php', {}).then((response) => {
                const contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().then((json) =>{
                        if (response.ok) {
                            try {
                                this.id = parseInt(json.id);
                                this.title.textContent = json.title.toString();
                                this.titleString = this.title.textContent;
                                this.theme.id = this.id;
                            } catch (error) {
                                console.error(json.error);
                            }
                        }
                    });
                } else {
                    console.error("Missing JSON header.");
                }
            });
        } else if (title != null && id != null) {
            const x = Math.floor((window.innerWidth - this.theme.offsetWidth) / 2);
            const y = Math.floor((window.innerHeight - this.theme.offsetHeight) / 2);

            this.title.textContent = title;
            this.titleString = title;
            this.id = id;
            this.theme.id = this.id;
            this.theme.style.transform = `translate(${x}px, ${y}px)`;

            fetch('script_php/get_tasks.php', {
                method: 'POST',
                body: JSON.stringify({theme_id: this.id})
            }).then((response) => {
                const contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().then((json) => {
                        if (response.ok) {
                            try {
                                json.tasks.forEach((task) => {
                                    const taskId = task.id;
                                    const taskTitle = task.title;
                                    const taskStatus = Boolean(task.status);

                                    const child = createTaskHtml(taskTitle, taskId);
                                    new todoTask(child, this, taskId, taskStatus);

                                    this.contentTasksParent.appendChild(child);
                                });
                            } catch (error) {
                                console.error(json.tasks.error);
                            }
                        }
                    });
                } else {
                    console.error("Missing JSON header.");
                }
            });
        }
        this.getPutInButton.addEventListener("click", () => {
            this.putInClick();
        });
        this.getToggleContentButton.addEventListener("click", () => {
            this.toggleContentClick();
        });
        this.getAddPeopleButton.addEventListener("click", () => {
            this.invitePeopleClick();
        });
        this.getDeleteButton.addEventListener("click", () => {
            this.deleteClick();
        });
        this.getEditButton.addEventListener("click", () => {
            this.editClick();
        });
        this.getValidateButton.addEventListener("click", () => {
            this.validateClick();
        });
        this.getContentNewTaskButton.addEventListener("click", () => {
            this.newTaskClick();
        });

        todoThemeDict[this.id] = this;

    }

    putInClick() {
        createListThemeHtml(this.id, this.titleString, this.headerBackgroundColor);
        this.deleteClick(true);
    }

    toggleContentClick() {
        if (this.content.style.display === "flex" && this.OPENED) {
            this.OPENED = false;
            this.content.style.display = "none";
            this.toggleContentButton.querySelector("img").style.transform = "scaleY(1)";
            if (this.INVITING || this.EDITING) {
                return;
            }
            this.editButton.style.display = "none";
            this.putInButton.style.display = "flex";
            this.addPeopleButton.style.display = "flex";
        } else {
            this.OPENED = true;
            this.content.style.display = "flex";
            this.toggleContentButton.querySelector("img").style.transform = "scaleY(-1)";
            if (this.INVITING || this.EDITING) {
                return;
            }
            this.editButton.style.display = "flex";
            this.putInButton.style.display = "none";
            this.addPeopleButton.style.display = "none";
        }
    }

    deleteClick(keepInDatabase = false) {
         function del(th) {
             th.theme.remove();

             delete todoThemeDict[th.id];
             delete th.id;
             delete th.theme;
             delete th.header;
             delete th.backgroundColor;
             delete th.editColorButton;
             delete th.putInButton;
             delete th.editButton;
             delete th.validateButton;
             delete th.addPeopleButton;
             delete th.toggleContentButton;
             delete th.deleteButton;
             delete th.title;
             delete th.content;
             delete th.contentTasksParent;
             delete th.contentTasksChildren;
             delete th.contentButtons;
             delete th.contentNewTaskInput;
             delete th.contentNewTaskButton;
             delete th.titleString;
             delete th.OPENED;
             delete th.EDITING;
             delete th.INVITING;
        }

        if (keepInDatabase) {
            del(this);
            delete this;
            return;
        }

        fetch('script_php/delete_theme.php', {
            method: 'POST',
            body: JSON.stringify({theme_id: this.id})
        })
        .then((response) => {
            const contentType = response.headers.get("content-type");
            if(contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then((json) =>{
                    if (response.ok) {
                        if (!json.done) {
                            console.error(json.error);
                        } else {
                            del(this);
                            delete this;
                        }
                    }
                });
            } else {
                console.error("Missing JSON header.");
            }
        });
    }

    editClick() {
        this.EDITING = true;
        this.editButton.style.display = "none";
        this.editColorButton.style.display = "flex";
        this.validateButton.style.display = "flex";

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Nouveau titre";
        input.value = this.title.textContent;

        this.title.textContent = "";
        this.title.appendChild(input);
    }

    validateClick() {
        if (this.EDITING) {
            const input = this.title.querySelector("input");
            if (input.value.trim()) {
                const newTitle = input.value;
                fetch('script_php/edit_theme.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        theme_id: this.id,
                        new_title: newTitle,
                        new_color: this.editColorButton.value
                    })
                }).then((response) => {
                    const contentType = response.headers.get("content-type");
                    if(contentType && contentType.indexOf("application/json") !== -1) {
                        return response.json().then((json) => {
                            if (response.ok) {
                                if (!json.done) {
                                    console.error(json.error);
                                } else {
                                    this.validateButton.style.display = "none";
                                    this.editColorButton.style.display = "none";
                                    this.editButton.style.display = "flex";
                                    this.title.textContent = input.value;
                                    this.headerBackgroundColor = this.header.style.backgroundColor = this.editColorButton.value;
                                    input.remove();
                                    this.titleString = this.title.textContent;
                                    this.EDITING = false;
                                }
                            }
                        });
                    } else {
                        console.error("Missing JSON header.");
                    }
                });
            }
        } else if (this.INVITING) {
            const input = this.title.querySelector("input");
            if (input.value.trim()) {
                const username = input.value;
                fetch('script_php/add_people.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        theme_id: this.id,
                        username: username
                    })
                }).then((response) => {
                    const contentType = response.headers.get("content-type");
                    if(contentType && contentType.indexOf("application/json") !== -1) {
                        return response.json().then((json) => {
                            if (response.ok) {
                                if (!json.done) {
                                    console.error(json.error);
                                } else {
                                    this.validateButton.style.display = "none";
                                    this.editColorButton.style.display = "none";
                                    this.addPeopleButton.style.display = "flex";
                                    input.remove();
                                    this.title.textContent = this.titleString;
                                    this.INVITING = false;
                                }
                            }
                        });
                    } else {
                        console.error("Missing JSON header.");
                    }
                });
            }
        }
    }

    invitePeopleClick() {
        this.INVITING = true
        this.addPeopleButton.style.display = "none";
        this.validateButton.style.display = "flex";
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Nom d\'utilisateur";
        this.title.textContent = "";
        this.title.appendChild(input);
    }

    newTaskClick(bool = false, title = null, done = false, id = null) {

        if (bool && title != null && id != null) {

            const parent = createTaskHtml(title, id);

        } else {
            if (this.contentNewTaskInput.value.trim()) {
                fetch('script_php/create_task.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        theme_id: this.id,
                        task_name: this.contentNewTaskInput.value
                    })
                }).then((response) => {
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.indexOf("application/json") !== -1) {
                        return response.json().then((json) => {
                            if (response.ok) {
                                if (!json.done) {
                                    console.error(json.error);
                                } else {
                                    const child = createTaskHtml(this.contentNewTaskInput.value, json.id);
                                    this.contentTasksParent.appendChild(child);
                                    this.contentNewTaskInput.value = "";

                                    new todoTask(child, this, json.id, this.contentNewTaskInput.value);
                                }
                            }
                        });
                    } else {
                        console.error("Missing JSON header.");
                    }
                });
            }
        }
    }

    get getPutInButton() {
        return this.putInButton;
    }

    get getEditButton() {
        return this.editButton;
    }

    get getEditColorButton() {
        return this.editColorButton;
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

    get getId() {
        return this.id;
    }

    get getTitle() {
        return this.title.textContent;
    }

    get getColor() {
        return this.headerBackgroundColor;
    }

}

class todoTask {
    constructor(task, parentTheme, id = null, done = false) {
        this.task = task;

        this.parentTheme = parentTheme;
        this.id = id;
        this.status = done;
        this.checkbox = this.task.querySelector("#main__card__content__tasks__task__checkbox");
        this.taskTitle = this.task.querySelector("p");
        this.taskEditButton = this.task.querySelector("#main__card__content__tasks__task__edit_button");
        this.taskValidateButton = this.task.querySelector("#main__card__content__tasks__task__validate_button");
        this.taskDeleteButton = this.task.querySelector("#main__card__content__tasks__task__delete_button");

        this.taskTitleString = this.taskTitle.textContent;
        this.checkbox.checked = this.status;

        if (this.status) {
            this.checkbox.checked = true;
            this.checkboxClick(false);
        }

        this.EDITING = false;

        this.getTaskEditButton.addEventListener("click", () => {
            this.editClick();
        });

        this.getTaskValidateButton.addEventListener("click", () => {
            this.validateClick();
        });

        this.getTaskDeleteButton.addEventListener("click", () => {
            this.deleteClick();
        });

        this.getCheckbox.addEventListener("click", () => {
            this.checkboxClick();
        });

        if (this.id == null) {
            this.getTaskDeleteButton.click();
        }

        todoTaskDict[this.id] = this;

    }

    editClick() {
        this.taskEditButton.style.display = "none";
        this.checkbox.style.display = "none";
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
            const newTitle = input.value;

            fetch('script_php/edit_task.php', {
                method: 'POST',
                body: JSON.stringify({
                    task_id: this.id,
                    new_title: newTitle
                })
            }).then((response) => {
                const contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().then((json) => {
                        if (response.ok) {
                            if (!json.done) {
                                console.error(json.error);
                                input.remove();
                                this.taskTitle.textContent = this.titleString;
                            } else {
                                this.taskTitle.textContent = input.value;
                                this.taskTitleString = input.value;
                                input.remove();
                            }
                        }
                    });
                } else {
                    console.error("Missing JSON header.");
                }
            });
            this.taskValidateButton.style.display = "none";
            this.taskEditButton.style.display = "flex";
            this.checkbox.style.display = "flex";
            this.EDITING = false;
        }
    }

    deleteClick(keepInDatabase = false) {

        function del(th) {
            th.task.remove();

            delete todoTaskDict[th.id];
            delete th.task;
            delete th.parentTheme;
            delete th.id;
            delete th.status;
            delete th.checkbox;
            delete th.taskTitle;
            delete th.taskEditButton;
            delete th.taskValidateButton;
            delete th.taskDeleteButton;
            delete th.taskTitleString;
            delete th.EDITING;
        }

        if (keepInDatabase) {
            del(this);
            delete this;
            return;
        }

        fetch('script_php/delete_task.php', {
            method: 'POST',
            body: JSON.stringify({task_id: this.id})
        })
            .then((response) => {
                const contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().then((json) =>{
                        if (response.ok) {
                            if (!json.done) {
                                console.error(json.error);
                            } else {
                                del(this);
                                delete this;
                            }
                        }
                    });
                } else {
                    console.error("Missing JSON header.");
                }
            });
    }

    checkboxClick(changeDatabase = true) {
        if (!changeDatabase) {
            this.taskTitle.style.textDecoration = "line-through";
            return;
        }
        if (this.checkbox.checked) {
            this.status = true;
            fetch('script_php/task_state.php', {
                method: 'POST',
                body: JSON.stringify({
                    task_id: this.id,
                    task_status: this.status
                })
            })
            .then((response) => {
                const contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().then((json) =>{
                        if (response.ok) {
                            if (!json.done) {
                                console.error(json.error);
                            } else {
                                this.taskTitle.style.textDecoration = "line-through";
                            }
                        }
                    });
                } else {
                    console.error("Missing JSON header.");
                }
            });
        } else {
            this.status = false;
            fetch('script_php/task_state.php', {
                method: 'POST',
                body: JSON.stringify({
                    task_id: this.id,
                    task_status: this.status
                })
            })
                .then((response) => {
                    const contentType = response.headers.get("content-type");
                    if(contentType && contentType.indexOf("application/json") !== -1) {
                        return response.json().then((json) =>{
                            if (response.ok) {
                                if (!json.done) {
                                    console.error(json.error);
                                } else {
                                    this.taskTitle.style.textDecoration = "none";
                                }
                            }
                        });
                    } else {
                        console.error("Missing JSON header.");
                    }
                });
        }
    }

    get getCheckbox() {
        return this.checkbox;
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

function createTaskHtml(title = "error", id = null) {
    const parent = document.createElement("div");
    parent.classList.add("main__card__content__tasks__task");
    parent.id = id;

    const child = document.createElement("div");

    const p = document.createElement("p");

    p.textContent = title;
    parent.appendChild(p);
    parent.appendChild(child);

    const input = document.createElement("input");
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

    input.type = "checkbox";
    input.setAttribute("id", "main__card__content__tasks__task__checkbox");

    child.appendChild(input);
    child.appendChild(editButton);
    child.appendChild(validateButton);
    child.appendChild(deleteButton);

    return parent;
}