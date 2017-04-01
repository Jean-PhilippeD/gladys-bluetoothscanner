const Command = require('command-promise');

module.exports = function scan() {

  sails.log.info('Scanning for Bluetooth device...');

  return gladys.device.getByService({service: 'bluetoothscanner'})
  .then((devices) => {
    // Get BT devices
    return [devices, gladys.machine.getMyHouse()];
    // Get house
   })
  .spread((devices, house) => {
    return Promise.map(devices,function(device) {

      return Command('hcitool name ' + device.identifier)
      .then((data) => {
        // Check if device is in house
        if(device && device.user && data[0]) {
          // the user has been seen, save it
          sails.log.info('Bluetooth device ' +  device.name + ' found');
          return gladys.house.userSeen({house: house.id, user: device.user});
        } else {
          return null;
        }
      });
    });
  });
};
