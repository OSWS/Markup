(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * @name JavaScript/NodeJS Merge v1.2.0
 * @author yeikos
 * @repository https://github.com/yeikos/js.merge

 * Copyright 2014 yeikos - MIT license
 * https://raw.github.com/yeikos/js.merge/master/LICENSE
 */

;(function(isNode) {

	/**
	 * Merge one or more objects 
	 * @param bool? clone
	 * @param mixed,... arguments
	 * @return object
	 */

	var Public = function(clone) {

		return merge(clone === true, false, arguments);

	}, publicName = 'merge';

	/**
	 * Merge two or more objects recursively 
	 * @param bool? clone
	 * @param mixed,... arguments
	 * @return object
	 */

	Public.recursive = function(clone) {

		return merge(clone === true, true, arguments);

	};

	/**
	 * Clone the input removing any reference
	 * @param mixed input
	 * @return mixed
	 */

	Public.clone = function(input) {

		var output = input,
			type = typeOf(input),
			index, size;

		if (type === 'array') {

			output = [];
			size = input.length;

			for (index=0;index<size;++index)

				output[index] = Public.clone(input[index]);

		} else if (type === 'object') {

			output = {};

			for (index in input)

				output[index] = Public.clone(input[index]);

		}

		return output;

	};

	/**
	 * Merge two objects recursively
	 * @param mixed input
	 * @param mixed extend
	 * @return mixed
	 */

	function merge_recursive(base, extend) {

		if (typeOf(base) !== 'object')

			return extend;

		for (var key in extend) {

			if (typeOf(base[key]) === 'object' && typeOf(extend[key]) === 'object') {

				base[key] = merge_recursive(base[key], extend[key]);

			} else {

				base[key] = extend[key];

			}

		}

		return base;

	}

	/**
	 * Merge two or more objects
	 * @param bool clone
	 * @param bool recursive
	 * @param array argv
	 * @return object
	 */

	function merge(clone, recursive, argv) {

		var result = argv[0],
			size = argv.length;

		if (clone || typeOf(result) !== 'object')

			result = {};

		for (var index=0;index<size;++index) {

			var item = argv[index],

				type = typeOf(item);

			if (type !== 'object') continue;

			for (var key in item) {

				var sitem = clone ? Public.clone(item[key]) : item[key];

				if (recursive) {

					result[key] = merge_recursive(result[key], sitem);

				} else {

					result[key] = sitem;

				}

			}

		}

		return result;

	}

	/**
	 * Get type of variable
	 * @param mixed input
	 * @return string
	 *
	 * @see http://jsperf.com/typeofvar
	 */

	function typeOf(input) {

		return ({}).toString.call(input).slice(8, -1).toLowerCase();

	}

	if (isNode) {

		module.exports = Public;

	} else {

		window[publicName] = Public;

	}

})(typeof module === 'object' && module && typeof module.exports === 'object' && module.exports);
},{}],2:[function(require,module,exports){
// Asynchronously returned data.

module.exports = function(exports) {
    
    // (argument: (callback: (error, result) => void) => void) => { [Function] .___oswstAsync: true };
    exports.async = function(argument) {
        var async = function(callback) {
            if (callback) {
                var called = false;
                argument(function(error, result) {
                    if (!called) {
                        called = true;
                        if (typeof(callback) == 'function') callback(error, result);
                    } else throw new Error('Repeated call callback unexpected!');
                });
            } else return async.toString();
        };
        async.___oswstAsync = true;
    	async.toString = function() {
    	    var result = new Error('Asynchrony can not be converted into synchronicity!');
    	    async(function(error, data) {
    	        if (error) result = error;
    	        else result = data;
    	    });
    	    if (typeof(result) == 'object' && result instanceof Error) throw result;
    	    return String(result);
    	};
    	return async;
    };
    
    // (argument: Function) => boolean;
    exports.isAsyncFunction = function(argument) {
        return !!argument.___oswstAsync;
    };
};
},{}],3:[function(require,module,exports){
// Classes system.

module.exports = function(exports) {

    // new () => this;
    exports.Class = function() {
        
        // Prototype of this class instance. Other instance.
        // Class;
        // this.___prototype = undefined;
        // set on extend
        
        // Constructor of this class instance. Other instance.
        // Function;
        // this.___factory = undefined;
        // set on extend
        
        // Arguments passed when constructing.
        // arguments;
        // this.___arguments = undefined;
        // set on construct
        
        // That will be returned after the construction?
        // () => any;
        this.__returner = function() { return this; };
        // set on extend
        // call on constrct
        
        // What should be done in the construction?
        // Function
        // this.__constructor = undefined
        // set on extend
        // call on constrct
        
        // Method for inheritance.
        // Argument injector is performed only for this inheritor, unlike .__constructor.
        // (injector: TInjector) => Function;
        this.extend = function(injector) {
            if (typeof(injector) != 'function') var injector = function() {};
            
            var prototype = this;
            
            var _arguments = undefined;
            
            var P;
            
            P = function Class() {
                if (this instanceof exports.Class) { // new ()
                    
                    if(Object.prototype.toString.call(_arguments) == '[object Arguments]') {
                        var __arguments = _arguments;
                        _arguments = undefined;
                    } else {
                        var __arguments = arguments;
                    }
                    
                    this.___prototype = prototype;
                    this.___factory = P;
                    this.___arguments = __arguments;
                    
                    injector.call(this);
                    if (typeof(this.__constructor) == 'function') this.__constructor.apply(this, __arguments);
                
                } else { // ()
                    _arguments = arguments;
                    var instance = new P();
                    return instance.__returner(instance);
                }
            };
            
            P.prototype = prototype;
            
            P.__construct = prototype.__construct;
            exports.static(P, 'extend');
            
            return P;
        };
        
        // Automatic constructor for static usage.
        // () => this;
        this.__construct = function() { return this.apply(this, arguments); };
        // set on extend
    };
};
},{}],4:[function(require,module,exports){
// Universal compiler.

module.exports = function(exports) {
    
    // (data: TData, context: Object <= TContext, callback: TCallback) => void =>> string;
    exports.compile = function(data, context, callback) {
        
        var whiler = true;
        
        var result = '';
        
        var deep = 0;
        var vertical = [data];
        var horizontal = [-1];
        
        var direction = true;
        // true // down
        // false // up
        
        var reset = function(node) {
            vertical[deep] = node;
        };
        
        var up = function(node) {
            result += node;
            vertical.pop();
            horizontal.pop();
            direction = false;
            deep--;
        };
        
        var down = function(node) {
            direction = true;
            deep++;
            horizontal[deep] = -1;
            vertical[deep] = node;
        };
        
        var right = function() {
            horizontal[deep]++;
            down(vertical[deep][horizontal[deep]]);
        };
        
        var out = function() {
            direction = false;
            deep--;
        };
        
        var core = function() {
            whiler = true;
            while (whiler) {
                if (vertical.length && deep > -1) { // Available data to compile?
                    if (typeof(vertical[deep]) == 'function') { // is function?
                        if (vertical[deep].prototype instanceof exports.Compiler) // of Compiler?
                            vertical[deep] = vertical[deep].__construct();
                        else if (exports.isSyncFunction(vertical[deep])) // is sync?
                            vertical[deep] = vertical[deep].call(context);
                        else if (exports.isAsyncFunction(vertical[deep])) { // is async?
                            whiler = false;
                            vertical[deep].call(context, function(error, node) {
                                if (error) callback(error);
                                else {
                                    reset(node);
                                    core();
                                }
                            });
                        } else if (exports.isContextFunction(vertical[deep])) // is context?
                            vertical[deep] = vertical[deep].__construct();
                        else up(String(vertical[deep]));
                    } else if (typeof(vertical[deep]) == 'object') { // is object?
                        if (Object.prototype.toString.call(vertical[deep]) === '[object Array]') { // is array?
                            if (horizontal[deep] < vertical[deep].length - 1)
                                right();
                            else out();
                        } else if (vertical[deep] instanceof exports.Compiler) { // of Compiler?
                            if (vertical[deep].__compile) reset(vertical[deep].__compile(context));
                            else up(String(vertical[deep]));
                        } else up(String(vertical[deep]));
                    } else up(String(vertical[deep]));
                } else {
                    whiler = false;
                    callback(null, result);
                }
            }
        };
        
        core();
    };
};
},{}],5:[function(require,module,exports){
// Support for TData, TContext and compilation.

module.exports = function(exports) {
    
    // [new] () => this;
    exports.Compiler = (new exports.Class())
    .extend(function() {
        var prototype = this.___prototype;
        
        // Array<TData>;
        // this._data = undefined;
        
        // (data: TData) => this;
        this.data = function(data) {
            this._data = data;
            
            return this;
        };
        
        // (context?: TContext, callback: TCallback) => async;
        this.compile = function() {
            var instance = this;
            
            var context = undefined;
            var callback = undefined;
            
            if (typeof(arguments[0]) == 'object') context = arguments[0];
            
            if (typeof(arguments[0]) == 'function') callback = arguments[0];
            else if (typeof(arguments[1]) == 'function') callback = arguments[1];
            
            var async = exports.async(function(callback) {
                exports.compile(instance, context, callback);
            });
            
            if (callback) async(callback);
            
            return async;
        };
        
        // () => TData;
        this.__compile = function() {
            return this._data;
        }
        
        // TContext;
        // this._context = undefined;
        
        // (context: TContext) => this;
        this.context = function(context) {
            if (!Object.prototype.hasOwnProperty.call(this, '_context')) this._context = context;
            else this._context = exports.merge.recursive(this._context, context);
            
            return this;
        };
        
        // => string;
        this.toString = function() {
            return String(this.compile());
        };
        
        this.extend = function() {
            var extension = prototype.extend.apply(this, arguments);
            exports.static(extension, 'data');
            exports.static(extension, 'context');
            exports.static(extension, 'compile');
            exports.static(extension, 'toString');
            return extension;
        };
    })
    .extend();
};
},{}],6:[function(require,module,exports){
// At compile time can be transmitted to the context.
// This class can access it.

module.exports = function(exports) {
    
    // [new] (...path: Array<string>) => this;
    exports.context = exports.Compiler
    .extend(function() {
        var prototype = this.___prototype;
        
        // Path in TContext.
        // Array<string>;
        // this._data = undefined;
        
        // Way to add path.
        // (...path: Array<string>) => this;
        this.data = function() {
            if (!Object.prototype.hasOwnProperty.call(this, '_data')) this._data = [];
            this._data.push.apply(this._data, arguments);
            return this;
        };
        
        // .apply(this, ...path: Array<string>) => void;
        this.__constructor = function() {
            if (prototype.__constructor) prototype.__constructor.call(this);
            
            // If the injector does not set the path, then it will be set to an empty array.
            if (!Object.prototype.hasOwnProperty.call(this, '_data')) this._data = [];
            
            this.data.apply(this, arguments);
        };
        
        // () => TData;
        this.__compile = function(_context) {
            var instance = this;
            return exports.async(function(callback) {
                try {
                    var context = exports.contextTraveler.apply(_context, instance._data);
                } catch(error) {
                    callback(error);
                    return;
                }
                exports.compile(context, {}, callback);
            });
        };
        
        // () => Array<any>|void;
        this.__compileChildren = undefined; // Custom data logic.
        
    });
    
    // .apply(this: TContext, arguments: Array<string>) => any;
    exports.contextTraveler = function() {
        var path = [];
        var cursor = this;
        for (var a in arguments) {
            path.push(arguments[a]);
            if (typeof(cursor) == 'object') {
                cursor = cursor[arguments[a]];
            } else {
                throw new Error('Error on step '+path.join('.')+' in path '+Array.prototype.join.call(arguments, '.')+'!');
            }
        };
        return cursor;
    };
    
    // (argument: Function) => boolean;
    exports.isContextFunction = function(argument) {
        return !!argument.___oswstContext;
    };
};
},{}],7:[function(require,module,exports){
// String data.

module.exports = function(exports) {
    
    // [new] (...data: TData) => this;
    exports.data = exports.Compiler
    .extend(function() {
        var prototype = this.___prototype;
        
        // TData;
        // this._data = undefined;
        
        // (...data: Array<TData>) => this;
        this.data = function() {
            this._data = Array.prototype.slice.call(arguments, 0);
            
            return this;
        };
        
        // (...data: Array<TData>) => this;
        this.append = function() {
            if (typeof(this._data) != 'object' || Object.prototype.toString.call(this._data) != '[object Array]') this._data = [];
            this._data.push.apply(this._data, arguments);
            
            return this;
        };
        
        // (...data: Array<TData>) => this;
        this.prepend = function() {
            if (typeof(this._data) != 'object' || Object.prototype.toString.call(this._data) != '[object Array]') this._data = [];
            this._data.unshift.apply(this._data, arguments);
            
            return this;
        };
        
        // (context: TContext, callback: TCallback) => this;
        this.__compile = function(context) {
            return this._data;
        };
        
        this.extend = function() {
            var extension = prototype.extend.apply(this, arguments);
            exports.static(extension, 'append');
            exports.static(extension, 'prepend');
            return extension;
        };
        
        this.__constructor = function() {
            if (prototype.__constructor) prototype.__constructor.call(this);
            if (this.data) this.data.apply(this, arguments);
        };
    }).extend();
};
},{}],8:[function(require,module,exports){
// Rules.

// Comments with instructions in the style of language TypeScript.
// => return
// =>> callback

// ._key
// Utilitarian option, not intended for user use.

// .__key
// Utilitarian function, not intended for user use.

// .___key
// Additional Information. Read-only.

// type TData = sync|async|Compiler|any;
// sync|async =>> TData;
// Compiler =>> string;
// string|number =>> string;
// boolean|undefined|null =>> string; // ''
// {} =>> string; // String({}) =>> '[object Object]'
// [] =>> string; // [ 123, 456 ] =>> 123456

module.exports.merge = require('merge');

require('./class/index.js')(module.exports);
require('./static/index.js')(module.exports);
require('./compile/index.js')(module.exports);
require('./sync/index.js')(module.exports);
require('./async/index.js')(module.exports);
require('./compiler/index.js')(module.exports);
require('./context/index.js')(module.exports);
require('./data/index.js')(module.exports);

if (typeof(window) == 'object') window['oswst'] = module.exports;
},{"./async/index.js":2,"./class/index.js":3,"./compile/index.js":4,"./compiler/index.js":5,"./context/index.js":6,"./data/index.js":7,"./static/index.js":9,"./sync/index.js":10,"merge":1}],9:[function(require,module,exports){
// Support static options to the class system.

module.exports = function(exports) {
    
    // (extension: Function, key: string) => void;
    exports.static = function(extension, key) {
        extension[key] = function() {
            var instance = extension.__construct.call(this);
            return instance[key].apply(instance, arguments);
        };
    };
    
};
},{}],10:[function(require,module,exports){
// Synchronously returned data.

module.exports = function(exports) {
    
    // (argument: () => any) => { [Function] .___oswstSync: true };
    exports.sync = function(argument) {
        var sync = function() { return argument.apply(this); };
        sync.___oswstSync = true;
        sync.toString = function() {
            return String(sync.apply(this));
        };
        return sync;
    };
    
    // (argument: Function) => boolean;
    exports.isSyncFunction = function(argument) {
        return !!argument.___oswstSync;
    };
};
},{}],11:[function(require,module,exports){
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
                }
            }
        };
    }).extend();
};
},{"oswst":8}],12:[function(require,module,exports){
// Double tags.

var oswst = require('oswst');

module.exports = function(exports) {
    
exports._doubles = ['html', 'body', 'head', 'style', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hgroup', 'div', 'p', 'address', 'blockquote', 'pre', 'ul', 'ol', 'li', 'dl', 'dt', 'dd', 'fieldset', 'legend', 'form', 'noscript', 'object', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'td', 'th', 'col', 'colgroup', 'caption', 'span', 'b', 'big', 'strong', 'i', 'var', 'cite', 'em', 'q', 'del', 's', 'strike', 'tt', 'code', 'kbd', 'samp', 'small', 'sub', 'sup', 'dfn', 'bdo', 'abbr', 'acronym', 'a', 'button', 'textarea', 'select', 'option', 'article', 'aside', 'figcaption', 'figure', 'footer', 'header', 'section', 'main', 'nav', 'menu', 'audio', 'video', 'embed', 'canvas', 'output', 'details', 'summary', 'mark', 'meter', 'progress', 'template', 'comment', 'title', 'script'];

for (var key in exports._doubles) {
    exports[exports._doubles[key]] = exports.Double().name(exports._doubles[key]).extend();
}
    
};
},{"oswst":8}],13:[function(require,module,exports){
// Rules.

// Comments with instructions in the style of language TypeScript.
// => return
// =>> callback

// ._key
// Utilitarian option, not intended for user use.

// .__key
// Utilitarian function, not intended for user use.

// .___key
// Additional Information. Read-only.

require('./selector/index.js')(module.exports);
require('./tag/index.js')(module.exports);
require('./single/index.js')(module.exports);
require('./double/index.js')(module.exports);
require('./singles/index.js')(module.exports);
require('./doubles/index.js')(module.exports);

if (typeof(window) == 'object') window['oswsm'] = module.exports;
},{"./double/index.js":11,"./doubles/index.js":12,"./selector/index.js":14,"./single/index.js":15,"./singles/index.js":16,"./tag/index.js":17}],14:[function(require,module,exports){
// Parser css selector.

module.exports = function(exports) {
    
    // (data: string, reg: RegExp) => string[][];
    exports.regExpSearch = function(data, reg) {
        var result = [], temp = null;
        while ((temp = reg.exec(data)) != null) {
            if (temp.index === reg.lastIndex) reg.lastIndex++;
            result.push(temp);
        }
        return result;
    }
    
    // https://www.regex101.com/r/cM5jC6/13
    exports._selectorRegExp = (/(\[)|(\])|#([-\w\d]+)|\.([-\w\d]+)|([\w\d-]+)="(['\w\d\s-:\\\/\.\,\]\[={}<>%@#$%^&*~`]*)"|([\w\d-]+)='(["\w\d\s-:\\\/\.\,\]\[={}<>%@#$%^&*~`]*)'|([\w\d-]+)=([\w\d-:\\\/\.={}<>%@#$%^&*~`]*)|("['\w\d\s-:\\\/\.\,\]\[={}<>%@#$%^&*~`]+")|('["\w\d\s-:\\\/\.\,\]\[={}<>%@#$%^&*~`]+')|([_\w-:\\\/]+)/g);
    
    // (attributes: TAttributes, selector: TSelector) => void;
    exports.selector = function(attributes, selector) {
        var matchs = exports.regExpSearch(selector, exports._selectorRegExp);
        var isAttr = false;
        for (var key in matchs) {
            var node = matchs[key];
            if (node[1]) { isAttr = true; continue; } // [
            else if (node[2]) { isAttr = false; continue; } // ]
    
            if (isAttr) {
                if (node[9]) { attributes[node[9]] = node[10]; continue; } // [attr=value]
                if (node[7]) { attributes[node[7]] = node[8]; continue; } // [attr='value']
                if (node[5]) { attributes[node[5]] = node[6]; continue; } // [attr="value"]
                if (node[13]) { attributes[node[13]] = null; continue; } // [attr]
                if (node[12]) { attributes[node[12]] = null; continue; } // ['attr']
                if (node[11]) { attributes[node[11]] = null; continue; } // ["attr"]
            } else {
                if (node[3]) { attributes.id = node[3]; continue; } // id
                if (node[4]) { attributes.class? attributes.class += ' ' + node[4] : attributes.class = node[4]; continue; } // class
            }
        }
    };
};
},{}],15:[function(require,module,exports){
// Single tag.

var oswst = require('oswst');

module.exports = function(exports) {
    
    // [new] (selector?: string, attr?: object) => this;
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
        
        // (context: TContext, callback: TCallback) => this;
        this.__compile = function(context) {
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
},{"oswst":8}],16:[function(require,module,exports){
// Single tags.

var oswst = require('oswst');

module.exports = function(exports) {
    
exports._singles = ['br', 'hr', 'img', 'input', 'base', 'frame', 'link', 'meta'];

for (var key in exports._singles) {
    exports[exports._singles[key]] = exports.Single().name(exports._singles[key]).extend();
}
    
};
},{"oswst":8}],17:[function(require,module,exports){
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
},{"oswst":8}]},{},[13])