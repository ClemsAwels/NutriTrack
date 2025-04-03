const dashboardComponent = `
    <h1>Tableau de bord</h1>
    <div class="cards">
        <div class="card">
            <h3>Calories</h3>
            <p id="caloriesProgress">0/0</p>
            <div class="progress-bar">
                <div id="caloriesBar" class="progress" style="width: 0%;"></div>
            </div>
        </div>
        <div class="card">
            <h3>Protéines</h3>
            <p id="proteinesProgress">0/0</p>
            <div class="progress-bar">
                <div id="proteinesBar" class="progress" style="width: 0%;"></div>
            </div>
        </div>
        <div class="card">
            <h3>Glucides</h3>
            <p id="glucidesProgress">0/0</p>
            <div class="progress-bar">
                <div id="glucidesBar" class="progress" style="width: 0%;"></div>
            </div>
        </div>
        <div class="card">
            <h3>Lipides</h3>
            <p id="lipidesProgress">0/0</p>
            <div class="progress-bar">
                <div id="lipidesBar" class="progress" style="width: 0%;"></div>
            </div>
        </div>
    </div>
`;

const extractData = data => ({
    calories: data.calories || 0,
    proteines: data.proteines || 0,
    glucides: data.glucides || 0,
    lipides: data.lipides || 0
});

const extractObjectifs = data => ({
    calories: data.objectifs?.calories || 1,
    proteines: data.objectifs?.proteines || 1,
    glucides: data.objectifs?.glucides || 1,
    lipides: data.objectifs?.lipides || 1
});

const extractApiObjectifs = data => ({
    calories: data.objectifs?.calories || 1,
    proteines: data.objectifs?.proteines || 1,
    glucides: data.objectifs?.glucides || 1,
    lipides: data.objectifs?.lipides || 1
});

const calculatePercentages = (values, objectifs) => ({
    calories: Math.min(100, (values.calories / objectifs.calories) * 100),
    proteines: Math.min(100, (values.proteines / objectifs.proteines) * 100),
    glucides: Math.min(100, (values.glucides / objectifs.glucides) * 100),
    lipides: Math.min(100, (values.lipides / objectifs.lipides) * 100)
});

const VIOLET_COLOR = "#8a2be2";

const updateProgressText = (id, value, objectif) => {
    const element = document.getElementById(id);
    if (element) element.textContent = `${value}/${objectif}`;
};

const updateProgressBar = (id, percentage) => {
    const element = document.getElementById(id);
    if (element) {
        element.style.width = `${percentage}%`;
        element.style.backgroundColor = VIOLET_COLOR;
    }
};

const updateNutrientDisplay = (nutrient, value, objectif, percentage) => {
    updateProgressText(`${nutrient}Progress`, value, objectif);
    updateProgressBar(`${nutrient}Bar`, percentage);
};

const refreshDashboard = (consummationData, objectifsData) => {
    const values = extractData(consummationData);
    const objectifs = objectifsData || extractObjectifs(consummationData);
    const percentages = calculatePercentages(values, objectifs);
    
    ["calories", "proteines", "glucides", "lipides"].forEach(nutrient => {
        updateNutrientDisplay(
            nutrient, 
            values[nutrient], 
            objectifs[nutrient], 
            percentages[nutrient]
        );
    });
    
    return { values, objectifs, percentages };
};

const fetchObjectifs = () => {
    return fetch('http://localhost:3000/objectifs')
        .then(response => response.json())
        .then(data => {
            console.log("Objectifs récupérés:", data.objectifs);
            return extractApiObjectifs(data);
        })
        .catch(err => {
            console.error("Erreur lors du chargement des objectifs:", err);
            return null;
        });
};

function loadAvancements() {
    console.log("Chargement des données nutritionnelles...");
    
    fetch('http://localhost:3000/objectifs')
        .then(response => response.json())
        .then(objetifsResponse => {
            console.log("Objectifs récupérés:", objetifsResponse.objectifs);
            
            const objectifs = extractApiObjectifs(objetifsResponse);

            return fetch('http://localhost:3000/journalier')
                .then(response => response.json())
                .then(journalierData => {
                    console.log("Données journalières récupérées:", journalierData);
                    
                    return refreshDashboard(journalierData, objectifs);
                });
        })
        .then(state => {
            console.log("Dashboard mis à jour avec l'état:", state);
        })
        .catch(err => {
            console.error("Erreur lors du chargement des données:", err);
        });
}