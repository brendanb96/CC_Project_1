//A STORY OF BLACK AND WHITE

//About the word "Equal" and how people/shapes
//Recieve the same information in different ways
//Symbolic

//NOTE for Later:
//MOUSE is where "privilege" sways

var infoList = [];
var infoCount = 0;

// USED FOR RANDOM Function... chooses random number from list
// instead of floating number
var intList = [ 0, 1, 2, 3, 4, 5 ];

//List of Shapes
var shapeList = [];
//Number of Shapes
var shapeCount = 0;
//List of X-Values for All Shapes
var xList = [];

//Test Variable (for now) about moving objects
var xTho = 0;
var yTho = 0;

//See how many times shapes "collided"
var collisionCount = 0;

var startTimeInSec = 0;

var canvasGrid = [[]];

var freq = 0.2;

var famColor1;
var famColor2;
var famColor3;
var famColor4;
var familyColors = [];

var timeLapsed = 0;

var sceneCapture = 0;

var autoAlert = "(Will Automatically Activate If Not Pressed)";

// Console Message
var consoleMessage = " - Changes All Shapes To Same ";
var messageSent = false;

var centerX = 0;
var centerY = 0;

var infoBool = false;

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
	this._skewBool = false;
	this._skewAmount = 0;

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

	//Obtain Shape Skew Boolean
	this.getSkewBool = function()
	{
		return this._skewBool;
	}

	//Obtain Shape Skew Amount
	this.getSkewAmount = function()
	{
		return this._skewAmount;
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

	//Change Shape Skew Boolean
	this.setSkewBool = function( newSkewBool )
	{
		this._skewBool = newSkewBool;
	}

	//Change Shape Skew Amount
	this.setSkewAmount = function( newSkewAmount )
	{
		this._skewAmount = newSkewAmount;
	}

	this.formLetters = function( xPos, yPos1, yPos2, rem )
	{
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
			text( "a", xPos, yPos1 );
			text( "b", xPos, yPos2 );
		}
		else if( letterNum < 3 )
		{
			text( "c", xPos, yPos1 );
			text( "d", xPos, yPos2 );
		}
		else if( letterNum < 4 )
		{
			text( "e", xPos, yPos1 );
			text( "f", xPos, yPos2 );
		}
		else if( letterNum < 5 )
		{
			text( "g", xPos, yPos1 );
			text( "h", xPos, yPos2 );
		}
		else if( letterNum < 6 )
		{
			text( "i", xPos, yPos1 );
			text( "j", xPos, yPos2 );
		}
		else if( letterNum < 7 )
		{
			text( "k", xPos, yPos1 );
			text( "l", xPos, yPos2 );
		}
		else if( letterNum < 8 )
		{
			text( "m", xPos, yPos1 );
			text( "n", xPos, yPos2 );
		}
	}

	this.formPicto = function( x1, y1, x2, y2, x3, y3, i, dataSize)
	{
		if( i % 64 == 0 )
		{
			ellipse( x1, y1, dataSize, dataSize );
		}
		else if( i % 32 == 0 )
		{
			triangle( x1, y1, x2, y2, x3, y3 );
		}
		else
		{
			rect( x1, y1, dataSize, dataSize );
		}
	}

	//WAVE INFOTYPE
	this.drawWave = function( dataSize, endPoints, skewList1, skewList2 )
	{
		// for( i = start; i < end; i += 3 )
		// {
		// 	ellipse( i * ( dataSize/10 ), this._h/4 * sin( freq * ( this._time + i ) ) + this._y - (this._h / 2), dataSize, dataSize );
		// }


		for( i = 0; i < this._w; i += 3 )
		{
			//INSIDE "FOR" LOOP FOR USE OF "i"
			var xPos = i * ( dataSize/10 );
			var yPos = this._h/4 * sin( freq * ( this._time + i ) ) + this._y - (this._h / 2);

			if( i < endPoints[ 0 ] )
			{
				ellipse( xPos, yPos, dataSize, dataSize );
			}
			else if( i < endPoints[ 1 ] )
			{
				yPos = (yPos / skewList2[1] ) + (this._h / 4);
				ellipse( xPos, yPos, dataSize*skewList1[1], dataSize*skewList1[1] );
			}
			else if( i < endPoints[ 2 ] )
			{
				yPos = (yPos / skewList2[2] ) + (this._h / 4);
				ellipse( xPos, yPos, dataSize*skewList1[2], dataSize*skewList1[2] );
			}
			else if( i < endPoints[ 3 ] )
			{
				yPos = (yPos / skewList2[3] ) - (this._h / 2);
				ellipse( xPos, yPos, dataSize*skewList1[3], dataSize*skewList1[3] );
			}
		}
	}

	//BINARY INFOTYPE
	this.drawBinary = function( dataSize, endPoints, skewList1, skewList2 )
	{
		for( i = 0; i < this._w; i += 8 )
		{
			var xPos = i * dataSize/10;
			var yPos = this._y;
			var wFor0 = dataSize * 1.5;
			var hFor0 = dataSize * 2.2;
			var wFor1 = dataSize * 0.5;
			var hFor1 = dataSize * 2.2;

			if( i < endPoints[ 0 ] )
			{
				// CHANGE Y-POSITION
				yPos += random(skewList2[0]);

				// CHANGE SIZES
				wFor0 = wFor0 * skewList1[0];
				hFor0 = hFor0 * skewList1[0];
				wFor1 = wFor1 * skewList1[0];
				hFor1 = hFor1 * skewList1[0];

				if( i % 32 == 0 )
				{
					// "0" part of binary
					ellipseMode( CENTER );
					noFill();
					strokeWeight( 2 );
					ellipse( xPos, yPos, wFor0, hFor0 );
				}
				else if( i % 16 == 0 )
				{
					// "1" part of binary
					rectMode( CENTER );
					fill( this._clr );
					strokeWeight( 2 );
					rect( xPos, yPos, wFor1, dataSize * (2*skewList1[0]) );
				}
			}
			else if( i < endPoints[ 1 ] )
			{
				// CHANGE Y-POSITION
				var yPos2 = yPos + (this._h * skewList2[1]);

				// CHANGE SIZES
				wFor0 = wFor0 * skewList1[1];
				hFor0 = hFor0 * skewList1[1];
				wFor1 = wFor1 * skewList1[1];
				hFor1 = hFor1 * skewList1[1];

				if( i % 32 == 0 )
				{
					// "0" part of binary
					ellipseMode( CENTER );
					noFill();
					strokeWeight( 2 );
					ellipse( xPos, yPos, wFor0, hFor0 );
					//ADDED from EndPoint1
					fill( this._clr );
					rect( xPos, yPos2, wFor1, hFor1 );
				}
				else if( i % 16 == 0 )
				{
					// "1" part of binary
					rectMode( CENTER );
					fill( this._clr );
					strokeWeight( 2 );
					rect( xPos, yPos, wFor1, hFor1 );
					//ADDED from EndPoint1
					noFill();
					ellipse( xPos, yPos2, wFor0, hFor0 );
				}
			}
			else if( i < endPoints[ 2 ] )
			{
				// CHANGE Y-POSITION
				var yPos2 = yPos + (this._h * skewList2[2]);
				var yPos3 = yPos - (this._h * skewList2[2]);

				// CHANGE SIZES
				wFor0 = wFor0 * skewList1[2];
				hFor0 = hFor0 * skewList1[2];
				wFor1 = wFor1 * skewList1[2];
				hFor1 = hFor1 * skewList1[2];

				if( i % 32 == 0 )
				{
					// "0" part of binary
					ellipseMode( CENTER );
					noFill();
					strokeWeight( 2 );
					ellipse( xPos, yPos, wFor0, hFor0 );
					//ADDED from EndPoint1
					fill( this._clr );
					rect( xPos, yPos2, wFor1, hFor1 );
					//ADDED from EndPoint2
					noFill();
					ellipse( xPos, yPos3, wFor0, hFor0 );
				}
				else if( i % 16 == 0 )
				{
					// "1" part of binary
					rectMode( CENTER );
					fill( this._clr );
					strokeWeight( 2 );
					rect( xPos, yPos, wFor1, hFor1 );
					//ADDED from EndPoint1
					noFill();
					ellipse( xPos, yPos2, wFor0, hFor0 );
					//ADDED from EndPoint2
					fill( this._clr );
					rect( xPos, yPos3, wFor1, hFor1 );
				}
			}
			else if( i < endPoints[ 3 ] )
			{
				// CHANGE Y-POSITION
				yPos += random(skewList2[3]);
				var yPos2 = yPos + (this._h * skewList2[2]);
				var yPos3 = yPos - (this._h * skewList2[2]);

				// CHANGE SIZES
				wFor0 = wFor0 * skewList1[3];
				hFor0 = hFor0 * skewList1[3];
				wFor1 = wFor1 * skewList1[3];
				hFor1 = hFor1 * skewList1[3];

				if( i % 32 == 0 )
				{
					// "0" part of binary
					ellipseMode( CENTER );
					noFill();
					strokeWeight( 2 );
					ellipse( xPos, yPos, wFor0, hFor0 );
					//ADDED from EndPoint1
					fill( this._clr );
					rect( xPos, yPos2, wFor1, hFor1 );
					//ADDED from EndPoint2
					noFill();
					ellipse( xPos, yPos3, wFor0, hFor0 );
				}
				else if( i % 16 == 0 )
				{
					// "1" part of binary
					rectMode( CENTER );
					fill( this._clr );
					strokeWeight( 2 );
					rect( xPos, yPos, wFor1, hFor1 );
					//ADDED from EndPoint1
					noFill();
					ellipse( xPos, yPos2, wFor0, hFor0 );
					//ADDED from EndPoint2
					fill( this._clr );
					rect( xPos, yPos3, wFor1, hFor1 );
				}
			}
		}
	}

	//LETTER INFOTYPE
	this.drawLetters = function( dataSize, endPoints, skewList1, skewList2 )
	{
		for( i = 0; i < this._w; i += 16 )
		{
			var xPos = i * dataSize/10;
			var yPos1 = this._y + (this._h / 2);
			var yPos2 = this._y;

			sizeOfText = dataSize * 2;

			if( i < endPoints[ 0 ] )
			{
				textSize( sizeOfText );

				// REMAINDER from i % 64
				rem = i % 64
				var letterNum = random( 8 );

				//CALL FUNCTION
				// xPos, yPos1, yPos2, rem parameters
				this.formLetters( xPos, yPos1, yPos2, rem );
			}
			else if( i < endPoints[ 1 ] )
			{
				// CHANGE Y-VALUES
				yPos1 = yPos1 * (skewList2[1]);
				yPos2 = yPos2 * 1.05 * (skewList2[1]);

				// CHANGE FONT SIZE
				textSize( sizeOfText * skewList1[1]);

				// REMAINDER from i % 64
				rem = i % 64

				//CALL FUNCTION
				// xPos, yPos1, yPos2, rem parameters
				this.formLetters( xPos, yPos1, yPos2, rem );
			}
			else if( i < endPoints[ 2 ] )
			{
				// CHANGE Y-VALUES
				yPos1 = yPos1 * (skewList2[2]);
				yPos2 = yPos2 * 1.05 * (skewList2[2]);

				// CHANGE FONT SIZE
				textSize( sizeOfText * skewList1[2]);

				// REMAINDER from i % 64
				rem = i % 64
				var letterNum = random( 8 );

				//CALL FUNCTION
				// xPos, yPos1, yPos2, rem parameters
				this.formLetters( xPos, yPos1, yPos2, rem );
			}
			else if( i < endPoints[ 3 ] )
			{
				// CHANGE Y-VALUES
				yPos1 = yPos1 * (skewList2[3]);
				yPos2 = yPos2 * 1.05 * (skewList2[3]);

				// CHANGE FONT SIZE
				textSize( sizeOfText * skewList1[3]);

				// REMAINDER from i % 64
				rem = i % 64
				var letterNum = random( 8 );

				//CALL FUNCTION
				// xPos, yPos1, yPos2, rem parameters
				this.formLetters( xPos, yPos1, yPos2, rem );
			}
		}
	}

	//PICTO INFOTYPE
	this.drawPicto = function( dataSize, endPoints, skewList1, skewList2 )
	{
		for( i = 0; i < this._w; i += 16 )
		{
			var x1 = i * ( dataSize/10 );
			var y1 = this._h/6 * cos( freq * ( this._time + i ) ) + this._y;

			var x2 = x1 - dataSize;
			var y2 = y1;

			var x3 = x1 + dataSize;
			var y3 = y1 + dataSize;

			if( i < endPoints[ 0 ] )
			{
				// CHANGE SIZE
				var newDataSize = dataSize * skewList1[0];

				// CHANGE Y-POSITIONS
				y1 = y1 * skewList2[0];
				y2 = y2 * skewList2[0];
				y3 = y3 * skewList2[0];

				//CALL FUNCTION
				// x1, y1, x2, y2, x3, y3, i, newDataSize
				this.formPicto( x1, y1, x2, y2, x3, y3, i, newDataSize );
			}
			else if( i < endPoints[ 1 ] )
			{
				// CHANGE SIZE
				var newDataSize = dataSize * skewList1[1];
				x2 -= newDataSize;
				x3 += newDataSize;

				//CHANGE Y-POSITIONS
				y1 = y1 * skewList2[1];
				y2 = y2 * skewList2[1];
				y3 = y3 * skewList2[1];

				//CALL FUNCTION
				// x1, y1, x2, y2, x3, y3, i, newDataSize
				this.formPicto( x1, y1, x2, y2, x3, y3, i, newDataSize );
			}
			else if( i < endPoints[ 2 ] )
			{
				// CHANGE SIZE
				var newDataSize = dataSize * skewList1[1];
				x2 -= newDataSize;
				x3 += newDataSize;

				// CHANGE Y-POSITIONS
				y1 = y1 * skewList2[2];
				y2 = y2 * skewList2[2];
				y3 = y3 * skewList2[2];

				//CALL FUNCTION
				// x1, y1, x2, y2, x3, y3, i, newDataSize
				this.formPicto( x1, y1, x2, y2, x3, y3, i, newDataSize );
			}
			else if( i < endPoints[ 3 ] )
			{
				// CHANGE SIZE
				var newDataSize = dataSize * skewList1[1];
				x2 -= newDataSize;
				x3 += newDataSize;

				// CHANGE Y-POSITIONS
				y1 = y1 * skewList2[3];
				y2 = y2 * skewList2[3];
				y3 = y3 * skewList2[3];

				//CALL FUNCTION
				// x1, y1, x2, y2, x3, y3, i, newDataSize
				this.formPicto( x1, y1, x2, y2, x3, y3, i, newDataSize );
			}
		}
	}

	//Draw the Shape
	this.parseData = function( xValue1, xValue2, xValue3 )
	{
		// xValue refers to the xValue in which is used as the "end" points for drawings
		// Default is the Width of the Object...
		//
		var endPoints = [];
		if( xValue1 == null )
		{
			xValue1 = this._w;
			endPoints[ 0 ] = xValue1;
			endPoints[ 1 ] = this._w;
			endPoints[ 2 ] = this._w;
			endPoints[ 3 ] = this._w;
		}
		else if( xValue2 == null )
		{
			xValue2 = this._w;
			endPoints[ 0 ] = xValue1;
			endPoints[ 1 ] = xValue2;
			endPoints[ 2 ] = this._w;
			endPoints[ 3 ] = this._w;
		}
		else if( xValue3 == null )
		{
			xValue3 = this._w;
			endPoints[ 0 ] = xValue1;
			endPoints[ 1 ] = xValue2;
			endPoints[ 2 ] = xValue3;
			endPoints[ 3 ] = this._w;
		}
		else
		{
			endPoints[ 0 ] = xValue1;
			endPoints[ 1 ] = xValue2;
			endPoints[ 2 ] = xValue3;
			endPoints[ 3 ] = this._w;
		}

		if( this._w > 400 )
		{
			this.setW( 0 );
			this._time = 0;
		}

		strokeWeight( 1 );
		fill( this._clr );
		stroke( this._clr );

		var dataSize = this._dataSize;

		if( id == 0 )
		{
			// KEPT HERE... For Loops Don't Work For Some Reason
			// for( x = 0; x < endPoints.length; x++ )
			// {
			// 	this.drawWave( dataSize, 0, endPoints[ x ] );
			// }

			// code for id==0 START

			// Convert Skew for "Wave" Data Type, and calculate new Values
			//Skew DataSize
			var listSkew1 = [];

			//Skew Amplitude
			var listSkew2 = [];

			// IF skewBool is true
			if( this._skewBool )
			{
				listSkew1[ 0 ] = 1;
				listSkew2[ 0 ] = 1;
				listSkew1[ 1 ] = 1.5;
				listSkew2[ 1 ] = 1.5;
				listSkew1[ 2 ] = 0.5;
				listSkew2[ 2 ] = 2;
				listSkew1[ 3 ] = 1.5;
				listSkew2[ 3 ] = 0.5;
			}
			else
			{
				listSkew1[ 0 ] = 1;
				listSkew2[ 0 ] = 1;
				listSkew1[ 1 ] = 1;
				listSkew2[ 1 ] = 1;
				listSkew1[ 2 ] = 1;
				listSkew2[ 2 ] = 1;
				listSkew1[ 3 ] = 1;
				listSkew2[ 3 ] = 1;
			}

			this.drawWave( dataSize, endPoints, listSkew1, listSkew2 );

		}
		else if( id == 1 )
		{
			// Convert Skew for "Binary" Data Type, and calculate new Values

			//Skew DataSize
			var listSkew1 = [];

			//Skew DataRows
			var listSkew2 = [];

			// IF skewBool is true
			if( this._skewBool )
			{
				listSkew1[ 0 ] = 1;
				listSkew2[ 0 ] = 0;
				listSkew1[ 1 ] = 1.2;
				listSkew2[ 1 ] = 0.5;
				listSkew1[ 2 ] = 0.6;
				listSkew2[ 2 ] = 0.4;
				listSkew1[ 3 ] = 1.5;
				listSkew2[ 3 ] = 0.2;
			}
			else
			{
				listSkew1[ 0 ] = 1;
				listSkew2[ 0 ] = 0;
				listSkew1[ 1 ] = 1;
				listSkew2[ 1 ] = 0;
				listSkew1[ 2 ] = 1;
				listSkew2[ 2 ] = 0;
				listSkew1[ 3 ] = 1;
				listSkew2[ 3 ] = 0;
			}

			this.drawBinary( dataSize, endPoints, listSkew1, listSkew2 );
		}
		else if( id == 2 )
		{
			// Convert Skew for "Letters" Data Type, and calculate new Values

			//Skew TextSize
			var listSkew1 = [];

			//Skew Letter Positioning
			var listSkew2 = [];

			// IF skewBool is true
			if( this._skewBool )
			{
				listSkew1[ 0 ] = 1;
				listSkew2[ 0 ] = 1;
				listSkew1[ 1 ] = 1.5;
				listSkew2[ 1 ] = 1.02;
				listSkew1[ 2 ] = 0.5;
				listSkew2[ 2 ] = 0.9;
				listSkew1[ 3 ] = 2;
				listSkew2[ 3 ] = 1.05;
			}
			else
			{
				listSkew1[ 0 ] = 1;
				listSkew2[ 0 ] = 1;
				listSkew1[ 1 ] = 1;
				listSkew2[ 1 ] = 1;
				listSkew1[ 2 ] = 1;
				listSkew2[ 2 ] = 1;
				listSkew1[ 3 ] = 1;
				listSkew2[ 3 ] = 1;
			}

			this.drawLetters( dataSize, endPoints, listSkew1, listSkew2 );
		}
		else if( id == 3 )
		{
			// Convert Skew for "Picto" Data Type, and calculate new Values

			//Skew Shape Size
			var listSkew1 = [];

			//Skew Shape Position
			var listSkew2 = [];

			// IF skewBool is true
			if( this._skewBool )
			{
				listSkew1[ 0 ] = 1;
				listSkew2[ 0 ] = 1;
				listSkew1[ 1 ] = 1.5;
				listSkew2[ 1 ] = 1.02;
				listSkew1[ 2 ] = 2;
				listSkew2[ 2 ] = 1.1;
				listSkew1[ 3 ] = 1.5;
				listSkew2[ 3 ] = 0.95;
			}
			else
			{
				listSkew1[ 0 ] = 1;
				listSkew2[ 0 ] = 1;
				listSkew1[ 1 ] = 1;
				listSkew2[ 1 ] = 1;
				listSkew1[ 2 ] = 1;
				listSkew2[ 2 ] = 1;
				listSkew1[ 3 ] = 1;
				listSkew2[ 3 ] = 1;
			}

			this.drawPicto( dataSize, endPoints, listSkew1, listSkew2 );
		}
		this._time += 0.1;
	}

	//Draw the Shape
	this.drawShape = function()
	{
		return;
	}
}

