// namespace
var soundEffect = JSXna.Framework.Utils.CustomObject.namespace('JSXna.Framework.Audio');

/**
 * Initializes a new instance of SoundEffect, which provides the ability to load 
 * audio data for sound effects.
 * @param 
 * @class
 * Provides a loaded sound resource. You can play multiple instances of the 
 * SoundEffect by calling Play.
 */
soundEffect.SoundEffect = function()
{
    this.audio = new Audio();
    this.audioLoaded = false;
    
    this.audioChannels = [];
    this.channel = 0;
};

/**
 * Set sound channels (to play sound multiple time).
 * @param 
 * @return 
 */
soundEffect.SoundEffect.prototype.setAudioChannels = function()
{
    for (var i = 0; i < 5; i++)
    {
        this.audioChannels.push(new Audio());
        this.audioChannels[i].src = this.audio.src;
        this.audioChannels[i].preload = this.audio.preload;
    }
};

/**
 * Plays a sound.
 * @param 
 * @return 
 */
soundEffect.SoundEffect.prototype.play = function()
{
    if (this.audioLoaded)
    {
        this.audioChannels[this.channel].play();
        this.channel = (this.channel == 4) ? 0 : this.channel + 1;
    }
};