/*__________Spiel-Menü__________*/
//Spiel wird standardmässig als 'off' deklariert
let gameOff = true;
let scoreP1 = 0;
let scoreP2 = 0;

//Das Spiel beginnt mit Spieler 1.
function startGame(playerNumber = 1) {
    let startScreen = document.getElementById('mainScreen');
    let secondPlayerScreen = document.getElementById('secondPlayerScreen');
    let startDiv = document.getElementById('buttonGame');
    let controlsScreen = document.getElementById('steuerung');
    let gameCanvas = document.getElementById('canvas');
    let endGameScreen = document.getElementById('endGameScreen');
    let nameInputScreen = document.getElementById('insertName');
    //Beim Knopfdruck 'Start Game': die auf 'none' gesetzten Teile sind verborgen, die auf 'block' gesetzten Teile sind sichtbar
    startScreen.style.display ='none';
    secondPlayerScreen.style.display = 'none';
    controlsScreen.style.display ='none';
    startDiv.style.display = 'none';
    gameCanvas.style.display = 'grid';
    endGameScreen.style.display = 'none';
    nameInputScreen.style.display = 'none';
    
    
    //Punkte gehen zuerst zum Spieler 1. Punkte beim Spieler 2 set auf 0.
    if (playerNumber == 1) {
        scoreP1 = 0;
        scoreP1Anzeige.innerHTML = scoreP1; 
        scoreP2 = 0;
        scoreP2Anzeige.innerHTML = scoreP2;
    }
    let gameOff = false; //Spiel ist nicht mehr 'off' > Startet Spiel bzw. Animationen

/*__________Spielstart__________*/
    if (gameOff == false) { //wenn 'false' - führt den ganzen unteren Code aus:
        generateMap(); //erzeugt die Map beim Start & Spieler-Wechsel neu 
        /*__________Timer, Player 2, Winner__________*/
        //Timer
        let timeLeft = 20; //Wie viele Einheiten bis Ende des Countdowns.
        const countdownElement = document.getElementById('timeCountdown'); //Verbindung mit spielen.html
        const timerId = setInterval(countdown, 1000); //Wie gross ist 1 Einheit: 1000ms=1s. Also ich will Countdown von 20 bis 0, wo 1=1s ist.

        countdownElement.innerHTML = timeLeft + 's';
        //Wenn die Zeit abläuft. Der Timer wird auf 0 gesetzt, und der entsprechende Bildschirm und Titel werden angezeigt.
        function countdown() {
            countdownElement.innerHTML = --timeLeft + 's';
            if (timeLeft == 0) {
                clearTimeout(timerId);
                timeRanOut();
            }
        }
        function timeRanOut() {
        //Was passiert, wenn die Zeit abläuft, während Ply1 oder Ply 2 spielt.
            cancelAnimationFrame(animationId);
            //Das Spiel vom Ply1 ist am Ende. Ply2 startet.
            if (playerNumber == 1) {
                startNewPlayer();
            } else {
            //Endbildschirm wird angezeigt. Ply2 am Ende.
                declareWinner();
                updateLocalStorage()
                endGame();
            }
        }
        //Player 2
        function startNewPlayer() {
        //Ein neues Spiel beginnt mit playerNumber = 2 eingestellt werden. Mehr im spielen.html
            let secondPlayerScreen = document.getElementById('secondPlayerScreen');
            let gameCanvas = document.getElementById('canvas');
            secondPlayerScreen.style.display = 'grid';
            gameCanvas.style.display = 'none';
            endGameScreen.style.display = 'none';
        }
        //Winner
        function endGame() {
        //Bildschirm am Ende, Punkte gezeigt, Nachricht
            let endGameScreen = document.getElementById('endGameScreen');
            let gameCanvas = document.getElementById('canvas');
            secondPlayerScreen.style.display = 'none';
            gameCanvas.style.display = 'none';
            endGameScreen.style.display = 'grid';
        }
        function declareWinner() {
        //3 Optionen beim Vergleich des Ergebnisses am Ende. Mit entsprechenden Glückwünschen.
            if (Number(scoreP1) > Number(scoreP2)) {
                winner = document.getElementById('namePlayer1').value + ' has won. Congrats ' + document.getElementById('namePlayer1').value + '!';
                winnerAnzeige.innerHTML = winner;
            } else if (Number(scoreP1)<Number(scoreP2)) {
                winner = document.getElementById('namePlayer2').value + ' has won. Congrats ' + document.getElementById('namePlayer2').value + '!';
                winnerAnzeige.innerHTML = winner;
            } else {
                winner = "It's a tie! Play again?";
                winnerAnzeige.innerHTML = winner;
            }
        }
        /*__________Ende: Timer, Player 2, Winner__________*/
        /*__________Spielelemente__________*/
        // Settings
        const halfWidth = Boundary.width / 2;
        const halfHeight = Boundary.height / 2;
        // PacMan
        const player = new Player ({
            position: { x: Boundary.width * 11 + halfWidth, y: Boundary.height * 13 + halfHeight }, // Position innerhalb des Spielfelds
            velocity: { x: 0, y: 0 } // Anfangsgeschwindigkeit - erst durch Tastendruck bewegen
        });
        // Ghosts
        const ghostStartY = Boundary.height * 9 + halfWidth; // Startposition Y-Achse
        const ghosts = [ // Ghosts mit unterschiedliche Farben und Startpositionen X-Achse
            { x:8, color:'red' }, { x: 9, color: 'pink' }, { x:10, color: 'orange' }, { x: 11, color: 'cyan' }].map(ghost => new Ghost ({
                position: {x: Boundary.width * ghost.x + halfWidth, y: ghostStartY},
                velocity: { x: 1, y: 0 }, // Anfangsgeschwindigkeit
                color: ghost.color,
            }));
        // Fruits
        const randomFruitPicture = Math.floor( Math.random() * fruitPictures.length); // nach Zufallsprinzip aus dem Array auswählen
        const fruit = new Fruit({
            position: { x: Boundary.width * 12, y: Boundary.height * 13}, // festgelegte Position
            image: createImage( fruitPictures[randomFruitPicture] )
        });
        /*__________Ende: Spielelemente__________*/
        /*_________Animation-Loop__________*/
        let animationId;
        //Kernspiel = animate()
        function animate() { 
            animationId = requestAnimationFrame(animate); //Teilt Browser mit, dass wir eine Animation durchführen möchten
            c.clearRect(0, 0, canvas.width, canvas.height); //Reinigt der 'canvas' bei jedem Frame > verhindert Ratenschwanz der bewegende Objekte (PacMan/Ghosts) > erzeugt eine smoothe Bewegung
            /*__________PacMan Animationen__________*/
            player.update(); // Geschwindigkeit, Chomp- & Dying-Animationen
            //Vorausschauende Steuerung
            //Erklärung if-Statements:
            /*  else if: Problem - wenn eine Taste der oberen Ebene gedrückt & nicht losgelasen wird, reagieren die unteren Ebenen nicht mehr
                Lösung  > && lastKey: Durch die Überschreibung der 'lastKey' wird es möglich z.B. zuerst 'w' und dann 'a' zu drücken (& gedrückt halten) und sich trotzdem in die erwünschte Richtung bewegen,
                        weil die obere Bedingung nicht mehr erfüllt wird. Somit liest der Code die weitere 'else if'-Statements (lastKey wird zu 'a' & man hat zwei 'pressed'-Werte)
                Folge   > Ermöglicht das 'spamen' von Tasten und eine Senk- bzw. Waagrechte Bewegung, da immer nur eine Geschwindigkeit gleichzeit geändert wird */
            /*__________Ende: PacMan Animationen__________*/
            /*__________Fruits Animationen__________*/
            fruit.draw(); //Aktuallisierung Fuits - Erscheinen und Verschwinden
           
            //Welche Bedingungen erfüllt sein müssen, damit die Früchte verschwinden
            if(fruit.visible == true && circleCollidesWithRectangle({
                    circle: player, 
                    rectangle: fruit})) 
            {   //Das Obst verschwindet von der Karte und der aktive Spieler erhält die festgelegte Anzahl an Punkten.
                fruit.hideFruit(); 
                if (playerNumber == 1) {
                    scoreP1 +=25; //zählt sie zum bisherigen ergebnis
                    scoreP1Anzeige.innerHTML = scoreP1; //zeigt die Punkte an
                } else if (playerNumber == 2) { //gleiches für spieler 2
                    scoreP2 +=25;
                    scoreP2Anzeige.innerHTML = scoreP2;
                }    
            }
            /*__________Ende: Fruits Animationen__________*/
            /*__________Kollision Pellet und Pacman__________*/
            for(let i = pellets.length - 1; 0 <= i; i--) {
                const pellet = pellets[i];
                pellet.draw();
                if (//wenn sich die beiden berühren
                    Math.hypot(
                        pellet.position.x - player.position.x,
                        pellet.position.y - player.position.y
                    ) < pellet.radius + player.radius
                    ) {
                        pellets.splice(i, 1) //entfernt pellet
                        if (playerNumber == 1) {//zählen der punkte für Spieler 1
                            scoreP1 +=10; //zählt sie zum bisherigen ergebnis
                            scoreP1Anzeige.innerHTML = scoreP1; //zeigt die Punkte an
                        }
                        else if (playerNumber == 2) {//gleiches für spieler 2
                            scoreP2 +=10;
                            scoreP2Anzeige.innerHTML = scoreP2;
                        }
                    }
            }
            /*__________Ende: Kollision Pellet und Pacman__________*/            
            /*__________Kolliosion PowerUp und Pacman__________*/
            for(let i = powerUps.length - 1; 0 <= i; i--) {
                const powerUp = powerUps[i];
                powerUp.draw();
                if (//wenn sich die beiden berühren
                    Math.hypot(
                        powerUp.position.x - player.position.x,
                        powerUp.position.y - player.position.y
                    ) <powerUp.radius + player.radius
                    ){
                        powerUps.splice(i, 1) //entfernt powerup von spielfeld
                        ghosts.forEach(ghost =>{ //stellt alle Geister auf scared um
                            ghost.scared=true;
                            setTimeout(() => { //definierte Zeit, wie lange der zustand dauert
                                ghost.scared = false
                            }, 5000)
                        })
                        if (playerNumber == 1) { 
                            scoreP1 +=10; //zählt sie zum bisherigen Ergebnis
                            scoreP1Anzeige.innerHTML = scoreP1; //zeigt die Punkte an
                        } else if (playerNumber == 2) {//gleiches für Spieler 2
                            scoreP2 +=10;
                            scoreP2Anzeige.innerHTML = scoreP2;}
                    }
            }
            /*__________Ende: Kolliosion PowerUp und Pacman__________*/
            /*__________Ghosts Animationen__________*/
            ghosts.forEach(ghost => {
                ghost.update(); //lässt die Geister auf dem Bildschirm erscheinen
                //Kolliosion Ghosts mit Pacman
                if (Math.hypot( //wenn sich geist und player berühren
                    ghost.position.x - player.position.x,
                    ghost.position.y - player.position.y
                ) < ghost.radius + player.radius
                ) {
                    if (ghost.scared) { //zustand scared (wenn pacman powerup gegessen hat)
                        ghost.position.x = Boundary.width * 1 + Boundary.width / 2;
                        ghost.position.y = Boundary.height * 1 + Boundary.height / 2;
                        //neue position des geistes oben links in ecke
                        if (playerNumber == 1) { //passt score spieler 1 an
                            scoreP1 +=50;
                            scoreP1Anzeige.innerHTML = scoreP1;
                        } else if (playerNumber == 2) {//passt score spieler 2 an
                            scoreP2 +=50;
                            scoreP2Anzeige.innerHTML = scoreP2;
                        }
                    } else if (player.dieAnimation == false) { //wenn pacman ohne powerup ist
                        player.preventInput == true;
                        if (playerNumber == 1) { //passt score player 1 an
                            scoreP1 -=50;
                            scoreP1Anzeige.innerHTML = scoreP1;
                        } else if (playerNumber == 2) { //passt score player 2 an
                            scoreP2 -=50;
                            scoreP2Anzeige.innerHTML = scoreP2;
                        }
                        ghost.velocity.y = 0; //stellt geschiwindigkeit ghost auf 0
                        //lässt pacman sterben, pacman beginnt in sich selbst zu zerfallen für die in setTimeout eingestellte Zeit
                        player.dieAnimation = true; //bool. auf true
                        player.preventInput = true;
                        ghosts.forEach(ghost => { //lässt geister pausieren für die in setTimeout eingestellte Zeit
                            ghost.onPause = true;
                    })
                    //Für 1000 Millisekunden stirbt der Pacman, und die Geister bleiben stehen (sind onPause)
                    // dann wurde setTimeout unter ausfegührt = Pacman & 1 Geist gehen auf die neue Position.
                    setTimeout(function () { 
                        player.position.x = Boundary.width * 1 + Boundary.width / 2; //lässt Pacman in ersten spalte mittig erscheinen
                        player.position.y = Boundary.height * 11 + Boundary.height / 2;
                        player.radians = 0.75;
                        player.openRate = 0.12;
                        player.dieAnimation = false; //bool. auf false
                        player.preventInput = false;
                        ghost.position.x = Boundary.width * 11 + Boundary.width / 2; //setzt den geist der pacman gefressen hat an neue position (vordefiniert)
                        ghost.position.y = Boundary.height * 9 + Boundary.height / 2;
                        ghosts.forEach(ghost => {
                            ghost.onPause = false;
                        })
                    }, 1000); //So lange möchte ich, dass Pacman stirbt und die Geister stillstehen (in Millisekunden)
                    }
                } //Ende: Kollision Ghosts mit Pacman
                //Kollision der Geister mit den Wänden - Algorithmus Geister-Bewegung
                const collisions = [];
                // Wird nur eingesetzt, wenn der Geist erkennt, dass er rechts keine Wand (!collisions.includes('right')) hat.
                boundaries.forEach(boundary => {
                    if (!collisions.includes('right') && circleCollidesWithRectangle({
                            circle: {...ghost, velocity: {x:3, y:0}},
                            rectangle: boundary})
                    ) {collisions.push('right')}
                    // Wird nur eingesetzt, wenn der Geist erkennt, dass er links keine Wand hat.
                    if (!collisions.includes('left') && circleCollidesWithRectangle({
                            circle: { ...ghost, velocity: {x:-3, y:0}},
                            rectangle: boundary})
                    ) {collisions.push('left')}
                    // Wird nur eingesetzt, wenn der Geist erkennt, dass er oben keine Wand hat.
                    if (!collisions.includes('up') &&
                        circleCollidesWithRectangle({
                            circle: {...ghost, velocity: {x:0, y:-3}},
                            rectangle: boundary})
                    ) {collisions.push('up')}
                    // Wird nur eingesetzt, wenn der Geist erkennt, dass er unten keine Wand hat.
                    if (!collisions.includes('down') && circleCollidesWithRectangle({
                            circle: {...ghost, velocity: {x:0,y:3}},
                            rectangle: boundary
                        })
                    ) {collisions.push('down')}
                    // Wenn die Länge der Kollision (z.B. 'right', 'left', 'up') länger ist als
                    // die vorherige Kollision ('right', 'left') kommt der Code zum Einsatz (this.prevCollisions = [] Zeile)
                    if (collisions.length > ghost.prevCollisions.length){
                        ghost.prevCollisions = collisions;
                    }
                })
                // Legt fest, in welche Richtung der Geist potenziell gehen kann.
                if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
                    if (ghost.velocity.x > 0) {ghost.prevCollisions.push('right')}
                    else if (ghost.velocity.x < 0) {ghost.prevCollisions.push('left')}
                    else if (ghost.velocity.y < 0) {ghost.prevCollisions.push('up')}
                    else if (ghost.velocity.y > 0) {ghost.prevCollisions.push('down')}
                    const pathways = ghost.prevCollisions.filter(collision => {
                        return !collisions.includes(collision)});
                    // Nachdem ermittelt wurde, welche Richtungen der Geist noch gehen kann
                    // wird per Zufall entschieden welche der möglichen Richtungen der Geist nimmt.
                    const direction = pathways[Math.floor(Math.random() * pathways.length)];
                    // Wechselt die Richtung des Geists
                    switch (direction) {
                        case 'down':
                            ghost.velocity.y = 3; //Langsamere Geschw. als PacMan (vereinfacht das Abhauen und Essen)
                            ghost.velocity.x = 0;
                            break
                        case 'up':
                            ghost.velocity.y = -3;
                            ghost.velocity.x = 0;
                            break
                        case 'right':
                            ghost.velocity.y = 0;
                            ghost.velocity.x = 3;

                            break
                        case 'left':
                            ghost.velocity.y = 0;
                            ghost.velocity.x = -3;
                            break
                    }
                    ghost.prevCollisions = []; //Hilft zur Filterung möglicher Pathways
                } //Ende: Kollision der Geister mit den Wänden 
            }
            /*__________Ende: Ghosts Animationen__________*/
            )
        }
        /*__________Ende: Animation-Loop__________*/
        animate(); //Ausführen der Animationen = Eigentliches Spiel
    }
} /*__________Ende: Spielstart__________*/
