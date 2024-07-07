/*__________PacMan__________*/
class Player {
    // Grundeinstellungen
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 14; // Grösse PacMan
        this.radians = 0.75; // Grösse Mund
        this.openRate = 0.12; // Geschwindigkeit Chomp-Animation
        this.rotation = 0; // Start-Richtung: schaut nach Rechts
        this.dieAnimation = false;
        this.preventInput = false;
    }
    // Aktuallisierung
    update() {
        this.draw();
        this.collisionWall() ;
        this.chomping();
        this.dying();
        this.handleInput();
        this.position.x += this.velocity.x; // Addiert die Geschindigkeit zur Position: Erzeugt Bewegung
        this.position.y += this.velocity.y;
    }
    // Visualisierung
    draw() {
        c.save(); // Globaler 'canvas'-Funktion nur auf diesen Teil
        // Rotation bei Chop-Animation
        c.translate( this.position.x, this.position.y); // Rotation vom PacMan-Zentrum (ansonsten globale Funktion)
        c.rotate( this.rotation);
        c.translate( -this.position.x, -this.position.y); // Ende: Rotation vom PacMan-Zentrum
        // PacMan visualisieren
        c.beginPath()
        c.arc( this.position.x, this.position.y, this.radius, this.radians, Math.PI * 2 - this.radians ); // Kreis
        c.lineTo( this.position.x, this.position.y ); // Mund
        c.fillStyle='yellow'; // Farbe
        c.fill();
        c.closePath();
        c.restore(); // Ende: Globaler 'canvas'-Funktion nur auf diesen Teil
    }
    // Kollisionen
    collisionWall() {
        boundaries.forEach((boundary) => {
            boundary.draw();
            if (circleCollidesWithRectangle({ circle: this, rectangle: boundary })) {
                this.velocity.x = 0, this.velocity.y = 0;
            }        
        })
    }
    // Animationen
    chomping() {
        // boolesche Logik. Was passiert, wenn dieAnimaton true/false ist.
        if (this.dieAnimation) { // pacman stirbt
            this.velocity.x = 0; // Geschwindigkeit setzt auf Null für die Zeit der Animation
            this.velocity.y = 0;
            if (this.radians < Math.PI *2) { 
                this.radians += 0.05;
            } // Pacman zerfällt in sich selbst
        } else { // Chomp-Animation: stetiger Wechsel zwischen 0 und 0.75 in vorgegeber Geschwindigkeit
            if (this.radians < 0 || this.radians > 0.75) {
                    this.openRate = -this.openRate;
            }
            this.radians += this.openRate;
        }
    }
    dying() {
        // Spieler-Rotation für Dying-Animation
        if (this.velocity.x > 0) {
            this.rotation = 0;
        }
        else if (this.velocity.x < 0) {
            this.rotation = Math.PI;
        }
        else if (this.velocity.y > 0) {
            this.rotation = Math.PI / 2;
        }
        else if (this.velocity.y < 0) {
            this.rotation = Math.PI * 1.5;
        }
    }
    handleInput() {
        if (this.preventInput === true) {
            return;
        }
        if (keys.w.pressed && lastKey === 'w') { //Fall: nach Oben
            for (let i = 0; i <boundaries.length; i++) {
                const boundary = boundaries[i];
                if (circleCollidesWithRectangle({ //Wenn Spieler mit Boundary kollidiert (prüft alle Richtungen) - in desem Fall relevant, Kollision nach Oben
                    circle: this, //und er sich mit -3.5 Geschw. nach oben bewegt
                    rectangle: boundary})){
                        this.velocity.y = 0; //Soll Spieler stehen bleiben
                        break;
                } else {
                    this.velocity.y = -3.5;
                } //Ansonsten soll er sich nach oben bewegen
            } 
        } else if (keys.a.pressed && lastKey === 'a') { //Weitere Fälle dito oben - andere Geschw. geprüft/geändert
            for (let i = 0; i <boundaries.length; i++) {
                const boundary = boundaries[i]
                if (circleCollidesWithRectangle({ 
                    circle: this, 
                    rectangle: boundary})) {
                        this.velocity.x = 0;
                        break;
                } else {
                    this.velocity.x = -3.5;
                }
            }
        } else if (keys.s.pressed && lastKey === 's') {
            for (let i = 0; i <boundaries.length; i++) {
                const boundary = boundaries[i];
                if (circleCollidesWithRectangle({
                    circle: this, 
                    rectangle: boundary})){
                        this.velocity.y = 0;
                        break;
                } else {
                    this.velocity.y = 3.5;
                }
            } 
        } else if (keys.d.pressed && lastKey === 'd') {
            for (let i = 0; i <boundaries.length; i++) {
                const boundary = boundaries[i];
                if (circleCollidesWithRectangle({
                    circle: this, 
                    rectangle: boundary})){
                        this.velocity.x = 0;
                        break;
                } else {
                    this.velocity.x = 3.5;
                }
            }
        }
    }
}