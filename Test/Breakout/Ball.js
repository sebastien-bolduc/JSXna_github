// namespace
var ball = JSXna.Framework.Utils.CustomObject.namespace('Html5Game1');

/**
 * This is the main type for ball.
 * @param x Starting position of the ball
 * @param y Starting position of the ball
 * @class
 * Handle everything related to the ball part of the game 
 * (drawing, update, etc.).
 */
ball.Ball = function(x, y)
{
    this.ballSprite = null;
    this.ballSpriteRect = null;
    this.x = x;
    this.y = y;
    this.i = 3;
    this.j = 2;
};

/**
 * Load the ball sprite.
 * @param content Content object for loading stuff
 * @return 
 */
ball.Ball.prototype.load = function(content)
{
    this.ballSprite = content.load['Texture2D']("http://www.yocoach.ca/images/Soccer_ball.png");
    this.ballSpriteRect = new JSXna.Framework.Rectangle(this.x, this.y, 30, 30);
};

/**
 * Update the ball sprite.
 * @param graphicsDevice Graphics device object attach to the canvas
 * @param fps Frame per second
 * @param pad Pad the ball hit against
 * @return 
 */
ball.Ball.prototype.update = function(graphicsDevice, fps, pad)
{
    this.x += this.i;
    this.y += this.j;
    
    if (this.x < 0 || this.x > (graphicsDevice.viewport.width - 30))
    {
        this.i *= -1;
        this.x += this.i * 2;
    }
    
    if (this.y < 0 || this.y > (graphicsDevice.viewport.height - 30))
    {
        this.j *= -1;
        this.y += this.j * 2;
    }
    
    this.ballSpriteRect.x = this.x;
    this.ballSpriteRect.y = this.y;
    
    if (this.ballSpriteRect.intersects(pad.padSpriteRect))
    {
        this.j *= -1;
        this.y += this.j * 2;
    }
    
    fps = (fps === 0) ? 60 : fps;
    this.i = Math.floor(200 / fps) * (this.i / Math.abs(this.i));
    this.j = Math.floor(150 / fps) * (this.j / Math.abs(this.j));
};

/**
 * Draw the ball sprite to the screen (canvas).
 * @param spriteBatch SpriteBatch object for drawing stuff
 * @return 
 */
ball.Ball.prototype.draw = function(spriteBatch)
{
    spriteBatch.draw(this.ballSprite, new JSXna.Framework.Rectangle(this.x, this.y, 30, 30));
};