let todoThemeDict = {};
let todoTaskDict = {};

class todoTheme {

    constructor(theme, id = null, title = null) {
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

        this.theme.setAttribute("draggable", true);

        this.theme.addEventListener("dragend", (event) => {
            if (selected != null) {
                this.theme.style.display = "flex";
                const x = (event.clientX - selectedX);
                const y = (event.clientY - selectedY);
                this.theme.style.transform = `translate(${x}px, ${y}px)`;
                this.theme.style.filter = "unset";
                selected = null;
            }
        });

        this.theme.addEventListener("dragstart", (event) => {
            this.theme.style.display = "none";
            let img = new Image();
            img.src = selected.src;
            event.dataTransfer.setDragImage(img, 0, 0);
        });


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
            const x = document.querySelector("body").clientWidth / 2 - (document.querySelector("body").clientWidth / 2 % 20);
            const y = document.querySelector("body").clientHeight / 2 - (document.querySelector("body").clientHeight / 2 % 20);

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
                                    const taskStatus = task.status;

                                    const child = createTaskHtml(taskTitle, taskId);
                                    new todoTask(child, this, taskId, taskTitle, taskStatus);

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

    toggleContentClick() {
        if (this.content.style.display === "flex" && this.OPENED) {
            this.OPENED = false;
            this.content.style.display = "none";
            this.toggleContentButton.querySelector("img").style.transform = "scaleY(1)";
            if (this.INVITING || this.EDITING) {
                return;
            }
            this.editButton.style.display = "none";
            this.addPeopleButton.style.display = "flex";
        } else {
            this.OPENED = true;
            this.content.style.display = "flex";
            this.toggleContentButton.querySelector("img").style.transform = "scaleY(-1)";
            if (this.INVITING || this.EDITING) {
                return;
            }
            this.editButton.style.display = "flex";
            this.addPeopleButton.style.display = "none";
        }
    }

    deleteClick(bool = false) {

         function del() {
            this.theme.remove();

             delete todoThemeDict[this.id];
             delete this.id;
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

        if (bool) {
            del();
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
                            del();
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
                this.validateButton.style.display = "none";
                this.editButton.style.display = "flex";
                const newTitle = input.value;
                fetch('script_php/edit_theme.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        theme_id: this.id,
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
                                    this.title.textContent = this.titleString;
                                } else {
                                    this.title.textContent = input.value;
                                    input.remove();
                                    this.titleString = this.title.textContent;
                                }
                            }
                        });
                    } else {
                        console.error("Missing JSON header.");
                    }
                });
                this.EDITING = false;
            }
        } else if (this.INVITING) {
            const input = this.title.querySelector("input");
            if (input.value.trim()) {
                this.validateButton.style.display = "none";
                this.addPeopleButton.style.display = "flex";
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
                                }
                            }
                        });
                    } else {
                        console.error("Missing JSON header.");
                    }
                });
                input.remove();
                this.title.textContent = this.titleString;
                this.INVITING = false;
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

    get getId() {
        return this.id;
    }

    get getTitle() {
        return this.title.textContent;
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

    deleteClick(bool = false) {

        function del() {
            this.task.remove();

            delete todoTaskDict[this.id];
            delete this.task;
            delete this.parentTheme;
            delete this.id;
            delete this.status;
            delete this.checkbox;
            delete this.taskTitle;
            delete this.taskEditButton;
            delete this.taskValidateButton;
            delete this.taskDeleteButton;
            delete this.taskTitleString;
            delete this.EDITING;
        }

        if (bool) {
            del();
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
                                del();
                            }
                        }
                    });
                } else {
                    console.error("Missing JSON header.");
                }
            });
    }

    checkboxClick() {
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