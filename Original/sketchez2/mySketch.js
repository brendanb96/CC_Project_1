//A STORY OF BLACK AND WHITE

//About the word "Equal" and how people/shapes
//Recieve the same information in different ways
//Symbolic

//List of Shapes
var shapeList = [];
//Number of Shapes
var shapeCount = 0;
//List of shapes within a "generation"
var genList = [ [], [], [], [], [], [] ];
//List of shapes within a "family"
var famList = [ [], [], [], [], [] ];

//Test Variable (for now) about moving objects
var xTho = 0;
var yTho = 0;

//See how many times shapes "collided"
var collisionCount = 0;

var famColor1;
var famColor2;
var famColor3;
var famColor4;

//Class for Shape to control all methods and variables
function Shape( x, y, clr, w, h, fam )
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
	this._path = 0;
	this._fam = shapeCount % 5;
	//Because this._fam = shapeCount % 5, shapeCount will be
	// a multiple of 5
	this._gen = (shapeCount - this._fam) / 5;

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

	//Obtain Shape Family
	this.getFam = function()
	{
		return this._fam;
	}

	//Obtain Shape Generation
	this.getGen = function()
	{
		return this._gen;
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

	//Change Skew
	this.setSkew = function( newSkew )
	{
		this._skew = newSkew;
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
			//Adjust vertex vales
			//for width and height
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
			//Adjust vertex vales
			//for width and height
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
		//Check ID Again, 4 - Randomized Multi-Line Shape
		else if( this._id == 4 )
		{
			//Adjust vertex vales
			//for width and height
			for( var i = 0; i < this._w; i++ )
			{
				for( var j = 0; j < this._h; j++ )
				{
					stroke( i + j, 55, 20 );
					if( i % j >= 7 )
					{
						line( this._x, this._y, this._x + random(-this._w/2, this._w/2), this._y + random(-this._h/2, this._h/2) );
					}
				}
			}
		}
		//Check ID Again, 5 - Distorted 5-vertex Shape
		else if( this._id == 5 )
		{
			//Adjust vertex vales
			//for width and height
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
		//Check ID Again, 6 - Randomized Multi-Ellipse Shape
		else if( this._id == 6 )
		{
			theGreen = green( clr );
			theRed = red( clr );
			stroke( theRed, theGreen, random(255) );
			for( var i = 0; i < this._w; i++ )
			{
				for( var j = 0; j < this._h; j++ )
				{
					if( i % j >= 7 )
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
		//Check ID Again, 8 - Randomized Shape
		else if( this._id == 8 )
		{
			for( var i = 0; i < this._w; i++ )
			{
				stroke( random( 255 ), random( i + j ), random( 255 ) );
				for( var j = 0; j < this._h; j++ )
				{
					if( i % j >= 7 )
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
	createCanvas(650, 650);
	//Initiliaze Shapes Here
	//To avoid constant recreation in Draw Function
	//All Shape Families
	famColor1 = color( random(255), random(255), random(255) );
	famColor2 = color( random(255), random(255), random(255) );
	famColor3 = color( random(255), random(255), random(255) );
	famColor4 = color( random(255), random(255), random(255) );

	//All Shapes
	var flyObj1 = createShape( 0, 100, color( 22, 55, 200 ), 10, 10 );
	var shp1 = createShape( 150, 100, famColor1, 50, 10 );
	var shp2 = createShape( 276, 100, famColor2, 50, 50 );
	var shp3 = createShape( 300, 100, famColor3, 50, 20 );
	var shp4 = createShape( 500, 100, famColor4, 30, 70 );
	var flyObj2 = createShape( 0, 200, color( 22, 55, 200 ), 10, 10 );
	var shp6 = createShape( 72, 200, famColor1, 50, 50 );
	var shp7 = createShape( 160, 200, famColor2, 50, 50 );
	var shp8 = createShape( 320, 200, famColor3, 50, 50 );
	var shp9 = createShape( 400, 200, famColor4, 50, 50 );
	var flyObj3 = createShape( 0, 300, color( 22, 55, 200 ), 10, 10 );
	var shp11 = createShape( 100, 300, famColor1, 50, 50 );
	var shp12 = createShape( 206, 300, famColor2, 50, 50 );
	var shp13 = createShape( 350, 300, famColor3, 50, 50 );
	var shp14 = createShape( 470, 300, famColor4, 50, 50 );
	var flyObj4 = createShape( 0, 400, color( 22, 55, 200 ), 10, 10 );
	var shp16 = createShape( 270, 400, famColor1, 50, 50 );
	var shp17 = createShape( 500, 400, famColor2, 50, 50 );
	var shp18 = createShape( 100, 400, famColor3, 50, 50 );
	var shp19 = createShape( 200, 400, famColor4, 50, 50 );
	var flyObj5 = createShape( 0, 500, color( 22, 55, 200 ), 10, 10 );
	var shp21 = createShape( 100, 500, famColor1, 50, 10 );
	var shp22 = createShape( 305, 500, famColor2, 50, 50 );
	var shp23 = createShape( 500, 500, famColor3, 50, 20 );
	var shp24 = createShape( 155, 500, famColor4, 30, 70 );
	var flyObj6 = createShape( 0, 600, color( 22, 55, 200 ), 10, 10 );
	var shp26 = createShape( 500, 600, famColor1, 50, 50 );
	var shp27 = createShape( 400, 600, famColor2, 50, 50 );
	var shp28 = createShape( 200, 600, famColor3, 50, 50 );
	var shp29 = createShape( 320, 600, famColor4, 50, 50 );
} 

//Program Draw
function draw() 
{
	background(220);
	collisionCount = 0;

	//Obtain a List of the positions of 
	//all Shapes and store within a new array
	//that can be used to find intersection points
	var intersectX = findAllX( 0 ); 

	//Obtain All Initialized Shapes
	var flyObj1 = shapeList[ 0 ];
	var shp1 = shapeList[ 1 ];
	var shp2 = shapeList[ 2 ];
	var shp3 = shapeList[ 3 ];
	var shp4 = shapeList[ 4 ];
	var flyObj2 = shapeList[ 5 ];
	var shp6 = shapeList[ 6 ];
	var shp7 = shapeList[ 7 ];
	var shp8 = shapeList[ 8 ];
	var shp9 = shapeList[ 9 ];
	var flyObj3 = shapeList[ 10 ];
	var shp11 = shapeList[ 11 ];
	var shp12 = shapeList[ 12 ];
	var shp13 = shapeList[ 13 ];
	var shp14 = shapeList[ 14 ];
	var flyObj4 = shapeList[ 15 ];
	var shp16 = shapeList[ 16 ];
	var shp17 = shapeList[ 17 ];
	var shp18 = shapeList[ 18 ];
	var shp19 = shapeList[ 19 ];
	var flyObj5 = shapeList[ 20 ];
	var shp21 = shapeList[ 21 ];
	var shp22 = shapeList[ 22 ];
	var shp23 = shapeList[ 23 ];
	var shp24 = shapeList[ 24 ];
	var flyObj6 = shapeList[ 25 ];
	var shp26 = shapeList[ 26 ];
	var shp27 = shapeList[ 27 ];
	var shp28 = shapeList[ 28 ];
	var shp29 = shapeList[ 29 ];

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

	if( xTho == intersectX[ 3 ] )
	{
		collide( shp4, flyObj1 );
		collide( shp9, flyObj2 );
		collide( shp14, flyObj3 );
		collide( shp19, flyObj4 );
		collide( shp24, flyObj5 );
		collide( shp29, flyObj6 );
	} 
	else if( xTho == intersectX[ 2 ] )
	{
		collide( shp3, flyObj1 );
		collide( shp8, flyObj2 );
		collide( shp13, flyObj3 );
		collide( shp18, flyObj4 );
		collide( shp23, flyObj5 );
		collide( shp28, flyObj6 );
	}
	else if( xTho == intersectX[ 1 ] )
	{
		collide( shp2, flyObj1 );
		collide( shp7, flyObj2 );
		collide( shp12, flyObj3 );
		collide( shp17, flyObj4 );
		collide( shp22, flyObj5 );
		collide( shp27, flyObj6 );
	} 
	else if( xTho == intersectX[ 0 ] )
	{
		collide( shp1, flyObj1 );
		collide( shp6, flyObj2 );
		collide( shp11, flyObj3 );
		collide( shp16, flyObj4 );
		collide( shp21, flyObj5 );
		collide( shp26, flyObj6 );
	}

	//Move "Flying Object" Horizontally as test
	xTho += 2;
	// if( xTho > width )
	// {
	// 	xTho = 0;
	// 	flyObj = createShape( 0, 200, color( 22, 55, 200 ), 10, 10, true );
	// }

	if( xTho > width )
	{
		xTho = 0;
		flyObj1 = createShape( 0, 100, color( 22, 55, 200 ), 10, 10, true );
		flyObj2 = createShape( 0, 200, color( 22, 55, 200 ), 10, 10, true );
		flyObj3 = createShape( 0, 300, color( 22, 55, 200 ), 10, 10, true );
		flyObj4 = createShape( 0, 400, color( 22, 55, 200 ), 10, 10, true );
		flyObj5 = createShape( 0, 500, color( 22, 55, 200 ), 10, 10, true );
		flyObj6 = createShape( 0, 600, color( 22, 55, 200 ), 10, 10, true );
	}
  
 	flyObj1.setX( xTho );
 	flyObj2.setX( xTho );
 	flyObj3.setX( xTho );
 	flyObj4.setX( xTho );
 	flyObj5.setX( xTho );
 	flyObj6.setX( xTho );
  
	// strokeWeight( 1 );
	// triangle( 233, 193, 240, 200, 247, 207 );
	// ellipse( 233, 193, 5, 5 );
	// ellipse( 240, 200, 5, 5 );
	// ellipse( 247, 207, 5, 5 );
  
	flyObj1.drawShape();
	shp1.drawShape();
	shp2.drawShape();
	shp3.drawShape();
	shp4.drawShape();
	flyObj2.drawShape();
	shp6.drawShape();
	shp7.drawShape();
	shp8.drawShape();
	shp9.drawShape();
	flyObj3.drawShape();
	shp11.drawShape();
	shp12.drawShape();
	shp13.drawShape();
	shp14.drawShape();
	flyObj4.drawShape();
	shp16.drawShape();
	shp17.drawShape();
	shp18.drawShape();
	shp19.drawShape();
	flyObj5.drawShape();
	shp21.drawShape();
	shp22.drawShape();
	shp23.drawShape();
	shp24.drawShape();
	flyObj6.drawShape();
	shp26.drawShape();
	shp27.drawShape();
	shp28.drawShape();
	shp29.drawShape();
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
function findAllX( excluded )
{
	var xList = [];
	// for( var i = 0; i < shapeCount; i++ )
	// {
	// 	if( i != excluded )
 //    	{
 //      		xList[ i ] = shapeList[ i ].getX();
 //    	}
	// }
	for( var i = 0; i < shapeCount; i++ )
	{
		if( i % 5 != 0 )
    	{
      		xList[ i ] = shapeList[ i ].getX();
    	}
	}
	return xList;
}

//Iterates through the ShapeList
//and finds the X-Positions of all Shapes
//excluding exceptions (if any)
//This Function returns this list of X-Points,
//and thus positions can be used accordingly

function keyPressed()
{
	//Make Everyone Same
	if( key == '1')
	{
		resetColor( 1 );
		resetSkew();
	}

	//Make All "Screw" Attributes 0
	if( key == '2')
	{
		resetColor( 2 );
		for( var i = 0; i < shapeCount; i++ )
		{
			if( i % 5 != 0 )
    		{
    			shapeList[ i ].setSkew( 0 );
    		}
		}
	}

	if( key == '3' )
	{
		resetColor( 3 );
		resetSkew();
	}
}

function resetSkew()
{
	for( var i = 0; i < shapeCount; i++ )
	{
		if( i % 5 != 0 )
		{
			shapeList[ i ].setSkew( i % 3 );
		}
	}
}

function resetColor( type )
{
	var newColor = color( 255, 100, 205 );
	if( type == 1 )
	{
		var newColor = color( 255, 100, 205 );
		for( var i = 0; i < shapeCount; i++ )
		{
			if( i % 5 != 0 )
			{
				shapeList[ i ].setClr( newColor );
			}
		}
	}
	
	if( type == 2 )
	{
		for( var i = 0; i < shapeCount; i++ )
		{
			if( i % 5 == 1 )
    		{
      			shapeList[ i ].setClr( famColor1 );
    		}
    		else if( i % 5 == 2 )
    		{
      			shapeList[ i ].setClr( famColor2 );
    		}
    		else if( i % 5 == 3 )
    		{
      			shapeList[ i ].setClr( famColor3 );
    		}
    		else if( i % 5 == 4 )
    		{
      			shapeList[ i ].setClr( famColor4 );
    		}
		}
	}

	if( type == 3 )
	{
		for( var i = 0; i < shapeCount; i++ )
		{
			//Does not include flying objects
			if( i % 5 == 0 )
			{
				return;
			}

			var generation = shapeList[ i ].getGen();

			if( generation == 1 )
    		{
      			shapeList[ i ].setClr( 205, 30, 255 );
    		}
    		else if( generation == 2 )
    		{
      			shapeList[ i ].setClr( 255, 30, 205 );
    		}
    		else if( generation == 3 )
    		{
      			shapeList[ i ].setClr( 30, 255, 205 );
    		}
    		else if( generation == 4 )
    		{
      			shapeList[ i ].setClr( 100, 205, 210 );
    		}
    		else if( generation == 5 )
    		{
      			shapeList[ i ].setClr( 200, 20, 20 );
    		}
		}
	}
}