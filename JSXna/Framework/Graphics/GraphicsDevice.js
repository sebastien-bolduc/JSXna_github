// namespace
var graphicsDevice = JSXna.Framework.Utils.CustomObject.namespace('JSXna.Framework.Graphics');

/**
 * Creates an instance of this object.
 * @param gdm Graphics device manager
 * @class
 * Performs primitive-based rendering, creates resources, handles system-level 
 * variables, adjusts gamma ramp levels, and creates shaders.
 */
graphicsDevice.GraphicsDevice = function(gdm)
{
    this.gdm = gdm;
    this.viewport = this.gdm.bufferCanvas;
};

/**
 * Clears resource buffers.
 * @param 
 * @return 
 */
graphicsDevice.GraphicsDevice.prototype.clear = function()
{
    this.gdm.bufferContext.clearRect(0, 0, this.gdm.bufferCanvas.width, this.gdm.bufferCanvas.height);
    this.gdm.bufferContext.restore();
};