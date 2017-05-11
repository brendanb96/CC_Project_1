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

//Test Variable (for now) about moving objects
var xTho = 0;
var yTho = 0;

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
	this._skew = shapeCount;
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
		//Check ID Again, 5 - 5-vertex Shape
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
					theBlue = blue( clr );
					stroke( i + j, theGreen, theBlue );
					if( i % j >= 2 )
					{
						line( this._x, this._y, this._x + random(-this._w/2, this._w/2), this._y + random(-this._h/2, this._h/2) );
					}
				}
			}
		}
		//Check ID Again, 7 - 6-vertex Shape
		else if( this._id == 7 )
		{
			// var x1 = this._x - (this._w)/4;
			// var y1 = this._y;
			// var x2 = this._x;
			// var y2 = this._y - (this._h)/2;
			// var x3 = this._x + (this._w)/2
			// var y3 = this._y - (this._h)/4;
			// var x4 = this._x + (this._w)/2;
			// var y4 = this._y + (this._h)/2;
			// var x5 = this._x + (this._w)/4;
			// var y5 = this._y + (this._h)/4;
			// var x6 = this._x - (this._w)/2;
			// var y6 = this._y + (this._h)/4;
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
			beginShape();
			vertex( x1, y1 );
			vertex( x2, y2 );
			vertex( x3, y3 );
			vertex( x4, y4 );
			vertex( x5, y5 );
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
						line( this._x, this._y, this._x + random(-7, 7), this._y + random(-7, 7) );
					}
					
					stroke( random( 255 ), random( i + j ), random( 255 ) );
					if( i % j >= 2 )
					{
						line( this._x, this._y, this._x + random(-7, 7), this._y + random(-7, 7) );
					}
					
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

//Program Setup
function setup()
{ 
	createCanvas(400, 400);
	//Initiliaze Shapes Here
	//To avoid constant recreation in Draw Function
	var shp1 = createShape( 200, 200, color( 0 ), 50, 10 );
	var shp2 = createShape( 276, 200, color( 0 ), 50, 50 );
	var flyObj = createShape( 0, 200, color( 22, 55, 200 ), 10, 10 );
} 

//Program Draw
function draw() 
{
	background(220);

	//Obtain a List of the positions of 
	//all Shapes and store within a new array
	//that can be used to find intersection points
	var intersectX = findAllX( 2 ); 

	//Obtain first three shapes
	var shp1 = shapeList[ 0 ];
	var shp2 = shapeList[ 1 ];
	var flyObj = shapeList[ 2 ];

	//For all the Shapes in the ShapeList
	//Make them "move" along their innate "Path"
	//determiend by their member variables
	// for( var i = 0; i < shapeCount; i++ )
	// {
	// 	var path = shapeList[ i ].getPath();
	// 	if( path == 0 )
	// 	{
	// 		shapeList[ i ].setY( shapeList[ i ].getY() - 1 );
	// 	  	// if( shapeList[ i ].y < 0 );
	// 	  	// {
	// 	  	//   shapeList[ i ].y = height;
	// 	  	// }
	// 	}
	// }

	//Move "Flying Object" Horizontally as test
	if( xTho == intersectX[ 1 ] )
	{
		collide( shp2, flyObj );
	} 
	else if( xTho == intersectX[ 0 ] )
	{
		collide( shp1, flyObj );
	}

	xTho += 2;
	if( xTho > width )
	{
		xTho = 0;
		flyObj = createShape( 0, 200, color( 22, 55, 200 ), 10, 10, true );
	}
  
 	flyObj.setX( xTho );
  
	// strokeWeight( 1 );
	// triangle( 233, 193, 240, 200, 247, 207 );
	// ellipse( 233, 193, 5, 5 );
	// ellipse( 240, 200, 5, 5 );
	// ellipse( 247, 207, 5, 5 );
  
	flyObj.drawShape();
	shp1.drawShape();
	shp2.drawShape();
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
function findAllX( excluded )
{
	var xList = [];
	for( var i = 0; i < shapeCount; i++ )
	{
		if( i != excluded )
    	{
      		xList[ i ] = shapeList[ i ].getX();
    	}
	}
	return xList;
}
