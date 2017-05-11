//A STORY OF BLACK AND WHITE

//About the word "Equal" and how people/shapes
//Recieve the same information in different ways
//Symbolic

//It is a story that has scenes in which you must activate
//certain sequences. However, it will happen automatically if nothing is pressed.

//This Sketch Uses the Console... as it reinforces instruction.

//GLOBAL VARIABLES
//----------------
//++++++++++++++++
//(declare variables)
//++++++++++++++++
//----------------
//GLOBAL VARIABLES

// - Object Variables
//----------------

//GLOBAL LIST for InfoObj Object
var infoList = [];
var infoCount = 0;

//GLOBAL BOOLEAN used to see if Info Objects should be Skewed or Not
var infoBool = false;

//GLOBAL LIST for Shape Object
var shapeList = [];
//GLOBAL NUMBER of Shape Objects
var shapeCount = 0;
//GLOBAL LIST of X-Values for All Shape Objects
var xList = [];

//GLOBAL COLOR for InfoObj Object
var famColor1;
var famColor2;
var famColor3;
var famColor4;
var familyColors = [];


// - Calculation Variables
//----------------

//GLOBAL NUMBER USED FOR Trig Function... frequency used to generate circles/waves
var freq = 0.2;

//GLOBAL NUMBER for Center of Canvas
var centerX = 0;
//GLOBAL NUMBER for Center of Canvas
var centerY = 0;

//GLOBAL LIST USED FOR RANDOM Function... chooses random number from list
//instead of floating number
var intList = [ 0, 1, 2, 3, 4, 5 ];


// - Time Variables
//----------------

//GLOBAL NUMBER for Time Passed Since Starting Program
var timeLapsed = 0;

//GLOBAL NUMBER for What Sequence The Program is On
//...The Story is dependent on time and not this variable
//...As this variable is iterated "through" the story
//...And used so auxilary operation can "keep up"
//...with the story... if used prematurely or incorrectly
//...story will be "out of sync" with certain events
var sceneCapture = 0;

//GLOBAL NUMBER for Length of One "Frame"
//..."Frame" is in reference to a storytellin standpoint
//...not the frame or framerate of the program
//...time is to be used in Seconds
var frame = 2.5;

//GLOBAL BOOL for if Story is Still Going
var storyGoing = true;


// - Message Variables
//----------------

//GLOBAL STRING Standard Frame for Console Message
var consoleMessage = " - Changes All Shapes To Same ";

//GLOBAL STRING used for Automatic Alert
var autoAlert = "(Will Automatically Activate If Not Pressed)";

//GLOBAL BOOL to see if Message Has Already Been Sent to Avoid Repeatition
var messageSent = false;



//OBJECTS
//----------------
//++++++++++++++++
//(declare objects before setup)
//++++++++++++++++
//----------------
//OBJECTS

