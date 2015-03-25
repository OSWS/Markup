// Parser css selector.

// TSelector = string;
// TAttr = { [key: string]: TData };

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
    
    // (attributes: TAttr, selector: TSelector) => void;
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