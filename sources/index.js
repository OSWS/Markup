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

module.exports.data = require('oswst').data;

require('./selector/index.js')(module.exports);
require('./tag/index.js')(module.exports);
require('./single/index.js')(module.exports);
require('./double/index.js')(module.exports);
require('./singles/index.js')(module.exports);
require('./doubles/index.js')(module.exports);

if (typeof(window) == 'object') window['oswsm'] = module.exports;