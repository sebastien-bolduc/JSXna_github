// namespace
var effect = JSXna.Framework.Utils.CustomObject.namespace('JSXna.Framework.Graphics');

effect.BasicEffect = {};
effect.BasicEffect.xWorld = null;

/**
 * Initializes a new instance of this class.
 * @param 
 * @class
 * Used to set and query effects, and to choose techniques.
 */
effect.Effect = function()
{
    JSXna.Framework.Graphics.BasicEffect.xWorld = JSXna.Framework.Matrix.identity();
};

/**
 * Gets a collection of parameters used for this effect.
 * @param 
 * @return 
 */
effect.Effect.prototype.parameters =
{
    /*xWorld : function(value)
    {
        JSXna.Framework.Graphics.BasicEffect.xWorld = value;
    }*/
    
    xWorld :
    {
        setValue : function(value)
        {
            JSXna.Framework.Graphics.BasicEffect.xWorld = value;
        }
    }
};