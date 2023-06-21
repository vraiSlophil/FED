class Settings {
    constructor() {
        this.profilePictureImage = document.querySelector("#settings_container__settings__profile_picture > img");
        this.profilePictureInput = document.querySelector("#settings_container__settings__profile_picture > form > input[type=file]");
        this.profilePictureSubmitButton = document.querySelector("#settings_container__settings__profile_picture > form > input[type=submit]");
        this.usernameEditButton = document.querySelector("#settings_container__settings__username__button");
        this.passwordEditButton = document.querySelector("#settings_container__settings__password__button");
        this.emailEditButton = document.querySelector("#settings_container__settings__email__button");
        this.firstnameEditButton = document.querySelector("#settings_container__settings__first_name__button");
        this.lastnameEditButton = document.querySelector("#settings_container__settings__last_name__button");


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
    }

    usernameEditButtonClick() {
        const parentNode = this.usernameEditButton.parentNode;
        const p = parentNode.querySelector("p");
        const pContent = p.textContent;
        let input = document.createElement("input");

        input.type = "text";
        p.textContent = null;
        p.appendChild(input);


    }



    // passwordEditButtonClick() {
    //     console.log("passwordEditButtonClick");
    // }






}