/*__________Controlls__________*/
//Standardeinstellungg - keine Taste 'pressed' - PacMan soll sich erst durch einen Tastendruck bewegen & nicht automatisch
const keys = {
    w: {pressed: false},
    a: {pressed: false},
    s: {pressed: false},
    d: {pressed: false}
};
let lastKey = ' '; //Merkt sich, welche Taste zuletzt gedrückt wurde - siehe gameplay Zeile: 294 - 347 (Vorausschauende Steuerung)

/*__________Events__________*/
//Startet die Bewegung
window.addEventListener('keydown', ({key}) => { //Wechselt wenn Taste gedrückt wird
    switch (key) {
        case 'w':
        case 'W':
            keys.w.pressed = true 
            lastKey = 'w' //lastKey-Wert wird überschrieben - siehe gameplay Zeile: 294 - 347 (Vorausschauende Steuerung)
            break
        case 'a':
        case 'A':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 'd':
        case 'D':
            keys.d.pressed = true
            lastKey = 'd'
            break
        case 's':
        case 'S':
            keys.s.pressed = true
            lastKey = 's'
            break
    }
})

//Loslassen einer Taste
window.addEventListener('keyup', ({key}) => {
    switch (key) { //Wechselt auf Standardeinstellung wenn Taste losgelassen wird
        case 'w':
        case 'W':
            keys.w.pressed = false
            break
        case 'a':
        case 'A':
            keys.a.pressed = false
            break
        case 'd':
        case 'D':
            keys.d.pressed = false
            break
        case 's':
        case 'S':
            keys.s.pressed = false
            break
    }
})
//Wenn zwei Tasten gleichzeitig gedürckt werden, erhalten wir einen doppelten 'true'-Wert
// Folge > Ermöglicht zu merken, wenn zwei Tasten gleichzeitig gedürckt werden
//         - siehe gameplay Zeile: 294 - 347 (Vorausschauende Steuerung)
