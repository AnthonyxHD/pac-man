/*__________Canvas__________*/
const canvas = document.querySelector('canvas'); //Greift auf 'canvas' in der Spielseite
const c = canvas.getContext('2d'); //Ermöglicht das Zeichnen & Manipulieren von Bilder innerhalb des 'canvas'
canvas.width = 736;
canvas.height = 736; //Vordefiniert Spielfeldgrösse (Entscheid durch Gruppe B)

/*__________Boundary / Grenzen__________*/
class Boundary {
    //Grundeinstellungen
    static width = 32;
    static height = 32; //Vordefinierte Grösse für ein 'Viereck' (im Zusammenhang mit Grösse 'canvas')
    constructor({position, image}) { 
        this.position = position;
        this.width = 32;
        this.height = 32;
        this.image = image};
    //Aussehen
    draw() {c.drawImage(this.image, this.position.x, this.position.y)};
}
const boundaries = []; //Leeres Array wird mit Bilder befüllt


/*__________Board / Spielfeld__________*/
const map = [ //Repräsentation des Spielfelds
    ['1', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'z', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', '2'],  // 1           Legende:
    ['b', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'b', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'b'],  // 2           a: Wand Horizontal
    ['b', '.', '5', 'a', '6', '.', '1', 'a', 'a', '2', '.', 'b', '.', '1', 'a', 'a', '2', '.', '5', 'a', '6', '.', 'b'],  // 3           b: Wand Vertikal 
    ['b', '.', '.', '.', 'p', '.', 'b', ' ', ' ', 'b', '.', 'b', '.', 'b', ' ', ' ', 'b', '.', '.', '.', 'p', '.', 'b'],  // 4           
    ['b', '.', '5', 'a', '6', '.', '4', 'a', 'a', '3', '.', '7', '.', '4', 'a', 'a', '3', '.', '5', 'a', '6', '.', 'b'],  // 5           1: Kurve Oben: Links
    ['b', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'b'],  // 6           2: Kurve Oben: Rechts
    ['b', '.', '5', 'a', '6', '.', '8', '.', '5', 'a', 'a', 'z', 'a', 'a', '6', '.', '8', '.', '5', 'a', '6', '.', 'b'],  // 7           3: Kurve Unten: Rechts
    ['b', '.', '.', '.', '.', '.', 'b', '.', '.', '.', '.', 'b', '.', '.', '.', '.', 'b', '.', '.', '.', '.', '.', 'b'],  // 8           4: Kurve Unten: Links
    ['b', '.', '1', 'a', '2', '.', 'w', 'a', 'a', '6', '.', '7', '.', '5', 'a', 'a', 'y', '.', '1', 'a', '2', '.', 'b'],  // 9           
    ['b', '.', 'b', ' ', 'b', '.', 'b', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'b', '.', 'b', ' ', 'b', '.', 'b'],  // 10          5: Boundary-Ende: Links
    ['b', '.', '4', 'a', '3', '.', '7', '.', '5', 'a', 'a', 'a', 'a', 'a', '6', '.', '7', '.', '4', 'a', '3', '.', 'b'],  // 11          6: Boundary-Ende: Rechts
    ['b', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'b'],  // 12          7: Boundary-Ende: Unten
    ['b', '.', '1', 'a', '2', '.', '8', '.', '5', 'a', 'a', 'a', 'a', 'a', '6', '.', '8', '.', '1', 'a', '2', '.', 'b'],  // 13          8: Boundary-Ende: Oben
    ['b', '.', 'b', ' ', 'b', '.', 'b', '.', '.', '.', '.', ' ', '.', '.', '.', '.', 'b', '.', 'b', ' ', 'b', '.', 'b'],  // 14          
    ['b', '.', '4', 'a', '3', '.', '4', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', '3', '.', '4', 'a', '3', '.', 'b'],  // 15          z: Verbindung T-Kurve: Oben
    ['b', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'b'],  // 16          y: Verbindung T-Kurven: Rechts
    ['b', '.', '5', 'a', 'a', '2', '.', '5', 'a', '6', '.', '8', '.', '5', 'a', '2', '.', '8', '.', '1', '2', '.', 'b'],  // 17          x: Verbindung T-Kurven: Unten
    ['b', '.', '.', '.', 'p', 'b', '.', '.', '.', '.', '.', 'b', '.', '.', '.', 'b', '.', 'b', '.', 'b', 'b', '.', 'b'],  // 18          v: Verbindung 4+ Kurven: alle Seiten
    ['b', '.', '1', '2', '.', 'b', '.', '8', '.', '5', 'a', 'v', 'a', '6', '.', '7', '.', 'b', '.', '4', '3', '.', 'b'],  // 19
    ['b', '.', 'b', 'b', '.', 'b', '.', 'b', '.', '.', '.', 'b', '.', '.', '.', '.', '.', 'b', 'p', '.', '.', '.', 'b'],  // 20
    ['b', '.', '4', '3', '.', '7', '.', '4', 'a', '6', '.', '7', '.', '5', 'a', '6', '.', '4', 'a', 'a', '6', '.', 'b'],  // 21
    ['b', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'b'],  // 22
    ['4', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', '3'],  // 23
]; // 1    2    3    4    5    6    7    8    9    10   11   12   13   14   15   16   17   18   19   20   21   22   23

//Bilder einfügen
function createImage(src) {
    const image = new Image(); //erzeugt ein neues Bild
    image.src = src; //definiert, dass es eine Quelle braucht
    return image; //gibt ein Bild zurück
}

//Visuelle generierung
function generateMap () {
    map.forEach((row, i) => { 
        row.forEach((symbol, j) =>{ 
            const position = { //Position für Boundaries
                x: Boundary.width * j,
                y: Boundary.height * i
            };
            const positionPP = { //Position für Pellets & PowerUps (PP)
                x: Boundary.width * j + Boundary.width /2,
                y: Boundary.height * i + Boundary.height /2 //Addition & Division lässt 'Kreise' in der Mitte des Vierecks erscheinen
            };
            const imgPaths = { //Pfade zu Bondary-Bilder
                'a': '../referenzen/images/game/boundaryHorizontal.png', //alle Bilder mit PS erstellt
                'b': '../referenzen/images/game/boundaryVertikal.png',
                '1': '../referenzen/images/game/boundaryKurve1.png',
                '2': '../referenzen/images/game/boundaryKurve2.png',
                '3': '../referenzen/images/game/boundaryKurve3.png',
                '4': '../referenzen/images/game/boundaryKurve4.png',
                '5': '../referenzen/images/game/bondaryEndeLinks.png',
                '6': '../referenzen/images/game/bondaryEndeRechts.png',
                '7': '../referenzen/images/game/bondaryEndeUnten.png',
                '8': '../referenzen/images/game/bondaryEndeOben.png',
                'z': '../referenzen/images/game/boudaryVerbindenOben.png',
                'y': '../referenzen/images/game/boudaryVerbindenRechts.png',
                'x': '../referenzen/images/game/boudaryVerbindenUnten.png',
                'w': '../referenzen/images/game/boudaryVerbindenLinks.png',
                'v': '../referenzen/images/game/boudaryVerbindenAlle.png',
            };
            //Symbole innerhalb von 'map' durch Bilder ersetzen:
            if (symbol === ' ') { //Startposition Player ist leer, hier soll nichts eingefügt werden
            } else if (symbol === '.') {
                pellets.push( new Pellet({ position: positionPP})); //ersetz '.' durch Pellet
            } else if (symbol === 'p') {
                powerUps.push( new PowerUp({ position: positionPP})); //ersetzt 'p' durch PowerUp
            } else {
                boundaries.push( new Boundary({ position , image: createImage(imgPaths[symbol])})); //ersetzt Symbole durch alle übrige Fälle (gem. Legende)
            };
        })
    })
 }