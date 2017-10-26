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

// Fonction init(), main(), start(), begin()
function initialize() {
    console.log("> initialize();");
    // Je créé deux globales dans init car je sais que j'en aurai sûrement besoin tout au long de ma fonction
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
        } // fin score random
        // Tri par ordre croissant sur "score"
        actualJSON.sort(function(a, b) {
            return a.score - b.score;
        });
        // Refresh la liste textuelle (pour le log)
        peopleList = JSON.stringify(actualJSON);
        console.log("peopleList : \n" + peopleList);
        document.write("<h2>peopleList (after score)</h2>" + peopleList);
        document.write("<h2>Arrays</h2>");
        
        // Je créé les trois catégories
        var arrayA = []; // > 750
        var arrayB = []; // > 500
        var arrayC = []; // < 500
        var mapper = actualJSON.map(function(index) {
            // Je transforme les valeurs de mon objet en Number et en String pour pouvoir les exploiter
            var score = Number(index.score);
            var people = JSON.stringify(index);
            if (score <= 500) {
                // PUSH !! :D (ajouter dans le tableau)
                arrayC.push(people);
            }
            else if (score > 500 && score < 750) {
                arrayB.push(people);
            }
            else {
                arrayA.push(people);
            }
        }); // fin Tri catégories
        
        document.write("A : " + arrayA);
        document.write("<br/>B : " + arrayB);
        document.write("<br/>C : " + arrayC);
        var fromBahrain = [];
        for (let i in actualJSON) {
            var where = JSON.stringify(actualJSON[i].country);
            var people = JSON.stringify(actualJSON[i]);
            // La string where va littéralement prendre les guillemets, je dois adapter mon if à cela
            if (where == '"Bahrain"') {
                fromBahrain.push(people);
            }
        }
        console.log("> fromBahrain = " + fromBahrain);
        var howMuch = fromBahrain.length;
        console.log("How much from Bahrain : " + howMuch);
        document.write("<h2>How much from Bahrain</h2>" + howMuch);
        // Afficher les score max et min
        var listScore = [];
        // Entrer les scores dans un tableau
        for (let i in actualJSON) {
            var score = actualJSON[i].score;
            listScore.push(score);
        }
        console.log("listScore : \n" + listScore);
        // Les "..." servent à indiquer à Math.min/max qu'on travaille dans un tableau
        var lowestScore = Math.min(...listScore);
        var highestScore = Math.max(...listScore);
        console.log("low : " + lowestScore + "\nhigh : " + highestScore);
    }); // fin loadJason
} // fin initialize()

initialize(); // Démarrage