// - Info Object
//----------------
//Class for InfoObj to control all methods and variables
//Object that is Passed through Screen
function InfoObj( id, y, clr, dataSize, time )
{
	// - Info Variables
	//+++++++++++++++++

	//ID is what the Info Type Is
	//0 - waveform, 1 - binary
	//2 - letters, 3 - pictograph
	this._id = id;

	//X-Position of moving data
	this._x = 0;
	//Y-Position of moving data
	this._y = y;
	//Color of Info
	this._clr = clr;

	//Size of the shapes INSIDE Data Stream (size of circles in sine wave, etc.)
	this._dataSize = dataSize;

	//Width of Data Stream
	this._w = 0;
	//Height of Data Stream
	this._h = 70;

	//Not REAL-TIME, but used for iteration purposes
	//Such as in the Sine Wave
	this._time = 0;

	//If the Data is Skewed or Not
	this._skewBool = false;


	// - Info Getters
	//+++++++++++++++++

	//Obtain Info ID
	this.getID = function()
	{
		return this._id;
	}

	//Obtain Info X-Position
	this.getX = function()
	{
		return this._x;
	}

	//Obtain Info Y-Position
	this.getY = function()
	{
		return this._y;
	}

	//Obtain Info Color
	this.getClr = function()
	{
		return this._clr;
	}

	//Obtain Info Width
	this.getW = function()
	{
		return this._w;
	}

	//Obtain Info Height
	this.getH = function()
	{
		return this._h;
	}

	//Obtain Info Skew Boolean
	this.getSkewBool = function()
	{
		return this._skewBool;
	}


	// - Info Setters
	//+++++++++++++++++

	//Change Info ID
	this.setID = function( newID )
	{
		this._id = newID;
	}

	//Change Info X-Position
	this.setX = function( newX )
	{
		this._x = newX;
	}

	//Change Info Y-Position
	this.setY = function( newY )
	{
		this._y = newY;
	}

	//Change Info Width
	this.setW = function( newW )
	{
		this._w = newW;
	}
	//Change Info Height
	this.setH = function( newH )
	{
		this._h = newH;
	}

	//Change Info Color
	this.setClr = function( newClr )
	{
		this._clr = newClr;
	}

	//Change Info Skew Boolean
	this.setSkewBool = function( newSkewBool )
	{
		this._skewBool = newSkewBool;
	}


	// - Info Methods for Data Stream Drawing
	//+++++++++++++++++

	//Draw the Data Stream
	this.parseData = function( xValue1, xValue2, xValue3 )
	{
		// xValue refers to the xValue in which is used as the "end" points for drawings
		// Default is the Width of the Object...
		var endPoints = [];

		endPoints[ 0 ] = xValue1;
		endPoints[ 1 ] = xValue2;
		endPoints[ 2 ] = xValue3;
		endPoints[ 3 ] = this._w;

		//Because all the Info Types use multiple End Points ANYWAY, if there are
		//No SPECIFIC EndPoints Passed in, This Will Make The Rest Defaulted to Width of Data Stream
		for( i = 0; i < endPoints.length; i++ )
		{
			if( endPoints[ i ] == null )
			{
				endPoints[ i ] = this._w;
			}
		}
		
		//If Data Stream reaches 400px (Size of Canvas), Return it to Beginning
		//Also Reset the "Time" Variable
		if( this._w > 400 )
		{
			this.setW( 0 );
			this._time = 0;
		}

		//Set the Stroke Weights, Stroke Colors, and Fill Colors
		//Because Multiple Things on the Page
		//WILL USE and REWRITE these values
		strokeWeight( 1 );
		fill( this._clr );
		stroke( this._clr );

		//Declare a variable for the dataSize of the InfoObj
		var dataSize = this._dataSize;

		if( id == 0 )
		{
			// KEPT HERE... For Loops Don't Work For Some Reason
			// for( x = 0; x < endPoints.length; x++ )
			// {
			// 	this.drawWave( dataSize, 0, endPoints[ x ] );
			// }

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

			//Draw The Wave Stream
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

			//Draw The Binary Stream
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

			//Draw The Letters Stream
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

			//Draw The Picto Stream
			this.drawPicto( dataSize, endPoints, listSkew1, listSkew2 );
		}

		//Iterate "Time"
		this._time += 0.1;
	}

	//DRAW WAVE INFOTYPE based on Data Stream Values and End Points
	this.drawWave = function( dataSize, endPoints, skewList1, skewList2 )
	{
		for( i = 0; i < this._w; i += 3 )
		{
			//INSIDE "FOR" LOOP FOR USE OF "i"
			var xPos = i * ( dataSize/10 );
			var yPos = this._h/4 * sin( freq * ( this._time + i ) ) + this._y - (this._h / 2);

			if( (i < endPoints[ 0 ]) || !(this._skewBool) )
			{
				ellipse( xPos, yPos, dataSize, dataSize );
			}
			else if( (i < endPoints[ 1 ]) && (this._skewBool) )
			{
				yPos = (yPos / skewList2[1] ) + (this._h / 4);
				ellipse( xPos, yPos, dataSize*skewList1[1], dataSize*skewList1[1] );
			}
			else if( (i < endPoints[ 2 ]) && (this._skewBool) )
			{
				yPos = (yPos / skewList2[2] ) + (this._h / 4);
				ellipse( xPos, yPos, dataSize*skewList1[2], dataSize*skewList1[2] );
			}
			else if( (i < endPoints[ 3 ]) && (this._skewBool) )
			{
				yPos = (yPos / skewList2[3] ) - (this._h / 2);
				ellipse( xPos, yPos, dataSize*skewList1[3], dataSize*skewList1[3] );
			}
		}
	}

	//DRAW BINARY INFOTYPE based on Data Stream Values and End Points
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

			if( (i < endPoints[ 0 ]) || !(this._skewBool) )
			{
				// CHANGE Y-POSITION
				yPos += random(skewList2[0]);

				// CHANGE SIZES
				wFor0 = wFor0 * skewList1[0];
				hFor0 = hFor0 * skewList1[0];
				wFor1 = wFor1 * skewList1[0];
				hFor1 = hFor1 * skewList1[0];

				//CALL FUNCTION
				//xPos, yPos, wFor0, hFor0, wFor1, hFor1, endPoint, yPos2, yPos3
				this.formBinary( xPos, yPos, wFor0, hFor0, wFor1, hFor1, 0 );
			}
			else if( (i < endPoints[ 1 ]) && (this._skewBool) )
			{
				// CHANGE Y-POSITION
				var yPos2 = yPos + (this._h * skewList2[1]);

				// CHANGE SIZES
				wFor0 = wFor0 * skewList1[1];
				hFor0 = hFor0 * skewList1[1];
				wFor1 = wFor1 * skewList1[1];
				hFor1 = hFor1 * skewList1[1];

				//CALL FUNCTION
				//xPos, yPos, wFor0, hFor0, wFor1, hFor1, endPoint, yPos2, yPos3
				this.formBinary( xPos, yPos, wFor0, hFor0, wFor1, hFor1, 1, yPos2 );
			}
			else if( (i < endPoints[ 2 ]) && (this._skewBool) )
			{
				// CHANGE Y-POSITION
				var yPos2 = yPos + (this._h * skewList2[2]);
				var yPos3 = yPos - (this._h * skewList2[2]);

				// CHANGE SIZES
				wFor0 = wFor0 * skewList1[2];
				hFor0 = hFor0 * skewList1[2];
				wFor1 = wFor1 * skewList1[2];
				hFor1 = hFor1 * skewList1[2];

				//CALL FUNCTION
				//xPos, yPos, wFor0, hFor0, wFor1, hFor1, endPoint, yPos2, yPos3
				this.formBinary( xPos, yPos, wFor0, hFor0, wFor1, hFor1, 2, yPos2, yPos3 );
			}
			else if( (i < endPoints[ 3 ]) && (this._skewBool) )
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

				//CALL FUNCTION
				//xPos, yPos, wFor0, hFor0, wFor1, hFor1, endPoint, yPos2, yPos3
				this.formBinary( xPos, yPos, wFor0, hFor0, wFor1, hFor1, 3, yPos2, yPos3 );
			}
		}
	}

	//DRAW LETTER INFOTYPE based on Data Stream Values and End Points
	this.drawLetters = function( dataSize, endPoints, skewList1, skewList2 )
	{
		for( i = 0; i < this._w; i += 16 )
		{
			var xPos = i * dataSize/10;
			var yPos1 = this._y + (this._h / 2);
			var yPos2 = this._y;

			sizeOfText = dataSize * 2;

			if( (i < endPoints[ 0 ]) || !(this._skewBool) )
			{
				textSize( sizeOfText );

				// REMAINDER from i % 64
				rem = i % 64
				var letterNum = random( 8 );

				//CALL FUNCTION
				// xPos, yPos1, yPos2, rem parameters
				this.formLetters( xPos, yPos1, yPos2, rem );
			}
			else if( (i < endPoints[ 1 ]) && (this._skewBool) )
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
			else if( (i < endPoints[ 2 ]) && (this._skewBool) )
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
			else if( (i < endPoints[ 3 ]) && (this._skewBool) )
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

	//DRAW PICTO INFOTYPE based on Data Stream Values and End Points
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

			if( (i < endPoints[ 0 ]) || !(this._skewBool) )
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
			else if( (i < endPoints[ 1 ]) && (this._skewBool) )
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
			else if( (i < endPoints[ 2 ]) && (this._skewBool) )
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
			else if( (i < endPoints[ 3 ]) && (this._skewBool) )
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

	//Form the Bits for Binary Type Data Stream
	this.formBinary = function( xPos, yPos, wFor0, hFor0, wFor1, hFor1, endPoint, yPos2, yPos3 )
	{
		if( i % 32 == 0 )
		{
			// "0" part of binary
			ellipseMode( CENTER );
			noFill();
			strokeWeight( 2 );
			ellipse( xPos, yPos, wFor0, hFor0 );

			if( endPoint >= 1 )
			{
				//ADDED for EndPoint1
				fill( this._clr );
				rect( xPos, yPos2, wFor1, hFor1 );
			}
			if( endPoint >= 2 )
			{
				//ADDED for EndPoint2
				noFill();
				ellipse( xPos, yPos3, wFor0, hFor0 );
			}
		}
		else if( i % 16 == 0 )
		{
			// "1" part of binary
			rectMode( CENTER );
			fill( this._clr );
			strokeWeight( 2 );
			rect( xPos, yPos, wFor1, hFor1 );
			if( endPoint >= 1 )
			{
				//ADDED from EndPoint1
				noFill();
				ellipse( xPos, yPos2, wFor0, hFor0 );
			}
			if( endPoint >= 2 )
			{
				//ADDED from EndPoint2
				fill( this._clr );
				rect( xPos, yPos3, wFor1, hFor1 );
			}
		}
	}

	//Form the Letters for Letter Type Data Stream
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

	//Form the Pictographs for Picto Type Data Stream
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
}


// - Shape Object
//----------------
//Class for Shape to control all methods and variables
//Object that represents "humans" and characters
//Of the story
function Shape( x, y, clr, w, h, id )
{
	// - Shape Variables
	//+++++++++++++++++

	//ID is what Shape it will be
	//0 - ellipse, 1 - rectangle,
	//2 - triangle, 3 - double-triangle,
	//4 - 5-vertex shape, 5 - 6-vertex shape
	this._id = id;

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


	// - Shape Getters
	//+++++++++++++++++

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


	// - Shape Setters
	//+++++++++++++++++

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

	// - Shape Methods for Drawing
	//+++++++++++++++++

	//Draw the Shape
	this.drawShape = function()
	{
		//Check if Out of Bounds
		if( this._y < 0 )
		{
			this.setY( height );
		}

		//Set the Stroke Weights, Stroke Colors, and Fill Colors
		//Because Multiple Things on the Page
		//WILL USE and REWRITE these values

		//Fill with Shape Color
		fill( this._clr );
		//No Stroke
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

//DRAWING
//----------------
//++++++++++++++++
//(setup, drawing, aux funcitons)
//++++++++++++++++
//----------------
//DRAWING

// - Pre-Setup / Class-Related Functions
//----------------

//Create a New Shape Using a New Instance of the Shape Class
//with the initialized variables passed as parameters
//and Returns the Shape that is created
//USED DURING SETUP
function createShape( x, y, clr, w, h, id )
{
	//Create new Shape Object
	var newShape = new Shape ( x, y, clr, w, h, id );

	//Add to ShapeList
	shapeList[ shapeCount ] = newShape;

	//Iterate ShapeCount
	shapeCount++;

	//Return newly created Shape Object
	return newShape;
}

// - Setup Function
//----------------

//Program Setup
function setup()
{
	// - Initialize Size of Canvas
	//+++++++++++++++++
	createCanvas(400, 400);

	//CENTER POINTS
	centerX = width / 2;
	centerY = height / 2;


	// - Initialize Color Families
	//+++++++++++++++++

	//Used for InfoObj
	famColor1 = color( random(255), random(50), random(255) );
	famColor2 = color( random(255), random(50), random(255) );
	famColor3 = color( random(255), random(50), random(255) );
	famColor4 = color( random(255), random(50), random(255) );
	familyColors = [ famColor1, famColor2, famColor3, famColor4 ];


	// - Initialize and Form InfoObj Objects
	//+++++++++++++++++

	//Initialize InfoObj Objects
	var infTho1 = new InfoObj ( 0, 80, color( 0 ), 10 );
	var infTho2 = new InfoObj ( 1, 150, color( 0 ), 10 );
	var infTho3 = new InfoObj ( 2, 240, color( 0 ), 10 );
	var infTho4 = new InfoObj ( 3, 350, color( 0 ), 10 );

	//Initiliaze Values for infoList Array Here
	//Never add to array passed this point
	infoList[ 0 ] = infTho1;
	infoList[ 1 ] = infTho2;
	infoList[ 2 ] = infTho3;
	infoList[ 3 ] = infTho4;


	// - Initialize and Form Shape Objects
	//+++++++++++++++++

	//Initialize Shape Objects
	//x, y, clr, w, h, id parameters for createShape for Reference
	//Numbers commented on side used for which "ROW" the shape is on Y-Position
	//50 - 1 ;; 150 - 2 ;; 250 - 3 ;; 350 - 4
	var shp1 = createShape( 190, 150, color( 0 ), 40, 40, 0 ); //2
	var shp2 = createShape( 60, 50, color( 205 ), 40, 40, 0 ); //1
	var shp3 = createShape( 230, 250, color( 70 ), 40, 40, 0 ); //3
	var shp4 = createShape( 200, 350, color( 120 ), 40, 40, 0 ); //4
	var shp5 = createShape( 310, 50, color( 150 ), 40, 40, 1 ); //1
	var shp6 = createShape( 80, 150, color( 150 ), 40, 40, 2 ); //2
	var shp7 = createShape( 310, 250, color( 150 ), 40, 40, 3 ); //3
	var shp8 = createShape( 65, 350, color( 150 ), 40, 40, 4 ); //4
	var shp9 = createShape( 160, 50, color( 150 ), 80, 50, 5 ); //1
	var shp10 = createShape( 340, 150, color( 150 ), 40, 15, 5 ); //2
	var shp11 = createShape( 90, 250, color( 150 ), 55, 60, 5 ); //3
	var shp12 = createShape( 325, 350, color( 150 ), 30, 20, 5 ); //4

	//Initiliaze Values for xList Array Here
	//+++++++++++++++++

	//Never add to array passed this point
	//List of X-Values for All Shapes
	//To be used as "EndPoints" when needed
	//For InfoObj Usage
	for( i = 0; i < shapeList.length; i++ )
	{
		xList[ i ] = shapeList[ i ].getX();
	}
} 

// - Draw Function
//----------------

//Program Draw
function draw() 
{
	// - Initialize White Background
	//+++++++++++++++++
	background(255);


	// - Time Variables
	//+++++++++++++++++

	//timeLapsed will get millis
	//And divide by 1000, to get
	//Time Value in Seconds
	timeLapsed = millis() / 1000.00;


	// - Scene Variables
	//+++++++++++++++++

	//NOTE: The GLOBAL VARIABLE "Frame"
	//...is expressed in Seconds

	//"SKIP" STORY MODE with skipStory...
	//So checks if "storyGoing" is true or false
	//BEFORE checking the timeLapsed


	//STORY START.........
	//....................
	if( storyGoing )
	{
		//SCENE 1
		//INTRO SCENE / "CREDITS": COLOR
		if( timeLapsed < (1*frame) )
		// FRAME 1
		// 1 - INTRO Title
		{
			//Start Story... Change "scene"
			sceneCapture = 1;

			//Parameter is what "message" the
			//narrator speaks, and thus what is
			//displayed as text on screen

			//NARRATOR "SPEAKS"
			narrator( "A Story of Black and White" );
		}
		// FRAME 2
		// 1 - INTRO Author
		else if( timeLapsed < (2*frame) )
		{
			//NARRATOR "SPEAKS"
			narrator( "by Brendan Boursiquot" );
		}
		// FRAME 3
		// 1 - First Shape Drawn / Black Dot/Circle
		else if( timeLapsed < (3*frame) )
		{
			//Parameter is "How Many" Shapes to draw
			//Uses this for index purposes as well
			//As the shapes are ordered from those that
			//Appear First to Those that appear Last

			//Draw All Objects Within this Scene
			drawTheShapes( 1 );
		}
		// FRAME 4
		// 1 - Second Shape Drawn / Different Color
		else if( timeLapsed < (4*frame) )
		{
			//Draw All Objects Within this Scene
			drawTheShapes( 2 );
		}
		// FRAME 5
		// 1 - Third and Forth Shapes Drawn / Different Colors
		else if( timeLapsed < (5*frame) )
		{
			//Draw All Objects Within this Scene
			drawTheShapes( 4 );
		}
		// FRAME 6
		// 1 - Narrator Asks Question...
		else if( timeLapsed < (6*frame) )
		{
			//NARRATOR "SPEAKS"
			narrator( "What Makes Us Equal?" );

			//Draw All Objects Within this Scene
			drawTheShapes( 4 );
		}
		// FRAME 7
		// 1 - ...Centers Inquiry on "Color"
		else if( timeLapsed < (7*frame) )
		{
			//NARRATOR "SPEAKS"
			narrator( "That We Are The Same Color?" );

			//Draw All Objects Within this Scene
			drawTheShapes( 4 );
		}
		// FRAME 8
		// 1 - REQUEST USER INTERACTION... Make All Shapes Same Color
		else if( timeLapsed < (8*frame) )
		{
			//NARRATOR "SPEAKS"
			narrator( "That We Are The Same Color?" );
			narrator( "(press 1)", true );

			//Draw All Objects Within this Scene
			drawTheShapes( 4 );	

			//Parameter is what "message" is logged
			//to the console, funciton adds this
			//to the GLOBAL STRING "consoleMessage"
			//USED TO LOG INSTRUCTIONS TO USER

			//Log Instruction Message to Console
			messageFromConsole( "Color." );
		}
		//SCENE 2
		//SECOND QUESTION: FORM
		//--
		// FRAME 9
		// 2 - First NEW Shape Drawn / Triangle
		else if( timeLapsed < (9*frame) )
		{
			//Change "scene"
			sceneCapture = 2;

			//GLOBAL STRING messageSent refers to if current message has already been sent
			//Must be delcared to false whenever a new message wishes to be displayed
			messageSent = false;

			//Draw All Objects Within this Scene
			drawTheShapes( 5 );
		}
		// FRAME 10
		// 2 - Second NEW Shape Drawn / Different Shape
		else if( timeLapsed < (10*frame) )
		{
			//Draw All Objects Within this Scene
			drawTheShapes( 6 );
		}
		// FRAME 11
		// 2 - Third and Forth NEW Shapes Drawn / Different Shapes
		else if( timeLapsed < (11*frame) )
		{
			//Draw All Objects Within this Scene
			drawTheShapes( 8 );
		}
		// FRAME 12
		// 2 - Narrator Asks Question...
		else if( timeLapsed < (12*frame) )
		{
			//NARRATOR "SPEAKS"
			narrator( "Yet Still... What Makes Us Equal?" );

			//Draw All Objects Within this Scene
			drawTheShapes( 8 );
		}
		// FRAME 13
		// 2 - ...Centers Inquiry on "Form"
		else if( timeLapsed < (13*frame) )
		{
			//NARRATOR "SPEAKS"
			narrator( "That We Have The Same Function?" );

			//Draw All Objects Within this Scene
			drawTheShapes( 8 );
		}
		// FRAME 14
		// 2 - REQUEST USER INTERACTION... Make All Shapes Same Form
		else if( timeLapsed < (14*frame) )
		{
			//NARRATOR "SPEAKS"
			narrator( "That We Have The Same Function?" );
			narrator( "(press 2)", true );

			//Draw All Objects Within this Scene
			drawTheShapes( 8 );

			//Log Instruction Message to Console
			messageFromConsole( "Form." );
		}
		//SCENE 3
		//THIRD QUESTION: SIZE
		//--
		// FRAME 15
		// 3 - First NEW Shape Drawn / Big Shape
		else if( timeLapsed < (15*frame) )
		{
			//Change "scene"
			sceneCapture = 3;

			//GLOBAL STRING messageSent refers to if current message has already been sent
			//Must be delcared to false whenever a new message wishes to be displayed
			messageSent = false;

			//Draw All Objects Within this Scene
			drawTheShapes( 9 );
		}
		// FRAME 16
		// 3 - Second NEW Shape Drawn / Different Size
		else if( timeLapsed < (16*frame) )
		{
			//Draw All Objects Within this Scene
			drawTheShapes( 10 );
		}
		// FRAME 17
		// 3 - Third and Forth NEW Shapes Drawn / Different Sizes
		else if( timeLapsed < (17*frame) )
		{
			//Draw All Objects Within this Scene
			drawTheShapes( 12 );
		}
		// FRAME 18
		// 3 - Narrator Asks Question...
		else if( timeLapsed < (18*frame) )
		{
			//NARRATOR "SPEAKS"
			narrator( "And We Still Ask... What Makes Us Equal?" );

			//Draw All Objects Within this Scene
			drawTheShapes( 12 );
		}
		// FRAME 19
		// 3 - ...Centers Inquiry on "Size"
		else if( timeLapsed < (19*frame) )
		{
			//NARRATOR "SPEAKS"
			narrator( "That We Have The Same Size of Influence?" );

			//Draw All Objects Within this Scene
			drawTheShapes( 12 );
		}
		// FRAME 20
		// 3 - REQUEST USER INTERACTION... Make All Shapes Same Size
		else if( timeLapsed < (20*frame) )
		{
			//NARRATOR "SPEAKS"
			narrator( "That We Have The Same Size of Influence?" );
			narrator( "(press 3)", true );

			//Draw All Objects Within this Scene
			drawTheShapes( 12 );

			//Log Instruction Message to Console
			messageFromConsole( "Size." );
		}
		//SCENE 4
		//FORTH QUESTION: PERCEPTION
		//--
		// FRAME 21
		// 4 - First NEW Shape Drawn / Wave Info Type
		else if( timeLapsed < (21*frame) )
		{
			//Change "scene"
			sceneCapture = 4;

			//GLOBAL STRING messageSent refers to if current message has already been sent
			//Must be delcared to false whenever a new message wishes to be displayed
			messageSent = false;

			//Draw All Objects Within this Scene
			drawTheInfo( 1, false );
			drawTheShapes( 12 );
		}
		// FRAME 22
		// 4 - Second NEW Shape Drawn / Binary Info Type
		else if( timeLapsed < (22*frame) )
		{
			//Draw All Objects Within this Scene
			drawTheInfo( 2, false );
			drawTheShapes( 12 );
		}
		// FRAME 23
		// 4 - Third and Forth NEW Shapes Drawn / Letter and Picto Info Types
		else if( timeLapsed < (23*frame) )
		{
			//Draw All Objects Within this Scene
			drawTheInfo( 4, false );
			drawTheShapes( 12 );
		}
		// FRAME 24
		// 4 - Narrator Asks Question...
		else if( timeLapsed < (24*frame) )
		{
			//NARRATOR "SPEAKS"
			narrator( "Even More..." );

			//Draw All Objects Within this Scene
			drawTheInfo( 4, false );
			drawTheShapes( 12 );
		}
		// FRAME 25
		// 4 - ...Centers Inquiry on "Perception"
		else if( timeLapsed < (25*frame) )
		{
			//NARRATOR "SPEAKS"
			narrator( "...Do We Even Perceive the Same?" );

			//Draw All Objects Within this Scene
			drawTheInfo( 4, false );
			drawTheShapes( 12 );
		}
		// FRAME 26
		// 4 - REQUEST USER INTERACTION... Make Information SKEW/CHANGE
		else if( timeLapsed < (26*frame) )
		{
			//NARRATOR "SPEAKS"
			narrator( "...Do We Even Perceive the Same?" );
			narrator( "(press 4)", true );

			//Draw All Objects Within this Scene
			drawTheInfo( 4, false );
			drawTheShapes( 12 );

			//Log Instruction Message to Console
			messageFromConsole( " - Turns On/Off Information Skew", true );
		}
		//SCENE 5
		//THE CAVEAT: Life Is Not So Black and White
		//--
		// FRAME 27
		// 5 - SKEW INFORMATION
		else if( timeLapsed < (27*frame) )
		{
			//Change "scene"
			sceneCapture = 5;

			//GLOBAL STRING messageSent refers to if current message has already been sent
			//Must be delcared to false whenever a new message wishes to be displayed
			messageSent = false;

			//Draw All Objects Within this Scene
			drawTheInfo( 4, true );
			drawTheShapes( 12 );
		}
		// FRAME 28
		// 5 - Prelude to Change of Color
		else if( timeLapsed < (28*frame) )
		{
			// NOTE: NARRATOR IS DRAWN AFTER, to Sit "On Top" of Drawing
			//Draw All Objects Within this Scene
			drawTheInfo( 4, true );
			drawTheShapes( 12 );

			//NARRATOR "SPEAKS"
			//First Bool - It is NOT a Message to offSet
			//Second Bool - It IS a Colored Message
			narrator( "Perhaps Life Is Not So Black And White...", false, true );
		}
		// FRAME 29
		// 5 - REQUEST USER INTERACTION... Give Everything Color
		else if( timeLapsed < (29*frame) )
		{
			// NOTE: NARRATOR IS DRAWN AFTER, to Sit "On Top" of Drawing
			//Draw All Objects Within this Scene
			drawTheInfo( 4, true );
			drawTheShapes( 12 );

			//NARRATOR "SPEAKS"
			narrator( "...Live And See.", false, true );
			narrator( "(press 5)", true, true );

			//Log Instruction Message to Console
			messageFromConsole( " - Resets All Values.", true );
		}
		else
		{
			storyGoing = false;
		}
		// Actual "Story" Finished
		// FREEFORM USER INTERACTION
	}
	else
	{
		//Change "scene"
		sceneCapture = 6;

		//GLOBAL STRING messageSent refers to if current message has already been sent
		//Must be delcared to false whenever a new message wishes to be displayed
		messageSent = false;

		//REMOVE WHITE BACKGROUND
		colorBackground();

		//Draw All Objects Within this Scene
		drawTheInfo( 4, true );
		drawTheShapes( 12 );

		//CHANGE InfoObj Colors
		for( j = 0; j < 4; j++ )
		{
			infoList[ j ].setClr( familyColors[ j ] );
		}
	}
	//....................
	//STORY END...........
	

	//AUTOMATIC SCENE ACTIVATIONS
	//WHEN IT IS A CERTAIN "SCENE"
	//IT WILL APPLY CERTAIN ATTRIBUTES
	//REGARDLESS IF IT WAS CHANGED OR NOT

	//'Press 1' Auto Activation
	//COLOR CHANGE
	if( sceneCapture == 2 )
	{
		var colorChange = color( 50 );
		changeShapeColor( colorChange );
	}
	//'Press 2' Auto Activation
	//FORM CHANGE
	else if( sceneCapture == 3 )
	{
		var formChange = 2;
		changeShapeForm( formChange );
	}
	//'Press 3' Auto Activation
	//SIZE CHANGE
	else if( sceneCapture == 4 )
	{
		var wChange = 40;
		var hChange = 40;
		changeShapeSize( wChange, hChange );
	}
	//'Press 4' Auto Activation
	//DATA SKEW
	else if( sceneCapture == 5 )
	{
		changeInfoSkew( true );
	}
}

// - Aux (Drawing) Functions
//----------------

// - narrator Function
//+++++++++++++++++
//Takes in a string and
//displays it on screen
//Used so that text on screen may vary and change
function narrator( message, offSet, color )
{
	//OffSet refers to if the message will be positioned down or not
	//Applies to special messages, and thus we check for !offSet
	//Because most messages are not "special"

	//Set All Text Values as they may be overwritten by other functions
	textSize( 15 );

	if( color )
	{
		fill( 255, 50, 80 );
		stroke( 150 );
	}
	else
	{
		fill( 0 );
		stroke( 0 );
	}
	textAlign( CENTER );

	//If not a special "offSet" message, then apply text in regular location
	if( !offSet )
	{
		text( message, centerX, centerY );
	}
	//If it IS an "offSet" message, displace its y-position to be down form CenterY
	else
	{
		text( message, centerX, centerY + 25 );
	}
	
}

// - messageFromConsole Function
//+++++++++++++++++
//Takes in a string and dislays a message to console
//Uses the GLOBAL STRING "consoleMessage"
//as a basis and adds the passed "addition"
//to complete the whole message
function messageFromConsole( addition, change )
{
	//addition must be valid
	//change refers to if the message will be a different alert
	//Applies to special messages, and thus we check for !change
	//Because most messages are not "special"

	//GLOBAL STRING messageSent refers to if this message has already been sent
	//Must be delcared to false whenever a new message wishes to be displayed
	if( messageSent == false )
	{
		//If not a special "change" message, then apply standard format
		if( !change )
		{
			console.log( sceneCapture + consoleMessage + addition );
			console.log( autoAlert );
		}
		//If it IS an "change" message, do not include the consoleMessage
		else
		{
			console.log( sceneCapture + addition );
			console.log( autoAlert );
		}
		messageSent = true;
	}
}

// - colorBackground Function
//+++++++++++++++++
//Creates a 4-Section Canvas with Various Colors
//COLORED BACKGROUND - Shows "Life is not so Black and White"
//Is Made In "ROWS"
function colorBackground()
{
	rectMode( CENTER );
	stroke( 0 );

	//ROW 1
	//YELLOW
	fill( 200, 200, 100 );
	rect( 80, 50, 800, 100 );

	//ROW 2
	//GREEN
	fill( 100, 200, 100 );
	rect( 160, 150, 800, 100 );

	//ROW 3
	//BLUE
	fill( 100, 100, 200 );
	rect( 240, 250, 800, 100 );

	//ROW 4
	//PURPLE
	fill( 200, 0, 200 );
	rect( 320, 350, 800, 100 );
}

// - drawTheShapes Function
//+++++++++++++++++
//Draws all the Shape Objects
//From the GLOBAL LIST shapeList
function drawTheShapes( num )
{
	//number of shapes to draw based on num
	for( i = 0; i < num; i++ )
	{
		shapeList[ i ].drawShape();
	}
}

// - drawTheInfo Function
//+++++++++++++++++
//Draws all the InfoObj Objects
//From the GLOBAL LIST infoList
function drawTheInfo( num, skew )
{
	//number of shapes to draw based on num
	// "FOR" Loop did not Work Here
	// MY Take, is that maybe the code needs to run simulatenously and not "one after the other"
	// As each infoObject must "wait" for the previous one to finish drawing, and is an
	//"iterated" drawing?

	// No else statements will be drawn

	// skew is a boolean that test whether that info will be "changed" or not
	// WE Get the current width value from InfoObj, and add 1, 
	// to "Expand" the Data Stream, 1 by 1 (creates the "stream")
	if( num >= 1 )
	{
		infoList[ 0 ].setW( infoList[ 0 ].getW() + 1 );
		infoList[ 0 ].setSkewBool( skew );
		parseInfoData( infoList[ 0 ], xList[ 1 ], xList[ 4 ], xList[ 8 ] );
		// infoList[ 0 ].parseData( xList[ 0 ], xList[ 1 ], xList[ 8 ] );
	}

	if( num >= 2 )
	{
		infoList[ 1 ].setW( infoList[ 1 ].getW() + 1 );
		infoList[ 1 ].setSkewBool( skew );
		// infoList[ 1 ].parseData( xList[ 2 ], xList[ 3 ], xList[ 9 ] );
		parseInfoData( infoList[ 1 ], xList[ 0 ], xList[ 5 ], xList[ 9 ] );
	}

	if( num >= 3 )
	{
		infoList[ 2 ].setW( infoList[ 2 ].getW() + 1 );
		infoList[ 2 ].setSkewBool( skew );
		// infoList[ 2 ].parseData( xList[ 4 ], xList[ 5 ], xList[ 10 ] );
		parseInfoData( infoList[ 2 ], xList[ 2 ], xList[ 6 ], xList[ 10 ] );
	}

	if( num >= 4 )
	{
		infoList[ 3 ].setW( infoList[ 3 ].getW() + 1 );
		infoList[ 3 ].setSkewBool( skew );
		// infoList[ 3 ].parseData( xList[ 6 ], xList[ 7 ], xList[ 11 ] );
		parseInfoData( infoList[ 3 ], xList[ 3 ], xList[ 7 ], xList[ 11 ] );
	}
}

// - parseInfoData Function
//+++++++++++++++++
//Takes in the X-Values of various (3)
//Shape Objects that an InfoObj will "interesect"
//Orders the data and accounts for where to "skew" (if it does skew)
//ACTUALLY Draws the Data Stream, calling on the Drawing Function
//Of the InfoObj Object
function parseInfoData( infoObj, x1, x2, x3 )
{
	var orderedXList = smallToBig( x1, x2, x3 );
	infoObj.parseData( orderedXList[ 0 ], orderedXList[ 1 ], orderedXList[ 2 ] );
}

// - smallToBig Function
//+++++++++++++++++
//Takes 3 Values and sorts them from small to big
//and creates a list in order, in which it also returns
function smallToBig( x1, x2, x3 )
{
	var unOrderedList = [ x1, x2, x3 ];
	return sort( unOrderedList, 3 );
	// var newList = sort( unOrderedList, 3 );
	// return newList;
}


// - Aux (EVENT-BASED) Functions
//----------------

// - keyTyped Function
//+++++++++++++++++
//Takes into Account all Keys that are Pressed
function keyTyped()
{
	//Change Color
	if( key == '1')
	{
		//Changes sceneCapture to be in sync with Story
		if( sceneCapture == 1 )
		{
			sceneCapture = 2;
		}

		//If Story is Over
		if( !storyGoing )
		{
			var colorChange = color( random(255), random(25), random(255) );
			changeShapeColor( colorChange );
		}
	}

	//Change Form
	if( key == '2')
	{
		//Changes sceneCapture to be in sync with Story
		if( sceneCapture == 2 )
		{
			sceneCapture = 3;
		}

		//If Story is Over
		if( !storyGoing )
		{
			var formChange = random( intList );
			changeShapeForm( formChange );
		}
	}

	//Change Size
	if( key == '3')
	{
		//Changes sceneCapture to be in sync with Story
		if( sceneCapture == 3 )
		{
			sceneCapture = 4;
		}

		//If Story is Over
		if( !storyGoing )
		{
			var wChange = random( 20, 80 );
			var hChange = random( 20, 80 );
			changeShapeSize( wChange, hChange );
		}
	}

	//Change InfoSkew
	if( key == '4')
	{
		//Changes sceneCapture to be in sync with Story
		if( sceneCapture == 4 )
		{
			sceneCapture = 5;
		}

		//If Story is Over
		if( !storyGoing )
		{
			//TOGGLE
			changeInfoSkew( !infoBool );
		}
	}

	//RESET Values
	if( key == '5')
	{
		//Changes sceneCapture to be in sync with Story
		if( sceneCapture == 5 )
		{
			sceneCapture = 6;
		}

		//If Story is Over
		if( !storyGoing )
		{
			objectReset();
		}
	}

	//Skip The Story
	if( key == 's' )
	{
		skipStory();
	}
}

// - changeShapeColor Function
//+++++++++++++++++
//Changes Color of All Shapes
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

// - changeShapeForm Function
//+++++++++++++++++
//Changes Form of All Shapes
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
			for( j = 0; j < form; j++ )
			{
				newIntList[ j ] = intList[ j ];
			}
			randInt = random( newIntList )
			shapeList[ i ].setID( randInt );
		}
	}
}

// - changeShapeSizeFunction
//+++++++++++++++++
//Changes Size of All Shapes
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

// - changeInfoSkew Function
//+++++++++++++++++
//Changes Skew of All InfoObj Objects
function changeInfoSkew( bool )
{
	infoBool = bool;
	for( i = 0; i < infoList.length; i++ )
	{
		infoList[ i ].setSkewBool( infoBool );
	}
}

// - skipStory Function
//+++++++++++++++++
//Skip the Story Mode
function skipStory()
{
	storyGoing = false;
	sceneCapture = 6;
	objectReset();
}

//Reset Objects
function objectReset()
{
	//RESET COLOR
	changeShapeColor( 0, true );

	//RESET FORM
	var formChange = 5;
	changeShapeForm( formChange, true );

	//RESET SIZE
	var wChange = 80;
	var hChange = 80;
	changeShapeSize( wChange, hChange, true );

	//RESET INFO
	changeInfoSkew( false );
}


