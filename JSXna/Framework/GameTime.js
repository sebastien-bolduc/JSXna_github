// namespace
var gameTime = JSXna.Framework.Utils.CustomObject.namespace('JSXna.Framework');

/**
 * Creates a new instance of GameTime.
 * @param 
 * @class
 * Snapshot of the game timing state expressed in values that can be used by 
 * variable-step (real time) or fixed-step (game time) games.
 */
gameTime.GameTime = function()
{
    this.currentGameTime = new Date().getTime();
    this.elapsedGameTime = 0;
    this.totalGameTime = 0;
};

/**
 * The amount of elapsed game time since the last update.
 * @param 
 * @return 
 */
gameTime.GameTime.prototype.update = function()
{
    this.elapsedGameTime = (new Date().getTime()) - this.currentGameTime;
    this.totalGameTime += this.elapsedGameTime;
    
    this.currentGameTime = new Date().getTime();
};