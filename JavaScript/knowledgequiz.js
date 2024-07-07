//Quelle:
//https://www.youtube.com/watch?v=G53tItybUjI

//Definition der Variablen
  let points;
  let numberOfRounds;
  let roundCounter;
  const arrayQuestions = [];
  let rightAnswer;
  let locked;
  let scoreText;

//Frage und Antwortmöglichkeiten werden ausgeblendet
  document.getElementById('idQuestion').style.visibility = 'hidden';
  document.getElementById('idAnswer1').style.visibility = 'hidden';
  document.getElementById('idAnswer2').style.visibility = 'hidden';
  document.getElementById('idAnswer3').style.visibility = 'hidden';
  document.getElementById('idAnswer4').style.visibility = 'hidden';

//Quiz wird gestartet, wenn man auf den Button drückt
  function startQuiz(){
      points = 0; //Punkte zu Beginn auf 0 gesetzt
      numberOfRounds = 22; //Das Quiz hat 22 Runden
      roundCounter = 0; //Rundenzähler zu Beginn auf 0 gesetzt
      //Fragen und Antwortmöglichkeiten sollen angezeigt werden
      document.getElementById('idQuestion').style.visibility = 'visible';
      document.getElementById('idAnswer1').style.visibility = 'visible';
      document.getElementById('idAnswer2').style.visibility = 'visible';
      document.getElementById('idAnswer3').style.visibility = 'visible';
      document.getElementById('idAnswer4').style.visibility = 'visible';
      generateQuestions(); //Funktion um die Fragen zu generieren soll aufgerufen werden
      startRound(); //Funktion die Runde zu starten soll aufgerufen werden
  }

//Funktion um die Fragen zu generieren
  function generateQuestions(){
      arrayQuestions[0] = 'Was ist der Name der Hauptfigur in Pac-Man?# Blinky# Inky# Clyde# Pac-Man# Pac-Man';
      arrayQuestions[1] = 'Was passiert, wenn Pac-Man eine Power-Pille isst?# Er wird grösser# Er wird unverwundbar und kann Geister essen# Er wird kleiner# Er verliert ein Leben# Er wird unverwundbar und kann Geister essen';
      arrayQuestions[2] = 'Wie viele Punkte erhält man beim Original-Pacman, wenn man eine Kirsche isst?# 100# 200# 300# 400# 100';
      arrayQuestions[3] = 'Wie viele spielbare Levels hat das Original-Pac-Man?# 30# 31# 255# 256# 256';
      arrayQuestions[4] = 'Wie lautet der Name der Firma, die das Original-Pac-Man hergestellt hat?# Namco# Atari# Konami# Capcom# Namco';
      arrayQuestions[5] = 'Wie heisst das Gespenst, das sich in Pac-Man zufällig bewegt?# Pinky# Blinky# Inky# Clyde# Clyde';
      arrayQuestions[6] = 'Was ist das Ziel des Spiels Pac-Man?# Alle Pillen im Labyrinth zu essen# Alle Geister zu besiegen# Ein bestimmtes Level zu erreichen# So viele Punkte wie möglich zu sammeln# Alle Pillen im Labyrinth zu essen';
      arrayQuestions[7] = 'Was war der ursprüngliche japanische Name von Pac-Man?# Puck-Man# Munch-Man# Ghost-Man# Eat-Man# Puck-Man';
      arrayQuestions[8] = 'Was war das erste Jahr, in dem Pac-Man veröffentlicht wurde?# 1979# 1980# 1981# 1982# 1980';
      arrayQuestions[9] = 'Wie viele Geister verfolgen Original-Pac-Man im Spiel?# Zwei# Drei# Vier# Fünf# Vier';
      arrayQuestions[10] = 'Welches Power-Up gibt Pac-Man die Fähigkeit, Geister zu fressen?# Kirschen# Erdbeeren# Blaue Pillen# Energizer (Power-Pille)# Energizer (Power-Pille)';
      arrayQuestions[11] = 'Wie viele Punkte erhält Pac-Man für das Essen eines normalen Punkts?# 5 Punkte# 10 Punkte# 15 Punkte# 20 Punkte# 10 Punkte';
      arrayQuestions[12] = 'Was ist der Name des Schöpfers von Pac-Man?# Toru Iwatani# Shigeru Miyamoto# Hideo Kojima# Masahiro Sakurai# Toru Iwatani';
      arrayQuestions[13] = 'Wie heissen die Geister in Pac-Man auf Deutsch?# Schatten, Speedy, Schlaubi, Spooky# Rot, Grün, Blau, Orange# Blinky, Pinky, Inky, Clyde# Geist 1, Geist 2, Geist 3, Geist 4# Blinky, Pinky, Inky, Clyde';
      arrayQuestions[14] = 'Wie heisst der rosa Geist in Ms. Pac-Man?# Pinky# Blinky# Inky# Sue# Pinky';
      arrayQuestions[15] = 'Wie viele Punkte erhält man für das Fressen einer Erdbeere in Original Ms. Pac-Man?# 50 Punkte# 100 Punkte# 200 Punkte# 500 Punkte# 200 Punkte';
      arrayQuestions[16] = 'Welche Farbe hat Ms. Pac-Mans Schleife?# Rot# Pink# Hellblau# Gelb# Rot';
      arrayQuestions[17] = 'Welches Objekt war Teil der Inspiration für das Design von Pac-Man?# Mond# Donut# Pizza# Kuchen# Pizza';
      arrayQuestions[18] = 'Welcher Zeichentrickfilm diente als Inspiration für die Power-Pille?# Mighty Mouse# Bugs Bunny# Bananaman# Popeye the Sailor Man# Popeye the Sailor Man';
      arrayQuestions[19] = 'Die Zielgruppe des Spiels waren zu Beginn?# Mädchen# Jungen# Süssigkeiten-essende Monster# Geisterjäger# Mädchen';
      arrayQuestions[20] = 'Welche Guinness-Weltrekord-Auszeichnung erhielt Pac-Man im Jahr 2005?# meistgespieltes Arcade-Spiel# meistverkauftes Videospiel# erfolgreichstes münzbetriebenes Spiel# das am schlechtesten bewertete Videospiel# erfolgreichstes münzbetriebenes Spiel';
      arrayQuestions[21] = 'In welchem Pac-Man-Spiel kann man springen?# Ms. Pac-Man# Pac-Man plus# Jr. Pac-Man# Pac Mania# Pac Mania'; 
  }

