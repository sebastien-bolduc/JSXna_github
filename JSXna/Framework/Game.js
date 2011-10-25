// namespace
var game = JSXna.Framework.Utils.CustomObject.namespace('JSXna.Framework');
    
/**
 * Initializes a new instance of this class, which provides basic graphics 
 * device initialization, game logic, rendering code, and a game loop.
 * @param 
 * @class
 * Provides basic graphics device initialization, game logic, and rendering 
 * code.
 */
game.Game = function() 
{
    this.graphicsDevice = null;
    this.content = new JSXna.Framework.Content.ContentManager();
    this.mouse = null;
    this.keyboard = null;
    this.gameTime = null;
};

/**
 * Called after the Game and GraphicsDevice are created, but before LoadContent.
 * @param gdm Graphics device manager
 * @return 
 */
game.Game.prototype.initialize = function(gdm)
{
    this.graphicsDevice = new JSXna.Framework.Graphics.GraphicsDevice(gdm);
    this.mouse = new JSXna.Framework.Input.Mouse(this.graphicsDevice.gdm.canvas);
    this.keyboard = new JSXna.Framework.Input.Keyboard();
    this.gameTime = new JSXna.Framework.GameTime();
};

/**
 * Called when graphics resources need to be loaded. Override this method to 
 * load any game-specific graphics resources.
 * @param 
 * @return 
 */
game.Game.prototype.loadContent = function()
{
};

/**
 * Called when graphics resources need to be unloaded. Override this method to 
 * unload any game-specific graphics resources.
 * @param 
 * @return 
 */
game.Game.prototype.unloadContent = function()
{
};

/**
 * Called when the game has determined that game logic needs to be processed. 
 * This might include the management of the game state, the processing of user 
 * input, or the updating of simulation data. Override this method with 
 * game-specific logic.
 * @param 
 * @return 
 */
game.Game.prototype.update = function(gameTime)
{
    gameTime.update();
};

/**
 * Called when the game determines it is time to draw a frame. Override this 
 * method with game-specific rendering code.
 * @param 
 * @return 
 */
game.Game.prototype.draw = function(gameTime)
{
    // double buffering
    this.graphicsDevice.gdm.context.clearRect(0 , 0, this.graphicsDevice.gdm.canvas.width, this.graphicsDevice.gdm.canvas.height);
    this.graphicsDevice.gdm.context.restore();
    this.graphicsDevice.gdm.context.drawImage(this.graphicsDevice.gdm.bufferCanvas, 0, 0);
};

/**
 * Call this method to initialize the game, begin running the game loop, and 
 * start processing events for the game.
 * @param 
 * @return
 */
game.Game.prototype.run = function()
{
    this.initialize();
    this.loadContent();
    this.unloadContent();
    this.tick();
};

/**
 * Game loop.
 * @param 
 * @return 
 */
game.Game.prototype.tick = function()
{
    // we call the game loop with "this" object
    var obj = this;
    requestAnimFrame(function(){obj.tick();});
    
    this.update(this.gameTime);
    this.draw(this.gameTime);
};