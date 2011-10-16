// namespace
var game1 = JSXna.Framework.Utils.CustomObject.namespace('Html5Game1');
    
/**
 * This is the main type for your game.
 * @param 
 * @class
 * Provides basic graphics device initialization, game logic, and rendering 
 * code.
 */
game1.Game1 = function() 
{
    // call constructor of super class
    JSXna.Framework.Game.call(this);
    
    this.graphics = new JSXna.Framework.GraphicsDeviceManager(document.getElementById("game-canvas"));
    this.content.rootDirectory = "";
    
    this.spriteBatch = null;
    
    this.totalFrames = 0;
    this.elapsedTime = 0;
    this.fps = 0;
    
    this.sprite = null;
    this.sprite2 = null;
    
    this.x = 400;
    this.y = 200;
    this.i = 3;
    this.j = 2;
    
    this.cat1 = null;
    this.cat2 = null;
    this.book = null;
};

// inherits from Game
JSXna.Framework.Utils.CustomObject.extend(JSXna.Framework.Game, game1.Game1);

/**
 * Allows the game to perform any initialization it needs to before starting to 
 * run.  This is where it can query for any required services and load any 
 * non-graphic related content.  Calling base.Initialize will enumerate through 
 * any components and initialize them as well.
 * @param 
 * @return 
 */
game1.Game1.prototype.initialize = function()
{
    // TODO: Add your initialization logic here
    this.cat1 = new JSXna.Framework.Rectangle(100, 200, 150, 100);
    this.cat2 = new JSXna.Framework.Rectangle(500, 200, 150, 100);
    this.book = new JSXna.Framework.Rectangle(400, 200, 50, 50);
    
    // call function of super class
    JSXna.Framework.Game.prototype.initialize.call(this, this.graphics);
};

/**
 * LoadContent will be called once per game and is the place to load all of your
 * content.
 * @param 
 * @return 
 */
game1.Game1.prototype.loadContent = function()
{
    // Create a new SpriteBatch, which can be used to draw textures.
    this.spriteBatch = new JSXna.Framework.Graphics.SpriteBatch(this.graphicsDevice);
    
    // TODO: use this.content to load your game content here
    this.sprite = this.content.load['Texture2D']("http://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Nuvola_apps_bookcase.svg/30px-Nuvola_apps_bookcase.svg.png");
    this.sprite2 = this.content.load['Texture2D']("http://diveintohtml5.ep.io/i/openclipart.org_media_files_johnny_automatic_1360.png");
};

/**
 * UnloadContent will be called once per game and is the place to unload
 * all content.
 * @param 
 * @return 
 */
game1.Game1.prototype.unloadContent = function()
{
    // TODO: Unload any non ContentManager content here
};

/**
 * Allows the game to run logic such as updating the world, checking for 
 * collisions, gathering input, and playing audio.
 * @param 
 * @return 
 */
game1.Game1.prototype.update = function(gameTime)
{
    // TODO: Add your update logic here
    this.elapsedTime += gameTime.elapsedGameTime;
    if (this.elapsedTime > 1000)
    {
        this.fps = this.totalFrames;
        this.totalFrames = 0;
        this.elapsedTime = 0;
    }
    else
    {
        this.totalFrames++;
    }
    
    this.x += this.i;
    this.y += this.j;
    if (this.x < 10 || this.x > (this.graphicsDevice.viewport.width - 50))
    {
        this.i *= -1;
        this.x += this.i * 2;
    }
    
    if (this.book.intersects(this.cat1) || this.book.intersects(this.cat2))
    {
        this.i *= -1;
        this.x += this.i * 2;
        this.book.x = this.x;
        if (this.book.intersects(this.cat1) && this.book.intersects(this.cat2))
        {
            this.i *= -1;
            this.x += this.i * 2;
        }
    }
    
    this.book.x = this.x;
    this.book.y = this.y;
    
    if (this.y < 10 || this.y > (this.graphicsDevice.viewport.height - 50))
    {
        this.j *= -1;
        this.y += this.j * 2;
    }
    
    if (this.book.intersects(this.cat1) || this.book.intersects(this.cat2))
    {
        this.j *= -1;
        this.y += this.j * 2;
        this.book.y = this.y;
        if (this.book.intersects(this.cat1) || this.book.intersects(this.cat2))
        {
            this.j *= -1;
            this.y += this.j * 2;
        }
    }
        
    this.book.x = this.x;
    this.book.y = this.y;
    
    // call function of super class
    JSXna.Framework.Game.prototype.update.call(this, gameTime);
};

/**
 * This is called when the game should draw itself.
 * @param 
 * @return 
 */
game1.Game1.prototype.draw = function(gameTime)
{
    // clear screen, line, etc...
    this.graphicsDevice.clear();
    
    this.spriteBatch.begin();
    
        // TODO: Add your drawing code here
        this.spriteBatch.drawString("bold 12px sans-serif", "FPS = " + this.fps, [730, 20], "#FF0000");
        this.spriteBatch.draw(this.sprite, new JSXna.Framework.Rectangle(this.x, this.y, this.sprite.width(), this.sprite.height()));
        this.spriteBatch.draw(this.sprite2, new JSXna.Framework.Rectangle(500, 200, this.sprite2.width(), this.sprite2.height()));
        this.spriteBatch.draw(this.sprite2, new JSXna.Framework.Rectangle(100, 200, this.sprite2.width(), this.sprite2.height()));
        
    this.spriteBatch.end();
    
    // call function of super class
    JSXna.Framework.Game.prototype.draw.call(this);
};