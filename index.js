
module.exports = function(sails) {

    const scan = require('./lib/scan.js');
    const init = require('./lib/init.js');
    const setup = require('./lib/setup.js');

    gladys.on('ready', function(){
        scan();
        init();
    });
    
    return {
        scan,
	setup
    };
};
