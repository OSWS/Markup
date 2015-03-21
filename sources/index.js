exports.data = require('oswst').data;

require('./selector/index.js')(exports);

require('./tag/index.js')(exports);

require('./single/index.js')(exports);
require('./double/index.js')(exports);

require('./singles/index.js')(exports);
require('./doubles/index.js')(exports);

if (typeof(window) == 'object') window['oswsm'] = module.exports;