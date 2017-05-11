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

			fill( 15, 100, 172 );

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

	var infTho = new InfoObj ( 0, 70, 0, 10 );
	infoList[ 0 ] = infTho;

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

	var infOO = infoList[ 0 ];
	var infoW = infOO.getW();
	infOO.setW( infoW + 1 );
	infOO.parseData();

	fill( 0 );
	ellipse( 100, 100, 100, 100 );
}
