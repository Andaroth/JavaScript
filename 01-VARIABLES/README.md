# L'exercice 1

J'ai pris un malin plaisir à tout taper dans un .html sans faire de .js à part. 

J'ai utilisé `document.write` pour -en plus- sortir les résultats en HTML, pour ne pas avoir systématiquement besoin d'aller dans le debugger pour voir les résultats. 

Voici mon code, l'ami : 
```javascript
// vars
var childNmb = 3;
var femName = "Gérard";
var pays = "Bulgarie";
var work = "Dresseur Pokémon";

var thisYear = new Date();
thisYear = thisYear.getFullYear();

var bornYear = 1993;
var myAge = (thisYear - bornYear);
var maxAge = 100;
var food = "Pim's";
var conso = "25";

var maxConso = ((conso*365)*(maxAge-myAge));

// "app"
console.log("Vous serez "+work+" et habiterez à "+pays+" et marié à "+femName+" avec "+childNmb+" enfants.");
document.write("<br/>&gt; Vous serez "+work+" et habiterez à "+pays+" et marié à "+femName+" avec "+childNmb+" enfants.");

console.log((thisYear - bornYear));
document.write("<br/>&gt; "+(thisYear - bornYear));

console.log("Il vous reste "+maxConso+" de "+food+" avant d'atteindre l'âge de "+maxAge+" ans.");
document.write("<br/>&gt; Il vous reste "+maxConso+" de "+food+" avant d'atteindre l'âge de "+maxAge+" ans.");


// résolution du calcul var result = (1 + 2) * 3 + 4 / 2;

var result = ((3)*3)+(4/2); 
    result = (3)*3 + 2;
    result = 9 + 2;
    result = 11;
console.log(result);
document.write("<br>&gt; Résult : "+result);
```