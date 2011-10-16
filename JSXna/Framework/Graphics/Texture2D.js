// namespace
var texture2D = JSXna.Framework.Utils.CustomObject.namespace('JSXna.Framework.Graphics');

/**
 * Creates an uninitialized Texture2D resource of the specified dimensions. To 
 * initialize a Texture2D from an existing file, see the static method 
 * ContentManager.Load.
 * @param 
 * @class
 * Represents a 2D grid of texels.
 */
texture2D.Texture2D = function()
 {
     this.image = new Image();
     this.imageLoaded = false;
 };
 
 /**
 * Gets the width of this texture resource, in pixels.
 * @param 
 * @return Image width
 */
texture2D.Texture2D.prototype.width = function()
 {
     return this.image.width;
 };
 
 /**
 * The height of this texture resource, in pixels.
 * @param 
 * @return Image height
 */
texture2D.Texture2D.prototype.height = function()
 {
     return this.image.height;
 };