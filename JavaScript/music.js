/*__________Musik__________*/
const audio = document.getElementById('audio'); //auf Audio-Element zugreifen
const musicButton = document.getElementById('musicButton'); 
let count = 0;

//Musik in Daurschleife laufen lassen
if (typeof audio.loop == 'boolean'){
        audio.loop = true;
}

//Musik bei Klick auf Button pausieren
function playPause(){
    if(count == 0){
        count = 1;
        audio.play();
    } else{
        count = 0;
        audio.pause();
    }
}

//Verbesserungspetenzial FRONT2: weitere Sound-Effekts einfügen