//Funktion die Runde zu starten
  function startRound(){
      if(roundCounter<numberOfRounds){ //Wenn der Rundenzähler kleiner ist als die Anzahl an Runden, sollen weitere Fragen generiert werden
          roundCounter++; //Pro Runde nimmt der Rundenzähler um 1 zu
          locked = false; //Auswahl der Antwortmöglichkeiten ermöglichen
          const currentQuestion = arrayQuestions.shift(); //Frage aus arrayQuestions wird entfernt und in der Variable currentQuestion gespeichert
          const arrayQuestionsPrepared = currentQuestion.split('#'); //currentQuestion wird mittels dem Trennzeichen "#" aufgeteilt und separat gespeichert
          rightAnswer = arrayQuestionsPrepared[5]; //Die richtige Antwort ist immer das fünfte Element im arrayQuestions[x]
          document.getElementById('idQuestion').innerHTML = arrayQuestionsPrepared[0];
          document.getElementById('idAnswer1').innerHTML = arrayQuestionsPrepared[1];
          document.getElementById('idAnswer2').innerHTML = arrayQuestionsPrepared[2];
          document.getElementById('idAnswer3').innerHTML = arrayQuestionsPrepared[3];
          document.getElementById('idAnswer4').innerHTML = arrayQuestionsPrepared[4];

      } else {//Ausgabe der erreichten Punkte mit einem Text
          if (points === 1) {
            scoreText = 'Das Quiz ist vorbei. Du hast 1 Punkt erreicht';
          } else {
            scoreText = 'Das Quiz ist vorbei. Du hast ' + points + ' Punkte erreicht.';
          }
//Fragen und Antwortmöglichkeiten werden ausgeblendet und der Button das Spiel zu starten wird wieder angezeigt
          document.getElementById('idQuestion').innerHTML = scoreText;
          document.getElementById('idAnswer1').style.visibility = 'hidden';
          document.getElementById('idAnswer2').style.visibility = 'hidden';
          document.getElementById('idAnswer3').style.visibility = 'hidden';
          document.getElementById('idAnswer4').style.visibility = 'hidden';
          // Button zum Starten des Spiels wieder anzeigen
          document.getElementById('idStart').style.visibility = 'visible';
      
      }
  }

  function tapButton(typedButton){
//Überprüfung ob die Variable locked den Wert true hat
      if(locked==true){
          return;
      }
//Wenn die Variable nicht den Wert true hat, wird dies geändert. Verhindert das der Benutzer mehrmals auf eine Antwortmöglichkeit klickt.
      locked = true;
//Wenn die Antwort richtig ist, wird das Feld grün. Stimmt die Auswahl nicht, wird das Feld rot.
      if(typedButton.innerHTML==rightAnswer){
          points++;
          typedButton.style.background = 'green';
      } else{
          typedButton.style.background = 'red';
      }

//Nach 1 Sekunde wird der Hintergrund des typedButton zurückgesetzt und die startRound Funktion aufgerufen um mit der neuen Runde zu starten
      setTimeout(function () {
        typedButton.style.background = '';
        startRound();
      }, typedButton ? 1000 : 0);
  }