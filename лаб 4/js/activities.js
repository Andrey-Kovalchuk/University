var slides = [
    {
        src: "../pic/будівництво.webp",
        alt: "Відбудова Ірпеня",
        title: "1. Відбудова інфраструктури та будівництво"
    },
    {
        src: "../pic/соц.webp",
        alt: "Соціальна служба",
        title: "2. Соціальний захист населення"
    },
    {
        src: "../pic/культура.webp",
        alt: "Заклади освіти Ірпеня",
        title: "3. Освіта та культура"
    }
];

var currentSlideIndex = 0;

function showSlide(index) {
    var img = document.getElementById("carousel-img");
    var caption = document.getElementById("carousel-caption");

    if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else if (index >= slides.length) {
        currentSlideIndex = 0;
    } else {
        currentSlideIndex = index;
    }

    img.src = slides[currentSlideIndex].src;
    img.alt = slides[currentSlideIndex].alt;
    caption.innerHTML = (currentSlideIndex + 1) + " / " + slides.length + " — " + slides[currentSlideIndex].title;
}

function updateActivitiesLayout() {
    var header = document.getElementsByTagName("header")[0];
    var main = document.getElementsByTagName("main")[0];
    var carouselImg = document.getElementById("carousel-img");
    var maxSlideHeight = Math.floor(window.innerHeight * 0.2);

    if (carouselImg) {
        carouselImg.style.maxHeight = maxSlideHeight + "px";
        carouselImg.style.height = maxSlideHeight + "px";
    }

    if (header && main) {
        main.style.marginTop = (header.offsetHeight + 15) + "px";
    }
}

function filterActivities() {
    var searchInput = document.getElementById("activity-search");
    var emptyMessage = document.getElementById("search-empty");
    var items = document.getElementsByClassName("activity-item");
    var query = searchInput.value.toLowerCase().trim();
    var visibleCount = 0;
    var i;

    for (i = 0; i < items.length; i++) {
        var heading = items[i].getElementsByTagName("h3")[0];
        var titleText = heading.innerHTML.toLowerCase();

        if (query === "" || titleText.indexOf(query) !== -1) {
            items[i].style.display = "block";
            visibleCount++;
        } else {
            items[i].style.display = "none";
        }
    }

    if (emptyMessage) {
        if (visibleCount === 0) {
            emptyMessage.style.display = "block";
        } else {
            emptyMessage.style.display = "none";
        }
    }
}

function initActivitiesPage() {
    var prevBtn = document.getElementById("carousel-prev");
    var nextBtn = document.getElementById("carousel-next");
    var searchInput = document.getElementById("activity-search");
    var searchBtn = document.getElementById("search-btn");

    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            showSlide(currentSlideIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            showSlide(currentSlideIndex + 1);
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", filterActivities);
    }

    if (searchInput) {
        searchInput.addEventListener("keyup", filterActivities);
        searchInput.addEventListener("change", filterActivities);
    }

    showSlide(0);
    updateActivitiesLayout();
    window.addEventListener("resize", updateActivitiesLayout);
}

window.addEventListener("load", initActivitiesPage);
