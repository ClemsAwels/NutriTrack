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
        repas: `
            <div class="header-repas">
                <h1>Repas</h1>
                <button id="btnAddMeal" class="btn-violet">Ajouter un repas</button>
            </div>
            <div class="meal-cards">
                <div class="meal-card">
                    <h3>Petit Déjeuner</h3>
                    <p>Date : 2023-03-15</p>
                    <p>Calories : 500</p>
                    <p>Protéines : 20g</p>
                    <p>Glucides : 50g</p>
                    <p>Lipides : 10g</p>
                </div>
                <div class="meal-card">
                    <h3>Déjeuner</h3>
                    <p>Date : 2023-03-15</p>
                    <p>Calories : 700</p>
                    <p>Protéines : 30g</p>
                    <p>Glucides : 80g</p>
                    <p>Lipides : 20g</p>
                </div>
                <div class="meal-card">
                    <h3>Déjeuner</h3>
                    <p>Date : 2023-03-15</p>
                    <p>Calories : 700</p>
                    <p>Protéines : 30g</p>
                    <p>Glucides : 80g</p>
                    <p>Lipides : 20g</p>
                </div>
                <div class="meal-card">
                    <h3>Déjeuner</h3>
                    <p>Date : 2023-03-15</p>
                    <p>Calories : 700</p>
                    <p>Protéines : 30g</p>
                    <p>Glucides : 80g</p>
                    <p>Lipides : 20g</p>
                </div>
                <div class="meal-card">
                    <h3>Déjeuner</h3>
                    <p>Date : 2023-03-15</p>
                    <p>Calories : 700</p>
                    <p>Protéines : 30g</p>
                    <p>Glucides : 80g</p>
                    <p>Lipides : 20g</p>
                </div>
                <div class="meal-card">
                    <h3>Déjeuner</h3>
                    <p>Date : 2023-03-15</p>
                    <p>Calories : 700</p>
                    <p>Protéines : 30g</p>
                    <p>Glucides : 80g</p>
                    <p>Lipides : 20g</p>
                </div>
            </div>
            
            <div class="modal-overlay" id="mealFormModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Ajouter un repas</h2>
                        <button class="close-modal" id="closeMealModal">&times;</button>
                    </div>
                    <form class="meal-form" id="mealForm">
                        <div class="form-group">
                            <label for="mealName">Nom du repas</label>
                            <input type="text" id="mealName" required>
                        </div>
                        <div class="form-group">
                            <label for="mealDate">Date</label>
                            <input type="date" id="mealDate" required>
                        </div>
                        <div class="form-group">
                            <label for="mealCalories">Calories</label>
                            <input type="number" id="mealCalories" required>
                        </div>
                        <div class="form-group">
                            <label for="mealProteins">Protéines (g)</label>
                            <input type="number" id="mealProteins" required>
                        </div>
                        <div class="form-group">
                            <label for="mealCarbs">Glucides (g)</label>
                            <input type="number" id="mealCarbs" required>
                        </div>
                        <div class="form-group">
                            <label for="mealFats">Lipides (g)</label>
                            <input type="number" id="mealFats" required>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn-cancel" id="cancelMealForm">Annuler</button>
                            <button type="submit" class="btn-violet">Ajouter</button>
                        </div>
                    </form>
                </div>
            </div>
        `,
        objectifs: "<h1>Objectifs</h1><p>Voici vos objectifs.</p>",
        statistiques: "<h1>Statistiques</h1><p>Voici vos statistiques.</p>",
    };

    document.getElementById("btnDashboard").addEventListener("click", () => {
        content.innerHTML = components.dashboard;
    });

    document.getElementById("btnRepas").addEventListener("click", () => {
        content.innerHTML = components.repas;
        setupMealFormListeners();
    });

    document.getElementById("btnObjectifs").addEventListener("click", () => {
        content.innerHTML = components.objectifs;
    });

    document.getElementById("btnStatistiques").addEventListener("click", () => {
        content.innerHTML = components.statistiques;
    });

    // Fonction pour configurer les listeners du formulaire de repas
    function setupMealFormListeners() {
        const btnAddMeal = document.getElementById("btnAddMeal");
        const mealFormModal = document.getElementById("mealFormModal");
        const closeMealModal = document.getElementById("closeMealModal");
        const cancelMealForm = document.getElementById("cancelMealForm");
        const mealForm = document.getElementById("mealForm");

        if (btnAddMeal) {
            btnAddMeal.addEventListener("click", () => {
                mealFormModal.classList.add("active");
            });
        }

        if (closeMealModal) {
            closeMealModal.addEventListener("click", () => {
                mealFormModal.classList.remove("active");
            });
        }

        if (cancelMealForm) {
            cancelMealForm.addEventListener("click", () => {
                mealFormModal.classList.remove("active");
            });
        }

        if (mealForm) {
            mealForm.addEventListener("submit", (e) => {
                e.preventDefault();
                // Ici, vous pouvez ajouter le code pour traiter le formulaire
                const mealData = {
                    name: document.getElementById("mealName").value,
                    date: document.getElementById("mealDate").value,
                    calories: document.getElementById("mealCalories").value,
                    proteins: document.getElementById("mealProteins").value,
                    carbs: document.getElementById("mealCarbs").value,
                    fats: document.getElementById("mealFats").value
                };
                console.log("Données du repas :", mealData);
                // Réinitialiser le formulaire et fermer le modal
                mealForm.reset();
                mealFormModal.classList.remove("active");
            });
        }
    }
});