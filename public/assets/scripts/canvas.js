
  int yStart = 0;
  
  int hexSize = 5;
  
  int hexSpace = 5;
  
void setup()
{  
  size (300, 300)
  
  if(hexSize <= 0) {
    hexSize = 1;
  }
}

void draw () 
{
yStart = origYStart;
int hexWidth = hexSize*2;
float hexHeight = sqrt(3)*hexSize;

 for(int j = 0; j < (floor((y) / (hexHeight/2)) ); j++ )
  {
    
for(int i = 0; i < (floor( (x) /(hexWidth*1.5)  )  ); i++ )
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

  fill(random(255), random(255), random(255));
    beginShape();
  
  vertex( xStart+(hexSize/2), yStart );
  vertex( xStart+ (hexSize*1.5), yStart );
  
  vertex ( xStart + (hexSize * 2 ), yStart + hexHeight /2);
  
  vertex ( xStart + (hexSize * 1.5 ), yStart + hexHeight );
  vertex ( xStart + (hexSize * 0.5 ), yStart +hexHeight );

  vertex ( xStart, yStart + (hexHeight/2) );
  
  endShape(CLOSE);
  xStart += ( hexWidth + (hexSpace*(5/3)*2) );
  
  
  }
  
  yStart += (hexHeight/2)+hexSpace/2;
  
  xStart = origXStart;

//  
}

stroke(255,0,0);
line(200,0,200,200);
line(0,200,200,200);

stroke(0);
}
