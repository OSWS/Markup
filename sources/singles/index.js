// Single tags.

var oswst = require('oswst');

module.exports = function(exports) {
    
exports._singles = ['br', 'hr', 'img', 'input', 'base', 'frame', 'link', 'meta'];

for (var key in exports._singles) {
    exports[exports._singles[key]] = exports.Single().name(exports._singles[key]).extend();
}
    
};