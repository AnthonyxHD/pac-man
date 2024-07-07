/*__________Fruits__________*/
//Definiert Fruits
class Fruit {
    //Grundeinstellungen
    constructor({ position, image }) {
        this.position = position;
        this.image = image;
        this.width = 32; //Vordefinierte Grösse gem. Boundary (soll ein ganzer 'Viereck' verwenden > collission.js)
        this.height = 32;
        const fruit = this;
        setTimeout(function () {
            fruit.showFruit();
        }, 8000)
    }; //Frucht erscheint ' ' Millisekunden nach dem Start

    //Zeigt Fruits
    showFruit() {
        this.visible = true;
        const fruit = this;
        setTimeout(function () {
            fruit.hideFruit();
        }, 5000)
    }; //Frucht verschwindet ' ' Millisekunden nach Erscheinen
   
    //Versteckt Fruits
    hideFruit() {
        this.visible = false; //Frucht verschwindet nach der eingestellten Zeit in showFruit
    }; 
   
    //Visualisieren
    draw() {
        if (this.visible) { //Nur wenn sichtbar
            c.drawImage(this.image, this.position.x, this.position.y);
        }
    };
}

//Pfade zu Fruits-Bilder
const applePicture = '../referenzen/images/game/apple.png';
const cherryPicture = '../referenzen/images/game/cherry.png';
const melonPicture = '../referenzen/images/game/melon.png';
const orangePicture = '../referenzen/images/game/orange.png';
const strawberryPicture = '../referenzen/images/game/strawberry.png';

//fruitPictures ist ein Array von Bildern.
const fruitPictures = [applePicture, cherryPicture, melonPicture, orangePicture, strawberryPicture];

