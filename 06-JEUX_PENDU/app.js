// Toutes les variables globales
let soluce = ["L","O","V","E","L","A","C","E"]; // Le mot qui valait trois milliards
let found =  ["_","_","_","_","_","_","_","_"]; // un tableau (found) de la même longueur pour placer les lettres qu'on a trouvées
var motMystere = soluce.join(""); // On enregistre le mot recherché pour le sortir à la fin en mode suspens
var promptMot = found.join(" "); // Le mot pour afficher le mot caché dans le prompt
var alertPrompt = ""; // Une chaîne pour indiquer l'erreur du joueur dans le prompt
var motLong = soluce.length; // La longueur du mot
var winCount = 0; // Le compteur de réussites
var tryNumb = 0; // Le nombre d'essais
var failNumb = 0; // Un compteur d'échecs
var leftTry = motLong - failNumb; // Le nombre d'essais restants
let alreadyTested = []; // je créé un tableau pour enregistrer les essais du joueur
// Je créé à l'avance la fonction gameOver.
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
    document.getElementById("alert").innerHTML = winMsg;
}
function addInTable(arg) {
    var parent = document.getElementById("try_list");
    var newLi= document.createElement("li");
    newLi.innerHTML = "<li>"+arg+"</li>";
    parent.appendChild(newLi);
}

function initialize() {
    document.getElementById("try_show").innerHTML = promptMot;
    document.getElementById("prompt").setAttribute( "autocomplete", "off" );
}

// La fonction principale
function guessLetter() {
    if (leftTry == 0) { // On vérifie d'abord si le joueur n'a pas cramé tous ses essais
        gameOver(); // Sinon c'est bye bye, ciao, à la prochaine, merci d'être passé
    }
     // var guess = window.prompt(alertPrompt+"\nEssayez de trouver les lettres du pendu : \n"+promptMot,""); // Je demande la saisie au joueur
    var guess = document.getElementById("prompt").value;
    document.getElementById('prompt').value = ""; 
    guess = guess.toUpperCase(); // Je dois mettre la lettre en MAJUSCULE pour qu'elle corresponde exactement à l'entrée du tableau
    addInTable(guess);
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
    else if (guess.length != 1) { // Si l'utilisateur n'a rien rempli ou si il a mis plusieurs caractères
        alertPrompt = "! Mauvaise saisie, recommencez"; // Je définis un message d'erreur
        document.getElementById("alert").innerHTML = alertPrompt;
        console.log(alertPrompt);
        // guessLetter(); // On repart au début de la fonction
    }
    else if (alreadyTested.indexOf(guess) != -1) { // Si la lettre a déjà été proposée
        tryNumb++; // On ajoute un essai au compteur car...
        failNumb++; // ...ça compte aussi comme un fail, vu que le joueur a les essais sous les yeux
        leftTry = motLong - failNumb; // refresh
        alertPrompt = "X Déjà essayé, "+leftTry+" essais restants";
        document.getElementById("alert").innerHTML = alertPrompt;
        console.log(alertPrompt);
        // guessLetter(); // On repart au début de la fonction
    }
    else { // Si aucune exception n'est rencontrée, c'est parti pour le début de la fin, une grande boucle va tourner
        alreadyTested.push(guess); // Premièrement, j'ajoute la saisie au tableau des... saisies :) Et ce à chaque tour donc. 
        tryNumb++; // On ajoute un essai au compteur
        if (soluce.indexOf(guess) == -1 ) { // Direct après, je vérifie si la saisie est absente du tableau soluce.
            failNumb++; // Si la saisie est fausse, non seulement j'te colle un fail... 
            leftTry = motLong - failNumb; // refresh
            alertPrompt = "X Nope, "+leftTry+" essais restants";
            document.getElementById("alert").innerHTML = alertPrompt;
            console.log(alertPrompt);
            
            // guessLetter(); // ... mais en plus tu retourne au début!
        } 
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
    } // La fin du grand else des exceptions
} // La fin de la déclaration guessLetter();
// Faut pas oublier de faire tourner la routourne en lançant la fonction principale ! :D 
initialize();
document.getElementById("send").onclick = function(){guessLetter()};