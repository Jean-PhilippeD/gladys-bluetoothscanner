const Promise = require('bluebird');
const Command = require('command-promise');
const os = require('os');

module.exports = function setup() {

  sails.log.info('Bluetooth scan for new devices');
  return Command('hcitool scan | grep -v Scanning')
  .then(function(data) {
    devices = data[0].split(os.EOL);
    return Promise.map(devices, function(item){
      item = item.split('\t');
      if(item[1]) {
        var device = {
          name: item[2],
          address: item[1]
        }
        sails.log.warn('Bluetooth device found : ' + device.name);
      
        return gladys.device.create({
          device: {
            name: device.name,
            identifier: device.address,
            protocol: 'bluetooth',
            service: 'bluetoothscanner'
          },
          types: []
        });
      }
    });
  })
  .catch(function(err) {
    sails.log.warn('Bluetooth scan complete, no device(s) found!');
    //sails.log.error(err);
  });
}
