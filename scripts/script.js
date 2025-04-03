document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");
    
    document.getElementById("btnDashboard").addEventListener("click", () => {
        content.innerHTML = dashboardComponent;
        loadAvancements();
    });

    
    document.getElementById("btnRepas").addEventListener("click", () => {
        content.innerHTML = repasComponent;
        setupMealFormListeners(); 
        fetchRepas();
    });

    document.getElementById("btnObjectifs").addEventListener("click", () => {
        content.innerHTML = objectifsComponent;
        setupObjectifsFormListeners();
    });

    content.innerHTML = dashboardComponent;
    loadAvancements();
});