let soluce = ["B","O","N","J","O","U","R"];
let found = ["","","","","","", ""];

var limit = soluce.length;

let alreadyTested = [];

var guess;

var tryNumb = 0;

var guessLetter = function() {
    guess = window.prompt("Essayez de trouver les lettres du pendu","");
    guess = guess.toUpperCase();
    console.log("you typed "+guess);
    
    if (guess.length != 1) {
        console.log("Un seul caractère...");
    }
    else if (alreadyTested.indexOf(guess) != -1) {
        console.log("Déjà entré :/");
    }
    
    alreadyTested.push(guess);
    tryNumb++;
    
    
    
    for (i=0;i<soluce.length;i++) {
        
        // Si il trouve !
        if (guess == soluce[i])
        {
            console.log("catch "+guess+" at "+i);
            
            
            found.splice(i,1,guess);
            limit--;
            
            console.log(found[i]+" est ajouté à found à l'index "+i+" (il reste "+limit+" lettres à trouver)");

        }
        
    }
    
    if (limit != 0) {
        guessLetter();
    }
    else {
        console.log("FOUND == SOLUCE ! END now !");
        document.write("<br/>&gt; Vous avez réussi en "+tryNumb+" essais. Le mot était ");
        
        for (i=0;i<soluce.length;i++) {
            document.write(found[i]);
        }
        document.write(" et vous vous êtes trompé <strong>"+(tryNumb-(found.length)+1)+"</strong> fois. ");
        
        if (alreadyTested.length > 0) {
            document.write("<br/><br/>Vous avez essayé :<ul>")
            for (i=0;i<alreadyTested.length;i++) {
                document.write("<li>"+alreadyTested[i]+"</li>");
            }
            document.write("</ul>")
        }
        
    }

}
guessLetter();