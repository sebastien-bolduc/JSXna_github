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
    
    this.ball = null;
    this.pad = null;
    this.blocks = [];
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
    this.ball = new Html5Game1.Ball(0, 0);
    this.pad = new Html5Game1.Pad(350, 400);
    
    this.blocks.push(new Html5Game1.Block(102, 112, "#00FF00"));
    this.blocks.push(new Html5Game1.Block(202, 112, "#00FF00"));
    this.blocks.push(new Html5Game1.Block(302, 112, "#00FF00"));
    this.blocks.push(new Html5Game1.Block(402, 112, "#00FF00"));
    this.blocks.push(new Html5Game1.Block(502, 112, "#00FF00"));
    this.blocks.push(new Html5Game1.Block(602, 112, "#00FF00"));
    
    this.blocks.push(new Html5Game1.Block(102, 156, "#FFFF00"));
    this.blocks.push(new Html5Game1.Block(202, 156, "#FFFF00"));
    this.blocks.push(new Html5Game1.Block(302, 156, "#FFFF00"));
    this.blocks.push(new Html5Game1.Block(402, 156, "#FFFF00"));
    this.blocks.push(new Html5Game1.Block(502, 156, "#FFFF00"));
    this.blocks.push(new Html5Game1.Block(602, 156, "#FFFF00"));
    
    this.blocks.push(new Html5Game1.Block(102, 200, "#0000FF"));
    this.blocks.push(new Html5Game1.Block(202, 200, "#0000FF"));
    this.blocks.push(new Html5Game1.Block(302, 200, "#0000FF"));
    this.blocks.push(new Html5Game1.Block(402, 200, "#0000FF"));
    this.blocks.push(new Html5Game1.Block(502, 200, "#0000FF"));
    this.blocks.push(new Html5Game1.Block(602, 200, "#0000FF"));
    
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
    this.ball.load(this.content);
    this.pad.load(this.content);
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
    
    this.ball.update(gameTime.elapsedGameTime, this.graphicsDevice, this.pad, this.blocks);
    this.pad.update(gameTime.elapsedGameTime, this.mouse.getState(), this.keyboard.getState());
    
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
        this.spriteBatch.drawString("bold 12px sans-serif", "Time = " + gameTime.elapsedGameTime, [20, 20], "#FF0000");
        this.spriteBatch.drawString("bold 12px sans-serif", "FPS = " + this.fps, [730, 20], "#FF0000");
        this.ball.draw(this.spriteBatch);
        this.pad.draw(this.spriteBatch);
        
        for (var i = 0; i < this.blocks.length; i++)
        {
            if (this.blocks[i] !== null) 
                this.blocks[i].draw(this.spriteBatch);
        }
        
    this.spriteBatch.end();
    
    // call function of super class
    JSXna.Framework.Game.prototype.draw.call(this);
};