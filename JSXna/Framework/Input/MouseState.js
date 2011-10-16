// namespace
var mouseState = JSXna.Framework.Utils.CustomObject.namespace('JSXna.Framework.Input');

/**
 * Initializes a new instance of the MouseState class.
 * @param 
 * @class
 * Represents the state of a mouse input device, including mouse cursor position
 * and buttons pressed.
 */
mouseState.MouseState = function()
{
    this.x = 0;
    this.y = 0;
    
    this.button = false;
};

/**
 * Set the position on the X axis of the mouse.
 * @param e Event related to the mouse
 * @param canvasHandle Canvas object on which the mouse is operating
 * @return
 */
mouseState.MouseState.prototype.setX = function(e, canvasHandle)
{
    this.x = e.pageX;
    
    // hack to get the position 'relative' to the Canvas
    var obj = canvasHandle;
    if (obj.offsetParent) {
        do
        {
            this.x -= obj.offsetLeft;
        } while (obj = obj.offsetParent);
    }
};

/**
 * Set the position on the Y axis of the mouse.
 * @param e Event related to the mouse
 * @param canvasHandle Canvas object on which the mouse is operating
 * @return 
 */
mouseState.MouseState.prototype.setY = function(e, canvasHandle)
{
    this.y = e.pageY;
    
    var obj = canvasHandle;
    if (obj.offsetParent) {
        do
        {
            this.y -= obj.offsetTop;
        } while (obj = obj.offsetParent);
    }
};

/**
 * Set the state of the button of the mouse.
 * @param state State of the button (pressed or released)
 * @return 
 */
mouseState.MouseState.prototype.setButton = function(state)
{
    this.button = state;
};