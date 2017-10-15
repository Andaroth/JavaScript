/*
 * Jeu du pendu
 * par Axel Fiolle
 * @ becode.org
 */

// Tableau de mots aléatoires
var randWord = ["BECODE","EMPATHIE","UTILISATEUR","GRILLE","COLONNE","BALISE","VALIDE","ALIGNEMENT","TABLEAU","STYLE","CODE","CHIFFRE","ACCOLADE","FONCTION","VARIABLE","CONDITION","BOUCLE","DESIGN","ORDINATEUR","VIRGULE","PARAGRAPHE","PORTABLE","TITRE","TYPE","CLASSE","SCRIPT","LIBRAIRIE","TABLEAU","TERMINAL","BRANCHE","SYMBOLE","INTERFACE","CLAVIER","SOURIS","INTERNET","EQUIPE","DIALOGUE","ENTRAIDE"];
// Je cible des éléments du DOM souvent utilisés
var uiPrompt = document.getElementById("prompt");
var uiTry = document.getElementById("try_show");
var uiRestart = document.getElementById("restart");
var uiAlert = document.getElementById("alert");
var uiSend = document.getElementById("send");
var uiList = document.getElementById("try_list");
// Je créé mes variables globales
var init = false; // Pour ne pas redémarrer la fonction initialize() automatiquement en fin de partie
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
var guess; // La variable pour stocker la proposition du joueur
// La fonction GameOver
function gameOver() {
    var lostMsg = "Vous avez perdu... le pendu est PENDU !!! tin tiin~<br/>Le mot était <strong>"+targetWord+"</strong>";
    uiAlert.innerHTML = lostMsg;
    uiRestart.classList.remove("hidden"); // afficher
    uiPrompt.classList.add("hidden"); // cacher grace à la classe .hidden
    uiSend.classList.add("hidden");
}
// Je créé à l'avance la fonction gameWin.
function gameWin() {
    console.log("Win !");
    var winMsg = "<strong>Félicitations !! </strong><br/>Vous avez réussi en "+tryNumb+" essai(s). Le mot était donc "+targetWord+" et vous vous êtes trompé "+failNumb+" fois.";
    uiRestart.classList.remove("hidden");
    uiPrompt.classList.add("hidden");
    uiSend.classList.add("hidden");
    uiAlert.innerHTML = winMsg;
}
// Fonction pour ajouter la saisie dans la liste
function addInList(arg) {
    var newLi= document.createElement("li");
    newLi.innerHTML = arg;
    uiList.appendChild(newLi);
}
// Fonction à appeler pour recommencer une partie
function reset() {
    // Remettre à zéro toutes mes variables globales
    targetArray;
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
    init = false; 
    uiRestart.classList.add("hidden");
    uiPrompt.classList.remove("hidden");
    uiSend.classList.remove("hidden");
    uiAlert.innerHTML = "";
    uiList.innerHTML = "<li class=\"start\">Vos essais &gt;</li>";
    initialize(); // Relancer la fonction de démarrage
}
// Fonction pour définir le mot à rechercher et rafraîchir certaines globales
function strToArray(argStr) {
    if (argStr != undefined) { // Si il y a un argument à la fonction, 
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
    } // fin des arguments
    targetWord = targetArray.join(""); // On enregistre le mot recherché pour le sortir à la fin en mode suspens
    targetReveal = foundArray.join(" "); // Le mot pour afficher le mot caché dans le DOM
    alertMsg = ""; // Une chaîne pour indiquer l'erreur du joueur dans le DOM
    targetLength = targetArray.length; // La longueur du mot
    leftTry = targetLength*2 - failNumb; // Le nombre d'essais restants
    uiTry.innerHTML = targetReveal; // Afficher dans le DOM
    console.log(foundArray);
}
// La fonction qui se lance au démarrage
function initialize() {
    var randOne = Math.floor(Math.random()*randWord.length);
    console.log("Random is : "+randOne);
    var selectSoluce = randWord[randOne];
    strToArray(selectSoluce); // Initialiser le début de la partie
    uiPrompt.setAttribute( "autocomplete", "off" ); // Pas de saisie automatique
    uiPrompt.focus(); // Forcer le curseur à aller dans le input
}
// La fonction principale
function guessLetter() {
    uiAlert.innerHTML = ""; // Vider l'alerte
    if (leftTry == 0) { // On vérifie d'abord si le joueur n'a pas cramé tous ses essais
        gameOver(); // Sinon c'est bye bye, ciao, à la prochaine, merci d'être passé
    }
    guess = uiPrompt.value; // On assigne le contenu du input texte à la saisie
    document.getElementById('prompt').value = ""; // On vide le input pour une meilleure expérience
    guess = guess.toUpperCase(); // Je dois mettre la lettre en MAJUSCULE pour qu'elle corresponde exactement à l'entrée du tableau
    strToArray(); // Refresh
    console.log("< you typed "+guess);
    /* 
        Je dois créer une boucle qui va tester la saisie.
        Mais d'abord, je vais tester quelques exceptions, au cas où l'utilisateur fait des choses imprévues par la boucle. Je fais cela grâce à if et else if. 
    */
    if (guess == targetWord) { // Si le joueur entre direct le mot recherché
        tryNumb++; // On ajoute un essai au compteur, car ça compte quand-même. 
        targetReveal = targetArray.join(" "); // On sélectionne la solution
        uiTry.innerHTML = targetReveal; // Affecter au DOM
        uiAlert.innerHTML = alertMsg; // Afficher message félicitations au DOM
        console.log("GUESS RIGHT !!!");
        gameWin(); // Et c'est gagné :)
    }
    else if (guess == " ")  { // Si l'utilisateur essaie de saisir un espace
        alertMsg = "<strong>Pas d'espaces</strong>, recommencez"; 
        uiAlert.innerHTML = alertMsg;
        console.log(alertMsg);
    }
    else if (guess.length == 0) { // Si l'utilisateur n'a rien rempli
        alertMsg = "<strong>Mauvaise saisie</strong>, recommencez"; 
        uiAlert.innerHTML = alertMsg; // Je l'affiche dans le DOM
        console.log(alertMsg);
    }
    else if (guess.length > 3) { // Si l'utilisateur tente un mot entier
        tryNumb++; // On ajoute un essai
        failNumb++; // On enregistre un fail
        leftTry = targetLength*2 - failNumb; // refresh
        addInList(guess); // J'ajoue le mot essayé à la liste
        alertMsg = "Vous faites <strong>erreur</strong> ! <strong>"+leftTry+"</strong> essais restants"; // Je définis un message d'erreur
        uiAlert.innerHTML = alertMsg; // Je l'affiche dans le DOM
        console.log(alertMsg);
    }
    else if (alreadyTested.indexOf(guess) != -1) { // Si la lettre a déjà été proposée
        tryNumb++; // On ajoute un essai au compteur car...
        failNumb++; // ...ça compte aussi comme un fail, vu que le joueur a les essais sous les yeux
        leftTry = targetLength*2 - failNumb; // refresh
        alertMsg = "<strong>Déjà essayé</strong>, <strong>"+leftTry+"</strong> essais restants";
        uiAlert.innerHTML = alertMsg;
        console.log(alertMsg);
    }
    else { // Si aucune exception n'est rencontrée, c'est parti pour le début de la fin, une grande boucle va tourner
        alreadyTested.push(guess); // Premièrement, j'ajoute la saisie au tableau des... saisies :) Et ce à chaque tour donc. 
        addInList(guess); // Je l'ajoute à la liste
        tryNumb++; // On ajoute un essai au compteur
        if (targetArray.indexOf(guess) == -1 ) { // Direct après, je vérifie si la saisie est absente du tableau targetArray.
            failNumb++; // Si la saisie est fausse, non seulement j'te colle un fail... 
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
                if (guess == targetArray[i]) // Si la saisie == la lettre ciblée par l'index i dans le tableau targetArray
                {
                    console.log(">catch "+guess+" at "+i);

                    foundArray.splice(i,1,guess); // On fait entrer la lettre saisie (guess) dans le tableau foundArray à l'emplacement i. Càd à sa place dans l'ordre du mot. 
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
} // La fin de la déclaration guessLetter();

uiPrompt.onkeyup = function() {
    guess = uiPrompt.value;
    if (guess.length>1) {
        uiPrompt.classList.add("promptLarge");
    } else {
        uiPrompt.classList.remove("promptLarge");
    }
}
// Si on clique sur le bouton du formulaire, lancer la fonction principale
uiSend.onclick = function(event){
    event.preventDefault(); // Empêche le boutton de rafraîchir la page
    if (leftTry == 0) {
        gameOver();
    } else {
        uiPrompt.focus(); // Forcer le curseur à aller dans le input
        guessLetter(); // Go dans la boucle
    }
};
// Le bouton reset
uiRestart.onclick = function(event){
    event.preventDefault();
    reset();
};

// Faut pas oublier de faire tourner la routourne en lançant la fonction principale ! :D 
if (init == false) {
    initialize();
    init = true;
}