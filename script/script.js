const chest = document.querySelector("#header__chest");

chest.addEventListener("click", (event) => {
    const target = document.querySelector("#main__theme_list");
    console.log(target);
    console.log(target.style.height);
    if (target.style.height === "88%") {
        target.style.visibility = "hidden";
        target.style.height = "0px";
    } else {
        target.style.visibility = "visible";
        target.style.height = "88%";
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

(
    fetch('script_php/get_themes.php', {})
    .then((response) => {
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
    })
)();