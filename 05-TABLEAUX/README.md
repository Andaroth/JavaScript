# Exercice 5

Un peu de révision sur les tableaux, j'ai redécouvert la puissance des for et des length dans les tableaux, c'est super pratique. 

Code : 
```javascript
//part 1
let table = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var sum = 0;
// dans le for, je peux décider que la limite de la boucle soit "table.length", c'est à dire la longueur du tableau
for (i=0;i<table.length;i++) {
    // je peux décider d'ajouter à sum la valeur actuelle du tableau grâce à table[i]
    sum = sum+table[i];
    console.log(sum);
    document.write("<br/>&gt; "+sum);
}

//part 2
let actors = ["Stalone","Radcliff","Di Caprio"];
var varie;
for (i=0;i<actors.length;i++) {

    switch (i) {
        case 0:
            varie = "premier";
            break;
        case 1:
            varie = "deuxième";
            break;
        case 2:
            varie = "troisième";
            break;
        default:
            varie = "ERROR";
            break;
    }

    actors[i] = "Le "+varie+" acteur est "+actors[i];
    console.log(actors[i]);
    document.write("<br/>&gt; "+actors[i]);

}

//part 3
let nintendo = ["Mario", "Luigi", "Peach"];

for (i=0;i<nintendo.length;i++) {
    console.log(nintendo[i]);
    document.write("<br/>&gt; NINTENDO "+nintendo[i]);
}

let copy = nintendo;
copy.push("Bowser");

for (i=0;i<copy.length;i++) {
    console.log(copy[i]);
    document.write("<br/>&gt; COPY "+copy[i]);
}
```