const repasComponent = `
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
    
    <div class="add-repas-overlay" id="mealFormModal">
        <div class="add-repas-content">
            <div class="add-repas-header">
                <h2>Ajouter un repas</h2>
                <button class="close-add-repas" id="closeMealModal">&times;</button>
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
`;

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
            const mealData = {
                name: document.getElementById("mealName").value,
                date: document.getElementById("mealDate").value,
                calories: document.getElementById("mealCalories").value,
                proteins: document.getElementById("mealProteins").value,
                carbs: document.getElementById("mealCarbs").value,
                fats: document.getElementById("mealFats").value
            };
            console.log("Données du repas :", mealData);
            mealForm.reset();
            mealFormModal.classList.remove("active");
        });
    }
}