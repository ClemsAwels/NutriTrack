const statistiquesComponent = `
    <h1>Statistiques</h1>
    <p>Voici vos statistiques.</p>
    <button id="postButton">Envoyer les données</button>
`;

document.getElementById("btnStatistiques").addEventListener("click", () => {
    content.innerHTML = statistiquesComponent;

    // Ajout de l'écouteur d'événement pour le bouton après l'insertion dans le DOM
    setTimeout(() => {
        const postButton = document.getElementById('postButton');
        if (postButton) {
            postButton.addEventListener('click', async () => {
                try {
                    const response = await fetch('http://locahost:3000/objectifs', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "name": "Zamazenta",
                            "calories": "100000",
                            "proteines": 1000000,
                            "glucides": 1,
                            "lipides": 1
                        }),
                    });

                    if (response.ok) {
                        const result = await response.json();
                        console.log('Réponse du serveur:', result);
                    } else {
                        console.error('Erreur lors de la requête:', response.statusText);
                    }
                } catch (error) {
                    console.error('Erreur réseau:', error);
                }
            });
        } else {
            console.error("Le bouton 'postButton' n'a pas été trouvé dans le DOM.");
        }
    }, 0);
});