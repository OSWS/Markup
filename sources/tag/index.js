// Just nominal class.
// Only for inheritance usage!

var oswst = require('oswst');

module.exports = function(exports) {
    
    // [new] () => this;
    exports.Tag = oswst.data().extend(function() {
        var prototype = this.___prototype;
        
        // { [key: string]: TData };
        // this._attr = undefined;
        
        // () => TData;
        // =>> ' key="value"'
        this.__attr = function() {
            var result = [];
            if (typeof(this._attr) == 'object') {
                for (var key in this._attr) {
                    result.push(' '+key);
                    if (this._attr[key] !== null) {
                        result.push('="');
                        result.push(this._attr[key]);
                        result.push('"');
                    }
                }
            }
            return result;
        };
        
        // (attr: Object) => this;
        this.attr = function(attr) {
            if (typeof(this._attr) != 'object') this._attr = {};
            for (var key in attr) {
                this._attr[key] = attr[key];
            }
            return this;
        };
        
        // (selector: string) => this;
        this.selector = function(selector) {
            if (typeof(this._attr) != 'object') this._attr = {};
            exports.selector(this._attr, selector);
            return this;
        };
        
        this.extend = function() {
            var extension = prototype.extend.apply(this, arguments);
            oswst.static(extension, 'attr');
            oswst.static(extension, 'static');
            return extension;
        };
    })
};