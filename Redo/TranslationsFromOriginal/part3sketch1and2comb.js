//A STORY OF BLACK AND WHITE

//About the word "Equal" and how people/shapes
//Recieve the same information in different ways
//Symbolic

//NOTE for Later:
//MOUSE is where "privilege" sways

var infoList = [];
var infoCount = 0;

//Test Variable (for now) about moving objects
var xTho = 0;
var yTho = 0;

//See how many times shapes "collided"
var collisionCount = 0;

var startTimeInSec = 0;

var canvasGrid = [[]];

var time = 0.0;
var addedTime = 0.1;
var amplitude = 100;
var freq = 0.2;
var waveW = 100;
var waveH = 100;

//Class for InfoObj to control all methods and variables
function InfoObj( id, y, clr, dataSize )
{
	//ID is what Shape it will be
	//0 - ellipse, 1 - rectangle, 2 - triangle
	//3 - double-triangle/skewed quad
	//4 - randomized pointed star
	//5 - 5-vertex shape
	//6 - more obscure randomized pointed star
	//7 - 6-vertex shape
	//8 - even more obscure randomized pointed star
	this._id = id;
	//Changes how a "recieved" object changes
	//X-Position of moving data
	this._x = 0;
	//Y-Position of moving data
	this._y = y;
	//Color of Shape
	this._clr = clr;
	//Size of Circles in Data Stream (size of circles in sine wave, etc.)
	this._dataSize = dataSize;
	//Width of Shape
	this._w = 0;
	//Height of Shape
	this._h = 70;
	//How the Object Moves
	//0 = constant x value, 1 = constant y value
	//2 = fixed position, 3 = randomized motion
	//4 = orbital motion <- maybe.....
	//5 = still
	this._path = 0;

	//Obtain Shape ID
	this.getID = function()
	{
		return this._id;
	}

	//Obtain Shape X-Position
	this.getX = function()
	{
		return this._x;
	}

	//Obtain Shape Y-Position
	this.getY = function()
	{
		return this._y;
	}

	//Obtain Shape Color
	this.getClr = function()
	{
		return this._clr;
	}

	//Obtain Shape Width
	this.getW = function()
	{
		return this._w;
	}

	//Obtain Shape Height
	this.getH = function()
	{
		return this._h;
	}


	//Change Shape ID
	this.setID = function( newID )
	{
		this._id = newID;
	}

	//Change Shape X-Position
	this.setX = function( newX )
	{
		this._x = newX;
	}

	//Change Shape Y-Position
	this.setY = function( newY )
	{
		this._y = newY;
	}

	//Change Shape Width
	this.setW = function( newW )
	{
		this._w = newW;
	}
	//Change Shape Height
	this.setH = function( newH )
	{
		this._h = newH;
	}

	//Change Shape Color
	this.setClr = function( newClr )
	{
		this._clr = newClr;
	}

	//Draw the Shape
	this.parseData = function()
	{
		if( this._w > 700 )
		{
			this.setW( 0 );
		}
		// if( this._id == 0 );
		// {
			var dataPointX = this._X;
			var dataPointY = this._y;
			// fill( 255, 255, 255 );
			fill( 100, 100, 100 );
			rectMode( CENTER );
			rect( this._x, this._y, this._w * 2, this._h );

			fill( this._clr );

			// when doing skews, make i < this._w turn to a set i < stopPoint1 which is this._w by default
			for( i = 0; i < this._w; i++ )
			{
				ellipse( i * ( dataSize/10 ), this._h/3 * sin( freq * ( time + i ) ) + this._y, dataSize, dataSize );
			}
			

			time += addedTime;
			// for( i = 0; i < this._w; i++ )
			// {
			// 	fill( 0, 0, 0 );
			// 	ellipse( dataPointX, dataPointY, 2, 2 );
			// 	dataPointX++;
			// 	dataPointY++;
			// 	if( dataPointY < )
			// }
			// var goUp = true;
			// for( i = 0; i < this._w; i++ )
			// {
			// 	fill( 0, 0, 0 );
			// 	if( goUp == true )
			// 	{
			// 		for( j = 0; j < this._h; j++ )
			// 		{
			// 			ellipse( dataPointX + i, dataPointY + j, 20, 20 );
			// 		}
			// 	}
			// 	else
			// 	{
			// 		for( j = this._h; j > 0; i-- )
			// 		{
			// 			ellipse( dataPointX + i, dataPointY - j, 20, 20 );
			// 		}
			// 	}
			// }
		// }
	}

	//Draw the Shape
	this.drawShape = function()
	{
		return;
	}
}

