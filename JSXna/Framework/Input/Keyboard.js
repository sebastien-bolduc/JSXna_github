// some constant for handling the keyboard keys
var Keys = {};
Keys.PageUp = 33;   // Page Up key
Keys.PageDown = 34; // Page Down key
Keys.Home = 36;     // Home key
Keys.Left = 37;     // Left cursor key
Keys.Up = 38;       // Up cursor key
Keys.Right = 39;    // Right cursor key
Keys.Down = 40;     // Down cursor key
Keys.b = 66;        // b key
Keys.f = 70;		// f key
Keys.g = 71;        // g key
Keys.r = 82;        // r key
Keys.s = 83;        // s key
Keys.w = 87;		// w key
Keys.y = 89;        // y key

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
 