// namespace
var vertexPositionColor = JSXna.Framework.Utils.CustomObject.namespace('JSXna.Framework.Graphics');

/**
 * Initializes a new instance of the VertexPositionColor class.
 * @param position The position of the vertex.
 * @param color The color of the vertex.
 * @class
 * Describes a custom vertex format structure that contains position and color 
 * information.
 */
vertexPositionColor.VertexPositionColor = function(position, color)
{
    this.position = position;
    this.color = color;
    this.vertexDeclaration = "PositionColor";
};

vertexPositionColor.VertexPositionColor.VertexDeclaration = "PositionColor";