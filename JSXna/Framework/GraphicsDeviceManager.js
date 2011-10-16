// namespace
var graphicsDeviceManager = JSXna.Framework.Utils.CustomObject.namespace('JSXna.Framework');

/**
 * Creates a new GraphicsDeviceManager and registers it to handle the 
 * configuration and management of the graphics device for the specified Game.
 * @param 
 * @class
 * Handles the configuration and management of the graphics device.
 */
graphicsDeviceManager.GraphicsDeviceManager = function(canvas)
{
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    
    this.bufferCanvas = document.createElement('canvas');
    this.bufferCanvas.width = this.canvas.width;
    this.bufferCanvas.height = this.canvas.height;
    
    this.bufferContext = this.bufferCanvas.getContext('2d');
};