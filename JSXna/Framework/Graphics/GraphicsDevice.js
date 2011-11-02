// namespace
var graphicsDevice = JSXna.Framework.Utils.CustomObject.namespace('JSXna.Framework.Graphics');

graphicsDevice.PrimitiveType = {};
graphicsDevice.PrimitiveType.TriangleList = 0;
graphicsDevice.PrimitiveType.TriangleStrip = 1;

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

/**
 * Get the projection of a 3D point on a 2D surface.
 * @param vertex Vertex to be projected
 * @return 2D coordinate
 */
graphicsDevice.GraphicsDevice.prototype.getProjection = function(vertex)
{
    var viewer = {};
    viewer.x = 0;
    viewer.y = 0;
    viewer.z = 500;
        
    var unitX = (viewer.z * (vertex.position.x - viewer.x)) / (viewer.z + vertex.position.z) + this.gdm.canvas.width / 2;
        
    var unitY = (viewer.z * (vertex.position.y - viewer.y)) / (viewer.z + vertex.position.z) + this.gdm.canvas.height / 2;
        
    return [unitX, unitY];
};

/**
 * Renders geometric primitives. 
 * @param primitiveType Describes the type of primitive to render.
 * @param vertexData The vertex data.
 * @param vertexOffset Offset (in vertices) from the beginning of the buffer to start reading data.
 * @param primitiveCount Number of primitives to render.
 * @param vertexDeclaration The vertex declaration, which defines per-vertex data.
 * @return 
 */
graphicsDevice.GraphicsDevice.prototype.drawUserPrimitives = function(primitiveType, vertexData, vertexOffset, primitiveCount, vertexDeclaration)
{
    var unit;
    var unit1 = {};
    var unit2 = {};
    var unit3 = {};
    
    switch (primitiveType)
    {
        case 1:
            alert("test");
            break;
        default:
            this.gdm.bufferContext.save();
            for (var i = vertexOffset; i < primitiveCount; i++)
            {
                unit = this.getProjection(vertexData[(i*3)]);
                unit1.x = unit[0];
                unit1.y = unit[1];
                unit = this.getProjection(vertexData[(i*3) + 1]);
                unit2.x = unit[0];
                unit2.y = unit[1];
                unit = this.getProjection(vertexData[(i*3) + 2]);
                unit3.x = unit[0];
                unit3.y = unit[1];
                
                this.gdm.bufferContext.fillStyle = vertexData[(i*3)].color;
                this.gdm.bufferContext.strokeStyle = vertexData[(i*3)].color;
                this.gdm.bufferContext.beginPath();
                this.gdm.bufferContext.moveTo(unit1.x, unit1.y);
                this.gdm.bufferContext.lineTo(unit2.x, unit2.y);
                this.gdm.bufferContext.lineTo(unit3.x, unit3.y);
                this.gdm.bufferContext.lineTo(unit1.x, unit1.y);
                this.gdm.bufferContext.closePath();
                this.gdm.bufferContext.fill();
                this.gdm.bufferContext.stroke();
            }
            this.gdm.bufferContext.restore();
    }
};