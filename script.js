document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");

    const components = {
        dashboard: `
            <h1>Tableau de bord</h1>
            <div class="cards">
                <div class="card">
                    <h3>Calories</h3>
                    <div class="progress-bar">
                        <div class="progress" style="width: 70%;"></div>
                    </div>
                    <p>70% consommé</p>
                </div>
                <div class="card">
                    <h3>Protéines</h3>
                    <div class="progress-bar">
                        <div class="progress" style="width: 50%;"></div>
                    </div>
                    <p>50% consommé</p>
                </div>
                <div class="card">
                    <h3>Glucides</h3>
                    <div class="progress-bar">
                        <div class="progress" style="width: 60%;"></div>
                    </div>
                    <p>60% consommé</p>
                </div>
                <div class="card">
                    <h3>Lipides</h3>
                    <div class="progress-bar">
                        <div class="progress" style="width: 40%;"></div>
                    </div>
                    <p>40% consommé</p>
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