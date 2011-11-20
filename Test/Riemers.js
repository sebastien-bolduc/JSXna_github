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
    
    this.effect = null;
    
    this.vertices = [];
    this.worldMatrix = null;
    this.angle = 0;
    
    this.BTvertices = [];
    this.BTworldMatrix = null;
    
    this.Fvertices = [];
    this.FworldMatrix = null;
    
    this.viewMatrix = null;
    this.cameraAngle = 0;
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
    this.effect = this.content.load['Effect']("effects");
    
    this.setUpVertices();
    this.BTsetUpVertices();
    this.FsetUpVertices();
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

game1.Game1.prototype.BTsetUpVertices = function()
{
    this.BTvertices.push(new JSXna.Framework.Graphics.VertexPositionColor());
    this.BTvertices[0].position = new JSXna.Framework.Vector3(0, -100, 0);
    this.BTvertices[0].color = "#0000FF";
    this.BTvertices.push(new JSXna.Framework.Graphics.VertexPositionColor());
    this.BTvertices[1].position = new JSXna.Framework.Vector3(-200, 100, 0);
    this.BTvertices[1].color = "#0000FF";
    this.BTvertices.push(new JSXna.Framework.Graphics.VertexPositionColor());
    this.BTvertices[2].position = new JSXna.Framework.Vector3(200, 100, 0);
    this.BTvertices[2].color = "#0000FF";
};

game1.Game1.prototype.FsetUpVertices = function()
{
    this.Fvertices.push(new JSXna.Framework.Graphics.VertexPositionColor());
    this.Fvertices[0].position = new JSXna.Framework.Vector3(0, 51, -800);
    this.Fvertices[0].color = "#00FF00";
    this.Fvertices.push(new JSXna.Framework.Graphics.VertexPositionColor());
    this.Fvertices[1].position = new JSXna.Framework.Vector3(-1600, 51, 800);
    this.Fvertices[1].color = "#00FF00";
    this.Fvertices.push(new JSXna.Framework.Graphics.VertexPositionColor());
    this.Fvertices[2].position = new JSXna.Framework.Vector3(0, 51, 800);
    this.Fvertices[2].color = "#00FF00";
    
    this.Fvertices.push(new JSXna.Framework.Graphics.VertexPositionColor());
    this.Fvertices[3].position = new JSXna.Framework.Vector3(0, 51, -800);
    this.Fvertices[3].color = "#00FF00";
    this.Fvertices.push(new JSXna.Framework.Graphics.VertexPositionColor());
    this.Fvertices[4].position = new JSXna.Framework.Vector3(1600, 51, 800);
    this.Fvertices[4].color = "#00FF00";
    this.Fvertices.push(new JSXna.Framework.Graphics.VertexPositionColor());
    this.Fvertices[5].position = new JSXna.Framework.Vector3(0, 51, 800);
    this.Fvertices[5].color = "#00FF00";
    
    this.Fvertices.push(new JSXna.Framework.Graphics.VertexPositionColor());
    this.Fvertices[6].position = new JSXna.Framework.Vector3(0, 51, -800);
    this.Fvertices[6].color = "#FF0000";
    this.Fvertices.push(new JSXna.Framework.Graphics.VertexPositionColor());
    this.Fvertices[7].position = new JSXna.Framework.Vector3(1600, 51, 800);
    this.Fvertices[7].color = "#FF0000";
    this.Fvertices.push(new JSXna.Framework.Graphics.VertexPositionColor());
    this.Fvertices[8].position = new JSXna.Framework.Vector3(1600, 51, -2400);
    this.Fvertices[8].color = "#FF0000";
    
    this.Fvertices.push(new JSXna.Framework.Graphics.VertexPositionColor());
    this.Fvertices[9].position = new JSXna.Framework.Vector3(0, 51, -800);
    this.Fvertices[9].color = "#0000FF";
    this.Fvertices.push(new JSXna.Framework.Graphics.VertexPositionColor());
    this.Fvertices[10].position = new JSXna.Framework.Vector3(-1600, 51, 800);
    this.Fvertices[10].color = "#0000FF";
    this.Fvertices.push(new JSXna.Framework.Graphics.VertexPositionColor());
    this.Fvertices[11].position = new JSXna.Framework.Vector3(-1600, 51, -2400);
    this.Fvertices[11].color = "#0000FF";
    
    this.Fvertices.push(new JSXna.Framework.Graphics.VertexPositionColor());
    this.Fvertices[12].position = new JSXna.Framework.Vector3(0, 51, -800);
    this.Fvertices[12].color = "#000000";
    this.Fvertices.push(new JSXna.Framework.Graphics.VertexPositionColor());
    this.Fvertices[13].position = new JSXna.Framework.Vector3(-1600, 51, -2400);
    this.Fvertices[13].color = "#000000";
    this.Fvertices.push(new JSXna.Framework.Graphics.VertexPositionColor());
    this.Fvertices[14].position = new JSXna.Framework.Vector3(1600, 51, -2400);
    this.Fvertices[14].color = "#000000";
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
    
    if (this.angle >= 360)
        this.angle = 0;
    else
        this.angle++;
        
    if (this.cameraAngle >= 360)
        this.cameraAngle = 0;
    else
        this.cameraAngle += 0.2;
    
    this.worldMatrix = JSXna.Framework.Matrix.multiply(
        JSXna.Framework.Matrix.createRotationY(this.angle * Math.PI / 180),
        JSXna.Framework.Matrix.multiply(
            JSXna.Framework.Matrix.createTranslation(new JSXna.Framework.Vector3(200, 0, 0)),
            JSXna.Framework.Matrix.createScale(new JSXna.Framework.Vector3(0.5, 0.5, 0.5))
            )
        );
        
    this.BTworldMatrix = JSXna.Framework.Matrix.createScale(new JSXna.Framework.Vector3(0.5, 0.5, 0.5));
    
    this.FworldMatrix = JSXna.Framework.Matrix.identity();
  
    this.viewMatrix = JSXna.Framework.Matrix.multiply(
        JSXna.Framework.Matrix.createTranslation(new JSXna.Framework.Vector3(0, 0, -800)),
        //JSXna.Framework.Matrix.identity(),
        JSXna.Framework.Matrix.multiply(
            JSXna.Framework.Matrix.createRotationY(this.cameraAngle * Math.PI / 180),
            JSXna.Framework.Matrix.createTranslation(new JSXna.Framework.Vector3(0, 0, 800))
            )
        );
  
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
        
        this.effect.parameters['xView'].setValue(this.viewMatrix);
        this.effect.parameters['xWorld'].setValue(this.worldMatrix);
        this.graphicsDevice.drawUserPrimitives(JSXna.Framework.Graphics.PrimitiveType.TriangleList, this.vertices, 0, 1, JSXna.Framework.Graphics.VertexPositionColor.VertexDeclaration);
        this.effect.parameters['xWorld'].setValue(this.BTworldMatrix);
        this.graphicsDevice.drawUserPrimitives(JSXna.Framework.Graphics.PrimitiveType.TriangleList, this.BTvertices, 0, 1, JSXna.Framework.Graphics.VertexPositionColor.VertexDeclaration);
        this.effect.parameters['xWorld'].setValue(this.FworldMatrix);
        this.graphicsDevice.drawUserPrimitives(JSXna.Framework.Graphics.PrimitiveType.TriangleList, this.Fvertices, 0, 5, JSXna.Framework.Graphics.VertexPositionColor.VertexDeclaration);
        
    this.spriteBatch.end();
    
    // call function of super class
    JSXna.Framework.Game.prototype.draw.call(this);
};