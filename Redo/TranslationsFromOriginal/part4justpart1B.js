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

// var time = 0.0;
// var addedTime = 0.1;
var amplitude = 100;
var freq = 0.2;
var waveW = 100;
var waveH = 100;

//Class for InfoObj to control all methods and variables
function InfoObj( id, y, clr, dataSize, time )
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
	this._time = 0;

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
		if( this._w > 400 )
		{
			this.setW( 0 );
			this._time = 0;
		}

		strokeWeight( 1 );
		fill( this._clr );

		var dataSize = this._dataSize;

		if( id == 0 )
		{
			// when doing skews, make i < this._w turn to a set i < stopPoint1 which is this._w by default
			for( i = 0; i < this._w; i += 4 )
			{
				ellipse( i * ( dataSize/10 ), this._h/4 * sin( freq * ( this._time + i ) ) + this._y - (this._h / 2), dataSize, dataSize );
			}
		}
		else if( id == 1 )
		{
			// when doing skews, make i < this._w turn to a set i < stopPoint1 which is this._w by default
			for( i = 0; i < this._w; i += 8 )
			{
				// ellipse( i * ( dataSize/10 ), this._h/4 * sin( freq * ( this._time + i ) ) + this._y, dataSize, dataSize );
				// ellipse( i * dataSize/10, this._h/4, dataSize, dataSize );
				// rect( i * dataSize/10, this._h/4, dataSize, dataSize );
				if( i % 32 == 0 )
				{
					// "0" part of binary
					ellipseMode( CENTER );
					noFill();
					strokeWeight( 2 );
					ellipse( i * dataSize/10, this._y - (this._h / 2), dataSize * 1.5, dataSize * 2 );
				}
				else if( i % 16 == 0 )
				{
					// "1" part of binary
					rectMode( CENTER );
					fill( this._clr );
					strokeWeight( 2 );
					rect( i * dataSize/10, this._y - (this._h / 2), dataSize / 2, dataSize * 2 );
				}
			}
		}
		else if( id == 2 )
		{
			// when doing skews, make i < this._w turn to a set i < stopPoint1 which is this._w by default
			textSize( dataSize * 2 );
			for( i = 0; i < this._w; i += 16 )
			{
				// REMAINDER from i % 64
				rem = i % 64
				var letterNum = random( 8 );
				if( rem == 0 )
				{
					letterNum = 0;
				}
				else if ( rem == 32 )
				{
					letterNum = 4;
				}

				if( letterNum < 2 )
				{
					text( "a", i * dataSize/10 , this._y - (this._h / 2) );
					text( "b", i * dataSize/10 , this._y );
				}
				else if( letterNum < 3 )
				{
					text( "c", i * dataSize/10 , this._y - (this._h / 2) );
					text( "d", i * dataSize/10 , this._y );
				}
				else if( letterNum < 4 )
				{
					text( "e", i * dataSize/10 , this._y - (this._h / 2) );
					text( "f", i * dataSize/10 , this._y );
				}
				else if( letterNum < 5 )
				{
					text( "g", i * dataSize/10 , this._y - (this._h / 2) );
					text( "h", i * dataSize/10 , this._y );
				}
				else if( letterNum < 6 )
				{
					text( "i", i * dataSize/10 , this._y - (this._h / 2) );
					text( "j", i * dataSize/10 , this._y );
				}
				else if( letterNum < 7 )
				{
					text( "k", i * dataSize/10 , this._y - (this._h / 2) );
					text( "l", i * dataSize/10 , this._y );
				}
				else if( letterNum < 8 )
				{
					text( "m", i * dataSize/10 , this._y );
					text( "n", i * dataSize/10 , this._y );
				}
			}
		}
		else if( id == 3 )
		{
			// when doing skews, make i < this._w turn to a set i < stopPoint1 which is this._w by default
			for( i = 0; i < this._w; i += 3 )
			{
				rect( i * ( dataSize/10 ), this._h/6 * cos( freq * ( this._time + i ) ) + this._y, dataSize, dataSize );
			}
		}
		this._time += 0.1;
	}

	//Draw the Shape
	this.drawShape = function()
	{
		return;
	}
}

//Program Setup
function setup()
{ 
	createCanvas(400, 400);
	//Initiliaze Seconds
	startTimeInSec = second();

	// for( i = 0; i < 700; i += 10 )
	// {
	// 	for( j = 0; j < 700; j += 10 )
	// 	{
	// 		append( canvasGrid[ i ], j);
	// 	}
	// }

	// var infTho = new InfoObj ( 0, 70, 0, 10 );
	// infoList[ 0 ] = infTho;

	// Create All InfoObjs
	var info1Clr = color( 15, 100, 172 );
	var info2Clr = color( 150, 100, 172 );
	var info3Clr = color( 118, 10, 172 );
	var info4Clr = color( 15, 200, 172 );

	var infTho1 = new InfoObj ( 0, 80, info1Clr, 10 );
	var infTho2 = new InfoObj ( 1, 160, info2Clr, 10 );
	var infTho3 = new InfoObj ( 2, 240, info3Clr, 10 );
	var infTho4 = new InfoObj ( 3, 320, info4Clr, 10 );

	// Initiliaze Values for infoList Array Here
	// Never add to array passed this point
	infoList[ 0 ] = infTho1;
	infoList[ 1 ] = infTho2;
	infoList[ 2 ] = infTho3;
	infoList[ 3 ] = infTho4;
} 

//Program Draw
function draw() 
{
	background(220);
	collisionCount = 0;

	//Obtain a List of the positions of 
	//all Shapes and store within a new array
	//that can be used to find intersection points

	// var currentSec = second();

	drawInfo();

	fill( 0 );
	ellipse( 100, 100, 100, 100 );
}

function drawInfo()
{
	var infOO = infoList[ 0 ];
	var infoW = infOO.getW();
	infOO.setW( infoW + 1 );
	infOO.parseData();

	var infOO2 = infoList[ 1 ];
	var infoW2 = infOO2.getW();
	infOO2.setW( infoW2 + 1 );
	infOO2.parseData();

	var infOO3 = infoList[ 2 ];
	var infoW3 = infOO3.getW();
	infOO3.setW( infoW3 + 1 );
	infOO3.parseData();

	var infOO4 = infoList[ 3 ];
	var infoW4 = infOO4.getW();
	infOO4.setW( infoW4 + 1 );
	infOO4.parseData();
}
