/*
 * Jeu du pendu
 * par Axel Fiolle
 * @ becode.org
 */

// Tableau de mots aléatoires
let randWord = ["BECODE","EMPATHIE","UTILISATEUR","GRILLE","COLONNE","BALISE","VALIDE","ALIGNEMENT","TABLEAU","STYLE","CODE","CHIFFRE","ACCOLADE","FONCTION","VARIABLE","CONDITION","BOUCLE","DESIGN","ORDINATEUR","VIRGULE","PARAGRAPHE","PORTABLE","TITRE","TYPE","CLASSE","SCRIPT","LIBRAIRIE","TABLEAU","TERMINAL","BRANCHE","SYMBOLE","INTERFACE","CLAVIER","SOURIS","INTERNET","EQUIPE","DIALOGUE","ENTRAIDE"
];
// Je cible des éléments souvent utilisés
var uiPrompt = document.getElementById("prompt");
var uiTry = document.getElementById("try_show");
var uiRestart = document.getElementById("restart");
var uiAlert = document.getElementById("alert");
var uiSend = document.getElementById("send");
var uiList = document.getElementById("try_list");
// Je créé mes variables globales
var init = false; // Pour ne pas redémarrer la fonction initialize()
let soluce = []; // Pour recevoir le mot demandé
let found = []; // Pour recevoir le mot en recherche
var motMystere; // On enregistre le mot recherché pour le sortir à la fin en mode suspens
var promptMot; // Le mot pour afficher le mot caché dans le prompt
var alertPrompt; // Une chaîne pour indiquer l'erreur du joueur dans le prompt
var motLong = 0; // La longueur du mot
var winCount = 0; // Le compteur de réussites
var tryNumb = 0; // Le nombre d'essais
var failNumb = 0; // Un compteur d'échecs
var leftTry = motLong*2 - failNumb; // Le nombre d'essais restants
let alreadyTested = []; // je créé un tableau pour enregistrer les essais du joueur
var guess; // La variable pour stocker la proposition du joueur
// La fonction GameOver
function gameOver() {
    var lostMsg = "Vous avez perdu... le pendu est PENDU !!! tin tiin~<br/>Le mot était <strong>"+motMystere+"</strong>";
    // alert(lostMsg);
    uiAlert.innerHTML = lostMsg;
    uiRestart.classList.remove("hidden");
    uiPrompt.classList.add("hidden");
    uiSend.classList.add("hidden");
    /*document.addEventListener("keydown", function (e) { 
        if (e.keyCode === 13) {
            reset(); 
        }
    });*/
}
// Je créé à l'avance la fonction gameWin.
function gameWin() {
    console.log("Win !");
    var winMsg = "<strong>Félicitations !! </strong><br/>Vous avez réussi en "+tryNumb+" essai(s). Le mot était donc "+motMystere+" et vous vous êtes trompé "+failNumb+" fois.";
    // alert(winMsg);
    uiRestart.classList.remove("hidden");
    uiPrompt.classList.add("hidden");
    uiSend.classList.add("hidden");
    uiAlert.innerHTML = winMsg;
}
// Fonction pour ajouter la saisie dans la liste
function addInTable(arg) {
    var newLi= document.createElement("li");
    newLi.innerHTML = arg;
    uiList.appendChild(newLi);
}
// Fonction à appeler pour recommencer une partie
function reset() {
    // Remettre à zéro toutes mes variables globales
    soluce;
    found = [];
    motMystere;
    promptMot;
    motLong = 0;
    motLong = 0;
    winCount = 0;
    tryNumb = 0;
    failNumb = 0;
    leftTry = motLong*2 - failNumb; 
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
function strToArray(arg) {
    if (arg != undefined) { // Si il y a un argument à la fonction
        arg = arg.toUpperCase(); // Mettre tout en MAJUSCULE
        soluce = arg.split(""); // Et créer un tableau
        if (soluce.indexOf(" ") != -1) { // Empêcher les espaces
            alert("Pas d'espaces !");
            reset();
        }
        else if (soluce.length < 3) { // Longueur min du mot
            alert("3 caractères minimum");
            reset();
        }
        else {
            for (let i in soluce) { // Sinon 
                found.splice(i,1,"_"); // Reset le tableau des lettres trouvées
            }
        }
    } // arguments
    motMystere = soluce.join(""); // On enregistre le mot recherché pour le sortir à la fin en mode suspens
    promptMot = found.join(" "); // Le mot pour afficher le mot caché dans le prompt
    alertPrompt = ""; // Une chaîne pour indiquer l'erreur du joueur dans le prompt
    motLong = soluce.length; // La longueur du mot
    leftTry = motLong*2 - failNumb; // Le nombre d'essais restants
    uiTry.innerHTML = promptMot; // Afficher dans le DOM
    console.log(found);
}
// La fonction qui se lance au démarrage
function initialize() {
    // var selectSoluce = window.prompt("Choisissez un mot à faire deviner :");
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
     // var guess = window.prompt(alertPrompt+"\nEssayez de trouver les lettres du pendu : \n"+promptMot,""); // Je demande la saisie au joueur
    guess = uiPrompt.value; // On assigne le contenu du input texte à la saisie
    document.getElementById('prompt').value = ""; // On vide le input pour une meilleure expérience
    guess = guess.toUpperCase(); // Je dois mettre la lettre en MAJUSCULE pour qu'elle corresponde exactement à l'entrée du tableau
    strToArray(); // Refresh
    console.log("< you typed "+guess);
    /* 
        Je dois créer une boucle qui va tester la saisie.
        Mais d'abord, je vais tester quelques exceptions, au cas où l'utilisateur fait des choses imprévues par la boucle. Je fais cela grâce à if et else if. 
    */
    if (guess == motMystere) { // Si le joueur entre direct le mot recherché
        tryNumb++; // On ajoute un essai au compteur, car ça compte quand-même. 
        promptMot = soluce.join(" "); // On sélectionne la solution
        uiTry.innerHTML = promptMot; // Affecter au DOM
        uiAlert.innerHTML = alertPrompt; // Afficher message félicitations au DOM
        console.log("GUESS RIGHT !!!");
        gameWin(); // Et c'est gagné :)
    }
    else if (guess == " ")  { // Si l'utilisateur essaie de saisir un espace
        alertPrompt = "<strong>Pas d'espaces</strong>, recommencez"; 
        uiAlert.innerHTML = alertPrompt;
        console.log(alertPrompt);
    }
    else if (guess.length == 0) { // Si l'utilisateur n'a rien rempli
        alertPrompt = "<strong>Mauvaise saisie</strong>, recommencez"; 
        uiAlert.innerHTML = alertPrompt; // Je l'affiche dans le DOM
        console.log(alertPrompt);
    }
    else if (guess.length > 3) { // Si l'utilisateur tente un mot entier
        tryNumb++; // On ajoute un essai
        failNumb++; // On enregistre un fail
        leftTry = motLong*2 - failNumb; // refresh
        alertPrompt = "Vous faites <strong>erreur</strong> ! <strong>"+leftTry+"</strong> essais restants"; // Je définis un message d'erreur
        uiAlert.innerHTML = alertPrompt; // Je l'affiche dans le DOM
        console.log(alertPrompt);
        // guessLetter(); // On repart au début de la fonction
    }
    else if (alreadyTested.indexOf(guess) != -1) { // Si la lettre a déjà été proposée
        tryNumb++; // On ajoute un essai au compteur car...
        failNumb++; // ...ça compte aussi comme un fail, vu que le joueur a les essais sous les yeux
        leftTry = motLong*2 - failNumb; // refresh
        alertPrompt = "<strong>Déjà essayé</strong>, <strong>"+leftTry+"</strong> essais restants";
        uiAlert.innerHTML = alertPrompt;
        console.log(alertPrompt);
        // guessLetter(); // On repart au début de la fonction
    }
    else { // Si aucune exception n'est rencontrée, c'est parti pour le début de la fin, une grande boucle va tourner
        alreadyTested.push(guess); // Premièrement, j'ajoute la saisie au tableau des... saisies :) Et ce à chaque tour donc. 
        addInTable(guess);
        tryNumb++; // On ajoute un essai au compteur
        if (soluce.indexOf(guess) == -1 ) { // Direct après, je vérifie si la saisie est absente du tableau soluce.
            failNumb++; // Si la saisie est fausse, non seulement j'te colle un fail... 
            leftTry = motLong*2 - failNumb; // refresh
            alertPrompt = "<strong>Nope</strong>, plus que <strong>"+leftTry+"</strong> erreurs possibles";
            uiAlert.innerHTML = alertPrompt;
            console.log(alertPrompt);
            // guessLetter(); // ... mais en plus tu retourne au début!
        } 
        else {
            console.log("passed"); // Du coup, seuls les résultats positifs passent à la suite du code
            
            /* 
            Le for me permet de faire une boucle (dans un boucle, absolument) un certain nombre de fois (ici, la longueur du mot "motLong")
            À chaque tour, la variable i augmente de 1. Au départ elle vaut 0. 
            Cette boucle permet comparer la saisie avec une lettre du mot à chaque tour. Le fait que i augmente de 1 va me permettre de cibler la lettre suivante à chaque tour. 
            */
            for (i=0;i<motLong;i++) {  // L'ordre des termes étant important, je ne fais PAS for (let i in motLong)

                if (guess == soluce[i]) // Si la saisie == la lettre ciblée par l'index i dans le tableau soluce
                {
                    console.log(">catch "+guess+" at "+i);

                    found.splice(i,1,guess); // On fait entrer la lettre saisie (guess) dans le tableau found à l'emplacement i. Càd à sa place dans l'ordre du mot. 
                    winCount++; // On indique qu'une lettre à été trouvée
                    console.log("win: "+winCount);
                    promptMot = found.join(" "); 
                    uiTry.innerHTML = promptMot; // On actualise l'aperçu du mot dans le prompt
                    console.log(">>"+found[i]+" est ajouté à found à l'index "+i+" ("+winCount+" lettres ont été trouvées)");
                }
            } // la raison cette boucle un peu spéciale est de trouver toutes les lettres identiques en seul tour car telles sont les règles du pendu
            /* 
            Une fois que la boucle a fini de routourner, 
            On vérifie si le joueur a trouvé toutes les lettres en comparant le compteur de lettres trouvées avec la longueur du mot. 
            */
            if (winCount == motLong) { // Si le compte y est, félicitations, bravo, congratulations ! Les esclaves peuvent arrêter de tourner, le jeu est terminé tu as gagné !
                gameWin(); // Go fonction win :)
            } 
        } // La fin du else de comparaison
    } // La fin du grand else des exceptions
} // La fin de la déclaration guessLetter();
// Faut pas oublier de faire tourner la routourne en lançant la fonction principale ! :D 
if (init == false) {
    initialize();
    init = true;
}
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