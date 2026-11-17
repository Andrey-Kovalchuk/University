function showDetailsHint() {
    var detailsField = document.getElementById("feedback-details");
    var tooltip = document.getElementById("details-tooltip");

    detailsField.style.backgroundColor = "#eef4fc";
    detailsField.style.border = "2px solid #1e3a5f";
    detailsField.style.boxShadow = "4px 4px 12px rgba(30, 58, 95, 0.35)";

    tooltip.style.display = "inline-block";
}

function hideDetailsHint() {
    var detailsField = document.getElementById("feedback-details");
    var tooltip = document.getElementById("details-tooltip");

    detailsField.style.backgroundColor = "";
    detailsField.style.border = "";
    detailsField.style.boxShadow = "";

    tooltip.style.display = "none";
}

function initFeedbackPage() {
    var detailsField = document.getElementById("feedback-details");

    if (detailsField) {
        detailsField.addEventListener("mouseover", showDetailsHint);
        detailsField.addEventListener("mouseout", hideDetailsHint);
    }
}

window.addEventListener("load", initFeedbackPage);
