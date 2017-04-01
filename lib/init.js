const scan = require('./scan.js');

module.exports = function init(){

  // get bluetooth scanner frequency
   return gladys.param.getValue('BLUETOOTH_SCANNER_FREQUENCY_IN_MINUTE')
   .then((bluetoothScannerFrequency) => {

      sails.log.debug(`BluetoothScanner will scan for devices each ${bluetoothScannerFrequency} minutes.`);

      setInterval(function(){
        scan();
      }, parseInt(bluetoothScannerFrequency)*60*1000);
    });
};
