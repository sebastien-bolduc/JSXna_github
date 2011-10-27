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
    
    this.p1 = null;
    this.p2 = null;
    this.p3 = null;
    this.angle = null;
    
    this.P1 = null;
    this.P2 = null;
    this.P3 = null;
    
    this.visibleFront = null;
    this.visibleBack = null;
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
    this.p1 = [0, -100, 0];
    this.p2 = [-200, 100, 0];
    this.p3 = [200, 100, 0];
    this.angle = [0, 0, 0];
    
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
    
    var screenWidth = this.graphicsDevice.gdm.canvas.width;
    var screenHeight = this.graphicsDevice.gdm.canvas.height;
    
    function getNormal(A, B, C)
    {
        var U = [A[0] - B[0], A[1] - B[1], A[2] - B[2]];
        var V = [A[0] - C[0], A[1] - C[1], A[2] - C[2]];
        
        return [(U[1]*V[2] - U[2]*V[1]), (U[2]*V[0] - U[0]*V[2]), (U[0]*V[1] - U[1]*V[0])];
    }
    
    function dotProduct(C, N)
    {
        var dp = C[0]*N[0] + C[1]*N[1] + C[2]*N[2];
        
        if (dp < 0)
            return false;
        else
            return true;
    }
    
    function rotateX(vector3, angle)
    {
        var newVector3 = [];
        
        newVector3[0] = vector3[0];
        newVector3[1] = ((vector3[1]) * Math.cos(angle * Math.PI / 180)) - (vector3[2] * Math.sin(angle * Math.PI / 180));
        newVector3[2] = ((vector3[1]) * Math.sin(angle * Math.PI / 180)) + (vector3[2] * Math.cos(angle * Math.PI / 180));
        
        return newVector3;
    }
    
    function rotateY(vector3, angle)
    {
        var newVector3 = [];
        
        newVector3[0] = (vector3[0] * Math.cos(angle * Math.PI / 180)) + (vector3[2] * Math.sin(angle * Math.PI / 180));
        newVector3[1] = vector3[1];
        newVector3[2] = -(vector3[0] * Math.sin(angle * Math.PI / 180)) + (vector3[2] * Math.cos(angle * Math.PI / 180));
        
        return newVector3;
    }
    
    function rotateZ(vector3, angle)
    {
        var newVector3 = [];
        
        newVector3[0] = ((vector3[0]) * Math.cos(angle * Math.PI / 180)) - (vector3[1] * Math.sin(angle * Math.PI / 180));
        newVector3[1] = ((vector3[0]) * Math.sin(angle * Math.PI / 180)) + (vector3[1] * Math.cos(angle * Math.PI / 180));
        newVector3[2] = vector3[2];
        
        return newVector3;
    }
    
    function projection(vector3)
    {
        var eye = [0, 0, 500];
        
        var Px = (eye[2] * (vector3[0] - eye[0])) / (eye[2] + vector3[2]) + screenWidth / 2;
        
        var Py = (eye[2] * (vector3[1] - eye[1])) / (eye[2] + vector3[2]) + screenHeight / 2;
        
        return [Px, Py];
    }
    
    if (this.angle[0] >= 360)
        this.angle[0] = 0;
    else
        this.angle[0]++;
    
    var rotation1 = rotateZ(rotateY(rotateX(this.p1, 0), this.angle[0]), this.angle[0]);
    var rotation2 = rotateZ(rotateY(rotateX(this.p2, 0), this.angle[0]), this.angle[0]);
    var rotation3 = rotateZ(rotateY(rotateX(this.p3, 0), this.angle[0]), this.angle[0]);
    
    this.P1 = projection(rotation1);
    this.P2 = projection(rotation2);
    this.P3 = projection(rotation3);
    
    this.visibleFront = dotProduct([0, 0, -500], getNormal(rotation1, rotation2, rotation3));
    this.visibleBack = dotProduct([0, 0, -500], getNormal(rotation1, rotation3, rotation2));
    
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
        
        if (this.visibleFront)
        {
            this.graphicsDevice.gdm.bufferContext.fillStyle = "#00FF00";
            this.graphicsDevice.gdm.bufferContext.beginPath();
            this.graphicsDevice.gdm.bufferContext.strokeRect(400, 250, 1, 1);
            this.graphicsDevice.gdm.bufferContext.moveTo(this.P1[0], this.P1[1]);
            this.graphicsDevice.gdm.bufferContext.lineTo(this.P2[0], this.P2[1]);
            this.graphicsDevice.gdm.bufferContext.lineTo(this.P3[0], this.P3[1]);
            this.graphicsDevice.gdm.bufferContext.lineTo(this.P1[0], this.P1[1]);
            this.graphicsDevice.gdm.bufferContext.closePath();
            this.graphicsDevice.gdm.bufferContext.fill();
            this.graphicsDevice.gdm.bufferContext.strokeStyle = "#000000";
            this.graphicsDevice.gdm.bufferContext.stroke();
        }
        
        if (this.visibleBack)
        {
            this.graphicsDevice.gdm.bufferContext.fillStyle = "#0000FF";
            this.graphicsDevice.gdm.bufferContext.beginPath();
            this.graphicsDevice.gdm.bufferContext.strokeRect(400, 250, 1, 1);
            this.graphicsDevice.gdm.bufferContext.moveTo(this.P1[0], this.P1[1]);
            this.graphicsDevice.gdm.bufferContext.lineTo(this.P2[0], this.P2[1]);
            this.graphicsDevice.gdm.bufferContext.lineTo(this.P3[0], this.P3[1]);
            this.graphicsDevice.gdm.bufferContext.lineTo(this.P1[0], this.P1[1]);
            this.graphicsDevice.gdm.bufferContext.closePath();
            this.graphicsDevice.gdm.bufferContext.fill();
            this.graphicsDevice.gdm.bufferContext.strokeStyle = "#000000";
            this.graphicsDevice.gdm.bufferContext.stroke();
        }
        
    this.spriteBatch.end();
    
    // call function of super class
    JSXna.Framework.Game.prototype.draw.call(this);
};