//Class for Shape to control all methods and variables
function Shape( x, y, clr, w, h, skew )
{
	//ID is what Shape it will be
	//0 - ellipse, 1 - rectangle, 2 - triangle
	//3 - double-triangle/skewed quad
	//4 - randomized pointed star
	//5 - 5-vertex shape
	//6 - more obscure randomized pointed star
	//7 - 6-vertex shape
	//8 - even more obscure randomized pointed star
	this._id = 0;
	//Changes how a "recieved" object changes
	this._skew = random( skew );
	//X-Position of Shape
	this._x = x;
	//Y-Position of Shape
	this._y = y;
	//Color of Shape
	this._clr = clr;
	//Width of Shape
	this._w = w;
	//Height of Shape
	this._h = h;
	//How the Object Moves
	//0 = constant x value, 1 = constant y value
	//2 = fixed position, 3 = randomized motion
	//4 = orbital motion <- maybe.....
	//5 = still
	this._path = 0;

	//Obtain Shape ID
	this.getID = function()
	{
		return this._id;
	}

	//Obtain Shape Skew
	this.getSkew = function()
	{
		return this._skew;
	}

	//Obtain Shape X-Position
	this.getX = function()
	{
		return this._x;
	}

	//Obtain Shape Y-Position
	this.getY = function()
	{
		return this._y;
	}

	//Obtain Shape Color
	this.getClr = function()
	{
		return this._clr;
	}

	//Obtain Shape Width
	this.getW = function()
	{
		return this._w;
	}

	//Obtain Shape Height
	this.getH = function()
	{
		return this._h;
	}

	//Obtain Shape Path
	this.getPath = function()
	{
		return this._path;
	}

	//Change Shape ID
	this.setID = function( newID )
	{
		this._id = newID;
	}

	//Change Shape X-Position
	this.setX = function( newX )
	{
		this._x = newX;
	}

	//Change Shape Y-Position
	this.setY = function( newY )
	{
		this._y = newY;
	}

	//Change Shape Width
	this.setW = function( newW )
	{
		this._w = newW;
	}
	//Change Shape Height
	this.setH = function( newH )
	{
		this._h = newH;
	}

	//Change Shape Color
	this.setClr = function( newClr )
	{
		this._clr = newClr;
	}
	//Change Shape Color
	this.setPath = function( newPath )
	{
		this._path = newPath;
	}

	//Draw the Shape
	this.drawShape = function()
	{
		//Check if Out of Bounds
		// if( this._y < (-this._h/2) )
		// {
		// 	this.setY( height );
		// }
		if( this._y < 0 )
		{
			this.setY( height );
		}

		//Fill with Shape Color
		fill( this._clr );
		noStroke();
		//Check ID 0 - Ellipse
		if( this._id == 0 )
		{
			ellipseMode( CENTER );
			ellipse( this._x, this._y, this._w, this._h );
		}
		//Check ID Again, 1 - Rectangle
		else if( this._id == 1 )
		{
			rectMode( CENTER );
			rect( this._x, this._y, this._w, this._h );
		}
		//Check ID Again, 2 - Triangle
		else if( this._id == 2 )
		{
			var x1 = this._x - (this._w)/2;
			var y1 = this._y + (this._h)/2;
			var x2 = this._x;
			var y2 = this._y - (this._h)/2;
			var x3 = this._x + (this._w)/2;
			var y3 = this._y + (this._h)/2;
			triangle( x1, y1, x2, y2, x3, y3 );
		}
		//Check ID Again, 3 - Skewed Quad
		else if( this._id == 3 )
		{
			var x1 = this._x - (this._w)/2;
			var y1 = this._y - (this._h)/2;
			var x2 = this._x + (this._w)/2;
			var y2 = this._y - (this._h)/2
			var x3 = this._x - (this._w)/2
			var y3 = this._y + (this._h)/2;
			var x4 = this._x + (this._w)/2;
			var y4 = this._y + (this._h)/2;
			quad( x1, y1, x2, y2, x3, y3, x4, y4 );
		}
		//Check ID Again, 4 - Randomized pointed star
		else if( this._id == 4 )
		{
			for( var i = 0; i < this._w; i++ )
			{
				for( var j = 0; j < this._h; j++ )
				{
					stroke( i + j, 55, 20 );
					if( i % j >= 2 )
					{
						line( this._x, this._y, this._x + random(-this._w/2, this._w/2), this._y + random(-this._h/2, this._h/2) );
					}
				}
			}
		}
		//Check ID Again, 5 - Distorted 5-vertex Shape
		else if( this._id == 5 )
		{
			var x1 = this._x + (this._w)/4;
			var y1 = this._y - (this._h)/2;
			var x2 = this._x + (this._w)/2;
			var y2 = this._y + (this._h)/4;
			var x3 = this._x - (this._w)/2
			var y3 = this._y - (this._h)/2;
			var x4 = this._x - (this._w)/4;
			var y4 = this._y + (this._h)/2;
			var x5 = this._x - (this._w)/2;
			var y5 = this._y + (this._h)/4;
			beginShape();
			vertex( x1, y1 );
			vertex( x2, y2 );
			vertex( x3, y3 );
			vertex( x4, y4 );
			vertex( x5, y5 );
			endShape( CLOSE );
		}
		//Check ID Again, 6 - More Obscure Randomized pointed star
		else if( this._id == 6 )
		{
			for( var i = 0; i < this._w; i++ )
			{
				for( var j = 0; j < this._h; j++ )
				{
					theGreen = green( clr );
					theRed = red( clr );
					stroke( theRed, theGreen, i + j );
					if( i % j >= 2 )
					{
						//line( this._x, this._y, this._x + random(-this._w/2, this._w/2), this._y + random(-this._h/2, this._h/2) );
						ellipse( this._x + random(-this._w/2, this._w/2), this._y + random(-this._h/2, this._h/2), .5, .5 );
					}
				}
			}
		}
		//Check ID Again, 7 - Distorted 7-vertex Shape
		else if( this._id == 7 )
		{
			var x1 = this._x - (this._w)/4;
			var y1 = this._y;
			var x2 = this._x + (this._w)/2;
			var y2 = this._y + (this._h)/2;
			var x3 = this._x + (this._w)/4;
			var y3 = this._y + (this._h)/4;
			var x4 = this._x;
			var y4 = this._y - (this._h)/2;
			var x5 = this._x + (this._w)/2
			var y5 = this._y - (this._h)/4;
			var x6 = this._x - (this._w)/2;
			var y6 = this._y + (this._h)/4;
			var x7 = this._x;
			var y7 = this._y + (this._h);
			beginShape();
			vertex( x1, y1 );
			vertex( x2, y2 );
			vertex( x3, y3 );
			vertex( x4, y4 );
			vertex( x5, y5 );
			vertex( x6, y6 );
			vertex( x7, y7 );
			endShape( CLOSE );
		}
		//Check ID Again, 8 - Even More Obscure Randomized pointed star
		else if( this._id == 8 )
		{
			for( var i = 0; i < this._w; i++ )
			{
				for( var j = 0; j < this._h; j++ )
				{
					stroke( random( 255 ), random( i + j ), random( 255 ) );
					if( i % j >= 2 )
					{
						line( this._x, this._y, this._x + random(-this._w/2, this._w/2), this._y + random(-this._h/2, this._h/2) );
					}
					// else
					// {
					// 	stroke( random( 255 ), random( i + j ), random( 255 ) );
					// 	ellipse( this._x + random(-this._w/2, this._w/2), this._y + random(-this._h/2, this._h/2), .5, .5 );
					// }
					
					//fill( random( 255 ) );
					
				}
			}
		}
		//Check ID Again, if ID > 8, empty Circle
		else
		{
			ellipseMode( CENTER );
			noFill();
			ellipse( this._x, this._y, this._w, this._h );
		}
	}
}

