// namespace
var graphicsDevice = JSXna.Framework.Utils.CustomObject.namespace('JSXna.Framework.Graphics');

graphicsDevice.PrimitiveType = {};
graphicsDevice.PrimitiveType.TriangleList = 0;
graphicsDevice.PrimitiveType.TriangleStrip = 1;

graphicsDevice.ContentPipeline = {};
graphicsDevice.ContentPipeline.VertexData = [];

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
    
    JSXna.Framework.Graphics.ContentPipeline.VertexData = [];
};

/**
 * Apply transformation on vertex.
 * @param vertex Vertex to be transform
 * @return Transformed vertex
 */
graphicsDevice.GraphicsDevice.prototype.transform = function(vertex)
{
    var transformVertex = new JSXna.Framework.Graphics.VertexPositionColor(new JSXna.Framework.Vector3(), null);
    var transformMatrix = JSXna.Framework.Graphics.BasicEffect.xWorld;
    
    transformVertex.position.x = (transformMatrix.m11 * vertex.position.x) + (transformMatrix.m12 * vertex.position.y) + (transformMatrix.m13 * vertex.position.z) + (transformMatrix.m14 * vertex.position.w);
    transformVertex.position.y = (transformMatrix.m21 * vertex.position.x) + (transformMatrix.m22 * vertex.position.y) + (transformMatrix.m23 * vertex.position.z) + (transformMatrix.m24 * vertex.position.w);
    transformVertex.position.z = (transformMatrix.m31 * vertex.position.x) + (transformMatrix.m32 * vertex.position.y) + (transformMatrix.m33 * vertex.position.z) + (transformMatrix.m34 * vertex.position.w);
    transformVertex.color = vertex.color;
    
    return transformVertex;
};

/**
 * Take care of clipping a triangle against a define plane in space.
 * @param vertexData Our vertex data to compute
 * @param planeNormal Normal of plane (must be normalized)
 * @param planeDistance Distance of plane from ogirin
 * @param side Side of clipping ( + | -)
 * @return New set of vertex data
 */
graphicsDevice.GraphicsDevice.prototype.applyClippingPlane = function(vertexData, plane, side)
{
    var newVertexData = [];
    
    function distanceToPlane(P)
    {
        return plane.dotNormal(P.position) - plane.d;
    }
    
    function intersectionFactor(P1, P2)
    {
        var distance1 = distanceToPlane(P1);
        var distance2 = distanceToPlane(P2);
        
        return distance1 / (distance1 - distance2);
    }
    
    function intersectionLinePlane(P1, P2)
    {
        var s = intersectionFactor(P1, P2);
        
        return new JSXna.Framework.Graphics.VertexPositionColor(
            new JSXna.Framework.Vector3(
                P1.position.x + s * (P2.position.x - P1.position.x),
                P1.position.y + s * (P2.position.y - P1.position.y),
                P1.position.z + s * (P2.position.z - P1.position.z)
                ),
                P1.color
            );
    }
    
    for (var i = 0; i < (vertexData.length / 3); i++)
    {
        for (var j = 0; j < 3; j++)
        {
            if ((distanceToPlane(vertexData[(i * 3) + j]) * side) < 0)
            {
                if ((distanceToPlane(vertexData[(j == 2) ? (i * 3) : ((i * 3) + j + 1)]) * side) < 0)
                    newVertexData.push(vertexData[(j == 2) ? (i * 3) : ((i * 3) + j + 1)]);
                else
                {
                    newVertexData.push(intersectionLinePlane(vertexData[(i * 3) + j], vertexData[(j == 2) ? (i * 3) : ((i * 3) + j + 1)]));
                }
            }
            else
            {
                if ((distanceToPlane(vertexData[(j == 2) ? (i * 3) : ((i * 3) + j + 1)]) * side) < 0)
                {
                    newVertexData.push(intersectionLinePlane(vertexData[(i * 3) + j], vertexData[(j == 2) ? (i * 3) : ((i * 3) + j + 1)]));
                    newVertexData.push(vertexData[(j == 2) ? (i * 3) : ((i * 3) + j + 1)]);
                }
            }
        }
        
        if ((newVertexData.length % 3) !== 0)
        {
            newVertexData.push(newVertexData[newVertexData.length - 2]);
            newVertexData.push(newVertexData[0]);
        }
    }
    
    return newVertexData;
};

