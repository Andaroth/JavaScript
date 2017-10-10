var alertMsg = "";
var tryCount = 0;
var min = 20;
var max = 80;

function myRand(min,max) {
    var result = Math.round( Math.floor(Math.random()*(max-min)) +min );
    return result;
}

function gameWin() {
    console.log("Réussi en "+tryCount+" essai(s) !");
    document.write("Réussi en "+tryCount+" essai(s) !");
}
    
function main() {
    var input = window.prompt(alertMsg+" - Trouvez le nombre mystère","");
    tryCount++;
    
    if (input==goal) {
        gameWin();
    }
    else if (input>goal) {
        alertMsg = "C'est moins";
        main();
    } else if (input<goal) {
        alertMsg = "C'est plus";
        main();
    }
}

var goal = myRand(min,max);
main(); 