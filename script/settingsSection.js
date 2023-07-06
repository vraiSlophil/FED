class Settings {
    constructor() {
        this.profilePictureImage = document.querySelector("#settings_container__settings__profile_picture > img");
        this.profilePictureInput = document.querySelector("#settings_container__settings__profile_picture > form > input[type=file]");
        this.profilePictureSubmitButton = document.querySelector("#settings_container__settings__profile_picture > form > input[type=submit]");
        this.usernameEditButton = document.querySelector("#settings_container__settings__username__edit_button");
        this.passwordEditButton = document.querySelector("#settings_container__settings__password__edit_button");
        this.emailEditButton = document.querySelector("#settings_container__settings__email__edit_button");
        this.firstnameEditButton = document.querySelector("#settings_container__settings__first_name__edit_button");
        this.lastnameEditButton = document.querySelector("#settings_container__settings__last_name__edit_button");
        this.usernameValidateButton = document.querySelector("#settings_container__settings__username__validate_button");
        this.passwordValidateButton = document.querySelector("#settings_container__settings__password__validate_button");
        this.emailValidateButton = document.querySelector("#settings_container__settings__email__validate_button");
        this.firstnameValidateButton = document.querySelector("#settings_container__settings__first_name__validate_button");
        this.lastnameValidateButton = document.querySelector("#settings_container__settings__last_name__validate_button");

        this.passwordDialog = document.querySelector("#password_dialog");
        this.passwordDialogCloseButton = document.querySelector("#password_dialog__form__cancel_button");



        this.profilePictureInput.addEventListener("change", () => {
            const [file] = this.profilePictureInput.files;
            if (file) {
                this.profilePictureImage.src = URL.createObjectURL(file);
                this.profilePictureSubmitButton.style.display = "flex";
            }
        });

        this.usernameEditButton.addEventListener("click", () => {
            this.usernameEditButtonClick();
        });

        this.usernameValidateButton.addEventListener("click", () =>  {
           this.usernameValidateButtonClick();
        });

        this.passwordEditButton.addEventListener("click", () => {
            if (typeof this.passwordDialog.showModal === "function") {
                this.passwordDialog.showModal();
            } else {
                console.error("L'API <dialog> n'est pas prise en charge par ce navigateur.");
            }
        });

        this.passwordDialogCloseButton.addEventListener("click", () => {
            this.passwordDialog.close();
        });

    }

    usernameEditButtonClick() {
        const parentNode = this.usernameEditButton.parentNode;
        const p = parentNode.querySelector("p");
        const pContent = p.textContent;
        const input = document.createElement("input");

        input.type = "text";
        p.innerHTML = "<p style='display: none;'>" + pContent + "</p>";
        p.appendChild(input);

        this.usernameValidateButton.style.display = "flex";
    }


    usernameValidateButtonClick() {
        const parentNode = this.usernameValidateButton.parentNode;
        const p = parentNode.querySelector("p");
        const input = parentNode.querySelector("p > input");
        const newUsername = input.value;

        function error(error) {
            console.error(error);
            p.textContent = p.querySelector("p").textContent;
        }

        fetch('script_php/edit_account.php', {
            method: 'POST', body: JSON.stringify({
                newUsername: newUsername
            })
        }).then((response) => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then((json) => {
                    if (response.ok) {
                        if (!json.done) {
                            error(json.error);
                        } else {
                            p.textContent = newUsername;
                        }
                    }
                });
            } else {
                error("Missing JSON header.");
            }
        });
        this.usernameValidateButton.style.display = "none";
    }
}
