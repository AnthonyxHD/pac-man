/*__________Ghosts__________*/
//Definiert Ghosts
class Ghost {
    //Grundeinstellungen
    constructor({position, velocity, color}) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 14; //Grösse Geister
        this.color = color; //keine vordefinierte Farbe, da unterschiedlich
        this.prevCollisions = []; //Kollisionen für Mögliche Pathways
        this.scared = false; //Beängstigt - bei PowerUp
        this.onPause = false;
    } //Pausiert - Wechsel zum 2nd Player
    //Stetige Aktuallisierung
    update() {
            this.draw()
            if (this.onPause == false) { //Nur wenn nicht-Pausiert aktuallisieren
                this.position.x += this.velocity.x; //Addiert die Geschindigkeit zur Position: Erzeugt Bewegung
                this.position.y += this.velocity.y;
            }
    }
    //Visualisieren
    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2); //Kreis
        c.fillStyle = this.scared ? 'blue' : this.color ;//Wenn beängstigt = 'blue', ansonsten vorgegebene Farbe
        c.fill();
        c.closePath;
    }
}