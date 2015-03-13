// Dingle tag.

var oswst = require('oswst');

module.exports = function(exports) {
    
    // [new] (selector?: string, attr?: object) => this;
    exports.Double = exports.Tag
    .extend(function() {
        var prototype = this.___prototype;
        
        // TData;
        this._name = '';
        
        // (name: TData) => this;
        this.name = function(name) {
            this._name = name;
            return this;
        };
        
        // (context: TContext, callback: TCallback) => this;
        this.__compile = function(context) {
            return ['<', this._name, this.__attr(), '>', this._data, '</', this._name, '>'];
        };
        
        this.__constructor = function() {
            if (prototype.__constructor) prototype.__constructor.call(this);
            for (var a in arguments) {
                if (typeof(arguments[a]) == 'string') {
                    this.selector(arguments[a]);
                } else if(typeof(arguments[a]) == 'object') {
                    if (arguments[a] instanceof oswst.Compiler) this.append(arguments[a]);
                    else this.attr(arguments[a]);
                } else if(typeof(arguments[a]) == 'function') {
                    this.append(arguments[a]);
                }
            }
        };
    }).extend();
};