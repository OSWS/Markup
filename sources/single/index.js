// Single tag.

var oswst = require('oswst');

module.exports = function(exports) {
    
    // [new] (...arguments: Array<string|TAttr>) => this;
    exports.Single = exports.Tag
    .extend(function() {
        var prototype = this.___prototype;
        
        // TData;
        this._name = '';
        
        // (name: TData) => this;
        this.name = function(name) {
            this._name = name;
            return this;
        };
        
        this.data = undefined;
        this.append = undefined;
        this.prepend = undefined;
        
        // (compilation: Compilation) => this;
        this.__compile = function(compilation) {
            return ['<', this._name, this.__attr(), '/>'];
        };
        
        this.__constructor = function() {
            if (prototype.__constructor) prototype.__constructor.call(this);
            for (var a in arguments) {
                if (typeof(arguments[a]) == 'string') {
                    this.selector(arguments[a]);
                } else if(typeof(arguments[a]) == 'object') {
                    this.attr(arguments[a]);
                }
            }
        };
    }).extend();
};