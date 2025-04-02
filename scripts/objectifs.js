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

function setupObjectifsFormListeners() {
    const objectifsForm = document.getElementById("objectifsForm");

    loadObjectifs();

    if (objectifsForm) {
        objectifsForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const objectifsData = {
                calories: document.getElementById("caloriesObjectif").value,
                proteines: document.getElementById("proteinesObjectif").value,
                glucides: document.getElementById("glucidesObjectif").value,
                lipides: document.getElementById("lipidesObjectif").value
            };
            
            localStorage.setItem('objectifs', JSON.stringify(objectifsData));
            
            alert("Vos objectifs nutritionnels ont été enregistrés avec succès !");
            
            console.log("Objectifs enregistrés :", objectifsData);
        });
    }
}

function loadObjectifs() {
    const storedObjectifs = localStorage.getItem('objectifs');
    
    if (storedObjectifs) {
        const objectifs = JSON.parse(storedObjectifs);
        document.getElementById("caloriesObjectif").value = objectifs.calories;
        document.getElementById("proteinesObjectif").value = objectifs.proteines;
        document.getElementById("glucidesObjectif").value = objectifs.glucides;
        document.getElementById("lipidesObjectif").value = objectifs.lipides;
    }
}