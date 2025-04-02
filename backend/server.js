const express = require('express');
const fs = require('fs');
const _ = require('lodash');

const app = express();
const PORT = 3000;
const DB_FILE = 'database/db.json';

app.use(express.json());

const readDB = () => JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

const writeDB = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));


app.get('/repas', (req, res) => {
    const db = readDB();

    if (!_.has(db, 'repas')) {
        return res.json([]);
    }

    const repasTries = _.orderBy(
        db.repas,
        ['createdAt'],  
        ['desc']
    );

    res.json(repasTries);
});

app.post('/repas', (req, res) => {
    const reqData = _.pick(req.body, ['name', 'calories', 'proteines', 'glucides', 'lipides']);

    const champsRequis = ['name', 'calories', 'proteines', 'glucides', 'lipides'];
    const champsManquants = champsRequis.filter(champ => !reqData[champ]);

    if (!_.isEmpty(champsManquants)) {
        return res.status(400).json({ 
            message: `Champs manquants: ${champsManquants.join(', ')}` 
        });
    }

    const transformedRepas = _.flow(
        repas => _.assign({}, repas, { 
            id: Date.now(),
            createdAt: new Date().toISOString()
        }),
        repas => _.mapValues(repas, (value, key) => 
            _.includes(['calories', 'proteines', 'glucides', 'lipides'], key) ? _.parseInt(value) : value
        )
    )(reqData);

    const db = readDB();
    
    const updatedDb = _.has(db, 'repas') ? _.set(_.cloneDeep(db), 'repas', [...db.repas, transformedRepas]) : _.set(_.cloneDeep(db), 'repas', [transformedRepas]);
    
    writeDB(updatedDb);
    
    // Réponse au client
    res.status(201).json({ 
        message: "Repas ajouté avec succès!",
        repas: transformedRepas
    });
});

app.get('/objectifs', (req, res) => {
    res.json(readDB());
});

app.post('/objectifs', (req, res) => {
    const reqData = _.pick(req.body, ['calories', 'proteines', 'glucides', 'lipides']);

    const champsRequis = ['calories', 'proteines', 'glucides', 'lipides'];
    const champsManquants = champsRequis.filter(champ => !reqData[champ]);

    if (!_.isEmpty(champsManquants)) {
        return res.status(400).json({ 
            message: `Champs manquants: ${champsManquants.join(', ')}` 
        });
    }

    const transformedObjectifs = _.mapValues(reqData, (value, key) => 
        _.includes(['calories', 'proteines', 'glucides', 'lipides'], key) ? _.parseInt(value) : value
    );

    const db = readDB();
    
    const updatedDb = _.set(_.cloneDeep(db), 'objectifs', transformedObjectifs);
    
    writeDB(updatedDb);
    
    res.status(200).json({ 
        message: "Objectifs modifiés avec succès!",
        objectifs: transformedObjectifs
    });
});

app.get('/journalier', (req, res) => {
    const db = readDB();
    
    if (!_.has(db, 'repas') || _.isEmpty(db.repas)) {
        return res.json({
            calories: 0,
            proteines: 0,
            glucides: 0,
            lipides: 0
        });
    }
    
    // YYYY-MM-DD
    const aujourdhui = new Date().toISOString().split('T')[0];
    
    const repasAujourdhui = _.filter(db.repas, repas => 
        repas.createdAt.startsWith(aujourdhui)
    );
    
    const totaux = _.reduce(repasAujourdhui, (acc, repas) => {
        return {
            calories: acc.calories + (repas.calories || 0),
            proteines: acc.proteines + (repas.proteines || 0),
            glucides: acc.glucides + (repas.glucides || 0),
            lipides: acc.lipides + (repas.lipides || 0)
        };
    }, {
        calories: 0,
        proteines: 0,
        glucides: 0,
        lipides: 0
    });
    
    
    if (_.has(db, 'objectifs')) {
        const pourcentages = _.mapValues(
            _.pick(totaux, ['calories', 'proteines', 'glucides', 'lipides']),
            (valeur, cle) => {
                const objectif = db.objectifs[cle] || 0;
                return objectif > 0 ? Math.round((valeur / objectif) * 100) : 0;
            }
        );
        
        return res.json(_.assign({}, totaux, { pourcentages }));
    }
    
    return res.json(totaux);
});

app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));
