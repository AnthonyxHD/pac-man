//Funktion schaut, ob es Eingabe richtig ist (3 Teile: nicht leer, Zeichen, Länge.).
//Wenn alles ok, fängt das Spiel.
//Andernfalls erscheint ein Pop-up-Fenster, in dem steht, was genau man vor dem Spielen korrigieren muss.
function checkIfValidName(input) {
    //Var wo es kleine/grossere Buchstaben und leere Platz ist.
    var onlyWords = /^[a-zA-Z\s]+$/;
    //3 Teile
    //1 Prüfung, ob es für beide Spieler eine Eingabe gibt.
    if (input.length < 1) {
        throw 'Bitte Namen für Spieler 1 und Spieler 2 eingeben. (Buchstaben und Leerzeichen verwenden.)';
    //2 Prüfung, ob es nur Buchstaben und Leerzeichen gibt.
    } else if (!onlyWords.test(input)) {
        throw 'Ungültige Eingabe. Bitte nur Text eingeben (Buchstaben und Leerzeichen).';
    //3 Überprüfung, ob die Eingabe nicht zu lang ist.
    } else if (input.length > 12) {
        throw 'Der Dateiname ist zu lang, bitte die Länge auf 12 Zeichen begrenzen.';
    } 
  }

function startGameButtonPressed() {
    try { 
        checkIfValidName(document.getElementById('namePlayer1').value);
        checkIfValidName(document.getElementById('namePlayer2').value);
    } catch (err) {
        alert(err);
        return;
    }
    saveName();
    startGame();
}

//Namen + Punktzahl im localStorage speichern falls der name neu ist
function saveName() {
    const namePlayer1 = document.getElementById('namePlayer1').value;
    const namePlayer2 = document.getElementById('namePlayer2').value;
    let savedName = localStorage.getItem('savedName');
    if (savedName) {
        savedName = JSON.parse(savedName);
    } else {
        savedName = {};
    }
    if (!savedName[namePlayer1]) {
        savedName[namePlayer1] = {score: 0 };
    }

    if (!savedName[namePlayer2]) {
        savedName[namePlayer2] = {score: 0 };
    }

    localStorage.setItem('savedName', JSON.stringify(savedName));

    //Anstelle von 'Spieler1' und 'Spieler2' werden Eingaben auf dem Bildschirm zwischen den beiden gespielten Spielen und auf dem Endscreen angezeigt.
    document.getElementById('secondPlayerScreenHeader').innerHTML = namePlayer1;
    document.getElementById('endGameScreenHeader').innerHTML = '<span>' + namePlayer2 + "<br>time's up!</span>";
    document.getElementById('secondPlayerScreenButtonText').innerHTML = namePlayer2 + ' start';
}
//lädt die letzen beiden aktiven player
function loadName() {
    let savedName = localStorage.getItem('savedName');
    if (savedName) {
        savedName = JSON.parse(savedName);
        const namePlayer1 = document.getElementById('namePlayer1').value;
        const namePlayer2 = document.getElementById('namePlayer2').value;
        if (savedName[namePlayer1]) {
          document.getElementById('namePlayer1').value = namePlayer1;
        }
        if (savedName[namePlayer2]) {
          document.getElementById('namePlayer2').value = namePlayer2;
        }
    }
}
//Nach Spielende Spielstand eintragen, falls er besser ist als der letzte
function updateLocalStorage() {
    const namePlayer1 = document.getElementById('namePlayer1').value;
    const namePlayer2 = document.getElementById('namePlayer2').value;
    const scoreP1 = document.getElementById('scoreP1Anzeige').innerText;
    const scoreP2 = document.getElementById('scoreP2Anzeige').innerText;
    let savedName = localStorage.getItem('savedName');
    savedName = savedName ? JSON.parse(savedName) : {};
    if (savedName[namePlayer1]?.score < scoreP1) {
        savedName[namePlayer1] = { score: scoreP1 };
    }
    if (savedName[namePlayer2]?.score < scoreP2) {
    savedName[namePlayer2] = { score: scoreP2 };
    }
    localStorage.setItem('savedName', JSON.stringify(savedName));
}
//erstellt Rangliste mit den besten 10 Spielergebnissen
function scoreRecords() {
    let savedName = localStorage.getItem('savedName');
    if (savedName) {
      savedName = JSON.parse(savedName);
      const leaderBoard = document.getElementById('leaderBoard');
      // Sortiere die Spieler nach ihren Punktzahlen in absteigender Reihenfolge
      const sortedPlayers = Object.entries(savedName).sort(
        (a, b) => b[1].score - a[1].score
      );
      // Begrenze die Anzahl der angezeigten Spieler auf maximal 10
      const topPlayers = sortedPlayers.slice(0, 10);
      // Erstelle die Rangliste
      for (let i = 0; i < topPlayers.length; i++) {
        const player = topPlayers[i][0];
        const score = topPlayers[i][1].score;
        leaderBoard.innerHTML += `<p>${i + 1}. ${player}: ${score}</p>`;
      }
    }
}
