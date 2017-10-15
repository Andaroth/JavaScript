/*
 * Jeu du pendu
 * par Axel Fiolle
 * @ becode.org
 */

// Tableau de mots aléatoires
var randWord = ["BECODE", "EMPATHIE", "UTILISATEUR", "GRILLE", "COLONNE", "BALISE", "VALIDE", "ALIGNEMENT", "TABLEAU", "STYLE", "CODE", "CHIFFRE", "ACCOLADE", "FONCTION", "VARIABLE", "CONDITION", "BOUCLE", "DESIGN", "ORDINATEUR", "VIRGULE", "PARAGRAPHE", "PORTABLE", "TITRE", "TYPE", "CLASSE", "SCRIPT", "LIBRAIRIE", "TABLEAU", "TERMINAL", "BRANCHE", "SYMBOLE", "INTERFACE", "CLAVIER", "SOURIS", "INTERNET", "EQUIPE", "DIALOGUE", "ENTRAIDE"];
console.log("> "+randWord.length+" mots disponibles.");
// Je cible des éléments du DOM souvent utilisés
var uiInput = document.getElementById("prompt");
var uiTry = document.getElementById("try_show");
var uiRestart = document.getElementById("restart");
var uiAlert = document.getElementById("alert");
var uiSend = document.getElementById("send");
var uiList = document.getElementById("try_list");
// Je créé mes variables globalesautomatiquement en fin de partie
var targetArray = []; // Pour recevoir le mot mystère
var foundArray = []; // Pour recevoir le mot en recherche
var targetWord; // On enregistre le mot recherché pour le sortir à la fin en mode suspens
var targetReveal; // Le mot pour afficher le mot caché dans le DOM
var alertMsg; // Une chaîne pour indiquer l'erreur du joueur dans le DOM
var targetLength = 0; // La longueur du mot
var winCount = 0; // Le compteur de réussites
var tryNumb = 0; // Le nombre d'essais
var failNumb = 0; // Un compteur d'échecs
var leftTry = targetLength*2 - failNumb; // Le nombre d'essais restants
var alreadyTested = []; // je créé un tableau pour enregistrer les essais du joueur
var playerInput; // La variable pour stocker la proposition du joueur
// La fonction GameOver
function gameOver() {
    console.log("> gameOver()");
    var lostMsg = "Vous avez perdu... le pendu est PENDU !!! tin tiin~<br/>Le mot était <strong>"+targetWord+"</strong>";
    uiAlert.innerHTML = lostMsg;
    uiRestart.classList.remove("hidden"); // afficher
    uiInput.classList.add("hidden"); // cacher grace à la classe .hidden
    uiSend.classList.add("hidden");
}
// Je créé à l'avance la fonction gameWin.
function gameWin() {
    console.log("> gameWin()");
    var winMsg = "<strong>Félicitations !! </strong><br/>Vous avez réussi en "+tryNumb+" essai(s). Le mot était donc "+targetWord+" et vous vous êtes trompé "+failNumb+" fois.";
    uiRestart.classList.remove("hidden");
    uiInput.classList.add("hidden");
    uiSend.classList.add("hidden");
    uiAlert.innerHTML = winMsg;
}
// Fonction pour ajouter la saisie dans la liste
function addInList(arg) {
    console.log("> addInList(arg)");
    var newLi= document.createElement("li");
    newLi.innerHTML = arg;
    uiList.appendChild(newLi);
}
// Fonction à appeler pour recommencer une partie
function reset() {
    console.log("> reset()");
    // Remettre à zéro toutes mes variables globales
    targetArray = [];
    foundArray = [];
    targetWord;
    targetReveal;
    targetLength = 0;
    targetLength = 0;
    winCount = 0;
    tryNumb = 0;
    failNumb = 0;
    leftTry = targetLength*2 - failNumb; 
    alreadyTested = [];
    uiRestart.classList.add("hidden");
    uiInput.classList.remove("hidden");
    uiSend.classList.remove("hidden");
    uiAlert.innerHTML = "";
    uiList.innerHTML = "<li class=\"start\">Vos essais &gt;</li>";
    initialize(); // Relancer la fonction de démarrage
}
// Fonction pour définir le mot à rechercher et rafraîchir certaines globales
function strToArray(argStr) {
    if (argStr != undefined) { // Si il y a un argument à la fonction, 
        console.log("> strToArray(argStr)");
        argStr = argStr.toUpperCase(); // Mettre tout en MAJUSCULE
        targetArray = argStr.split(""); // Et créer un tableau
        if (targetArray.indexOf(" ") != -1) { // Empêcher les espaces
            alert("Pas d'espaces !");
            reset();
        }
        else if (targetArray.length < 3) { // Longueur min du mot
            alert("3 caractères minimum");
            reset();
        }
        else { // Procéder
            for (let i in targetArray) { 
                foundArray.splice(i,1,"_"); // Reset le tableau des lettres trouvées
            }
        }
    } else {console.log("> strToArray()");} // fin des arguments
    targetWord = targetArray.join(""); // On enregistre le mot recherché pour le sortir à la fin en mode suspens
    targetReveal = foundArray.join(" "); // Le mot pour afficher le mot caché dans le DOM
    alertMsg; // Une chaîne pour indiquer l'erreur du joueur dans le DOM, ici on la reset. 
    targetLength = targetArray.length; // La longueur du mot
    leftTry = targetLength*2 - failNumb; // Le nombre d'essais restants
    uiTry.innerHTML = targetReveal; // Afficher dans le DOM
    console.log(foundArray);
}
// La fonction qui se lance au démarrage
function initialize() {
    console.log("> initialize()");
    var randOne = Math.floor(Math.random()*randWord.length);
    console.log("Random is : "+randOne);
    var selectSoluce = randWord[randOne];
    strToArray(selectSoluce); // Initialiser le début de la partie
    uiInput.setAttribute( "autocomplete", "off" ); // Pas de saisie automatique
    uiInput.focus(); // Forcer le curseur à aller dans le input
}
// La fonction principale
function guessLetter() {
    console.log("> guessLetter()");
    playerInput = uiInput.value; // On assigne le contenu du input texte à la saisie
    uiInput.value = ""; // On vide le input pour une meilleure expérience
    uiInput.focus(); // Forcer le curseur à aller dans le input
    playerInput = playerInput.toUpperCase(); // Je dois mettre la lettre en MAJUSCULE pour qu'elle corresponde exactement à l'entrée du tableau
    uiAlert.innerHTML = ""; // Vider l'alerte
    strToArray(); // Refresh
    console.log("< you typed \""+playerInput+"\"");
    /* 
        Je dois créer une boucle qui va tester la saisie.
        Mais d'abord, je vais tester quelques exceptions, au cas où l'utilisateur fait des choses imprévues par la boucle. Je fais cela grâce à if et else if. 
    */
    if (playerInput == targetWord) { // Si le joueur entre direct le mot recherché
        tryNumb++; // On ajoute un essai au compteur, car ça compte quand-même. 
        targetReveal = targetArray.join(" "); // On sélectionne la solution
        uiTry.innerHTML = targetReveal; // Affecter au DOM
        uiAlert.innerHTML = alertMsg; // Afficher message félicitations au DOM
        console.log("GUESS RIGHT !!!");
        gameWin(); // Et c'est gagné :)
    }
    else if (playerInput == " ")  { // Si l'utilisateur essaie de saisir un espace
        alertMsg = "<strong>Pas d'espaces</strong>, recommencez"; 
        uiAlert.innerHTML = alertMsg;
        console.log(alertMsg);
    }
    else if (playerInput.length == 0) { // Si l'utilisateur n'a rien rempli
        alertMsg = "<strong>Mauvaise saisie</strong>, recommencez"; 
        uiAlert.innerHTML = alertMsg; // Je l'affiche dans le DOM
        console.log(alertMsg);
    }
    else if (playerInput.length > 3) { // Si l'utilisateur tente un mot entier
        tryNumb++; // On ajoute un essai
        failNumb++; // On enregistre un fail
        leftTry = targetLength*2 - failNumb; // refresh
        addInList(playerInput); // J'ajoue le mot essayé à la liste
        alertMsg = "Vous faites <strong>erreur</strong> ! <strong>"+leftTry+"</strong> essais restants"; // Je définis un message d'erreur
        uiAlert.innerHTML = alertMsg; // Je l'affiche dans le DOM
        console.log(alertMsg);
    }
    else if (alreadyTested.indexOf(playerInput) != -1) { // Si la lettre a déjà été proposée
        tryNumb++; // On ajoute un essai au compteur car...
        failNumb++; // ...ça compte aussi comme un fail, vu que le joueur a les essais sous les yeux
        leftTry = targetLength*2 - failNumb; // refresh
        alertMsg = "<strong>Déjà essayé</strong>, <strong>"+leftTry+"</strong> essais restants";
        uiAlert.innerHTML = alertMsg;
        console.log(alertMsg);
    }
    else { // Si aucune exception n'est rencontrée, c'est parti pour le début de la fin, une grande boucle va tourner
        alreadyTested.push(playerInput); // Premièrement, j'ajoute la saisie au tableau des... saisies :) Et ce à chaque tour donc. 
        addInList(playerInput); // Je l'ajoute à la liste
        tryNumb++; // On ajoute un essai au compteur
        if (targetArray.indexOf(playerInput) == -1 ) { // Direct après, je vérifie si la saisie est absente du tableau targetArray.
            failNumb++; // Si la saisie est fausse, j'te colle un fail... 
            leftTry = targetLength*2 - failNumb; // refresh
            alertMsg = "<strong>Nope</strong>, plus que <strong>"+leftTry+"</strong> erreurs possibles";
            uiAlert.innerHTML = alertMsg;
            console.log(alertMsg);
        } 
        else {
            console.log("passed"); // Du coup, seuls les résultats positifs passent à la suite du code
            /* 
            Le for me permet de faire une boucle (dans un boucle, absolument) un certain nombre de fois (ici, la longueur du mot "targetLength")
            À chaque tour, la variable i augmente de 1. Au départ elle vaut 0. 
            Cette boucle permet comparer la saisie avec une lettre du mot à chaque tour. Le fait que i augmente de 1 va me permettre de cibler la lettre suivante à chaque tour. 
            */
            for (i=0;i<targetLength;i++) {  // L'ordre des termes étant important, je ne fais PAS for (let i in targetLength)
                if (playerInput == targetArray[i]) // Si la saisie == la lettre ciblée par l'index i dans le tableau targetArray
                {
                    console.log("> catch "+playerInput+" at "+i);

                    foundArray.splice(i,1,playerInput); // On fait entrer la lettre saisie (playerInput) dans le tableau foundArray à l'emplacement i. Càd à sa place dans l'ordre du mot. 
                    winCount++; // On indique qu'une lettre à été trouvée
                    console.log("win: "+winCount);
                    targetReveal = foundArray.join(" "); 
                    uiTry.innerHTML = targetReveal; // On actualise l'aperçu du mot dans le DOM
                    console.log(">>"+foundArray[i]+" est ajouté à foundArray à l'index "+i+" ("+winCount+" lettres ont été trouvées)");
                }
            } // la raison cette boucle un peu spéciale est de trouver toutes les lettres identiques en seul tour car telles sont les règles du pendu
            /* 
            Une fois que la boucle a fini de routourner, 
            On vérifie si le joueur a trouvé toutes les lettres en comparant le compteur de lettres trouvées avec la longueur du mot. 
            */
            if (winCount == targetLength) { // Si le compte y est, félicitations, bravo, congratulations ! Les esclaves peuvent arrêter de tourner, le jeu est terminé tu as gagné !
                gameWin(); // Go fonction win :)
            } 
        } // La fin du else de comparaison
    } // La fin du grand else des exceptions
} // La fin de la déclaration playerInputLetter();
// Élargir le input si le joueur veut entrer un mot complet
uiInput.onkeyup = function() {
    console.log("<< uiInput.onkeyup");
    playerInput = uiInput.value;
    if (playerInput.length>1) {
        uiInput.classList.add("promptLarge");
    } else {
        uiInput.classList.remove("promptLarge");
    }
}
// Si on clique sur le bouton du formulaire, lancer la fonction principale
uiSend.onclick = function(event){
    console.log("<< uiSend.onclick");
    event.preventDefault(); // Empêche le boutton de rafraîchir la page
    if (leftTry == 0) {
        gameOver();
    } else {
        guessLetter(); // Go dans la boucle
    }
};
// Le bouton reset
uiRestart.onclick = function(event){
    console.log("<< uiRestart.onclick");
    event.preventDefault();
    reset();
};

// Faut pas oublier de faire tourner la routourne en lançant la fonction principale ! :D 
initialize();