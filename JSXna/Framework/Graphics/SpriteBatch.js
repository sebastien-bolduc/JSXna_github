// namespace
var spriteBatch = JSXna.Framework.Utils.CustomObject.namespace('JSXna.Framework.Graphics');

/**
 * Initializes a new instance of the class, which enables a group of sprites to 
 * be drawn using the same settings.
 * @param gd Graphics device
 * @class
 * Enables a group of sprites to be drawn using the same settings.
 */
spriteBatch.SpriteBatch = function(gd)
{
    this.gd = gd;
};

/**
 * Begins a sprite batch operation.
 * @param 
 * @return 
 */
spriteBatch.SpriteBatch.prototype.begin = function()
{
    this.gd.gdm.bufferContext.beginPath();
};

/**
 * Flushes the sprite batch and restores the device state to how it was before 
 * Begin was called.
 * @param 
 * @return 
 */
spriteBatch.SpriteBatch.prototype.end = function()
{
    this.gd.gdm.bufferContext.closePath();
};

/**
 * Adds a string to a batch of sprites to be rendered.
 * @param font Sprite font
 * @param text String
 * @param position Vector with 2 elements (x, y)
 * @param color Color to apply on font
 * @return 
 */
spriteBatch.SpriteBatch.prototype.drawString = function(font, text, position, color)
{
    this.begin();
    this.gd.gdm.bufferContext.font = font;
    this.gd.gdm.bufferContext.fillStyle = color;
    this.gd.gdm.bufferContext.fillText(text, position[0], position[1]);
    this.end();
};

/**
 * Adds a sprite to a batch of sprites to be rendered.
 * @param texture2D A texture
 * @param rectanble A rectangle that specifies (in screen coordinates) the 
 * destination for drawing the sprite
 * @return 
 */
spriteBatch.SpriteBatch.prototype.draw = function(texture2D, rectangle, source)
{
    if (!texture2D.imageLoaded)
        return;
    
    if (source === undefined)
        this.gd.gdm.bufferContext.drawImage(texture2D.image, 0, 0, texture2D.width(), texture2D.height(), rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    else     
        this.gd.gdm.bufferContext.drawImage(texture2D.image, source.x, source.y, source.width, source.height, rectangle.x, rectangle.y, rectangle.width, rectangle.height);
};