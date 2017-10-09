// vars
var minVar = Math.min(7,5,-12,6,32,18,14,-2);
console.log(minVar);
var maxVar = Math.max(-3,9,21,36,27,54,17,35);
console.log(maxVar);
var sumVar = minVar + maxVar;
console.log(sumVar);
console.log("Quelle est la grande réponse ?");

// rand 1
var floatBateau = 10.4;
var couleBateau = Math.floor(floatBateau);
var voleBateau = Math.ceil(floatBateau);

// rand 5 

// le random, peut importe ce qui tombe, est multiplié par cinquante (donc désormais compris entre 0 et 50) puis floor pour un entier (pas nécessaire si tu veux des décimales). Le nombre le plus petit possible étant 0, je fais +50 et miracle, la var est comprise entre 50 et 100. 
var randFirst = Math.floor(Math.random()*50)+50;
console.log("randfirst: "+randFirst);

// ici, peut importe le résultat du random, grâce à round il sera arrondi soit à 0 soit à 1, quoi qu'il arrive car ce sont les deux seules entiers les plus proches possibles. 
var randSecnd = Math.round( Math.random() );
console.log("randsecond: "+randSecnd);

// Le random *10 pour être entre 0 et 10. Le ceil permet de n'avoir que des entiers mais surtout d'augmenter la probabilité d'obtenir le nombre 10. 
var randTrois = Math.ceil( Math.random() *10);
console.log("randtrois: "+randTrois);


let cQuoiLeNomDuJeu = ["Goro","Johnny Cago","Kano","Liu Kano","Raiden","Reptil","Scorption","Shang","Tsun","Sonya","Sub-Zero"];
// Alors ici je random, ensuite je multiplie par la longueur du tableau pour être compris entre 0 et 11. Je floor pour un entier, si je ceil je risque d'être au dessus de la limite. 
var randChar = Math.floor(Math.random()*(cQuoiLeNomDuJeu.length));
console.log(randChar);
randChar = cQuoiLeNomDuJeu[randChar]; // Ensuite j'utilise ce random pour sélectionner un index dans le tableau.
console.log("chara: "+randChar);