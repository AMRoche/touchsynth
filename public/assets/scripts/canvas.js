var x = 300;
var y = 150;

var xStart = 0;
var yStart = 0;

var origXStart = 0;
var origYStart = 0;

var hexSize = 15;
var hexSpace = 5;

var hexBase = document.getElementById('hex');
var keys = hexBase.getContext("2d");

function setupCanvas()
{
  //size(300, 300)

  if(hexSize <= 0) {
    hexSize = 1;
  }

  if(hexSpace <= 0) {
  	hexSpace = 1;
  }
}

function drawHexes()
{
	yStart = origYStart;
	var hexWidth = hexSize*2;
	var hexHeight = Math.sqrt(3)*hexSize;

	for(var j = 0; j < (~~((y) / (hexHeight/2)) ); j++ )
	{
			for(var i = 0; i < (~~( (x) /(hexWidth*1.5)  )  ); i++ )
			{
			  if( j % 2 != 0 && i == 0)
			  {
			    xStart += (hexWidth*0.75+ ( (hexSpace*(5/3)/2)));
			  }

			  if(i > 0)
			  {
			    xStart += hexSize;
			  }

			  if (xStart > (x-hexWidth) || yStart > (y-hexHeight))
			  {
			    break;
			  }

			  	drawHex(xStart, yStart, hexSize, hexHeight);
					xStart += ( hexWidth + (hexSpace*(5/3)) );
			 }

			  yStart += (hexHeight/2)+hexSpace/2;
			  xStart = origXStart;
		}
}

function drawHex(xStart, yStart, hexSize, hexHeight)
{
	//fill(random(255), random(255), random(255));

	keys.beginPath();
	  keys.moveTo( xStart+(hexSize/2), yStart );
	  keys.lineTo( xStart+ (hexSize*1.5), yStart );
	  keys.lineTo ( xStart + (hexSize * 2 ), yStart + hexHeight /2);
	  keys.lineTo ( xStart + (hexSize * 1.5 ), yStart + hexHeight );
	  keys.lineTo ( xStart + (hexSize * 0.5 ), yStart +hexHeight );
	  keys.lineTo ( xStart, yStart + (hexHeight/2) );
	  keys.lineTo ( xStart+(hexSize/2), yStart );
	keys.closePath();

	//http://www.paulirish.com/2009/random-hex-color-code-snippets/
	keys.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
	keys.fill();

	  // keys.fill(hexKey, Math.random()*255,Math.random()*255,Math.random()*255,1);

	  // beginShape();
	  // vertex( xStart+(hexSize/2), yStart );
	  // vertex( xStart+ (hexSize*1.5), yStart );
	  // vertex ( xStart + (hexSize * 2 ), yStart + hexHeight /2);
	  // vertex ( xStart + (hexSize * 1.5 ), yStart + hexHeight );
	  // vertex ( xStart + (hexSize * 0.5 ), yStart +hexHeight );
	  // vertex ( xStart, yStart + (hexHeight/2) );
	  // endShape(CLOSE);
}
