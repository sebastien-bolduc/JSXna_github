// namespace
var JSXna = JSXna || {
    Framework: {
        Utils: {}
    }
};
var customObject = JSXna.Framework.Utils;

/**
 * Constructor for our custom objects.
 * @param option The first argument
 * @class
 * Define some static function for object oriented programming within the 
 * framework.
 */
customObject.CustomObject = function() 
{
};

/**
 * Class extension utility function
 * @param base The base class
 * @param constructor The constructor function for the new class
 * @return
 */
customObject.CustomObject.extend = function(base, constructor) {
    var prototype = new Function();
    prototype.prototype = base.prototype;
    constructor.prototype = new prototype();
    constructor.prototype.constructor = constructor;
};
   
/**
 * General purpose namespace function.
 * @param namespaceString Namespace to put the object in
 * @return Correct 'address' to namespace
 */
customObject.CustomObject.namespace = function(namespaceString) {
    var parts = namespaceString.split('.'),
    parent = window,
    currentPart = '';    

    for(var i = 0, length = parts.length; i < length; i++) {
        currentPart = parts[i];
        parent[currentPart] = parent[currentPart] || {};
        parent = parent[currentPart];
    }

    return parent;
};