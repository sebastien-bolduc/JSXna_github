// namespace
var matrix = JSXna.Framework.Utils.CustomObject.namespace('JSXna.Framework');

/**
 * Initializes a new instance of Matrix.
 * @param 4x4 matrix
 * @class
 * Defines a matrix.
 */
matrix.Matrix = function(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44)
{
    this.m11 = m11;
    this.m12 = m12;
    this.m13 = m13;
    this.m14 = m14;
    
    this.m21 = m21;
    this.m22 = m22;
    this.m23 = m23;
    this.m24 = m24;
    
    this.m31 = m31;
    this.m32 = m32;
    this.m33 = m33;
    this.m34 = m34;
    
    this.m41 = m41;
    this.m42 = m42;
    this.m43 = m43;
    this.m44 = m44;
};

/**
 * Returns an instance of the identity matrix. 
 * @param 
 * @return The identity matrix.
 */
matrix.Matrix.identity = function()
{
    return new JSXna.Framework.Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0 ,0, 1);
};

/**
 * Returns a matrix that can be used to rotate a set of vertices around the 
 * x-axis. 
 * @param radians The amount, in radians, in which to rotate around the x-axis. 
 * Note that you can use ToRadians to convert degrees to radians. 
 * @return The rotation matrix. 
 */
matrix.Matrix.createRotationX = function(radians)
{
    return new JSXna.Framework.Matrix(1, 0, 0, 0, 0, Math.cos(radians), -(Math.sin(radians)), 0, 0, Math.sin(radians), Math.cos(radians), 0, 0, 0, 0, 1);
};

/**
 * Returns a matrix that can be used to rotate a set of vertices around the 
 * y-axis. 
 * @param radians The amount, in radians, in which to rotate around the y-axis. 
 * Note that you can use ToRadians to convert degrees to radians. 
 * @return The rotation matrix. 
 */
matrix.Matrix.createRotationY = function(radians)
{
    return new JSXna.Framework.Matrix(Math.cos(radians), 0, Math.sin(radians), 0, 0, 1, 0, 0, -(Math.sin(radians)), 0, Math.cos(radians), 0, 0, 0, 0, 1);
};

/**
 * Returns a matrix that can be used to rotate a set of vertices around the 
 * z-axis. 
 * @param radians The amount, in radians, in which to rotate around the z-axis. 
 * Note that you can use ToRadians to convert degrees to radians. 
 * @return The rotation matrix. 
 */
matrix.Matrix.createRotationZ = function(radians)
{
    return new JSXna.Framework.Matrix(Math.cos(radians), -(Math.sin(radians)), 0, 0, Math.sin(radians), Math.cos(radians), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
};