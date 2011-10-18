// namespace
var pad = JSXna.Framework.Utils.CustomObject.namespace('Html5Game1');

/**
 * This is the main type for pad.
 * @param x Starting position of the pad
 * @param y Starting position of the pad
 * @class
 * Handle everything related to the pad part of the game 
 * (drawing, update, etc.).
 */
pad.Pad = function(x, y)
{
    this.padSprite = null;
    this.padSpriteRect = null;
    this.x = x;
    this.y = y;
};

/**
 * Load the pad sprite.
 * @param content Content object for loading stuff
 * @return 
 */
pad.Pad.prototype.load = function(content)
{
    this.padSprite = content.load['Texture2D']("http://stocks.monsitegratuit.com/tutoriaux/sauvegardes/38/tuto.png");
    this.padSpriteRect = new JSXna.Framework.Rectangle(this.x, this.y, 100, 30);
};

/**
 * Update the pad sprite.
 * @param mouseState State of the mouse
 * @return 
 */
pad.Pad.prototype.update = function(mouseState)
{
    if (mouseState.button)
    {
        this.x = mouseState.x;
    }
    
    this.padSpriteRect.x = this.x;
};

/**
 * Draw the pad sprite to the screen (canvas).
 * @param spriteBatch SpriteBatch object for drawing stuff
 * @return 
 */
pad.Pad.prototype.draw = function(spriteBatch)
{
    spriteBatch.draw(this.padSprite, new JSXna.Framework.Rectangle(this.x, this.y, 100, 30));
};