//Class for Shape to control all methods and variables
function Shape( x, y, clr, w, h, id )
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
	// this._skew = random( skew );
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
		//Check ID Again, 4 - Distorted 5-vertex Shape
		else if( this._id == 4 )
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
		//Check ID Again, 5 - Distorted 7-vertex Shape
		else if( this._id == 5 )
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
function createShape( x, y, clr, w, h, id )
{
	var newShape = new Shape ( x, y, clr, w, h, id );
	shapeList[ shapeCount ] = newShape;
	shapeCount++;
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
	createCanvas(400, 400);
	//Initiliaze Seconds
	startTimeInSec = second();

	timeLapsed = millis();

	famColor1 = color( random(255), random(50), random(255) );
	famColor2 = color( random(255), random(50), random(255) );
	famColor3 = color( random(255), random(50), random(255) );
	famColor4 = color( random(255), random(50), random(255) );
	familyColors = [ famColor1, famColor2, famColor3, famColor4 ];

	// Create All InfoObjs
	// var info1Clr = color( 15, 100, 172 );
	// var info2Clr = color( 150, 100, 172 );
	// var info3Clr = color( 118, 10, 172 );
	// var info4Clr = color( 15, 200, 172 );

	var info1Clr = color( 0 );
	var info2Clr = color( 0 );
	var info3Clr = color( 0 );
	var info4Clr = color( 0 );

	var infTho1 = new InfoObj ( 0, 80, info1Clr, 10 );
	var infTho2 = new InfoObj ( 1, 150, info2Clr, 10 );
	var infTho3 = new InfoObj ( 2, 240, info3Clr, 10 );
	var infTho4 = new InfoObj ( 3, 350, info4Clr, 10 );

	// Initiliaze Values for infoList Array Here
	// Never add to array passed this point
	infoList[ 0 ] = infTho1;
	infoList[ 1 ] = infTho2;
	infoList[ 2 ] = infTho3;
	infoList[ 3 ] = infTho4;

	//CENTER POINTS
	centerX = width / 2;
	centerY = height / 2;

	// var shp1 = createShape( 60, 50, famColor1, 70, 40 );
	// var shp2 = createShape( 160, 50, famColor2, 40, 70 );
	// var shp3 = createShape( 80, 150, famColor3, 40, 100 );
	// var shp4 = createShape( 200, 150, famColor4, 80, 80 );
	// var shp5 = createShape( 70, 250, famColor3, 80, 70 );
	// var shp6 = createShape( 230, 250, color( 0 ), 80, 30 );
	// var shp7 = createShape( 100, 350, famColor1, 60, 40 );
	// var shp8 = createShape( 190, 350, famColor2, 70, 70 );
	// var shp9 = createShape( 300, 50, famColor3, 80, 60 );
	// var shp10 = createShape( 340, 150, famColor4, 80, 65 );
	// var shp11 = createShape( 310, 250, famColor3, 55, 100 );
	// var shp12 = createShape( 330, 350, famColor2, 40, 70 );

	//x, y, clr, w, h, id parameters
	var shp1 = createShape( 190, 150, color( 0 ), 40, 40, 0 );
	var shp2 = createShape( 60, 50, color( 205 ), 40, 40, 0 );
	var shp3 = createShape( 230, 250, color( 70 ), 40, 40, 0 );
	var shp4 = createShape( 200, 350, color( 120 ), 40, 40, 0 );
	var shp5 = createShape( 310, 50, color( 150 ), 40, 40, 1 );
	var shp6 = createShape( 80, 150, color( 150 ), 40, 40, 2 );
	var shp7 = createShape( 310, 250, color( 150 ), 40, 40, 3 );
	var shp8 = createShape( 65, 350, color( 150 ), 40, 40, 4 );
	var shp9 = createShape( 160, 50, color( 150 ), 80, 50, 5 );
	var shp10 = createShape( 340, 150, color( 150 ), 40, 15, 5 );
	var shp11 = createShape( 90, 250, color( 150 ), 55, 60, 5 );
	var shp12 = createShape( 325, 350, color( 150 ), 30, 20, 5 );


	for( i = 0; i < shapeList.length; i++ )
	{
		xList[ i ] = shapeList[ i ].getX();
	}
} 