/**
 * Some primitive Z-buffering base on triangle.
 * @param vertexData Triangles (vertex) to apply Z-bufferring to
 * @return New set of Z-buffered vertex data
 */
graphicsDevice.GraphicsDevice.prototype.applyZbuffer = function(vertexData)
{
    var newVertexData = [];
    var Zbuffer = [];
    var currentDepth = 10000;
    
    for (var i = 0; i < (vertexData.length / 3); i++)
    {
        currentDepth = 0;
        
        for (var j = 0; j < 3; j++)
        {
            currentDepth = (vertexData[(i * 3) + j].position.z < currentDepth) ? vertexData[(i * 3) + j].position.z : currentDepth;
        }
        
        Zbuffer.push([i, currentDepth]);
    }
    
    Zbuffer.sort(function(a, b) { return b[1] - a[1]; });
    
    for (i = 0; i < Zbuffer.length; i++)
    {
        newVertexData.push(vertexData[Zbuffer[i][0] * 3]);
        newVertexData.push(vertexData[(Zbuffer[i][0] * 3) + 1]);
        newVertexData.push(vertexData[(Zbuffer[i][0] * 3) + 2]);
    }
    
    return newVertexData;
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
    viewer.z = 800;
        
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
    var transformVertexData = [];
    var clippedVertexData = [];
    var clippedPrimitiveCount = 0;
    
    switch (primitiveType)
    {
        case 1:
            alert("test");
            break;
        default:
            for (var i = vertexOffset; i < primitiveCount; i++)
            {
                transformVertexData.push(this.transform(vertexData[(i*3)]));
                transformVertexData.push(this.transform(vertexData[(i*3) + 1]));
                transformVertexData.push(this.transform(vertexData[(i*3) + 2]));
            }
            
            clippedVertexData = this.applyClippingPlane(transformVertexData, new JSXna.Framework.Plane(new JSXna.Framework.Vector3(1, 0, 0), -200), -1);
            clippedVertexData = this.applyClippingPlane(clippedVertexData, new JSXna.Framework.Plane(new JSXna.Framework.Vector3(1, 0, 0), 200), 1);
            clippedPrimitiveCount = clippedVertexData.length / 3;
            
            JSXna.Framework.Graphics.ContentPipeline.VertexData = JSXna.Framework.Graphics.ContentPipeline.VertexData.concat(clippedVertexData);
    }
};

/**
 * Renders geometric primitives from the content pipeline. 
 * @param primitiveType Describes the type of primitive to render.
 * @param vertexData The vertex data.
 * @param vertexOffset Offset (in vertices) from the beginning of the buffer to start reading data.
 * @param primitiveCount Number of primitives to render.
 * @param vertexDeclaration The vertex declaration, which defines per-vertex data.
 * @return 
 */
graphicsDevice.GraphicsDevice.prototype.drawContentPipeline = function(primitiveType, vertexData, vertexOffset, primitiveCount, vertexDeclaration)
{
    var ZbufferVertexData = [];
    
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
            
            ZbufferVertexData = this.applyZbuffer(vertexData);
            
            for (i = vertexOffset; i < primitiveCount; i++)
            {
                unit = this.getProjection(ZbufferVertexData[(i*3)]);
                unit1.x = unit[0];
                unit1.y = unit[1];
                unit = this.getProjection(ZbufferVertexData[(i*3) + 1]);
                unit2.x = unit[0];
                unit2.y = unit[1];
                unit = this.getProjection(ZbufferVertexData[(i*3) + 2]);
                unit3.x = unit[0];
                unit3.y = unit[1];
                
                this.gdm.bufferContext.fillStyle = ZbufferVertexData[(i*3)].color;
                this.gdm.bufferContext.strokeStyle = ZbufferVertexData[(i*3)].color;
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