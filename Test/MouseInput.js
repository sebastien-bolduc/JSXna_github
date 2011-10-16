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
    
    this.curPosX = 0;
    this.curPosY = 0;
    
    this.sprite = null;
    this.spriteX = 400;
    this.spriteY = 250;
    this.spriteRect = null;
    this.spriteSelected = false;
    this.previousButtonState = false;
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
    this.spriteRect = new JSXna.Framework.Rectangle(this.spriteX, this.spriteY, 50, 50);
    
    // call function of super class
    JSXna.Framework.Game.prototype.initialize.call(this, this.graphics);
    
    this.previousButtonState = this.mouse.getState().button;
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
    
    var mouseState = this.mouse.getState();
    if (mouseState.button)
    {
        this.curPosX = mouseState.x;
        this.curPosY = mouseState.y;
    }
    
    if (mouseState.button && !this.spriteSelected && !this.previousButtonState)
    {
        this.previousButtonState = mouseState.button;
        if (this.spriteRect.intersects(new JSXna.Framework.Rectangle(mouseState.x, mouseState.y, 1, 1)))
            this.spriteSelected = true;
    }
    else if (mouseState.button && this.spriteSelected)
    {
        this.previousButtonState = mouseState.button;
        this.spriteX = this.curPosX;
        this.spriteY = this.curPosY;
        this.spriteRect.x = this.spriteX;
        this.spriteRect.y = this.spriteY;
    }
    else 
    {
        this.previousButtonState = mouseState.button;
        this.spriteSelected = false;
    }
    
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
        this.spriteBatch.drawString("bold 12px sans-serif", "POS = " + this.curPosX + " , " + this.curPosY, [20, 20], "#FF0000");
        this.spriteBatch.drawString("bold 12px sans-serif", "FPS = " + this.fps, [730, 20], "#FF0000");
        this.spriteBatch.draw(this.sprite, new JSXna.Framework.Rectangle(this.spriteX, this.spriteY, this.sprite.width(), this.sprite.height()));
        
    this.spriteBatch.end();
    
    // call function of super class
    JSXna.Framework.Game.prototype.draw.call(this);
};