var x = 300;
var y = 150;

var xStart = 0;
var yStart = 0;

var origXStart = 0;
var origYStart = 0;

var hexSize = 30;
var hexSpace = 10;

var hexBase = document.getElementById('hex');
var hexMap = document.getElementById('hexMap');
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
	var coords = [];
		coords.push(xStart+(hexSize/2) );
		coords.push(yStart );
		coords.push(xStart+ (hexSize*1.5) );
		coords.push(yStart );
		coords.push(xStart + (hexSize * 2 ) );
		coords.push(yStart + hexHeight /2 );
		coords.push(xStart + (hexSize * 1.5 ) );
		coords.push(yStart + hexHeight );
		coords.push(xStart + (hexSize * 0.5 ) );
		coords.push(yStart +hexHeight );
		coords.push(xStart );
		coords.push(yStart + (hexHeight/2) );

	keys.beginPath();
		  keys.moveTo( coords[0], coords[1] );
		  keys.lineTo( coords[2], coords[3]);
		  keys.lineTo ( coords[4], coords[5]);
		  keys.lineTo ( coords[6], coords[7]);
		  keys.lineTo ( coords[8], coords[9] );
		  keys.lineTo ( coords[10], coords[11] );
		  keys.lineTo ( coords[0], coords[1] );
	keys.closePath();

	//http://www.paulirish.com/2009/random-hex-color-code-snippets/
	keys.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
	keys.fill();

	console.log(keys.fillStyle);

	var mapArea = document.createElement('area');
	mapArea.setAttribute('shape','poly');
	mapArea.setAttribute('coords', coords.join(','));
	mapArea.setAttribute('data-color', keys.fillStyle);
	hexMap.appendChild(mapArea);

	mapArea.addEventListener("click", function() {
		clickHex();
	}, false);

}


function clickHex() {
	alert(this.getAttribute('data-color'));
}

function coverHex(xStart, yStart, hexSize, hexHeight) {

}