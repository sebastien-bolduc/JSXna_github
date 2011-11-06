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
 * Multiply two matrix together. 
 * @param matrix1 Frist matrix
 * @param matrix2 Second matrix
 * @return The product of two matrix
 */
matrix.Matrix.multiply = function(matrix1, matrix2)
{
    return new JSXna.Framework.Matrix(
        (matrix1.m11 * matrix2.m11) + (matrix1.m12 * matrix2.m21) + (matrix1.m13 * matrix2.m31) + (matrix1.m14 * matrix2.m41),
        (matrix1.m11 * matrix2.m12) + (matrix1.m12 * matrix2.m22) + (matrix1.m13 * matrix2.m32) + (matrix1.m14 * matrix2.m42),
        (matrix1.m11 * matrix2.m13) + (matrix1.m12 * matrix2.m23) + (matrix1.m13 * matrix2.m33) + (matrix1.m14 * matrix2.m43),
        (matrix1.m11 * matrix2.m14) + (matrix1.m12 * matrix2.m24) + (matrix1.m13 * matrix2.m34) + (matrix1.m14 * matrix2.m44),
        (matrix1.m21 * matrix2.m11) + (matrix1.m22 * matrix2.m21) + (matrix1.m23 * matrix2.m31) + (matrix1.m24 * matrix2.m41),
        (matrix1.m21 * matrix2.m12) + (matrix1.m22 * matrix2.m22) + (matrix1.m23 * matrix2.m32) + (matrix1.m24 * matrix2.m42),
        (matrix1.m21 * matrix2.m13) + (matrix1.m22 * matrix2.m23) + (matrix1.m23 * matrix2.m33) + (matrix1.m24 * matrix2.m43),
        (matrix1.m21 * matrix2.m14) + (matrix1.m22 * matrix2.m24) + (matrix1.m23 * matrix2.m34) + (matrix1.m24 * matrix2.m44),
        (matrix1.m31 * matrix2.m11) + (matrix1.m32 * matrix2.m21) + (matrix1.m33 * matrix2.m31) + (matrix1.m34 * matrix2.m41),
        (matrix1.m31 * matrix2.m12) + (matrix1.m32 * matrix2.m22) + (matrix1.m33 * matrix2.m32) + (matrix1.m34 * matrix2.m42),
        (matrix1.m31 * matrix2.m13) + (matrix1.m32 * matrix2.m23) + (matrix1.m33 * matrix2.m33) + (matrix1.m34 * matrix2.m43),
        (matrix1.m31 * matrix2.m14) + (matrix1.m32 * matrix2.m24) + (matrix1.m33 * matrix2.m34) + (matrix1.m34 * matrix2.m44),
        (matrix1.m41 * matrix2.m11) + (matrix1.m42 * matrix2.m21) + (matrix1.m43 * matrix2.m31) + (matrix1.m44 * matrix2.m41),
        (matrix1.m41 * matrix2.m12) + (matrix1.m42 * matrix2.m22) + (matrix1.m43 * matrix2.m32) + (matrix1.m44 * matrix2.m42),
        (matrix1.m41 * matrix2.m13) + (matrix1.m42 * matrix2.m23) + (matrix1.m43 * matrix2.m33) + (matrix1.m44 * matrix2.m43),
        (matrix1.m41 * matrix2.m14) + (matrix1.m42 * matrix2.m24) + (matrix1.m43 * matrix2.m34) + (matrix1.m44 * matrix2.m44)
        );
};

/**
 * Returns an instance of the identity matrix. 
 * @param 
 * @return The identity matrix
 */
matrix.Matrix.identity = function()
{
    return new JSXna.Framework.Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0 ,0, 1);
};

/**
 * Returns a matrix that can be used to rotate a set of vertices around the 
 * x-axis. 
 * @param radians The amount, in radians, in which to rotate around the x-axis. 
 * Note that you can use ToRadians to convert degrees to radians 
 * @return The rotation matrix 
 */
matrix.Matrix.createRotationX = function(radians)
{
    return new JSXna.Framework.Matrix(1, 0, 0, 0, 0, Math.cos(radians), -(Math.sin(radians)), 0, 0, Math.sin(radians), Math.cos(radians), 0, 0, 0, 0, 1);
};

/**
 * Returns a matrix that can be used to rotate a set of vertices around the 
 * y-axis. 
 * @param radians The amount, in radians, in which to rotate around the y-axis. 
 * Note that you can use ToRadians to convert degrees to radians 
 * @return The rotation matrix 
 */
matrix.Matrix.createRotationY = function(radians)
{
    return new JSXna.Framework.Matrix(Math.cos(radians), 0, Math.sin(radians), 0, 0, 1, 0, 0, -(Math.sin(radians)), 0, Math.cos(radians), 0, 0, 0, 0, 1);
};

/**
 * Returns a matrix that can be used to rotate a set of vertices around the 
 * z-axis. 
 * @param radians The amount, in radians, in which to rotate around the z-axis. 
 * Note that you can use ToRadians to convert degrees to radians
 * @return The rotation matrix 
 */
matrix.Matrix.createRotationZ = function(radians)
{
    return new JSXna.Framework.Matrix(Math.cos(radians), -(Math.sin(radians)), 0, 0, Math.sin(radians), Math.cos(radians), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
};

/**
 * Creates a translation Matrix.  
 * @param position Amounts to translate by on the x, y, and z axes
 * @return The created translation Matrix
 */
matrix.Matrix.createTranslation = function(position)
{
    return new JSXna.Framework.Matrix(1, 0, 0, position.x, 0, 1, 0, position.y, 0 , 0 , 1, position.z, 0 , 0, 0, 1);
};