//Create a New Shape Using a New Instance of the Shape Class
//with the initialized variables passed as parameters
//and Returns the Shape that is created
function createShape( x, y, clr, w, h, skew )
{
	var newShape = new Shape ( x, y, clr, w, h );
	return newShape;
}

function makeChildShape( parentShp )
{
	var parentClr = parentShp.getClr();
	var parentSkew = parentShp.getSkew();

	var redClr = red( parentClr );
	var greenClr = green( parentClr );
	var blueClr = blue( parentClr );
	var childClr = ( redClr + 50, greenClr/2, blueClr/4 );
	var childShp = createShape( parentShp.getX() + 25, parentShp.getY() + 25, childClr, parentShp.getW() * 1.2, parentShp.getH() * 1.2, parentSkew );
	return childShp;
}

//Program Setup
function setup()
{ 
	createCanvas(700, 700);
	//Initiliaze Seconds
	startTimeInSec = second();

	// for( i = 0; i < 700; i += 10 )
	// {
	// 	for( j = 0; j < 700; j += 10 )
	// 	{
	// 		append( canvasGrid[ i ], j);
	// 	}
	// }

	// Create All InfoObjs
	var info1Clr = color( 15, 100, 172 );
	var info2Clr = color( 150, 100, 172 );
	var info3Clr = color( 118, 10, 172 );
	var info4Clr = color( 15, 200, 172 );
	var info5Clr = color( 150, 255, 100 );
	var info6Clr = color( 15, 100, 10 );
	var info7Clr = color( 150, 100, 10 );

	var infTho1 = new InfoObj ( 0, 70, info1Clr, 10 );
	var infTho2 = new InfoObj ( 0, 140, info2Clr, 10 );
	var infTho3 = new InfoObj ( 0, 210, info3Clr, 10 );
	var infTho4 = new InfoObj ( 0, 280, info4Clr, 10 );
	var infTho5 = new InfoObj ( 0, 350, info5Clr, 10 );
	var infTho6 = new InfoObj ( 0, 420, info6Clr, 10 );
	var infTho7 = new InfoObj ( 0, 480, info7Clr, 10 );

	// Initiliaze Values for infoList Array Here
	// Never add to array passed this point
	infoList[ 0 ] = infTho1;
	infoList[ 1 ] = infTho2;
	infoList[ 2 ] = infTho3;
	infoList[ 3 ] = infTho4;
	infoList[ 4 ] = infTho5;
	infoList[ 5 ] = infTho6;
	infoList[ 6 ] = infTho7;
} 

//Program Draw
function draw() 
{
	background(220);
	collisionCount = 0;

	var currentSec = second();

	for( i = 0; i < 7; i++ )
	{
		var infoW = infoList[ i ].getW();
		infoList[ i ].setW( infoW + 1 );
		infoList[ i ].parseData();
	}
	

	var shp1 = createShape( 300, 300, color( 25, 25, 100 ), 50, 10, 1 );
	var shp2 = createShape( 276, 100, color( 100, 200, 160 ), 50, 50, 2 );
	var shp3 = createShape( 300, 100, color( 55, 155, 20 ), 50, 20, 3 );

	shp1.setPath( 5 );
	shp2.setPath( 5 );
	shp3.setPath( 5 );

	var secPassed = currentSec - startTimeInSec;

	if( secPassed > 0 )
	{
		shp1.drawShape();
	}
	if( secPassed > 1 )
	{
		shp2.drawShape();
	}
	if( secPassed > 3 )
	{
		shp3.drawShape();
		var shp4 = makeChildShape( shp2 );
		shp4.drawShape();
	}
	if( secPassed > 5 )
	{
		console.log( "AYYEEEEE" );
	}
}
