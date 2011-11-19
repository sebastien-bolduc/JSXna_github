// namespace
var vector3 = JSXna.Framework.Utils.CustomObject.namespace('JSXna.Framework');

/**
 * Initializes a new instance of Vector3.
 * @param x Initial value for the x-component of the vector.
 * @param y Initial value for the y-component of the vector.
 * @param z Initial value for the z-component of the vector.
 * @class
 * Defines a vector with three components.
 */
vector3.Vector3 = function(x, y, z)
{
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = 1;
};

/**
 * Calculates the dot product of two vectors. If the two vectors are unit 
 * vectors, the dot product returns a floating point value between -1 and 1 that 
 * can be used to determine some properties of the angle between two vectors. 
 * For example, it can show whether the vectors are orthogonal, parallel, or 
 * have an acute or obtuse angle between them.
 * @param vector1 Source vector
 * @param vector2 Source vector
 * @return The dot product of the two vectors 
 */
vector3.Vector3.dot = function(vector1, vector2)
{
    return (vector1.x * vector2.x) + (vector1.y * vector2.y) + (vector1.z * vector2.z);
};

/**
 * Creates a unit vector from the specified vector. The result is a vector one 
 * unit in length pointing in the same direction as the original vector.
 * @param value The source Vector3
 * @return The created unit vector
 */
vector3.Vector3.normalize = function(value)
{
    var norm = Math.sqrt(JSXna.Framework.Vector3.dot(value, value));
    
    return new JSXna.Framework.Vector3(value.x / norm, value.y / norm, value.z / norm);
};