//Program Draw
function draw() 
{
	background(255);
	collisionCount = 0;

	var currentSec = second();

	// timeLapsed = millis();

	timeLapsed = millis() / 1000.00;

	//try using frame... where frame = 2.5 or whatever
	//and we test timelapsed by 1*frame, so we know, frame1, frame2 by arithmatic...

	//Obtain a List of the positions of 
	//all Shapes and store within a new array
	//that can be used to find intersection points

	// var currentSec = second();

	// colorBackground();

	// drawInfo( xList );

	if( timeLapsed < 2.5 )
	{
		//Start Story... Change "scene"
		sceneCapture = 1;

		//REPEAT TEXT SIZE as there is an InfoObject that uses textSize
		narrator( "A Story of Black and White" );
	}
	else if( timeLapsed < 5.0 )
	{
		narrator( "by Brendan Boursiquot" );
	}
	else if( timeLapsed < 7.5 )
	{
		//Parameter is "How Many" Shapes to draw
		//Uses this for index purposes as well
		//As the shapes are ordered from those that
		//Appear First to Those that appear Last
		drawTheShapes( 1 );
	}
	else if( timeLapsed < 10.0 )
	{
		drawTheShapes( 2 );
	}
	else if( timeLapsed < 12.5 )
	{
		drawTheShapes( 4 );
	}
	else if( timeLapsed < 15 )
	{
		narrator( "What Makes Us Equal?" );
		drawTheShapes( 4 );
	}
	// FRAME 7
	else if( timeLapsed < 17.5 )
	{
		narrator( "That We Are The Same Color?" );
		drawTheShapes( 4 );
	}
	else if( timeLapsed < 20 )
	{
		narrator( "That We Are The Same Color?" );
		drawTheShapes( 4 );
		narrator( "(press 1)", true );
		// console.log( sceneCapture + consoleMessage + "color." );
		// console.log( autoAlert );
		messageFromConsole( "Color." );
	}
	else if( timeLapsed < 22.5 )
	{
		//Change "scene"
		sceneCapture = 2;
		messageSent = false;
		drawTheShapes( 5 );
	}
	else if( timeLapsed < 25 )
	{
		drawTheShapes( 6 );
	}
	else if( timeLapsed < 27.5 )
	{
		drawTheShapes( 8 );
	}
	else if( timeLapsed < 30 )
	{
		narrator( "Yet Still... What Makes Us Equal?" );
		drawTheShapes( 8 );
	}
	// FRAME 7
	else if( timeLapsed < 32.5 )
	{
		narrator( "That We Have The Same Function?" );
		drawTheShapes( 8 );
	}
	else if( timeLapsed < 35 )
	{
		narrator( "That We Have The Same Function?" );
		drawTheShapes( 8 );
		narrator( "(press 2)", true );
		messageFromConsole( "Form." );
	}
	else if( timeLapsed < 37.5 )
	{
		//Change "scene"
		sceneCapture = 3;
		messageSent = false;
		drawTheShapes( 9 );
	}
	else if( timeLapsed < 40 )
	{
		drawTheShapes( 10 );
	}
	else if( timeLapsed < 42.5 )
	{
		drawTheShapes( 12 );
	}
	else if( timeLapsed < 45 )
	{
		narrator( "And We Still Ask... What Makes Us Equal?" );
		drawTheShapes( 12 );
	}
	// FRAME 7
	else if( timeLapsed < 47.5 )
	{
		narrator( "That We Have The Same Size of Influence?" );
		drawTheShapes( 12 );
	}
	else if( timeLapsed < 50 )
	{
		narrator( "That We Have The Same Size of Influence?" );
		drawTheShapes( 12 );
		narrator( "(press 3)", true );
		messageFromConsole( "Size." );
	}
	else if( timeLapsed < 52.5 )
	{
		//Change "scene"
		sceneCapture = 4;
		messageSent = false;
		drawTheInfo( 1, false );
		drawTheShapes( 12 );
	}
	else if( timeLapsed < 55 )
	{
		drawTheInfo( 2, false );
		drawTheShapes( 12 );
	}
	else if( timeLapsed < 57.5 )
	{
		drawTheInfo( 4, false );
		drawTheShapes( 12 );
	}
	else if( timeLapsed < 60 )
	{
		narrator( "Even More..." );
		drawTheInfo( 4, false );
		drawTheShapes( 12 );
	}
	// FRAME 7
	else if( timeLapsed < 62.5 )
	{
		narrator( "...Do We Even Perceive the Same?" );
		drawTheInfo( 4, false );
		drawTheShapes( 12 );
	}
	else if( timeLapsed < 65 )
	{
		narrator( "...Do We Even Perceive the Same?" );
		drawTheInfo( 4, false );
		drawTheShapes( 12 );
		narrator( "(press 4)", true );
		messageFromConsole( " - Turns On Information Skew", true );
	}
	else if( timeLapsed < 67.5 )
	{
		//Change "scene"
		sceneCapture = 5;
		messageSent = false;
		drawTheInfo( 4, true );
		drawTheShapes( 12 );
	}
	else if( timeLapsed < 70 )
	{
		narrator( "But Life Is Not So Black And White..." );
		drawTheInfo( 4, true );
		drawTheShapes( 12 );
	}
	// FRAME 7
	else if( timeLapsed < 72.5 )
	{
		narrator( "...Live And See." );
		drawTheInfo( 4, true );
		drawTheShapes( 12 );
		narrator( "(press 5)", true );
		messageFromConsole( " - Resets All Values.", true );
	}
	else
	{
		colorBackground();
		sceneCapture = 6;
		messageSent = false;
		colorBackground();
		drawTheInfo( 4, true );
		drawTheShapes( 12 );
		for( j = 0; j < 4; j++ )
		{
			infoList[ j ].setClr( familyColors[ j ] );
		}
	}


	// shapeList[ 0 ].drawShape();
	// shapeList[ 1 ].drawShape();
	// shapeList[ 2 ].drawShape();
	// shapeList[ 3 ].drawShape();
	// shapeList[ 4 ].drawShape();
	// shapeList[ 5 ].drawShape();
	// shapeList[ 6 ].drawShape();
	// shapeList[ 7 ].drawShape();
	// shapeList[ 8 ].drawShape();
	// shapeList[ 9 ].drawShape();
	// shapeList[ 10 ].drawShape();
	// shapeList[ 11 ].drawShape();


	//AUTOMATIC ACTIVATIONS
	if( sceneCapture == 2 )
	{
		var colorChange = color( 50 );
		changeShapeColor( colorChange );
	}

	if( sceneCapture == 3 )
	{
		var formChange = 2;
		changeShapeForm( formChange );
	}

	if( sceneCapture == 4 )
	{
		var wChange = 40;
		var hChange = 40;
		changeShapeSize( wChange, hChange );
	}

	if( sceneCapture == 5 )
	{
		var boolChange = 40;
		changeInfoSkew( true );
	}

	// x, y, clr, w, h, skew

	// var shp1 = createShape( 160, 320, color( 25, 25, 100 ), 80, 80, 1 );
	// var shp2 = createShape( 240, 160, color( 100, 200, 160 ), 80, 80, 2 );
	// var shp3 = createShape( 80, 80, color( 55, 155, 20 ), 80, 80, 3 );
	// var shp4 = createShape( 160, 160, color( 55, 155, 20 ), 80, 80, 3 );

	// var shpe1 = createShape( 160, 250, color( 25, 25, 100 ), 80, 80, 1 );

	// shpe1.setPath( 5 );

	// shp1.setPath( 5 );
	// shp2.setPath( 5 );
	// shp3.setPath( 5 );
	// shp4.setPath( 5 );
	var secPassed = currentSec - startTimeInSec;

	// shpe1.drawShape();

	// if( secPassed > 0 )
	// {
	// 	shp1.drawShape();
	// }
	// if( secPassed > 1 )
	// {
	// 	shp2.drawShape();
	// }
	// if( secPassed > 3 )
	// {
	// 	shp3.drawShape();
	// 	var shp4 = makeChildShape( shp2 );
	// 	shp4.drawShape();
	// }
	// if( secPassed > 5 )
	// {
	// 	console.log( "AYYEEEEE" );
	// }

	// fill( 0 );
	// ellipse( 100, 100, 100, 100 );
}

