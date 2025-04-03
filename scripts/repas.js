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
  


const repasApiService = {
  fetchAllRepas: () => 
    fetch('http://localhost:3000/repas')
      .then(response => response.json()),
  
  createRepas: (repasData) => 
    fetch('http://localhost:3000/repas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(repasData)
    })
    .then(response => response.json())
};

const repasView = {
  createMealCard: (repas) => `
    <div class="meal-card">
      <h3>${repas.name}</h3>
      <p>Calories: <b>${repas.calories}</b></p>
      <p>Protéines: <b>${repas.proteines}g</b></p>
      <p>Glucides: <b>${repas.glucides}g</b></p>
      <p>Lipides: <b>${repas.lipides}g</b></p>
    </div>
  `,
  
  renderMealCards: (repasArray) => {
    const mealCards = document.querySelector('.meal-cards');
    mealCards.innerHTML = repasArray.map(repasView.createMealCard).join('');
    return repasArray;
  },
  
  extractFormData: () => ({
    name: document.getElementById("mealName").value,
    calories: parseInt(document.getElementById("mealCalories").value, 10),
    proteines: parseFloat(document.getElementById("mealProteins").value),
    glucides: parseFloat(document.getElementById("mealCarbs").value),
    lipides: parseFloat(document.getElementById("mealFats").value)
  }),
  
  resetForm: (formElement) => {
    formElement.reset();
    return formElement;
  }
};

const modalController = {
  open: (modalElement) => {
    modalElement.classList.add("active");
    return modalElement;
  },
  
  close: (modalElement) => {
    modalElement.classList.remove("active");
    return modalElement;
  }
};

function fetchRepas() {
  return repasApiService.fetchAllRepas()
    .then(repasView.renderMealCards)
    .catch(err => {
      console.error('Erreur lors du chargement des repas:', err);
      return [];
    });
}

function setupMealFormListeners() {
  const mealFormModal = document.getElementById("mealFormModal");
  const mealForm = document.getElementById("mealForm");
  
  const openModalListeners = [document.getElementById("btnAddMeal")];
  const closeModalListeners = [
    document.getElementById("closeMealModal"),
    document.getElementById("cancelMealForm")
  ];
  
  openModalListeners.forEach(element => {
    if (element) {
      element.addEventListener("click", () => modalController.open(mealFormModal));
    }
  });
  
  closeModalListeners.forEach(element => {
    if (element) {
      element.addEventListener("click", () => modalController.close(mealFormModal));
    }
  });
  
  if (mealForm) {
    mealForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      modalController.close(mealFormModal);
      const mealData = repasView.extractFormData();
      
      repasApiService.createRepas(mealData)
        .then(() => {
          repasView.resetForm(mealForm);
          return fetchRepas();
        })
        .then(data => console.log("Repas ajouté:", data))
        .catch(err => console.error("Erreur lors de l'ajout du repas:", err));
    });
  }
}