var yStart = 0;
var hexSize = 5;
var hexSpace = 5;
  
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
	var hexHeight = sqrt(3)*hexSize;

	for(var j = 0; j < (~~((y) / (hexHeight/2)) ); j++ )
	{    
			for(var i = 0; i < (~~( (x) /(hexWidth*1.5)  )  ); i++ )
			{
			  if( j % 2 != 0 && i == 0)
			  {
			    xStart += (hexWidth*0.75+ ( (hexSpace*(5/3))));
			  }
			  
			  if(i > 0)
			  {
			    xStart += hexSize;
			  }
			  
			  if (xStart > (x-hexWidth) || yStart > (y-hexHeight))
			  {
			    break;
			  }
	
			  	drawHex(xStart, yStart, hexSize);	  
					xStart += ( hexWidth + (hexSpace*(5/3)*2) );
			 }	
			   
			  yStart += (hexHeight/2)+hexSpace/2;  
			  xStart = origXStart;
		}
}

function drawHex(xStart, yStart, hexSize)
{
	  fill(random(255), random(255), random(255));
	  beginShape();
	  vertex( xStart+(hexSize/2), yStart );
	  vertex( xStart+ (hexSize*1.5), yStart );
	  vertex ( xStart + (hexSize * 2 ), yStart + hexHeight /2);
	  vertex ( xStart + (hexSize * 1.5 ), yStart + hexHeight );
	  vertex ( xStart + (hexSize * 0.5 ), yStart +hexHeight );
	  vertex ( xStart, yStart + (hexHeight/2) );
	  endShape(CLOSE);
}
