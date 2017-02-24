// Matrix Rain tutorial from Coding Train
// Credits to Emily Xie.

/*
  The `symbolSize` is being used for the size of the symbol.
  While the `streams` array is being used to store the symbols.
*/
var symbolSize = 24;
var streams = [];

/*
  Main setup for p5.js
*/
function setup() {
  createCanvas( window.innerWidth, window.innerHeight );
  background( 0 );

  var x = 0; // This is being used for the rainfall position of the streams

  // The setup on generating the symbols in a stream
  for( var i = 0; i <= width / symbolSize; i++ ) {
    var stream = new Stream(); // Create `stream` for storing symbols

    /*
      The `x` position will be incremented progressively.
      The `y` position is randomisely stacked from the top till -1000.
    */
    stream.generateSymbols( x, random( -1000, 0 ) );

    // Symbols generated that was stored in the stream is stored in `streams` array
    streams.push( stream );
    x += symbolSize;
  }

  textSize( symbolSize );
}

/*
  The render function for p5.js
*/
function draw() {
  background( 0, 150 );

  // Render each stream that was previously generated in `setup` function
  streams.forEach( function( stream ) {
    stream.render();
  } );
}

/*
  `Symbol` class that is being used for generating the symbol(s).

*/
function Symbol( x, y, speed, first ) {
  this.x = x; // The `x` position
  this.y = y; // The `y` position
  this.value; // The `value` will be used to represent the symbol
  this.speed = speed; // Reference for the rainfall effect speed

  // The switching interval for the symbol to occur
  this.switchInterval = round( random( 2, 20 ) );

  // Flag for the contrasting effect of the symbol when being rendered
  this.first = first;

  // Function for assigning/generating symbol to `value` variable
  this.setToRandomSymbol = function() {
    // Responsible for the random symbol effect
    if( frameCount % this.switchInterval === 0 ) {
      this.value = String.fromCharCode( 0x30A0 + round( random( 0, 96 ) ) );
    }
  };

  // Obviously responsible for the raining effect
  this.rain = function() {
    this.y = ( this.y >= height ) ? 0 : this.y += this.speed;
  };
}

/*
  Responsible for keeping the symbols in group
*/
function Stream() {
  this.symbols = []; // Used for storing the symbols
  this.totalSymbols = round( random( 5, 18 ) ); // Influence on the creation of symbols
  this.speed = random( 5, 10 ); // For the rainfall effect speed

  this.generateSymbols = function( x, y ) {
    // Probability chances of contrasting effect on a symbol in a stream shall be 1/4.
    var first = round( random( 0, 4 ) ) === 1;

    // Loop over and create symbols in a stream
    for( var i = 0; i < this.totalSymbols; i++ ) {
      symbol = new Symbol( x, y, this.speed, first );
      symbol.setToRandomSymbol();
      this.symbols.push( symbol );
      y -= symbolSize;
      first = false;
    }
  };

  // This will render the stream of symbols
  this.render = function() {
    this.symbols.forEach( function( symbol ) {
      // The symbol colour will change if it should be contrasted than the rest
      if( symbol.first ) {
        fill( 180, 255, 180 );
      } else {
        fill( 0, 255, 70 );
      }

      // This will render the text on the canvas
      text( symbol.value, symbol.x, symbol.y );
      symbol.rain();
      symbol.setToRandomSymbol();
    })
  };
}
