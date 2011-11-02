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
    
    this.vertices = [];
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
    this.setUpVertices();
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

game1.Game1.prototype.setUpVertices = function()
{
    this.vertices.push(new JSXna.Framework.Graphics.VertexPositionColor());
    this.vertices[0].position = new JSXna.Framework.Vector3(0, -100, 0);
    this.vertices[0].color = "#000000";
    this.vertices.push(new JSXna.Framework.Graphics.VertexPositionColor());
    this.vertices[1].position = new JSXna.Framework.Vector3(-200, 100, 0);
    this.vertices[1].color = "#000000";
    this.vertices.push(new JSXna.Framework.Graphics.VertexPositionColor());
    this.vertices[2].position = new JSXna.Framework.Vector3(200, 100, 0);
    this.vertices[2].color = "#000000";
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
        this.graphicsDevice.drawUserPrimitives(JSXna.Framework.Graphics.PrimitiveType.TriangleList, this.vertices, 0, 1, JSXna.Framework.Graphics.VertexPositionColor.VertexDeclaration);
        
    this.spriteBatch.end();
    
    // call function of super class
    JSXna.Framework.Game.prototype.draw.call(this);
};