const chest = document.querySelector("#header__chest");
const headerHeight = document.querySelector("#header").clientHeight;
const themeList = document.querySelector("#main__theme_list");
const profilePictureInput = document.querySelector("#settings_container__settings__profile_picture > form > input[type=file]");
const profilePictureSubmitButton = document.querySelector("#settings_container__settings__profile_picture > form > input[type=submit]");
const usernameEditButton = document.querySelectorAll("#settings_container__settings__username__button")[0];
const passwordEditButton = document.querySelectorAll("#settings_container__settings__password__button")[0];
const emailEditButton = document.querySelectorAll("#settings_container__settings__email__button")[0];
const firstnameEditButton = document.querySelectorAll("#settings_container__settings__first_name__button")[0];
const lastnameEditButton = document.querySelectorAll("#settings_container__settings__last_name__button")[0];

if  (themeList !== null) {
    themeList.style.top = "calc(" + headerHeight + "px + 1em)";
    themeList.style.visibility = "hidden";
    themeList.style.height = "0px";
    
    chest.addEventListener("click", (event) => {
        if (themeList.style.height === "0px") {
            themeList.style.visibility = "visible";
            themeList.style.height = "calc(100vh - (" + headerHeight + "px + 2em))";
        } else {
            themeList.style.visibility = "hidden";
            themeList.style.height = "0px";
        }
    });

    (async function loadThemes() {
            await fetch('script_php/get_themes.php', {}).then((response) => {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().then((json) => {
                        if (response.ok) {
                            json.themes.forEach((theme) => {
                                const themeId = theme.id;
                                const themeTitle = theme.title;
                                const themeColor = theme.color;
                                createListThemeHtml(themeId, themeTitle, themeColor);
                            });
                        }
                    });
                } else {
                    console.error("Missing JSON header.");
                }
            });
        }
    )();
}

function createListThemeHtml(id, title, color) {
    const themeId = id;
    const themeTitle = title;
    const themeColor = color;

    const div = document.createElement("div");
    const button = document.createElement("button");
    const p = document.createElement("p");

    div.classList.add("main__theme_list__theme");
    div.id = themeId;
    div.style.backgroundColor = themeColor;

    button.innerHTML = "<img src='images/add.png' alt='add'>";
    button.id = "main__theme_list__theme__button"

    p.textContent = themeTitle;

    div.appendChild(p);
    div.appendChild(button);

    themeList.appendChild(div);

    button.addEventListener("click", (event) => {
        const contextMenu = document.querySelector(".context-option");
        const element = (contextMenu.nodeName === "DIV" ? contextMenu.lastElementChild.cloneNode(true) : contextMenu.nextElementSibling.cloneNode(true));
        const tdTheme = new todoTheme(element, themeId, themeTitle, themeColor);

        div.remove();
        root.append(element);
    });
}

if (profilePictureInput !== null) {
    profilePictureInput.addEventListener("change", () => {
        console.log("change event");
        if (profilePictureSubmitButton.style.display === "none") {
            profilePictureSubmitButton.style.display = "block";
        }
    });

    usernameEditButton.addEventListener("click", () => {
        const usernameTemp = usernameEditButton.parentElement.querySelector("p").textContent;
        const usernameP = usernameEditButton.parentElement.querySelector("p");
        // usernameEditButton.parentElement.querySelector("p").remove();
        const input = document.createElement("input");
        input.type = "text";
        usernameP.innerHTML = "";
        usernameP.appendChild(input)

    });
}