//Used so that text on screen may vary and change
function narrator( message, offSet )
{
	//OffSet refers to if the message will be positioned down or not
	//Applies to special messages, and thus we check for !offSet
	//Because most messages are not "special"

	textSize( 15 );
	fill( 0 );
	stroke( 0 );
	textAlign( CENTER );
	if( !offSet )
	{
		text( message, centerX, centerY );
	}
	else
	{
		text( message, centerX, centerY + 25 );
	}
	
}

function messageFromConsole( addition, change )
{
	//addition must be valid
	//change refers to if the message will be a different alert
	//Applies to special messages, and thus we check for !change
	//Because most messages are not "special"
	if( messageSent == false )
	{
		if( !change )
		{
			console.log( sceneCapture + consoleMessage + addition );
			console.log( autoAlert );
		}
		else
		{
			console.log( sceneCapture + addition );
			console.log( autoAlert );
		}
		messageSent = true;
		
	}
}

//COLORED BACKGROUND - Shows "Life is not so Black and White"
function colorBackground()
{
	rectMode( CENTER );
	stroke( 0 );
	fill( 200, 200, 100 );
	rect( 80, 50, 800, 100 );

	fill( 100, 200, 100 );
	rect( 160, 150, 800, 100 );

	fill( 100, 100, 200 );
	rect( 240, 250, 800, 100 );

	fill( 200, 0, 200 );
	rect( 320, 350, 800, 100 );
	// rectMode( CENTER );
	// stroke( 0 );
	// fill( 100, 100, 50 );
	// rect( 80, 50, 800, 100 );

	// fill( 50, 100, 50 );
	// rect( 160, 150, 800, 100 );

	// fill( 50, 100, 100 );
	// rect( 240, 250, 800, 100 );

	// fill( 10, 155, 10 );
	// rect( 320, 350, 800, 100 );
}

