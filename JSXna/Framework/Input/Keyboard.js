// some constant for handling the keyboard keys
JSXna.Keys = {};
JSXna.Keys.PageUp = 33;   // Page Up key
JSXna.Keys.PageDown = 34; // Page Down key
JSXna.Keys.Home = 36;     // Home key
JSXna.Keys.Left = 37;     // Left cursor key
JSXna.Keys.Up = 38;       // Up cursor key
JSXna.Keys.Right = 39;    // Right cursor key
JSXna.Keys.Down = 40;     // Down cursor key
JSXna.Keys.b = 66;        // b key
JSXna.Keys.f = 70;		// f key
JSXna.Keys.g = 71;        // g key
JSXna.Keys.r = 82;        // r key
JSXna.Keys.s = 83;        // s key
JSXna.Keys.w = 87;		// w key
JSXna.Keys.y = 89;        // y key

// namespace
var keyboard = JSXna.Framework.Utils.CustomObject.namespace('JSXna.Framework.Input');

/**
 * Detecting a Key Press.
 * @param 
 * @class
 * Allows retrieval of keystrokes from a keyboard input device.
 */
keyboard.Keyboard = function()
{
    this.keyboardState = new JSXna.Framework.Input.KeyboardState();
};

/**
 * Returns the current keyboard or Chatpad state.
 * @param
 * @return {KeyboardState} The state of the keyboard
 */
keyboard.Keyboard.prototype.getState = function()
{
    return this.keyboardState;
};
 