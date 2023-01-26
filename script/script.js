const chest = document.querySelector("#header__chest");
const headerHeight = document.querySelector("#header").clientHeight;
const themeList = document.querySelector("#main__theme_list");

let OVERTHEMELIST = false;
let OVERTHEMELISTCHILDID = null;

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
                            createListThemeHtml(themeId, themeTitle);
                        });
                    }
                });
            } else {
                console.error("Missing JSON header.");
            }
        })
    }
)();

// window.addEventListener("mousemove", () => {});

themeList.addEventListener("dragover", (event) => {
    event.preventDefault();
    if (selected === null) {
        console.log("pas selected");
        return;
    }
    if (OVERTHEMELIST) {
        return;
    }
    OVERTHEMELIST = true;
    console.log("selected");

    const selId = selected.id;

    for (let key in todoThemeDict) {
        if (key == selId) {
            OVERTHEMELISTCHILDID = selId;
            const title = todoThemeDict[key].getTitle;
            createListThemeHtml(selId, title);
        }
    }
});

themeList.addEventListener("drop", (event) => {
    event.preventDefault();
    themeList.appendChild(document.getElementById(selected));
    if (OVERTHEMELIST && selected != null) {
        themeList.getElementById(OVERTHEMELISTCHILDID.toString()).remove();
        OVERTHEMELIST = false;
        OVERTHEMELISTCHILDID = null;
    }
});

// themeList.addEventListener("mousemove", (event) => {
//
//     if (selected === null) {
//         console.log("pas selected");
//         return;
//     }
//
//     if (OVERTHEMELIST) {
//         return;
//     }
//
//     OVERTHEMELIST = true;
//     console.log("selected");
//
//     const selId = selected.id;
//
//     for (let key in todoThemeDict) {
//
//         if (key == selId) {
//             OVERTHEMELISTCHILDID = selId;
//             const title = todoThemeDict[key].getTitle;
//             createListThemeHtml(selId, title);
//         }
//     }
// });

// themeList.addEventListener("mouseout", () => {
//     // console.log("mouseout")
//     if (OVERTHEMELIST && selected != null) {
//         themeList.getElementById(OVERTHEMELISTCHILDID.toString()).remove();
//         OVERTHEMELIST = false;
//         OVERTHEMELISTCHILDID = null;
//     }
// });

function createListThemeHtml(id, title) {
    const themeId = id;
    const themeTitle = title;

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
        const tdTheme = new todoTheme(element, themeId, themeTitle);

        div.remove();
        root.append(element);
    });
}