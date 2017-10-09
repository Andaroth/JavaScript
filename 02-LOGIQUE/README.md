# L'exercice 2

C'était très facile avec l'habitude. La seule vraie difficulté est de respecter certains principes de logique et mathématique. Voici mon code : 

```javascript
// part 1
var lang = "fr";
var saveMsg;
switch (lang) {
    case "fr":
        saveMsg = "Bonjour tout le monde";
        break;
    case "en":
        saveMsg = "Hello World";
        break;
    case "es":
        saveMsg = "Hola, Mundo";
        break;
    default:
        saveMsg = "Cheatin' uh";
        break;
}
console.log(saveMsg+" !");
document.write("<br/>&gt; "+saveMsg+" !");

// part 2
var score = 70;
var rank;

if (score>=90) {
    rank = "A";
}
else if ( (score<90) && (score>=50) ) {
    rank = "B";
}
else {
    rank = "C";
}
console.log("Vous avez le rang "+rank+" !");
document.write("<br/>&gt; Vous avez le rang "+rank+" !");

// part 3
var item = "chaussette"
var quant = 1;
var string;

if (quant>1) {
    item = item+"s";
}
string = "Je possède "+quant+" "+item;

console.log(string+" !");
document.write("<br/>&gt; "+string+" !");
```