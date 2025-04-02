const repasComponent = `
    <div class="header-repas">
        <h1>Repas</h1>
        <button id="btnAddMeal" class="btn-violet">Ajouter un repas</button>
    </div>
    <div class="meal-cards">
        
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
  
  function fetchRepas() {
    fetch('http://localhost:3000/repas')
      .then(response => response.json())
      .then(repas => {
        const mealCards = document.querySelector('.meal-cards');
        mealCards.innerHTML = '';
  
        repas.forEach(r => {
          mealCards.innerHTML += `
            <div class="meal-card">
              <h3>${r.name}</h3>
              <p>Calories: <b>${r.calories}</b></p>
              <p>Protéines: <b>${r.proteines}g</b></p>
              <p>Glucides: <b>${r.glucides}g</b></p>
              <p>Lipides: <b>${r.lipides}g</b></p>
            </div>
          `;
        });
      })
      .catch(err => console.error(err));
  }

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
            mealFormModal.classList.remove("active");
            
            const mealData = {
                name: document.getElementById("mealName").value,
                calories: parseInt(document.getElementById("mealCalories").value, 10),
                proteines: parseFloat(document.getElementById("mealProteins").value),
                glucides: parseFloat(document.getElementById("mealCarbs").value),
                lipides: parseFloat(document.getElementById("mealFats").value)
            };
            console.log("Données du repas:", mealData);
            console.log(mealData);
          
            fetch('http://localhost:3000/repas', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(mealData)
            })
            .then(response => {
                if (response.ok) {
                    mealForm.reset();
                    fetchRepas();
                }

                return response.json();
            })
            .then(data => {
                console.log("Repas ajouté:", data);
            })
            .catch(err => console.error(err));
        });
    }
}