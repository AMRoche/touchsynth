var context;
var active_voices = {};
var noteRatio = 1.05932721713;
var noteArr = [122,120,99,118,98,110,111];
var firstNote = 440;
var Voice;
var wavetypes = ["SQUARE","SINE","TRIANGLE"];
var globalwave = 0;
var keyboard = {
	"keydown" : function (note, frequency) {
    if(active_voices[note]==undefined){
      var voice = new Voice(frequency);
      active_voices[note] = voice;
      voice.start();
    }
  },
 "keyup" : function (note, _) {
    active_voices[note].stop();
    delete active_voices[note];
  }
};

document.getElementById("setsquare").onclick = function(){
  setglobalwave(0);
};

document.getElementById("setsine").onclick = function(){
  setglobalwave(1);
};

document.getElementById("settri").onclick = function(){
  setglobalwave(2);
};

function setglobalwave(input){
  globalwave = input;
  document.getElementById("wavetype").innerHTML = wavetypes[input];
}

window.addEventListener('load', initAudioContext, false);
function initAudioContext() {
  try {
    setglobalwave(1);
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
   context = new AudioContext();
   Voice = (function(context) {
    function Voice(frequency){
      this.frequency = frequency;
      this.oscillators = [];
    }

    Voice.prototype.start = function() {
      /* VCO */
      var vco = context.createOscillator();
      var vcoARR = [vco.SQUARE,vco.SINE,vco.TRIANGLE]
      vco.type = vcoARR[globalwave];
      vco.frequency.value = this.frequency;

      /* VCA */
      var vca = context.createGain();
      vca.gain.value = 0.3;

      /* connections */
      vco.connect(vca);
      vca.connect(context.destination);

      vco.start(0);

      /* Keep track of the oscillators used */
      this.oscillators.push(vco);
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
			keyboard.keydown(noteplaying.toString(),firstNote+(noteplaying*noteRatio*firstNote));
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