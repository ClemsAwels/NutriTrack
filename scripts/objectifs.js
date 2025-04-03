const objectifsComponent = `
    <div class="header-objectifs">
        <h1>Objectifs nutritionnels</h1>
    </div>
    
    <div class="objectifs-form-container">
        <form class="objectifs-form" id="objectifsForm">
            <div class="form-group">
                <label for="caloriesObjectif">Calories journalières</label>
                <input type="number" id="caloriesObjectif" value="2000" required>
            </div>
            <div class="form-group">
                <label for="proteinesObjectif">Protéines (g)</label>
                <input type="number" id="proteinesObjectif" value="80" required>
            </div>
            <div class="form-group">
                <label for="glucidesObjectif">Glucides (g)</label>
                <input type="number" id="glucidesObjectif" value="250" required>
            </div>
            <div class="form-group">
                <label for="lipidesObjectif">Lipides (g)</label>
                <input type="number" id="lipidesObjectif" value="70" required>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn-violet">Enregistrer</button>
            </div>
        </form>
    </div>
`;

const extractFormData = () => ({
    calories: document.getElementById("caloriesObjectif").value,
    proteines: document.getElementById("proteinesObjectif").value,
    glucides: document.getElementById("glucidesObjectif").value,
    lipides: document.getElementById("lipidesObjectif").value
});

const populateForm = (data) => {
    document.getElementById("caloriesObjectif").value = data.calories;
    document.getElementById("proteinesObjectif").value = data.proteines;
    document.getElementById("glucidesObjectif").value = data.glucides;
    document.getElementById("lipidesObjectif").value = data.lipides;
    return data;
};

const apiService = {
    saveObjectifs: (data) => 
        fetch('http://localhost:3000/objectifs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json()),
    
    fetchObjectifs: () => 
        fetch('http://localhost:3000/objectifs')
        .then(response => response.json())
        .then(data => data.objectifs)
};

function setupObjectifsFormListeners() {
    const objectifsForm = document.getElementById("objectifsForm");

    apiService.fetchObjectifs()
        .then(populateForm)
        .catch(err => console.error("Error loading objectives:", err));

    if (objectifsForm) {
        objectifsForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const objectifsData = extractFormData();
            
            apiService.saveObjectifs(objectifsData)
                .then(data => console.log("Objectif ajouté:", data))
                .catch(err => console.error("Error saving objectives:", err));
        });
    }
}
