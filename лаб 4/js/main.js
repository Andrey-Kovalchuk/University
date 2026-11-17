function toggleSubmenu() {
    var submenu = document.getElementById("activities-submenu");
    if (submenu.style.display === "block") {
        submenu.style.display = "none";
    } else {
        submenu.style.display = "block";
    }
}

function closeSubmenuOnOutsideClick(event) {
    var dropdown = document.getElementById("activities-dropdown");
    var submenu = document.getElementById("activities-submenu");
    if (dropdown && submenu && !dropdown.contains(event.target)) {
        submenu.style.display = "none";
    }
}

function updateNavLayout() {
    var nav = document.getElementById("main-nav");
    var header = document.getElementsByTagName("header")[0];
    var main = document.getElementsByTagName("main")[0];
    var submenu = document.getElementById("activities-submenu");
    var navGroups = document.getElementsByClassName("nav-group");
    var i;

    if (window.innerWidth <= 768) {
        nav.style.position = "fixed";
        nav.style.top = "0";
        nav.style.right = "0";
        nav.style.width = "190px";
        nav.style.maxHeight = "100vh";
        nav.style.overflowY = "auto";
        nav.style.backgroundColor = "#1e3a5f";
        nav.style.borderLeft = "3px solid #d4af37";
        nav.style.borderBottom = "3px solid #d4af37";
        nav.style.padding = "12px";
        nav.style.zIndex = "100";
        nav.style.display = "flex";
        nav.style.flexDirection = "column";
        nav.style.alignItems = "flex-end";
        nav.style.textAlign = "right";

        for (i = 0; i < navGroups.length; i++) {
            navGroups[i].style.display = "block";
            navGroups[i].style.width = "100%";
            navGroups[i].style.margin = "6px 0";
            navGroups[i].style.textAlign = "right";
        }

        if (submenu) {
            submenu.style.position = "static";
            submenu.style.minWidth = "0";
            submenu.style.width = "100%";
            submenu.style.boxSizing = "border-box";
            submenu.style.marginTop = "6px";
            submenu.style.textAlign = "right";
        }

        document.body.style.paddingRight = "200px";
        if (header) {
            header.style.paddingRight = "215px";
        }
    } else {
        nav.style.position = "";
        nav.style.top = "";
        nav.style.right = "";
        nav.style.width = "";
        nav.style.maxHeight = "";
        nav.style.overflowY = "";
        nav.style.backgroundColor = "";
        nav.style.borderLeft = "";
        nav.style.borderBottom = "";
        nav.style.padding = "";
        nav.style.zIndex = "";
        nav.style.display = "";
        nav.style.flexDirection = "";
        nav.style.alignItems = "";
        nav.style.textAlign = "";

        for (i = 0; i < navGroups.length; i++) {
            navGroups[i].style.display = "";
            navGroups[i].style.width = "";
            navGroups[i].style.margin = "";
            navGroups[i].style.textAlign = "";
        }

        if (submenu) {
            submenu.style.position = "";
            submenu.style.minWidth = "";
            submenu.style.width = "";
            submenu.style.boxSizing = "";
            submenu.style.marginTop = "";
            submenu.style.textAlign = "";
        }

        document.body.style.paddingRight = "";
        if (header) {
            header.style.paddingRight = "";
        }
    }

    if (header && main) {
        main.style.marginTop = (header.offsetHeight + 15) + "px";
    }
}

function initMainPage() {
    var activitiesBtn = document.getElementById("activities-btn");

    if (activitiesBtn) {
        activitiesBtn.addEventListener("click", toggleSubmenu);
    }

    document.addEventListener("click", closeSubmenuOnOutsideClick);
    window.addEventListener("resize", updateNavLayout);
    updateNavLayout();
}

window.addEventListener("load", initMainPage);
