// namespace
var keyboardState = JSXna.Framework.Utils.CustomObject.namespace('JSXna.Framework.Input');

/**
 * Initializes a new instance of the KeyboardState class.
 * @param 
 * @class
 * Represents a state of keystrokes recorded by a keyboard input device.
 */
keyboardState.KeyboardState = function()
{
    this.isKeyPressed = [256];
    this.isKeyPressedOnce = [256];

	for (i = 0; i < 256; i++) {
		this.isKeyPressed[i] = false;
		this.isKeyPressedOnce[i] = false;
	}
        
    // register callback function for keyboard event
    var obj = this;
    document.onkeydown = function(event){obj.handleKeyDown(event);};
    document.onkeyup = function(event){obj.handleKeyUp(event);};   
};

/**
 * Put a key to true when stroke down.
 * @param event Event relating to keyboard strokes
 * @return 
 */
keyboardState.KeyboardState.prototype.handleKeyDown = function(event)
{
    this.isKeyPressed[event.keyCode] = true;
};

/**
 * Put a key to false when release.
 * @param event Event relating to keyboard strokes.
 * @return 
 */
keyboardState.KeyboardState.prototype.handleKeyUp = function(event)
{
	this.isKeyPressed[event.keyCode] = false;
};

/**
 * Returns whether a specified key is currently being pressed.
 * @param key Char code of the key to check.
 * @return {boolean} Key pressed or not
 */
keyboardState.KeyboardState.prototype.isKeyDown = function(key)
{
    return this.isKeyPressed[key];
};

/**
 * Returns whether a specified key is currently being pressed (once).
 * @param key Char code of the key to check.
 * @return {boolean} Key pressed or not
 */
keyboardState.KeyboardState.prototype.isKeyDownOnce = function(key)
{
	if (this.isKeyPressed[key] === true && this.isKeyPressedOnce[key] === false) {
		this.isKeyPressedOnce[key] = true;
		return true;
	}
	else if (this.isKeyPressed[key] === false && this.isKeyPressedOnce[key] === true) {
		this.isKeyPressedOnce[key] = false;
		return false;
	} 
	else {
		return false;
	}
};