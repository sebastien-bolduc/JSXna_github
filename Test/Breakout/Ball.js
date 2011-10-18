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
 * @param gameTime Time elapsed for a frame
 * @param graphicsDevice Graphics device object attach to the canvas
 * @param pad Pad the ball hit against
 * @param blocks List of block the ball hit against
 * @return 
 */
ball.Ball.prototype.update = function(gameTime, graphicsDevice, pad, blocks)
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
        this.i *= -1;
        this.x += this.i * 2;
        this.ballSpriteRect.x = this.x;
        if (this.ballSpriteRect.intersects(pad.padSpriteRect))
        {
            this.i *= -1;
            this.x += this.i * 2;
        }
    }
    
    if (this.ballSpriteRect.intersects(pad.padSpriteRect))
    {
        this.j *= -1;
        this.y += this.j * 2;
        this.ballSpriteRect.y = this.y;
        if (this.ballSpriteRect.intersects(pad.padSpriteRect))
        {
            this.j *= -1;
            this.y += this.j * 2;
        }
    }
    
    this.ballSpriteRect.x = this.x;
    this.ballSpriteRect.y = this.y;
    
    for (var i = 0; i < blocks.length; i++)
    {
        if (blocks[i] === null)
            continue;
        
        if (this.ballSpriteRect.intersects(blocks[i].blockRect))
        {
            this.i *= -1;
            this.x += this.i * 2;
            this.ballSpriteRect.x = this.x;
            if (this.ballSpriteRect.intersects(blocks[i].blockRect))
            {
                this.i *= -1;
                this.x += this.i * 2;
            }
            else
                blocks[i] = null;
        }
        
        if (blocks[i] === null)
            continue;
        
        if (this.ballSpriteRect.intersects(blocks[i].blockRect))
        {
            this.j *= -1;
            this.y += this.j * 2;
            this.ballSpriteRect.y = this.y;
            if (this.ballSpriteRect.intersects(blocks[i].blockRect))
            {
                this.j *= -1;
                this.y += this.j * 2;
            }
            else
                blocks[i] = null;
        }
    }
    
    this.ballSpriteRect.x = this.x;
    this.ballSpriteRect.y = this.y;
    
    gameTime = (gameTime <= 0) ? 15 : gameTime;
    this.i = Math.ceil(gameTime / 1000 * 180) * (this.i / Math.abs(this.i));
    this.j = Math.ceil(gameTime / 1000 * 120) * (this.j / Math.abs(this.j));
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