function drawTheShapes( num )
{
	//number of shapes to draw based on num
	for( i = 0; i < num; i++ )
	{
		shapeList[ i ].drawShape();
	}
}

function drawTheInfo( num, skew )
{
	//number of shapes to draw based on num
	// "FOR" Loop did not Work Here
	// MY Take, is that maybe the code needs to run simulatenously and not "one after the other"
	// As each infoObject must "wait" for the previous one to finish drawing, and is an
	//"iterated" drawing?

	// No else statements will be drawn

	// skew is a boolean that test whether that info will be "changed" or not
	if( num >= 1 )
	{
		infoList[ 0 ].setW( infoList[ 0 ].getW() + 1 );
		infoList[ 0 ].setSkewBool( skew );
		infoList[ 0 ].parseData( xList[ 0 ], xList[ 1 ], xList[ 8 ] );
	}

	if( num >= 2 )
	{
		infoList[ 1 ].setW( infoList[ 1 ].getW() + 1 );
		infoList[ 1 ].setSkewBool( skew );
		infoList[ 1 ].parseData( xList[ 2 ], xList[ 3 ], xList[ 9 ] );
	}

	if( num >= 3 )
	{
		infoList[ 2 ].setW( infoList[ 2 ].getW() + 1 );
		infoList[ 2 ].setSkewBool( skew );
		infoList[ 2 ].parseData( xList[ 4 ], xList[ 5 ], xList[ 10 ] );
	}

	if( num >= 4 )
	{
		infoList[ 3 ].setW( infoList[ 3 ].getW() + 1 );
		infoList[ 3 ].setSkewBool( skew );
		infoList[ 3 ].parseData( xList[ 6 ], xList[ 7 ], xList[ 11 ] );
	}
}

