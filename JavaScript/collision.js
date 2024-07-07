/*__________Collision-Funktion_________*/
//Für Kollission zwischen sich bewegende Objekte (PacMan/Ghosts) und Inhalte des Boards
function circleCollidesWithRectangle({circle, rectangle}) {
    return ( //ACHTUNG: Wenn wir die Geschwindigkeit der Geister erhöhen, muss ein padding miteinberechnet werden!!!
        circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height &&
        circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x &&
        circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&
        circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width)
}

//Verwendet für:
// - PacMan-Steuerung
// - PacMan vs Boundary
// - PacMan vs Fruit
// - Ghosts-Steurung