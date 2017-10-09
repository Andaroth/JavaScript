// Toutes les variables globales
let soluce = ["L","O","V","E","L","A","C","E"]; // Le mot qui valait trois milliards
let found =  ["_","_","_","_","_","_","_","_"]; // un tableau (found) de la même longueur pour placer les lettres qu'on a trouvées
var motMystere = soluce.join(""); // On enregistre le mot recherché pour le sortir à la fin en mode suspens
var promptMot; // Le mot pour afficher le mot caché dans le prompt
var alertPrompt = ""; // Une chaîne pour indiquer l'erreur du joueur dans le prompt
var motLong = soluce.length; // La longueur du mot
var winCount = 0 // Le compteur de réussites
var tryNumb = 0; // Le nombre d'essais
var failNumb = 0; // Un compteur d'échecs
var leftTry = motLong - failNumb; // Le nombre d'essais restants
let alreadyTested = []; // je créé un tableau pour enregistrer les essais du joueur

function gameOver() {
    alert("Vous avez perdu... le pendu est PENDU !!! tin tiin~");
}

function gameWin() {
    console.log("Win !");
    alert("Félicitations !! \nVous avez réussi en "+tryNumb+" essai(s). Le mot était donc "+motMystere+" et vous vous êtes trompé "+failNumb+" fois.");
}

function guessLetter() {
    
    if (leftTry == 0) { // On vérifie d'abord si le joueur n'a pas cramé tous ses essais
        gameOver(); // Sinon c'est bye bye
    }
    
    promptMot = found.join(); // On assemble les lettres trouvées à chaque tour pour les montrer au joueur. 
    
    var guess = window.prompt(alertPrompt+"\nEssayez de trouver les lettres du pendu : \n"+promptMot,"");
    guess = guess.toUpperCase(); // Je dois mettre la lettre en MAJUSCULE pour qu'elle corresponde exactement à l'entrée du tableau
    console.log("< you typed "+guess);
    
    if (guess == motMystere) { // Si le joueur entre direct le mot recherché
        tryNumb++;
        console.log("GUESS RIGHT !!!");
        gameWin(); // C'est gagné :)
    }
    if (guess.length != 1) { // Si l'utilisateur n'a rien rempli ou si il a mis plusieurs caractères
        alertPrompt = "! Mauvaise saisie, recommencez";
        console.log(alertPrompt);
        guessLetter(); // On repart au début de la fonction
    }
    else if (alreadyTested.indexOf(guess) != -1) { // Si la lettre a déjà été posée
        tryNumb++; // On ajoute un essai au compteur à chaque tour(ça compte)
        failNumb++; // Ca compte aussi
        leftTry = motLong - failNumb; // refresh
        alertPrompt = "X Déjà essayé, "+leftTry+" essais restants";
        console.log(alertPrompt);
        guessLetter(); // On repart au début de la fonction
    }
    else { // Si aucune exception n'est rencontrée, c'est parti pour le début de la fin, une grande boucle va tourner
        alertPrompt = ""; // Pas d'alerte
        alreadyTested.push(guess); // Premièrement, j'ajoute la saisie au tableau des... saisies :) Et ce à chaque tour
        tryNumb++; // On ajoute un essai au compteur à chaque tour
        
        if (soluce.indexOf(guess) == -1 ) { // Direct après, je vérifie si la saisie est absente du tableau soluce.
            failNumb++; // Si la saisie est fausse, non seulement j'te colle un fail... 
            leftTry = motLong - failNumb; // refresh
            alertPrompt = "X Nope, "+leftTry+" essais restants";
            console.log(alertPrompt);
            
            guessLetter(); // ... mais en plus tu retourne au début!
        } 
        console.log("passed");
        
        /* 
            Le for me permet de faire une boucle un certain nombre de fois (ici, la longueur du mot "motLong")
            À chaque tour, la variable i augmente de 1. Au départ elle vaut 0. 
            Cette boucle permet comparer la saisie avec une lettre du mot à chaque tour. Le fait que i augmente de 1 à chaque tour va me permettre de cibler la lettre suivante à chaque tour. 
        */
        for (i=0;i<motLong;i++) { // 

            if (guess == soluce[i]) // Si la saisie == la lettre
            {
                console.log(">catch "+guess+" at "+i);

                found.splice(i,1,guess); // On fait entrer la lettre saisie (guess) dans le tableau found à l'emplacement i. Càd à sa place dans l'ordre du mot. 
                winCount++; // On indique qu'une lettre à été trouvée

                console.log(">>"+found[i]+" est ajouté à found à l'index "+i+" ("+winCount+" lettres ont été trouvées)");
            }
        } // la boucle permet de trouver toutes les lettres identiques d'un coup car telles sont les règles du pendu
        
        /* 
            Une fois que la boucle a fini de routourner, 
            On vérifie si le joueur a trouvé toutes les lettres en comparant le compteur de lettres trouvées avec la longueur du mot. 
        */
        if (winCount != motLong) { // Si le compte n'y est pas, on retourne directement dans la boucle !
            guessLetter();
        }
        else { // Sinon félicitations, bravo, congratulations ! 
            gameWin(); // Go fonction win :)
        }  
    } // La fin d'un grand else

}
// Faut pas oublier de faire tourner la routourne en lançant la fonction ! :D 
guessLetter();