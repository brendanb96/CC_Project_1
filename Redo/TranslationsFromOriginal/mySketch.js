//A STORY OF BLACK AND WHITE

//About the word "Equal" and how people/shapes
//Recieve the same information in different ways
//Symbolic

//NOTE for Later:
//MOUSE is where "privilege" sways

//List of Shapes
var shapeList = [];
//Number of Shapes
var shapeCount = 0;

var infoList = [];
var infoCount = 0;

//Test Variable (for now) about moving objects
var xTho = 0;
var yTho = 0;

//See how many times shapes "collided"
var collisionCount = 0;

var startTimeInSec = 0;

var canvasGrid = [[]];

//Class for Shape to control all methods and variables
function Shape( x, y, clr, w, h )
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
	this._skew = shapeCount % 3;
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

//Class for InfoObj to control all methods and variables
function InfoObj( id, y, clr )
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
		if( this._id == 0 );
		{
			var dataPointX = this._X;
			var dataPointY = this._y;
			fill( 255, 255, 255 );
			rectMode( CENTER );
			rect( this._x, this._y, this._w, this._h );
			// for( i = 0; i < this._w; i++ )
			// {
			// 	fill( 0, 0, 0 );
			// 	ellipse( dataPointX, dataPointY, 2, 2 );
			// 	dataPointX++;
			// 	dataPointY++;
			// 	if( dataPointY < )
			// }
			var goUp = true;
			for( i = 0; i < this._w; i++ )
			{
				fill( 0, 0, 0 );
				if( goUp == true )
				{
					for( j = 0; j < this._h; i++ )
					{
						ellipse( dataPointX + i, dataPointY + j, 2, 2 );
					}
				}
				else
				{
					for( j = this._h; j > 0; i-- )
					{
						ellipse( dataPointX + i, dataPointY - j, 2, 2 );
					}
				}
			}
		}
	}

	//Draw the Shape
	this.drawShape = function()
	{
		return;
	}
}

//Create a New Shape Using a New Instance of the Shape Class
//with the initialized variables passed as parameters
//and Returns the Shape that is created
function createShape( x, y, clr, w, h, reset )
{
	var newShape = new Shape ( x, y, clr, w, h );
	shapeList[ shapeCount ] = newShape;
	//Check to see if the shape created is not
  	//a reset of values of an existing shape
  	//If it is, skip adding the shapecount
  	if( !reset )
  	{
    	shapeCount++;
  	}
	return newShape;
}

function makeChildShape( parentShp )
{
	var parentClr = parentShp.getClr();
	var redClr = red( parentClr );
	var greenClr = green( parentClr );
	var blueClr = blue( parentClr );
	var childClr = ( redClr + 50, greenClr/2, blueClr/4 );
	var childShp = createShape( parentShp.getX() + 25, parentShp.getY() + 25, childClr, parentShp.getW() * 1.2, parentShp.getH() * 1.2 );
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

	//Initiliaze Shapes Here
	//To avoid constant recreation in Draw Function
	var flyObj1 = createShape( 0, 100, color( 22, 55, 200 ), 10, 10 );
	var shp1 = createShape( 300, 300, color( 25, 25, 100 ), 50, 10 );
	var shp2 = createShape( 276, 100, color( 100, 200, 160 ), 50, 50 );
	var shp3 = createShape( 300, 100, color( 55, 155, 20 ), 50, 20 );
	var shp4 = createShape( 500, 100, color( 170, 75, 76 ), 30, 70 );
	var flyObj2 = createShape( 0, 200, color( 22, 55, 200 ), 10, 10 );
	var shp6 = createShape( 72, 200, color( 0 ), 50, 50 );
	var shp7 = createShape( 160, 200, color( 0 ), 50, 50 );
	var shp8 = createShape( 320, 200, color( 0 ), 50, 50 );
	var shp9 = createShape( 400, 200, color( 0 ), 50, 50 );
	var flyObj3 = createShape( 0, 300, color( 22, 55, 200 ), 10, 10 );
	var shp11 = createShape( 100, 300, color( 0 ), 50, 50 );
	var shp12 = createShape( 206, 300, color( 0 ), 50, 50 );
	var shp13 = createShape( 350, 300, color( 0 ), 50, 50 );
	var shp14 = createShape( 470, 300, color( 0 ), 50, 50 );
	var flyObj4 = createShape( 0, 400, color( 22, 55, 200 ), 10, 10 );
	var shp16 = createShape( 270, 400, color( 0 ), 50, 50 );
	var shp17 = createShape( 500, 400, color( 0 ), 50, 50 );
	var shp18 = createShape( 100, 400, color( 0 ), 50, 50 );
	var shp19 = createShape( 200, 400, color( 0 ), 50, 50 );
	var flyObj5 = createShape( 0, 500, color( 22, 55, 200 ), 10, 10 );
	var shp21 = createShape( 100, 500, color( 0 ), 50, 10 );
	var shp22 = createShape( 305, 500, color( 0 ), 50, 50 );
	var shp23 = createShape( 500, 500, color( 55, 155, 20 ), 50, 20 );
	var shp24 = createShape( 155, 500, color( 170, 75, 76 ), 30, 70 );
	var flyObj6 = createShape( 0, 600, color( 22, 55, 200 ), 10, 10 );
	var shp26 = createShape( 500, 600, color( 0 ), 50, 50 );
	var shp27 = createShape( 400, 600, color( 0 ), 50, 50 );
	var shp28 = createShape( 200, 600, color( 0 ), 50, 50 );
	var shp29 = createShape( 320, 600, color( 0 ), 50, 50 );

	var infTho = new InfoObj( 0, 70, 0 );
	append( infoList, infTho );

} 

