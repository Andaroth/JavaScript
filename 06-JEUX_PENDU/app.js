var init = false;
let soluce = [];
let found = [];
var motMystere; // On enregistre le mot recherché pour le sortir à la fin en mode suspens
var promptMot; // Le mot pour afficher le mot caché dans le prompt
var alertPrompt; // Une chaîne pour indiquer l'erreur du joueur dans le prompt
var motLong = 0; // La longueur du mot
var winCount = 0; // Le compteur de réussites
var tryNumb = 0; // Le nombre d'essais
var failNumb = 0; // Un compteur d'échecs
var leftTry = motLong - failNumb; // Le nombre d'essais restants
var guess;
let alreadyTested = []; // je créé un tableau pour enregistrer les essais du joueur

function gameOver() {
    var lostMsg = "Vous avez perdu... le pendu est PENDU !!! tin tiin~";
    // alert(lostMsg);
    document.getElementById("alert").innerHTML = lostMsg;
}
// Je créé à l'avance la fonction gameWin.
function gameWin() {
    console.log("Win !");
    var winMsg = "Félicitations !! \nVous avez réussi en "+tryNumb+" essai(s). Le mot était donc "+motMystere+" et vous vous êtes trompé "+failNumb+" fois.";
    // alert(winMsg);
    document.getElementById("form").innerHTML = "";
    document.getElementById("alert").innerHTML = winMsg;
}
function addInTable(arg) {
    var parent = document.getElementById("try_list");
    var newLi= document.createElement("li");
    newLi.innerHTML = arg;
    parent.appendChild(newLi);
}
function reset() {
    // Reset
    soluce;
    found = [];
    // Restart all
    initialize();
}
// Fonction pour définir le mot à rechercher
function strToTable(arg) {
    if (arg != undefined) {
        arg = arg.toUpperCase();
        soluce = arg.split("");
        if (soluce.indexOf(" ") != -1) {
            alert("Pas d'espaces !");
            reset();
        }
        else if (soluce.length < 3) {
            alert("3 caractères minimum");
            reset();
        }
        else {
            for (let i in soluce) {
                found.splice(i,1,"_");
            }
        }
    }
    motMystere = soluce.join(""); // On enregistre le mot recherché pour le sortir à la fin en mode suspens
    promptMot = found.join(" "); // Le mot pour afficher le mot caché dans le prompt
    alertPrompt = ""; // Une chaîne pour indiquer l'erreur du joueur dans le prompt
    motLong = soluce.length; // La longueur du mot
    leftTry = motLong - failNumb; // Le nombre d'essais restants
    document.getElementById("try_show").innerHTML = promptMot; 
    console.log(soluce);
    console.log(found);
}

// La fonction qui se lance au démarrage
function initialize() {
    var selectSoluce = window.prompt("Choisissez un mot à faire deviner :");
    strToTable(selectSoluce); // Choisir le mot à deviner
    document.getElementById("prompt").setAttribute( "autocomplete", "off" );
    document.getElementById("prompt").focus();
}
// La fonction principale
function guessLetter() {
    document.getElementById("alert").innerHTML = "";
    if (leftTry == 0) { // On vérifie d'abord si le joueur n'a pas cramé tous ses essais
        gameOver(); // Sinon c'est bye bye, ciao, à la prochaine, merci d'être passé
    }
     // var guess = window.prompt(alertPrompt+"\nEssayez de trouver les lettres du pendu : \n"+promptMot,""); // Je demande la saisie au joueur
    guess = document.getElementById("prompt").value;
    document.getElementById('prompt').value = ""; 
    guess = guess.toUpperCase(); // Je dois mettre la lettre en MAJUSCULE pour qu'elle corresponde exactement à l'entrée du tableau
    strToTable();
    console.log("< you typed "+guess);
    /* 
        Je dois créer une boucle qui va tester la saisie.
        Mais d'abord, je vais tester quelques exceptions, au cas où l'utilisateur fait des choses imprévues par la boucle. Je fais cela grâce à if et else if. 
    */
    if (guess == motMystere) { // Si le joueur entre direct le mot recherché
        tryNumb++; // On ajoute un essai au compteur, car ça compte quand-même. 
        promptMot = soluce.join(" ");
        document.getElementById("try_show").innerHTML = promptMot; 
        document.getElementById("alert").innerHTML = alertPrompt;
        console.log("GUESS RIGHT !!!");
        gameWin(); // Et c'est gagné :)
    }
    else if (guess == " ")  {
        alertPrompt = "<strong>Pas d'espaces</strong>, recommencez"; 
        document.getElementById("alert").innerHTML = alertPrompt;
        console.log(alertPrompt);
    }
    else if (guess.length != 1) { // Si l'utilisateur n'a rien rempli ou si il a mis plusieurs caractères
        alertPrompt = "<strong>Mauvaise saisie</strong>, recommencez"; // Je définis un message d'erreur
        document.getElementById("alert").innerHTML = alertPrompt;
        console.log(alertPrompt);
        // guessLetter(); // On repart au début de la fonction
    }
    else if (alreadyTested.indexOf(guess) != -1) { // Si la lettre a déjà été proposée
        tryNumb++; // On ajoute un essai au compteur car...
        failNumb++; // ...ça compte aussi comme un fail, vu que le joueur a les essais sous les yeux
        leftTry = motLong - failNumb; // refresh
        alertPrompt = "<strong>Déjà essayé</strong>, "+leftTry+" essais restants";
        document.getElementById("alert").innerHTML = alertPrompt;
        console.log(alertPrompt);
        // guessLetter(); // On repart au début de la fonction
    }
    else { // Si aucune exception n'est rencontrée, c'est parti pour le début de la fin, une grande boucle va tourner
        alreadyTested.push(guess); // Premièrement, j'ajoute la saisie au tableau des... saisies :) Et ce à chaque tour donc. 
        addInTable(guess);
        tryNumb++; // On ajoute un essai au compteur
        console.log(soluce);
        if (soluce.indexOf(guess) == -1 ) { // Direct après, je vérifie si la saisie est absente du tableau soluce.
            failNumb++; // Si la saisie est fausse, non seulement j'te colle un fail... 
            leftTry = motLong - failNumb; // refresh
            alertPrompt = "<strong>Nope</strong>, "+leftTry+" essais restants";
            document.getElementById("alert").innerHTML = alertPrompt;
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
            for (i=0;i<motLong;i++) { 

                if (guess == soluce[i]) // Si la saisie == la lettre ciblée par l'index i dans le tableau soluce
                {
                    console.log(">catch "+guess+" at "+i);

                    found.splice(i,1,guess); // On fait entrer la lettre saisie (guess) dans le tableau found à l'emplacement i. Càd à sa place dans l'ordre du mot. 
                    winCount++; // On indique qu'une lettre à été trouvée
                    console.log("win: "+winCount);
                    promptMot = found.join(" "); 
                    document.getElementById("try_show").innerHTML = promptMot; // On actualise l'aperçu du mot dans le prompt
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
        }
        
         
    } // La fin du grand else des exceptions
} // La fin de la déclaration guessLetter();
// Faut pas oublier de faire tourner la routourne en lançant la fonction principale ! :D 
if (init == false) {
    initialize();
    init = true;
}

document.getElementById("send").onclick = function(){
    guessLetter();
};