function drawInfo( shapeXList )
{
	// "FOR" Loop did not Work Here
	// MY Take, is that maybe the code needs to run simulatenously and not "one after the other"
	// As each infoObject must "wait" for the previous one to finish drawing?

	infoList[ 0 ].setW( infoList[ 0 ].getW() + 1 );
	infoList[ 0 ].setSkewBool( true );
	infoList[ 0 ].parseData( shapeXList[ 0 ], shapeXList[ 1 ], shapeXList[ 8 ] );

	// var xList1 = smallToBig( shapeXList[ 1 ], shapeXList[ 8 ], shapeXList[ 0 ] );
	// console.log( xList1[ 0 ] );
	// console.log( xList1[ 1 ] );
	// console.log( xList1[ 2 ] );
	// infoList[ 0 ].parseData( 60, 160, 300 );

	// infoList[ 0 ].parseData( xList1[ 0 ], xList1[ 1 ], xList1[ 2 ] );

	infoList[ 1 ].setW( infoList[ 1 ].getW() + 1 );
	infoList[ 1 ].setSkewBool( true );
	infoList[ 1 ].parseData( shapeXList[ 2 ], shapeXList[ 3 ], shapeXList[ 9 ] );

	infoList[ 2 ].setW( infoList[ 2 ].getW() + 1 );
	infoList[ 2 ].setSkewBool( true );
	infoList[ 2 ].parseData( shapeXList[ 4 ], shapeXList[ 5 ], shapeXList[ 10 ] );

	infoList[ 3 ].setW( infoList[ 3 ].getW() + 1 );
	infoList[ 3 ].setSkewBool( true );
	infoList[ 3 ].parseData( shapeXList[ 6 ], shapeXList[ 7 ], shapeXList[ 11 ] );
}