//Program Draw
function draw() 
{
	background(220);
	collisionCount = 0;

	//Obtain a List of the positions of 
	//all Shapes and store within a new array
	//that can be used to find intersection points

	var currentSec = second();

	var flyObj1 = shapeList[ 0 ];
	var shp1 = shapeList[ 1 ];
	var shp2 = shapeList[ 2 ];
	// var shp3 = shapeList[ 3 ];
	// var shp4 = shapeList[ 4 ];
	// var flyObj2 = shapeList[ 5 ];
	// var shp6 = shapeList[ 6 ];
	// var shp7 = shapeList[ 7 ];
	// var shp8 = shapeList[ 8 ];
	// var shp9 = shapeList[ 9 ];
	// var flyObj3 = shapeList[ 10 ];
	// var shp11 = shapeList[ 11 ];
	// var shp12 = shapeList[ 12 ];
	// var shp13 = shapeList[ 13 ];
	// var shp14 = shapeList[ 14 ];
	// shp1.setX( 300 );
	// shp1.setY( 300 );
	shp1.setPath( 5 );
	shp2.setPath( 5 );

	var theList1 = [ flyObj1 ];

	var intersectX = findAllX( 0, theList1 );

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
		flyObj1.drawShape();
		var shp3 = makeChildShape( shp2 );
		shp3.drawShape();
	}
	if( secPassed > 5 )
	{
		console.log( "AYYEEEEE" );
	}

	createShape( 320, 600, color( 0 ), 50, 50 );

	infOO = infoList[ 0 ];
	infOO.parseData();


	//Obtain All Initialized Shapes
	// var flyObj1 = shapeList[ 0 ];
	// var shp1 = shapeList[ 1 ];
	// var shp2 = shapeList[ 2 ];
	// var shp3 = shapeList[ 3 ];
	// var shp4 = shapeList[ 4 ];
	// var flyObj2 = shapeList[ 5 ];
	// var shp6 = shapeList[ 6 ];
	// var shp7 = shapeList[ 7 ];
	// var shp8 = shapeList[ 8 ];
	// var shp9 = shapeList[ 9 ];
	// var flyObj3 = shapeList[ 10 ];
	// var shp11 = shapeList[ 11 ];
	// var shp12 = shapeList[ 12 ];
	// var shp13 = shapeList[ 13 ];
	// var shp14 = shapeList[ 14 ];
	// var flyObj4 = shapeList[ 15 ];
	// var shp16 = shapeList[ 16 ];
	// var shp17 = shapeList[ 17 ];
	// var shp18 = shapeList[ 18 ];
	// var shp19 = shapeList[ 19 ];
	// var flyObj5 = shapeList[ 20 ];
	// var shp21 = shapeList[ 21 ];
	// var shp22 = shapeList[ 22 ];
	// var shp23 = shapeList[ 23 ];
	// var shp24 = shapeList[ 24 ];
	// var flyObj6 = shapeList[ 25 ];
	// var shp26 = shapeList[ 26 ];
	// var shp27 = shapeList[ 27 ];
	// var shp28 = shapeList[ 28 ];
	// var shp29 = shapeList[ 29 ];

	//For all the Shapes in the ShapeList
	//Make them "move" along their innate "Path"
	//determiend by their member variables
	for( var i = 0; i < shapeCount; i++ )
	{
		var path = shapeList[ i ].getPath();
		if( path == 0 )
		{
			shapeList[ i ].setY( shapeList[ i ].getY() - 1 );
		  	// if( shapeList[ i ].y < 0 );
		  	// {
		  	//   shapeList[ i ].y = height;
		  	// }
		}
	}

	// if( xTho == intersectX[ 3 ] )
	// {
	// 	collide( shp4, flyObj1 );
	// 	collide( shp9, flyObj2 );
	// 	collide( shp14, flyObj3 );
	// 	collide( shp19, flyObj4 );
	// 	collide( shp24, flyObj5 );
	// 	collide( shp29, flyObj6 );
	// } 
	// else if( xTho == intersectX[ 2 ] )
	// {
	// 	collide( shp3, flyObj1 );
	// 	collide( shp8, flyObj2 );
	// 	collide( shp13, flyObj3 );
	// 	collide( shp18, flyObj4 );
	// 	collide( shp23, flyObj5 );
	// 	collide( shp28, flyObj6 );
	// }
	// else if( xTho == intersectX[ 1 ] )
	// {
	// 	collide( shp2, flyObj1 );
	// 	collide( shp7, flyObj2 );
	// 	collide( shp12, flyObj3 );
	// 	collide( shp17, flyObj4 );
	// 	collide( shp22, flyObj5 );
	// 	collide( shp27, flyObj6 );
	// } 
	// else if( xTho == intersectX[ 0 ] )
	// {
	// 	collide( shp1, flyObj1 );
	// 	collide( shp6, flyObj2 );
	// 	collide( shp11, flyObj3 );
	// 	collide( shp16, flyObj4 );
	// 	collide( shp21, flyObj5 );
	// 	collide( shp26, flyObj6 );
	// }

	//Move "Flying Object" Horizontally as test
	xTho += 2;
	// if( xTho > width )
	// {
	// 	xTho = 0;
	// 	flyObj = createShape( 0, 200, color( 22, 55, 200 ), 10, 10, true );
	// }

	// thisssssss THIS

	if( xTho > width )
	{
		xTho = 0;
		flyObj1 = createShape( 0, 100, color( 22, 55, 200 ), 10, 10, true );
		// flyObj2 = createShape( 0, 200, color( 22, 55, 200 ), 10, 10, true );
		// flyObj3 = createShape( 0, 300, color( 22, 55, 200 ), 10, 10, true );
		// flyObj4 = createShape( 0, 400, color( 22, 55, 200 ), 10, 10, true );
		// flyObj5 = createShape( 0, 500, color( 22, 55, 200 ), 10, 10, true );
		// flyObj6 = createShape( 0, 500, color( 22, 55, 200 ), 10, 10, true );
	}
  
 	flyObj1.setX( xTho );
 // 	flyObj2.setX( xTho );
 // 	flyObj3.setX( xTho );
 // 	flyObj4.setX( xTho );
 // 	flyObj5.setX( xTho );
 // 	flyObj6.setX( xTho );
  
	// strokeWeight( 1 );
	// triangle( 233, 193, 240, 200, 247, 207 );
	// ellipse( 233, 193, 5, 5 );
	// ellipse( 240, 200, 5, 5 );
	// ellipse( 247, 207, 5, 5 );
  
	// flyObj1.drawShape();
	// shp1.drawShape();
	// shp2.drawShape();
	// shp3.drawShape();
	// shp4.drawShape();
	// flyObj2.drawShape();
	// shp6.drawShape();
	// shp7.drawShape();
	// shp8.drawShape();
	// shp9.drawShape();
	// flyObj3.drawShape();
	// shp11.drawShape();
	// shp12.drawShape();
	// shp13.drawShape();
	// shp14.drawShape();
	// flyObj4.drawShape();
	// shp16.drawShape();
	// shp17.drawShape();
	// shp18.drawShape();
	// shp19.drawShape();
	// flyObj5.drawShape();
	// shp21.drawShape();
	// shp22.drawShape();
	// shp23.drawShape();
	// shp24.drawShape();
	// flyObj6.drawShape();
	// shp26.drawShape();
	// shp27.drawShape();
	// shp28.drawShape();
	// shp29.drawShape();
}

