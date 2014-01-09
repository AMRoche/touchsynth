//http://www.phy.mtu.edu/~suits/chords.html
//http://www.html5rocks.com/en/tutorials/webaudio/games/
var context;
var chord = "";
var overtone = [0.1,0.1,0.1,0.1,0.4];
var overtoneDecay = [1] ;
var chosenNotes = [];
var chords = {
"major" : [4,5,6],
"minor" : [10,12,15],
"diminished" : [160,192,231],
"7th" : [20,25,30,36],
"min7th" : [10,12,15,18],
"maj7th" : [8,10,12,15]
}; //sourced from http://www.phy.mtu.edu/~suits/chords.html
//First element is base note, anything after is multiple thereof.
var active_voices = {};
var noteRatio = 1.05932721713;
var noteArr = [122,120,99,118,98,110,111];
var firstNote = 220;
var firstNotes = {"C" : 261.63,
"C#/Db" : 277.18,
"D" : 293.66,
"D#/Eb" : 311.13,
"E" : 329.63,
"F" : 349.23,
"F#/Gb" : 369.99,
"G" : 392.00,
"G#/Ab" : 415.30,
"A" : 220,
"A#/Bb" : 233.08,
"B" : 246.94};
var Voice;
var wavetypes = ["SQUARE","SINE","TRIANGLE"];
var globalwave = 0;
var noteNames = {"C" : 16.35,
"C#/Db" : 17.32,
"D" : 18.35,
"D#/Eb" : 19.45,
"E" : 20.60,
"F" : 21.83,
"F#/Gb" : 23.12,
"G" : 24.50,
"G#/Ab" : 25.96,
"A" : 27.50,
"A#/Bb" : 29.14,
"B" : 30.87};

var keyboard = {
	"keydown" : function (note, frequency,chordType) {
    if(active_voices[note]==undefined){
      var voice = new Voice(frequency,chordType);
      active_voices[note] = voice;
      voice.start();
    }
  },
 "keyup" : function (note, _) {
    active_voices[note].stop();
    delete active_voices[note];
  }
};


function setglobalwave(input){
  globalwave = input;
}

window.addEventListener('load', initAudioContext, false);

function initAudioContext() {
  try {
    setglobalwave(1);
    chordSelectListener();
    numOvertones();
    waveListener();
    octaveListener();
    printToDom();
    changeStartingNote();
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
   context = new AudioContext();
   Voice = (function(context) {
    function Voice(frequency,chordType){
      this.chordType = chordType;
      this.frequency = frequency;
      this.oscillators = [];
    }

    Voice.prototype.start = function() {
      /* VCO */
      if(this.chordType!=""&&this.chordType!=null){
        if(!chords.hasOwnProperty(this.chordType)){
          this.chordType = null;
          this.start();
        }else{
          var divisor = chords[this.chordType][0];
          for(var j = 0; j < overtoneDecay.length; j++){
                for(var i = 0; i < chords[this.chordType].length; i++){
                  var vco = context.createOscillator();
                  var vcoARR = [vco.SQUARE,vco.SINE,vco.TRIANGLE]
                  vco.type = vcoARR[globalwave];
                  vco.frequency.value = (this.frequency/divisor) * chords[this.chordType][i] * (j+1);

                  /* VCA */
                  var vca = context.createGain();
                  vca.gain.value = overtoneDecay[j] / (chords[this.chordType].length * overtoneDecay.length);///(10/j);

                  /* connections */
                  vco.connect(vca);
                  vca.connect(context.destination);

                  vco.start(0);

                  /* Keep track of the oscillators used */
                  this.oscillators.push(vco);
                }
            }
        }
      }else{
        for(var j = 0; j < overtoneDecay.length; j++){
          var vco = context.createOscillator();
          var vcoARR = [vco.SQUARE,vco.SINE,vco.TRIANGLE]
          vco.type = vcoARR[globalwave];
          vco.frequency.value = this.frequency*(j+1);

          /* VCA */
          var vca = context.createGain();
          vca.gain.value = overtoneDecay[j]/3;

          /* connections */
          vco.connect(vca);
          vca.connect(context.destination);

          vco.start(0);

          /* Keep track of the oscillators used */
          this.oscillators.push(vco);
        }
      }
    };

    Voice.prototype.stop = function() {
      this.oscillators.forEach(function(oscillator, _) {
        oscillator.stop();
      });
    };

    return Voice;
  })(context);
    start();
  }
  catch(e) {
  	console.log(e);
    alert('Web Audio API is not supported in this browser');
  return false;
  }
}



function start(){
	registerKeyPress();
}

