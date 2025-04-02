document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");
    
    // Importer les autres fichiers
    // Notez: Dans un environnement réel, vous utiliseriez des modules ES6
    // Mais pour une approche simple, nous supposons que ces fichiers sont inclus via des balises script

    document.getElementById("btnDashboard").addEventListener("click", () => {
        content.innerHTML = dashboardComponent;
    });

    document.getElementById("btnRepas").addEventListener("click", () => {
        content.innerHTML = repasComponent;
        setupMealFormListeners();
    });

    document.getElementById("btnObjectifs").addEventListener("click", () => {
        content.innerHTML = objectifsComponent;
        setupObjectifsFormListeners();
    });

    document.getElementById("btnStatistiques").addEventListener("click", () => {
        content.innerHTML = statistiquesComponent;
    });

    content.innerHTML = dashboardComponent;
});