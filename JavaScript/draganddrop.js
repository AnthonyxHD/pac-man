//Quellen:
//https://www.w3schools.com/html/html5_draganddrop.asp
//https://wiki.selfhtml.org/wiki/JavaScript/Drag_%26_Drop

//Element kann über ein anderes Element gezogen und dort fallen gelassen werden
function allowDrop(ev) {
  ev.preventDefault();
}

//ID des gezogenen Elements wird gespeichert, um sie von einem zum anderen Feld zu ziehen
function drag(ev) {
  ev.dataTransfer.setData('text', ev.target.id);
}

//Die zuvor gespeicherten Daten werden aufgerufen um das ausgewählte Element am neuen Platz ablegen zu können
function drop(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData('text');
  ev.target.appendChild(document.getElementById(data));
}

//Überprüfung ob die Elemente auf das richtige Feld gezogen wurden.
function pruefen() {
  const question1 = document.getElementById('question1'); //Zuweisung der Elemente mittels ID zu Variablen
  const question2 = document.getElementById('question2');
  const question3 = document.getElementById('question3');
  const question4 = document.getElementById('question4');
  const question5 = document.getElementById('question5');
  const question6 = document.getElementById('question6');
  const question7 = document.getElementById('question7');
  const question8 = document.getElementById('question8');

  const pinkyImage = question1.querySelector('img'); //Zuweisung der Bilder zu einer Variable
  const friendsImage = question2.querySelector('img');
  const clydeImage = question3.querySelector('img');
  const blinkyImage = question5.querySelector('img');
  const vulnerableImage = question7.querySelector('img');
  const inkyImage = question8.querySelector('img');

  const answer4 = question4.querySelector('p'); //Zuweisung der Texte zu einer Variable
  const answer6 = question6.querySelector('p');

  let points = 0; //Variable zur Punktezählung

  // Überprüfung ob Elemente auf das richtige Feld gezogen wurden
  if (pinkyImage && pinkyImage.id === 'drag2') {
    question1.style.backgroundColor = 'green';
    points++; // Spieler erhält einen Punkt
  } else {
    question1.style.backgroundColor = 'red';
  }

  if (friendsImage && friendsImage.id === 'drag13') {
    question2.style.backgroundColor = 'green';
    points++; // Spieler erhält einen Punkt
  } else {
    question2.style.backgroundColor = 'red';
  }

  if (clydeImage && clydeImage.id === 'drag3') {
    question3.style.backgroundColor = 'green';
    points++; // Spieler erhält einen Punkt
  } else {
    question3.style.backgroundColor = 'red';
  }

  if (answer4 && answer4.id === 'drag6') {
    question4.style.backgroundColor = 'green';
    points++; // Spieler erhält einen Punkt
  } else {
    question4.style.backgroundColor = 'red';
  }

  if (blinkyImage && blinkyImage.id === 'drag4') {
    question5.style.backgroundColor = 'green';
    points++; // Spieler erhält einen Punkt
  } else {
    question5.style.backgroundColor = 'red';
  }

  if (answer6 && answer6.id === 'drag24') {
    question6.style.backgroundColor = 'green';
    points++; // Spieler erhält einen Punkt
  } else {
    question6.style.backgroundColor = 'red';
  }

  if (vulnerableImage && vulnerableImage.id === 'drag18') {
    question7.style.backgroundColor = 'green';
    points++; // Spieler erhält einen Punkt
  } else {
    question7.style.backgroundColor = 'red';
  }

  if (inkyImage && inkyImage.id === 'drag1') {
    question8.style.backgroundColor = 'green';
    points++; // Spieler erhält einen Punkt
  } else {
    question8.style.backgroundColor = 'red';
  }

//Punkte werden zusammengezählt und in einer Meldung ausgegeben
  if (points === 1) {
    setTimeout(function() {
      alert('Das Quiz ist vorbei. Du hast 1 Punkt erreicht.');
    }, 1000);
  } else if (points > 1) {
    setTimeout(function() {
      alert('Das Quiz ist vorbei. Du hast ' + points + ' Punkte erreicht.');
    }, 1000);
  } else {
    setTimeout(function() {
      alert('Das Quiz ist vorbei. Du hast keine Punkte erreicht.');
    }, 1000);
  }
}

