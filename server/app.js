const gpsd = require('node-gpsd');

const daemon = new gpsd.Daemon({
  program: 'gpsd',
  device: '/dev/serial0',
  port: 2947,
  pid: '/tmp/gpsd.pid',
  readOnly: false,
  logger: {
    info: function() {},
    warn: console.warn,
    error: console.error
  }
});

const listener = new gpsd.Listener({
  port: 2947,
  hostname: 'localhost',
  logger: {
    info: function() {},
    warn: console.lwarn,
    error: console.error
  },
  parse: true
});

daemon.start(() => {
  console.log('GPS Daemon started');
  
  listener.connect(() => {
    console.log('GPS Listener connected');
  
    listener.watch();

    listener.on('TPV', (e) => {
      console.log('event:', e);    
    });

  });
});