//Determine the output of all shapes
//that "collide" must notably
//"person" shapes (firstShape) colliding (or "recieving")
//"information" shapes (secondShape)
function collide( firstShape, secShape )
{
	var theSkew = firstShape.getSkew();
	secShape.setClr( calcSkewClr( theSkew, secShape.getClr() ) );
	secShape.setW( secShape.getW() + theSkew );
	secShape.setH( secShape.getH() + theSkew );
	secShape.setID( secShape.getID() + theSkew );
	if( secShape.getID() > 8 )
	{
		secShape.setID( 0 );
	}
	collisionCount++;
}

//Calculate how a Shape's Skew variable
//affects the color of another
function calcSkewClr( skew, clr )
{
	var newRed = red( clr ) - skew;
	if( newRed < 0 )
	{
		newRed = 255;
	}

	var newGreen = green( clr ) + (2*skew);
	if( newGreen > 255 )
	{
		newGreen = 255;
	}

	var newBlue = blue( clr ) + skew;
	if( newGreen > 255 )
	{
		newGreen = 255;
	}

	var newClr = color( newRed, newGreen, newBlue );
	return newClr;
}

//Iterates through the ShapeList
//and finds the X-Positions of all Shapes
//excluding exceptions (if any)
//This Function returns this list of X-Points,
//and thus positions can be used accordingly
function findAllX( excluded, shpList )
{
	var xList = [];
	var shpCount = shpList.length;
	// for( var i = 0; i < shapeCount; i++ )
	// {
	// 	if( i != excluded )
 //    	{
 //      		xList[ i ] = shapeList[ i ].getX();
 //    	}
	// }
	for( var i = 0; i < shpCount; i++ )
	{
		if( i % 5 != 0 )
    	{
      		xList[ i ] = shpList[ i ].getX();
    	}
	}
	return xList;
}

//Iterates through the ShapeList
//and finds the X-Positions of all Shapes
//excluding exceptions (if any)
//This Function returns this list of X-Points,
//and thus positions can be used accordingly

// function intersectionX()
// {
// 	var xList = findAllX( 0 )
// }