//Elemente sollen wieder an ihren Platz zurückgesetzt werden
function reset() {
  const containerGhosts = document.getElementById('containerGhosts');
  const containerPoints = document.getElementById('containerPoints');
  const containerSitcoms = document.getElementById('containerSitcoms');
  const containerVulnerableGhosts = document.getElementById('containerVulnerableGhosts');
  const containerColor = document.getElementById('containerColor');

  //Elemente die gezogen werden können, erscheinen wieder an ihren ursprünglichen Platz
  containerGhosts.innerHTML = `
    <img id='drag1' src='../referenzen/images/game/inky.png' width='50' alt='inky' draggable='true' ondragstart='drag(event)'>
    <img id='drag2' src='../referenzen/images/game/pinky.png' width='50' alt='pinky' draggable='true' ondragstart='drag(event)'>
    <img id='drag3' src='../referenzen/images/game/clyde.png' width='50' alt='clyde' draggable='true' ondragstart='drag(event)'> 
    <img id='drag4' src='../referenzen/images/game/blinky.png' width='50' alt='blinky' draggable='true' ondragstart='drag(event)'>
  `;
  containerPoints.innerHTML = `
    <p id='drag5' draggable='true' ondragstart='drag(event)'>100 Points </p>
    <p id='drag6' draggable='true' ondragstart='drag(event)'>3'333'360 Points </p>
    <p id='drag7' draggable='true' ondragstart='drag(event)'>5'555'560 Points </p>
    <p id='drag8' draggable='true' ondragstart='drag(event)'>9'999'999 Points </p>
  `;
  containerSitcoms.innerHTML = `
    <img id='drag13' src='../referenzen/images/game/friends.png' width='100' alt='friends' draggable='true' ondragstart='drag(event)'>
    <img id='drag14' src='../referenzen/images/game/seinfeld.png' width='100' alt='seinfeld' draggable='true' ondragstart='drag(event)'>
    <img id='drag15' src='../referenzen/images/game/fullhouse.png' width='100' alt='fullhouse' draggable='true' ondragstart='drag(event)'>
    <img id='drag16' src='../referenzen/images/game/thefreshprinceofbelair.png' width='100' alt='thefreshprinceofbelair' draggable='true' ondragstart='drag(event)'>
  `;
  containerVulnerableGhosts.innerHTML = `
    <img id='drag17' src='../referenzen/images/game/vulnerableorange.png' width='50' alt='vulnerableorange' draggable='true' ondragstart='drag(event)'>
    <img id='drag18' src='../referenzen/images/game/vulnerable.png' width='50' alt='vulnerable' draggable='true' ondragstart='drag(event)'>
    <img id='drag19' src='../referenzen/images/game/vulnerablegreen.png' width='50' alt='vulnerablegreen' draggable='true' ondragstart='drag(event)'>
    <img id='drag20' src='../referenzen/images/game/vulnerablepink.png' width='50' alt='vulnerablepink' draggable='true' ondragstart='drag(event)'>
  `;
  containerColor.innerHTML = `
    <p id='drag21' draggable='true' ondragstart='drag(event)'>violett</p>
    <p id='drag22' draggable='true' ondragstart='drag(event)'>grün</p>
    <p id='drag23' draggable='true' ondragstart='drag(event)'>türkis</p>
    <p id='drag24' draggable='true' ondragstart='drag(event)'>gelb</p>
  `;
  //Hintergrundfarbe wird zurückgesetzt
  question1.style.backgroundColor = '';
  question2.style.backgroundColor = '';
  question3.style.backgroundColor = '';
  question4.style.backgroundColor = '';
  question5.style.backgroundColor = '';
  question6.style.backgroundColor = '';
  question7.style.backgroundColor = '';
  question8.style.backgroundColor = '';

  //Inhalt der Frage-Elemente wird geleert
  question1.innerHTML = '';
  question2.innerHTML = '';
  question3.innerHTML = '';
  question4.innerHTML = '';
  question5.innerHTML = '';
  question6.innerHTML = '';
  question7.innerHTML = '';
  question8.innerHTML = '';
}
