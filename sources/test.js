describe(require('../package.json').name+'@'+require('../package.json').version, function() {
    require('./selector/test');
    
    require('./tag/test');
    
    require('./single/test');
    require('./double/test');
    
    require('./singles/test');
    require('./doubles/test');
});