// namespace
var mouse = JSXna.Framework.Utils.CustomObject.namespace('JSXna.Framework.Input');

/**
 * Constructor which initialize the mouse and add an 'EventListener' on the
 * canvas object.
 * @param canvasHandle Canvas object on which the mouse will operate.
 * @class
 * Allows retrieval of position and button clicks from a mouse input device.
 */
mouse.Mouse = function(canvasHandle)
{
    this.canvasHandle = canvasHandle;
    this.mouseState = new JSXna.Framework.Input.MouseState();
     
    // we wish to use the present object in the 'EventListener' (we cannot use
    // 'this' since it will point to the canvas object)
    obj = this;
    this.canvasHandle.addEventListener("mousemove",
                                        function(e) {
                                            obj.setState(e, obj);
                                        }, 
                                        false);
    this.canvasHandle.addEventListener("mousedown",
                                        function(e) {
                                            obj.setStatePressed(e, obj);
                                        }, 
                                        false);
    this.canvasHandle.addEventListener("mouseup",
                                        function(e) {
                                            obj.setStateReleased(e, obj);
                                        }, 
                                        false);
                                        
    this.canvasHandle.addEventListener("touchmove",
                                        function(e) {
                                            obj.setStateTouch(e, obj);
                                        }, 
                                        false);
    this.canvasHandle.addEventListener("touchstart",
                                        function(e) {
                                            obj.setStateStart(e, obj);
                                        }, 
                                        false);
    this.canvasHandle.addEventListener("touchend",
                                        function(e) {
                                            obj.setStateEnd(e, obj);
                                        }, 
                                        false);
};

/**
 * Set the state of the mouse when call.
 * @param e Event the function is call for
 * @param obj Object which handle the call
 * @return 
 */
mouse.Mouse.prototype.setState = function(e, obj)
{
    obj.mouseState.setX(e, obj.canvasHandle);
    obj.mouseState.setY(e, obj.canvasHandle);
};

mouse.Mouse.prototype.setStatePressed = function(e, obj)
{
    obj.mouseState.setButton(true);
};

mouse.Mouse.prototype.setStateReleased = function(e, obj)
{
    obj.mouseState.setButton(false);
};

/**
 * Set the state of the mouse when touch.
 * @param e Event the function is call for
 * @param obj Object which handle the call
 * @return 
 */
mouse.Mouse.prototype.setStateTouch = function(e, obj)
{
    for (var i = 0; i < e.touches.length; i++)
    {
        obj.mouseState.setX(e.touches[i], obj.canvasHandle);
        obj.mouseState.setY(e.touches[i], obj.canvasHandle);
    }
    
    e.preventDefault();
};

mouse.Mouse.prototype.setStateStart = function(e, obj)
{
    for (var i = 0; i < e.touches.length; i++)
    {
        obj.mouseState.setX(e.touches[i], obj.canvasHandle);
        obj.mouseState.setY(e.touches[i], obj.canvasHandle);
    }
    
    obj.mouseState.setButton(true);
    
    e.preventDefault();
};

mouse.Mouse.prototype.setStateEnd = function(e, obj)
{
    obj.mouseState.setButton(false);
    
    e.preventDefault();
};
 
/**
 * Gets the current state of the mouse, including mouse position and buttons 
 * pressed.
 * @param 
 * @return {MouseState} The state of the mouse
 */
mouse.Mouse.prototype.getState = function()
{
    return this.mouseState;
};