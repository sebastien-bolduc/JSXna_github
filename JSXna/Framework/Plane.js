// namespace
var plane = JSXna.Framework.Utils.CustomObject.namespace('JSXna.Framework');

/**
 * Creates an instance of Plane.
 * @param normal The normal vector to the Plane
 * @param d The Plane's distance along its normal from the origin
 * @class
 * Defines a plane.
 */
plane.Plane = function(normal, d)
{
    this.normal = normal;
    this.d = d;
};

/**
 * Returns the dot product of a specified Vector3 and the Normal vector of this 
 * Plane.
 * @param value The Vector3 to multiply by
 * @return The resulting dot product
 */
plane.Plane.prototype.dotNormal = function(value)
{
    return (value.x * this.normal.x) + (value.y * this.normal.y) + (value.z * this.normal.z);
};
