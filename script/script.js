const chest = document.querySelector("#header__chest");
const headerHeight = document.querySelector("#header").clientHeight;
const themeList = document.querySelector("#main__theme_list");

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

(async function loadThemes() {
        await fetch('script_php/get_themes.php', {}).then((response) => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then((json) => {
                    if (response.ok) {
                        json.themes.forEach((theme) => {
                            const themeId = theme.id;
                            const themeTitle = theme.title;

                            const div = document.createElement("div");
                            const button = document.createElement("button");
                            const p = document.createElement("p");

                            div.classList.add("main__theme_list__theme");
                            div.id = themeId;

                            button.innerHTML = "<img src='images/add.png' alt='add'>";
                            button.id = "main__theme_list__theme__button"

                            p.textContent = themeTitle;

                            div.appendChild(p);
                            div.appendChild(button);

                            themeList.appendChild(div);

                            button.addEventListener("click", (event) => {
                                const contextMenu = document.querySelector(".context-option");
                                const element = (contextMenu.nodeName === "DIV" ? contextMenu.lastElementChild.cloneNode(true) : contextMenu.nextElementSibling.cloneNode(true));
                                const tdTheme = new todoTheme(element, id = themeId, title = themeTitle);

                                div.parentNode.removeChild(div);
                                root.append(element);
                            });
                        });
                    }
                });
            } else {
                console.error("Missing JSON header.");
            }
        })
    }
)();