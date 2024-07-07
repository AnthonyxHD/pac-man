//Menü, um Spielsteuerung anzuzeigen
function controlsGame1() {
    let mainScreenQuiz = document.getElementById('mainScreenQuiz');
    let knowledgeQuiz = document.getElementById('knowledgeQuiz');
    let backGameButton = document.getElementById('back'); // Geändert: allgemeiner Back-Button
    //Beim Klick auf 'wissensquiz': die auf 'none' gesetzten Teile sind verborgen, die auf 'block' gesetzten Teile sind sichtbar
    mainScreenQuiz.style.display = 'none';
    knowledgeQuiz.style.display = 'grid';
    backGameButton.style.display = 'block';
}

//Button, um zum Spielmenü zurückzukehren
function backHomeQuiz() {
    let mainScreenQuiz = document.getElementById('mainScreenQuiz');
    let knowledgeQuiz = document.getElementById('knowledgeQuiz');
    let backGameButton = document.getElementById('back');
    let interactiveQuiz = document.getElementById('interactiveQuiz');
    mainScreenQuiz.style.display = 'grid';
    knowledgeQuiz.style.display = 'none';
    backGameButton.style.display = 'block';
    interactiveQuiz.style.display = 'none';
}
//blendet overlays aus
function controlsGame2() {
    let mainScreenQuiz = document.getElementById('mainScreenQuiz');
    let interactiveQuiz = document.getElementById('interactiveQuiz');
    let backGameButton = document.getElementById('back'); 
    //Beim Klick auf 'wissensquiz': die auf 'none' gesetzten Teile sind verborgen, die auf 'block' gesetzten Teile sind sichtbar
    mainScreenQuiz.style.display = 'none';
    interactiveQuiz.style.display = 'block';
    backGameButton.style.display = 'block';
}
