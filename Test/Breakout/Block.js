// namespace
var block = JSXna.Framework.Utils.CustomObject.namespace('Html5Game1');

/**
 * This is the main type for block.
 * @param x Position of the block
 * @param y Position of the block
 * @param color Color of the block
 * @class
 * Handle everything related to the block part of the game 
 * (drawing, update, etc.).
 */
block.Block = function(x, y, color)
{
    this.blockRect = null;
    this.x = x;
    this.y = y;
    this.color = color;
    
    this.blockRect = new JSXna.Framework.Rectangle(this.x, this.y, 96, 40);
};

/**
 * Draw the block to the screen (canvas).
 * @param spriteBatch SpriteBatch object for drawing stuff
 * @return 
 */
block.Block.prototype.draw = function(spriteBatch)
{
    spriteBatch.gd.gdm.bufferContext.beginPath();
    spriteBatch.gd.gdm.bufferContext.fillStyle = this.color;    
    spriteBatch.gd.gdm.bufferContext.fillRect(this.x, this.y, 96, 40);
    spriteBatch.gd.gdm.bufferContext.closePath();
};