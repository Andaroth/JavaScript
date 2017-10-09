# L'exercice 4

Simplement utiliser des `for` pour ne pas devoir se taper toutes les opérations d'incrémentation à chaque fois. C'est plus rapide mais ça demande de savoir clairement ce qu'on fait. 

Voici mon code : 

```javascript
// part 1
for (i=0;i<21;i++) {
    if ((i%2)==0) {
        console.log(i+" est pair");
        document.write(i+" est pair<br/>");
    }
    else {
        console.log(i+" est impair");
        document.write(i+" est impair<br/>");
    }
}

// part 2
for (i=0;i<11;i++) {
    console.log(i+" *9 = "+(i*9));
    document.write(i+" * 9 = "+(i*9)+"<br/>");
}


//part 3
var rank;
for (i=0;i<101;i++) {

    if (i>=90) {
        rank = "A";
    }
    else if ( (i<=90) && (i>80) ) {
        rank = "B";
    }
    else if ( (i<=80) && (i>70) ) {
        rank = "C";
    }
    else if ( (i<=70) && (i>65) ) {
        rank = "D";
    }
    else {
        rank = "F";
    }
    console.log("Pour "+i+" points vous avez le grade "+rank);
    document.write("<br>&gt; Pour "+i+" points vous avez le grade "+rank);

}

// part 3
var txt = "";
for (i=0;i<6;i++) {
    console.log(txt);
    document.write(txt+"<br/>");
    txt = txt+"* ";
}
```