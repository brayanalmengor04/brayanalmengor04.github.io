let menuResponsive = document.querySelector(".container__menuResponsive");
let menuResponsiveItems = document.querySelector(".container__menuResponsive__options");

function ocultarMenu() {
    menuResponsive.style.display = "none"; 
    menuResponsiveItems.style.visibility= "hidden";
}
function mostrarMenu() {
    menuResponsive.style.display = "block"; 
    menuResponsiveItems.style.visibility= "visible";
}