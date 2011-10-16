// namespace
var rectangle = JSXna.Framework.Utils.CustomObject.namespace('JSXna.Framework');

/**
 * Initializes a new instance of Rectangle.
 * @param x The x-coordinate of the rectangle
 * @param y The y-coordinate of the rectangle
 * @param width Width of the rectangle
 * @param height Height of the rectangle
 * @class
 * Defines a rectangle.
 */
rectangle.Rectangle = function(x, y, width, height)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};

/**
 * Determines whether a specified Rectangle intersects with this Rectangle.
 * @param rectangle The Rectangle to evaluate
 * @return {boolean} true if the specified Rectangle intersects with this one; 
 * false otherwise
 */
rectangle.Rectangle.prototype.intersects = function(rectangle)
{
    var _min = this.x;
    var _max = rectangle.x + rectangle.width - 1;
    
    if (_min > _max)
        return false;
        
    var min_ = rectangle.x;
    var max_ = this.x + this.width - 1;
    
    if (min_ > max_)
        return false;
    
    _min = this.y;
    _max = rectangle.y + rectangle.height - 1;
    
    if (_min > _max)
        return false;
        
    min_ = rectangle.y;
    max_ = this.y + this.height - 1;
    
    if (min_ > max_)
        return false;
    
    return true;
};