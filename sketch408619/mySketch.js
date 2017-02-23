//A STORY OF BLACK AND WHITE

//MOUSE is where "privelage" sways

//var clrEfficient = [ 0, 0, 0 ];
//var clrDeficient = [ 0, 0, 0 ];
//var useClr = [ 0, 0, 0 ];
//var useShape = [ 0, 0, 0, 0, 0 ];
//var infoObj = [ useClr, useShape ];

//class Person {
//  constructor( clrE, clrD, clrV, shapeE, shapeD, fam, gen, indv, infl ) {
//    this.clrE = clrE;
//    this.clrD = clrD;
//    this.clrV = clrV;
//    this.shapeE = shapeE;
//    this.shapeD = shapeD;
//    this.fam = fam;
//    this.gen = gen;
//    this.indv = indv;
//    this.pShape = shapeE + 1;
//    this.pClr = clrE;
//    this.influence = random( infl - 5, infl + 5 );
//  }
  
//  //timeWarp( t )
//  //{
//  //  this.pShape = warpShape( this.pShape, t );
//  //}
  
//  //static warpShape( p
  
//  //To be able to "live" in other people's shoes.. it is a static method
 
//   recieveObj( obj )
//   {
//     obj[ 0 ] = origClr;
//     obj[ 1 ] = origShape;
     
//     var clr = origClr;
//     var shape = origShape;
//     var newObj = [ clr, shape ];
     
//     //Warp Color
//     if( (this.clrE >= 0) && (this.clrE < 25) )
//     {
//       clr[ 0 ] += this.clrE;
//     }
//     else if( (this.clrE >= 25) && (this.clrE < 50) )
//     {
//       clr[ 1 ] += this.clrE;
//     }
//     else if( (this.clrE >= 50) && (this.clrE < 75) )
//     {
//       clr[ 2 ] += this.clrE;
//     }
     
//     //Warp Shape
//     shape[ shapeE ] += shapeE / 2;
     
//     return newObj;
//   }
   
//   //giveBirth()
//   //{
//   //  var child = new Person( clrE, clrD, clrV, shapeE, shapeD, fam, gen, indv + 1, infl );
//   //  return child;
//   //}
//}


var shapeList = [];
var shapeCount = 0;

var xTho = 0;
var yTho = 0;

class Shape
{
  constructor( x, y, clr, w, h)
  {
    this._id = 0;
    this._skew = shapeCount;
    this._x = x;
    this._y = y;
    this._clr = clr;
    this._w = w;
    this._h = h;
    //0 = constant x value, 1 = constant y value
    //2 = fixed position, 3 = varied motion
    this._path = 0;
  }
  
  get id()
  {
    return this._id;
  }

	get skew()
  {
    return this._skew;
  }
  
  get x()
  {
    return this._x;
  }
  get y()
  {
    return this._y;
  }
  get clr()
  {
    return this._clr;
  }
  get w()
  {
    return this._w;
  }
  get h()
  {
    return this._h;
  }
	
	get path()
	{
    return this._path;
	}

	set id( newID )
  {
    this._id = newID;
  }
	
	set x( newX )
	{
    this._x = newX;
	}

	set y( newY )
	{
    this._y = newY;
	}

	set w( newW )
	{
    this._w = newW;
	}

	set h( newH )
	{
    this._h = newH;
	}

	set clr( newClr )
	{
    this._clr = newClr;
	}

	set path( newPath )
	{
    this._path = newPath;
	}
  

  // set x( newX )
  // {
  //   this.x = newX;
  //   return this.x;
  // }
  
