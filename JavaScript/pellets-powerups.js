/*__________Pellets__________*/
//Definiert Punkte die von Pacman gefressen werden
class Pellet  {
    //Grundeinstellungen
    constructor({position}) {
        this.position = position;
        this.radius = 3; //Grösse
    }
    //Visualisieren
    draw() { 
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle='white'; //Farbe
        c.fill();
        c.closePath();
    }
}
//Für Erzeugung Pellets
const pellets = [];
/*__________PowerUps__________*/
//Deffiniert Power-Up für Pacman um Geister zu fressen
class PowerUp  {
    //Grundeinstellungen
    constructor({position}) {
        this.position = position;
        this.radius = 9; //Grösse
    }
    //Zeichnungs-Funktion Kreis
    draw() { 
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle='white'; //Farbe
        c.fill();
        c.closePath()};
}
//Für Erzeugung PowerUps
const powerUps = [];