function registerKeyPress(){
	document.onkeypress = function (e) {
	  e = e || window.event;
	  var charCode = e.charCode || e.keyCode;
	   var character = charCode;

	//  alert(character);
	  if(noteArr.indexOf(character) > -1){
	var noteplaying = noteArr.indexOf(character);
      noteCheck(Math.pow(noteRatio,noteplaying)*firstNote);
			keyboard.keydown(noteplaying.toString(),Math.pow(noteRatio,noteplaying)*firstNote,chord);
		}
	};

	document.onkeyup = function (e) {
	  e = e || window.event;
	  var charCode = e.charCode || e.keyCode;
	   var character = charCode+32;
	  if(noteArr.indexOf(character) > -1){
	  	console.log(noteplaying);
	var noteplaying = noteArr.indexOf(character);
			keyboard.keyup(noteplaying.toString(),firstNote+(noteplaying*noteRatio*firstNote));
		}
	};

}

function chordSelectListener(){
  document.getElementById("chordSelect").onchange = function(){
    chord = document.getElementById("chordSelect").value;
    console.log(document.getElementById("chordSelect").value);
  };
}

function numOvertones(){
  document.getElementById("overtones").onchange = function(){
    var otLength = document.getElementById("overtones").value;
    var sum = 0;
    for(var i = 0; i < otLength; i++){
      sum += overtone[i];
    }
    var addToEach = (1 - sum)/otLength;
var ans = [];
    for(var i = 0; i < otLength; i++){
      ans.push(overtone[i]+addToEach);
      sum += overtone[i];
    }
    overtoneDecay = ans;
  };
}

function waveListener(){
  document.getElementById("waveType").onchange = function(){
    var waveType = document.getElementById("waveType").value;
    if(waveType == "setSquare"){
      setglobalwave(0);
    }else if(waveType == "setSine"){
      setglobalwave(1);
    }else if(waveType == "setTri"){
      setglobalwave(2);
    }
  };
}

function noteCheck(freq){
  var note = 1;
  var textNote;
  //debug this for the case of D#/Eb etc.
  //console.log(freq);
  for(var i in noteNames){

    var f2c = freq/noteNames[i];
//    console.log("----------");
//console.log(i+","+freq);
//  console.log(((f2c - Math.floor(f2c)) > (Math.ceil(f2c) - f2c)));
//  console.log((f2c - Math.floor(f2c)) +","+ (Math.ceil(f2c) - f2c));
//  console.log(Math.floor(f2c)+","+Math.ceil(f2c));
    if((f2c - Math.floor(f2c)) > (Math.ceil(f2c) - f2c)){
      if((Math.ceil(f2c) - f2c)<note) {
        if((Math.log(Math.ceil(f2c)) / Math.log(2)) == Math.floor(Math.log(Math.ceil(f2c)) / Math.log(2))){
          note =  (Math.ceil(f2c) - f2c);
          textNote = i;
        }
      }
    }else{
      if((f2c - Math.floor(f2c))<note){
        if((Math.log(Math.floor(f2c)) / Math.log(2)) == Math.ceil((Math.log(Math.floor(f2c)) / Math.log(2)))){
          note = (f2c - Math.floor(f2c));
          textNote = i;
        }
      }
    }
  }
  return textNote;
}

function printToDom(){

  document.getElementById("notesList").innerHTML = "";
//  for(var i = 0; i < noteArr.length; i++){
    for(var i = 0; i < 12; i++){
 //   console.log(i);
    var list = document.createElement("li");
    list.setAttribute("id","notePlaying"+i);
    list.setAttribute("class","noteSelect");
    list.setAttribute("data-noteName",noteCheck(Math.pow(noteRatio,i)*firstNote));
    list.innerHTML = noteCheck(Math.pow(noteRatio,i)*firstNote);
    list.onclick = function(){
      chosenNotes.push(
        {
          "noteName":this.getAttribute("data-noteName")
        }
        );
      console.log(chosenNotes);
    };
    document.getElementById("notesList").appendChild(list);
  }

}

function changeStartingNote(){
document.getElementById("startingNote").onchange = function(){
  firstNote = firstNotes[document.getElementById("startingNote").value];
  printToDom();
};
}
function octaveListener(){
document.getElementById("octave").onchange = function(){
  //firstNotes noteNames
  for(var i in firstNotes){
    if(firstNotes.hasOwnProperty(i)){
      firstNotes[i] = noteNames[i] * Math.pow(2,parseInt(document.getElementById("octave").value));
    }
  }
  firstNote = firstNotes[document.getElementById("startingNote").value];
  printToDom();
};
}
