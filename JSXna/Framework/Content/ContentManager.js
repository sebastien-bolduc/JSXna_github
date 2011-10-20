// namespace
var contentManager = JSXna.Framework.Utils.CustomObject.namespace('JSXna.Framework.Content');

/**
 * Initializes a new instance of ContentManager.
 * @param 
 * @class
 * The ContentManager is the run-time component which loads managed objects from
 * the binary files produced by the design time content pipeline. It also 
 * manages the lifespan of the loaded objects, disposing the content manager 
 * will also dispose any assets which are themselves IDisposable.
 */
contentManager.ContentManager = function()
 {
     this.rootDirectory = "";
 };
 
 /**
 * Loads an asset that has been processed by the Content Pipeline.
 * @param assetName Asset name, relative to the loader root directory, and not 
 * including the .xnb extension
 * @return A Texture2D object, A SoundEffect object
 */
contentManager.ContentManager.prototype.load =
 {
     Texture2D : function(assetName)
     {
         var texture2D = new JSXna.Framework.Graphics.Texture2D();
         
         texture2D.image.onload = function()
         {
             texture2D.imageLoaded = true;
         };
         
         texture2D.image.src = assetName;
         
         return texture2D;
     },
     
     SoundEffect : function(assetName)
     {
         var soundEffect = new JSXna.Framework.Audio.SoundEffect();
         
         soundEffect.audioLoaded = true;
         
         soundEffect.audio.src = assetName;
         soundEffect.audio.preload = "auto";
         
         soundEffect.setAudioChannels();
         
         return soundEffect;
     }
 };