function keyTyped()
{
	if( key == '1')
	{
		if( sceneCapture == 1 )
		{
			sceneCapture = 2;
		}

		if( sceneCapture == 6 )
		{
			var colorChange = color( random(255), random(25), random(255) );
			changeShapeColor( colorChange );
		}
	}

	if( key == '2')
	{
		if( sceneCapture == 2 )
		{
			sceneCapture = 3;
		}

		if( sceneCapture == 6 )
		{
			var formChange = random( intList );
			changeShapeForm( formChange );
		}
	}

	if( key == '3')
	{
		if( sceneCapture == 3 )
		{
			sceneCapture = 4;
		}

		if( sceneCapture == 6 )
		{
			var wChange = random( 20, 80 );
			var hChange = random( 20, 80 );
			changeShapeSize( wChange, hChange );
		}
	}

	if( key == '4')
	{
		if( sceneCapture == 4 )
		{
			sceneCapture = 5;
		}

		if( sceneCapture == 6 )
		{
			var boolChange = 40;
			changeInfoSkew( true );
		}
	}

	if( key == '5')
	{
		if( sceneCapture == 5 )
		{
			sceneCapture = 6;
		}

		if( sceneCapture == 6 )
		{
			//RESET COLOR
			changeShapeColor( 0, true );

			//RESET FORM
			var formChange = 5;
			changeShapeForm( formChange, true );

			//RESET SIZE
			var wChange = 80;
			var hChange = 80;
			changeShapeForm( wChange, hChange, true );

			//RESET INFO
			changeInfoSkew( false );
		}
	}
}

