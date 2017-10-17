// Charger le JSON
function loadJason(toLoad, callback) {
    console.log("> loadJason(" + toLoad + ", callback);");
    var loadData = new XMLHttpRequest(); // loadData est une requête XHR
    loadData.overrideMimeType("application/json"); // de type JSON
    loadData.open("GET", toLoad); // Je charge le fichier indiqué en param
    console.log("loadData : " + loadData);
    // onload, comme ça je fais le callback uniquement une fois que le chargement est radis
    loadData.onload = function() {
        // code 4 ET 200 
        if (loadData.readyState == 4 && loadData.status == "200") {
            callback(loadData.responseText); // Envoyer cette donnée au deuxième argument
        }
    } // fin onLoad
    loadData.send(null);
    console.log("loadData : " + loadData);
}
function sort() {
    
}

// Fonction init(), main(), start(), begin()
function initialize() {
    console.log("> initialize();")
    var actualJSON = [];
    var peopleList = [];
    // Le fichier cible
    var toLoad = "https://raw.githubusercontent.com/becodeorg/Lovelace-promo-2/master/Parcours/JavaScript/11-AJAX/files/data.json";
    // Demander d'ouvrir le fichier et de faire function() pour chaque résultat
    loadJason(toLoad, function(response) {
        // Je crée actualJSON en tant qu'objet sur base de la réponse de loadJason
        actualJSON = JSON.parse(response);
        peopleList = JSON.stringify(actualJSON); // Je le remplis avec le texte clair du JSON
        console.log("peopleList : \n" + peopleList);
        document.write("<h2>peopleList (before score)</h2>" + peopleList);
        document.write("<h2>randScore</h2>")
        for (let i in actualJSON) {
            // Je fais un random pour chaque entrée du Json
            var randScore = Math.floor(Math.random()*1000);
            // J'assigne le score à l'objet ciblé
            actualJSON[i].score = randScore;
            document.write("<br/>" + actualJSON[i].name + " : " + actualJSON[i].score);
            console.log("randScore : " + actualJSON[i].score);
        }  
        // Tri par ordre croissant sur "score"
        actualJSON.sort(function(a, b) {
            return a.score - b.score;
        });
        // Refresh la liste textuelle (pour le log)
        peopleList = JSON.stringify(actualJSON);
        console.log("peopleList : \n" + peopleList);
        document.write("<h2>peopleList (after score)</h2>" + peopleList);
        document.write("<h2>Arrays</h2>");
        var arrayA = []; // > 750
        var arrayB = []; // > 500
        var arrayC = []; // < 500
        for (let i in actualJSON) {
            var score = Number(actualJSON[i].score);
            var name = JSON.stringify(actualJSON[i].name);
            if (score <= 500) {
                arrayC.push(name);
            }
            else if (score > 500 && score < 750) {
                arrayB.push(name);
            }
            else {
                arrayA.push(name);
            }
        }
        document.write("A : " + arrayA);
        document.write("<br/>B : " + arrayB);
        document.write("<br/>C : " + arrayC);
    }); // fin loadJason
} // fin initialize()

initialize(); // Démarrage