  drawShape()
  {
    fill( this._clr );
    if( this._id == 0 )
    {
      ellipseMode( CENTER );
      ellipse( this._x, this._y, this._w, this._h );
    }
    else if( this._id == 1 )
    {
      rectMode( CENTER );
      rect( this._x, this._y, this._w, this._h );
    }
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
    else if( this._id == 4 )
    {
      for( var i = 0; i < this._w; i++ )
      {
        for( var j = 0; j < this._h; j++ )
      	{
          stroke( i + j, 55, 20 );
          if( i % j >= 2 )
          {
            line( this._x, this._y, this._x + random(-7, 7), this._y + random(-7, 7) );
          }
      	}
      }
    }
    else if( this._id == 5 )
    {
      var x1 = this._x - (this._w)/2;
      var y1 = this._y - (this._h);
      var x2 = this._x - (this._w)/2;
      var y2 = this._y - (this._h);
      var x3 = this._x - (this._w)/2
      var y3 = this._y + (this._h)/2;
      var x4 = this._x + (this._w);
      var y4 = this._y + (this._h)/2;
      var x5 = this._x + (this._w);
      var y5 = this._y + (this._h)/2;
      beginShape();
      vertex( x1, y1 );
      vertex( x2, y2 );
      vertex( x3, y3 );
      vertex( x4, y4 );
      vertex( x5, y5 );
      endShape( CLOSE );
    }
    else if( this._id == 6 )
    {
      for( var i = 0; i < this._w; i++ )
      {
        for( var j = 0; j < this._h; j++ )
      	{
          stroke( i + j, 55, 20 );
          if( i % j >= 2 )
          {
            line( this._x, this._y, this._x + random(-7, 7), this._y + random(-7, 7) );
          }
      	}
      }
    }
    else if( this._id == 7 )
    {
      var x1 = this._x - (this._w)/2;
      var y1 = this._y - (this._h);
      var x2 = this._x - (this._w)/2;
      var y2 = this._y - (this._h);
      var x3 = this._x - (this._w)/2
      var y3 = this._y + (this._h)/2;
      var x4 = this._x + (this._w);
      var y4 = this._y + (this._h)/2;
      var x5 = this._x + (this._w);
      var y5 = this._y + (this._h)/2;
      var x6 = this._x;
      var y6 = this._y;
      beginShape();
      vertex( x1, y1 );
      vertex( x2, y2 );
      vertex( x3, y3 );
      vertex( x4, y4 );
      vertex( x5, y5 );
      endShape( CLOSE );
    }
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
          };
          stroke( random( 255 ), random( i + j ), random( 255 ) );
          if( i % j >= 2 )
          {
            line( this._x, this._y, this._x + random(-7, 7), this._y + random(-7, 7) );
          }
          fill( random( 255 ) );
          ellipse( this._x, this._y, i, j )
      	}
      }
    }
    else
    {
      ellipseMode( CENTER );
      noFill();
      ellipse( this._x, this._y, this._w, this._h );
    }
  }
}

function createShape( x, y, clr, w, h )
{
  var newShape = new Shape ( x, y, clr, w, h );
  shapeList[ shapeCount ] = newShape;
  shapeCount++;
  return newShape;
}

function setup() { 
  createCanvas(400, 400);
  var shp1 = createShape( 200, 200, color( 0 ), 50, 10 );
  var shp2 = createShape( 275, 200, color( 0 ), 50, 50 );
  var flyObj = createShape( 0, 200, color( 22, 55, 200 ), 10, 10 );
} 

function draw() {
  background(220);
  var intersectX = findIntersection(); 
  
  var shp1 = shapeList[ 0 ];
  var shp2 = shapeList[ 1 ];
  var flyObj = shapeList[ 2 ];
  
  for( var i = 0; i < shapeCount; i++ )
  {
  	var path = shapeList[ i ].path;
    if( path == 0 )
    {
      shapeList[ i ].y = shapeList[ i ].y - 1;
      // if( shapeList[ i ].y < 0 );
      // {
      //   shapeList[ i ].y = height;
      // }
    }
  }
  
  //intersectX[ 0 ] = 200;
  //intersectX[ 1 ] = 275;

  if( xTho >= intersectX[ 1 ] )
  {
    collide( shp2, flyObj );
  } 
  else if( xTho >= intersectX[ 0 ] )
  {
    collide( shp1, flyObj );
  }

  xTho += 2;
  if( xTho > width )
  {
    xTho = 0;
    flyObj = createShape( 0, 200, color( 22, 55, 200 ), 10, 10 );
  }
  
  flyObj.x = xTho;
  
  // strokeWeight( 1 );
  // triangle( 233, 193, 240, 200, 247, 207 );
  // ellipse( 233, 193, 5, 5 );
  // ellipse( 240, 200, 5, 5 );
  // ellipse( 247, 207, 5, 5 );
  
  flyObj.drawShape();
  shp1.drawShape();
  shp2.drawShape();
}

function collide( firstShape, secShape )
{
	var theSkew = firstShape.skew;
  secShape.clr = calcSkewClr( theSkew, secShape.clr );
  secShape.w = secShape.w + theSkew;
  secShape.h = secShape.h + theSkew;
  secShape.id = secShape.id + theSkew;
  if( secShape.id > 5 )
  {
    secShape.id = 0;
  }
}

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

function findIntersection()
{
  var theList = [];
  for( var i = 0; i < shapeCount; i++ )
  {
   theList[ i ] = shapeList[ i ].x;
  }
  console.log( shapeCount );
  return theList;
}