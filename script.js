document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");

    const components = {
        dashboard: `
            <h1>Tableau de bord</h1>
            <div class="cards">
                <div class="card">
                    <h3>Calories</h3>
                    <p>200/3000</p>
                    <div class="progress-bar">
                        <div class="progress" style="width: 70%;"></div>
                    </div>
                </div>
                <div class="card">
                    <h3>Protéines</h3>
                    <p>200/3000</p>
                    <div class="progress-bar">
                        <div class="progress" style="width: 50%;"></div>
                    </div>
                </div>
                <div class="card">
                    <h3>Glucides</h3>
                    <p>200/3000</p>
                    <div class="progress-bar">
                        <div class="progress" style="width: 60%;"></div>
                    </div>
                </div>
                <div class="card">
                    <h3>Lipides</h3>
                    <p>200/3000</p>
                    <div class="progress-bar">
                        <div class="progress" style="width: 40%;"></div>
                    </div>
                </div>
            </div>
        `,
        repas: "<h1>Repas</h1><p>Voici vos repas.</p>",
        objectifs: "<h1>Objectifs</h1><p>Voici vos objectifs.</p>",
        statistiques: "<h1>Statistiques</h1><p>Voici vos statistiques.</p>",
    };

    document.getElementById("btnDashboard").addEventListener("click", () => {
        content.innerHTML = components.dashboard;
    });

    document.getElementById("btnRepas").addEventListener("click", () => {
        content.innerHTML = components.repas;
    });

    document.getElementById("btnObjectifs").addEventListener("click", () => {
        content.innerHTML = components.objectifs;
    });

    document.getElementById("btnStatistiques").addEventListener("click", () => {
        content.innerHTML = components.statistiques;
    });
});