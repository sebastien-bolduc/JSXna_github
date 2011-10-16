// namespace
var program = JSXna.Framework.Utils.CustomObject.namespace('Html5Game1');
    
/**
 * Constructor that create our game object.
 * @param 
 * @class
 * This class take care of creating our game object and then start it 
 * (by which we mean the "game loop").
 */
program.Program = function()
{
};

/**
 * The main entry point for our gaming application.
 * @param 
 * @return 
 */
program.Program.prototype.main = function()
{
    var game = new Html5Game1.Game1(); 
    
    game.run();
};

// this will allow us to start the game
var program = new program.Program();