function changeShapeColor( clr, rand )
{
	if( !rand )
	{
		for( i = 0; i < shapeList.length; i++ )
		{
			shapeList[ i ].setClr( clr );
		}
	}
	else
	{
		for( i = 0; i < shapeList.length; i++ )
		{
			var randClr = color( random( 255 ), random( 25 ), random( 255 ) );
			shapeList[ i ].setClr( randClr );
		}
	}
}

function changeShapeForm( form, rand )
{
	// If NOT random.... apply all with the passed form
	// If it IS random.... apply all with random form between 0 and form
	if( !rand )
	{
		for( i = 0; i < shapeList.length; i++ )
		{
			shapeList[ i ].setID( form );
		}
	}
	else
	{
		for( i = 0; i < shapeList.length; i++ )
		{
			var newIntList = [];
			for( j = 0; j <= form; j++ )
			{
				newIntList[ j ] = intList[ j ];
				console.log( j );
			}
			randInt = random( newIntList )
			shapeList[ i ].setID( randInt );
		}
	}
}

function changeShapeSize( w, h, rand )
{
	if( !rand )
	{
		for( i = 0; i < shapeList.length; i++ )
		{
			shapeList[ i ].setW( w );
			shapeList[ i ].setH( h );
		}
	}
	else
	{
		for( i = 0; i < shapeList.length; i++ )
		{
			var randW = random( 20, w );
			var randH = random( 20, h );
			shapeList[ i ].setW( randW );
			shapeList[ i ].setH( randH );
		}
	}
}

function changeInfoSkew( bool )
{
	infoBool = bool;
	for( i = 0; i < infoList.length; i++ )
	{
		infoList[ i ].setSkewBool( infoBool );
	}
}

// function smallToBig( x1, x2, x3 )
// {
// 	var unOrderedList = [ x1, x2, x3 ];
// 	return sort( unOrderedList, 3 );
// 	// var newList = sort( unOrderedList, 3 );
// 	// return newList;
// }

// function infoCollide( theShape, theInfo, shapeList )
// {
// 	// var xShape = theShape.getX();
// 	append.
// }

// function infoCollide( theShape, theInfo )
// {
// 	theShape.getX() = 
// }
