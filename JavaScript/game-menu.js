/*__________Menüs__________*/
//Menü, um Spielsteuerung zu anzuschauen
function controlsGame() {
    let startScreen = document.getElementById('mainScreen');
    let startDiv = document.getElementById('buttonGame');
    let controlsScreen = document.getElementById('steuerung');
    let gameCanvas = document.getElementById('canvas');
    let nameInputScreen = document.getElementById('insertName');
    let backGame = document.getElementById('back');
    //Beim Knopfdruck 'Steuerung': die auf 'none' gesetzten Teile sind verborgen, die auf 'grid' gesetzten Teile sind sichtbar
    startScreen.style.display ='none';
    controlsScreen.style.display ='grid';
    startDiv.style.display = 'none';
    gameCanvas.style.display = 'none';
    nameInputScreen.style.display ='none';
}

//Button nach Spielende, zum Spielmenü zurück
function backGame() {
    let startScreen = document.getElementById('mainScreen');
    let startDiv = document.getElementById('buttonGame');
    let controlsScreen = document.getElementById('steuerung');
    let nameInputScreen = document.getElementById('insertName');
    let gameCanvas = document.getElementById('canvas');
    let scoreScreen = document.getElementById('scoreScreen');
    //Beim Knopfdruck 'back': die auf 'none' gesetzten Teile sind verborgen, die auf 'grid' gesetzten Teile sind sichtbar
    startScreen.style.display ='grid';
    controlsScreen.style.display ='none';
    startDiv.style.display = 'block';
    gameCanvas.style.display = 'none';
    endGameScreen.style.display = 'none';
    nameInputScreen.style.display ='none';
    scoreScreen.style.display = 'none';
}

//Button um Namen einzugeben
function insertName(){
    //Beim Knopfdruck 'back': die auf 'none' gesetzten Teile sind verborgen, die auf 'grid' gesetzten Teile sind sichtbar
    let startScreen = document.getElementById('mainScreen');
    let startDiv = document.getElementById('buttonGame');
    let controlsScreen = document.getElementById('steuerung');
    let nameInputScreen = document.getElementById('insertName');
    let gameCanvas = document.getElementById('canvas');
    let scoreScreen = document.getElementById('scoreScreen');
    startScreen.style.display ='none';
    controlsScreen.style.display ='none';
    nameInputScreen.style.display ='grid';
    startDiv.style.display = 'block';
    gameCanvas.style.display = 'none';
    endGameScreen.style.display = 'none';
    scoreScreen.style.display = 'none';
}

//Spielrekorde
function screenScoreRecords(){
    //Beim Knopfdruck 'back': die auf 'none' gesetzten Teile sind verborgen, die auf 'grid' gesetzten Teile sind sichtbar
    let startScreen = document.getElementById('mainScreen');
    let startDiv = document.getElementById('buttonGame');
    let controlsScreen = document.getElementById('steuerung');
    let nameInputScreen = document.getElementById('insertName');
    let scoreScreen = document.getElementById('scoreScreen');
    let gameCanvas = document.getElementById('canvas');
    startScreen.style.display ='none';
    controlsScreen.style.display ='none';
    nameInputScreen.style.display ='none';
    startDiv.style.display = 'none';
    gameCanvas.style.display = 'none';
    endGameScreen.style.display = 'none';
    scoreScreen.style.display = 'grid';
}