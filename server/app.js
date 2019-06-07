// app.js
'use strict';

const gpsd = require('node-gpsd');
const Protocol = require('azure-iot-device-mqtt').Mqtt
const Client = require('azure-iot-device').Client
const Message = require('azure-iot-device').Message

const connectionString = 'HostName=gps-prototype.azure-devices.net;DeviceId=prototypeV1;SharedAccessKey=CwZn4wzI5USOAi8HkWXE9FuGGlXmBV5N5p9XqWK4l/g='

const client = Client.fromConnectionString(connectionString,Protocol);

const connectCallback = function (err) {
  if (err) {
    console.error('Could not connect: ' + err.message);
  } else {
    console.log('Client connected');
    client.on('message', function (msg) {
      console.log('Id: ' + msg.messageId + ' Body: ' + msg.data);
      // When using MQTT the following line is a no-op.
      client.complete(msg, printResultFor('completed'));
      // The AMQP and HTTP transports also have the notion of completing, rejecting or abandoning the message.
      // When completing a message, the service that sent the C2D message is notified that the message has been processed.
      // When rejecting a message, the service that sent the C2D message is notified that the message won't be processed by the device. the method to use is client.reject(msg, callback).
      // When abandoning the message, IoT Hub will immediately try to resend it. The method to use is client.abandon(msg, callback).
      // MQTT is simpler: it accepts the message by default, and doesn't support rejecting or abandoning a message.
    });

const daemon = new gpsd.Daemon({
  program: 'gpsd',
  device: '/dev/ttyUSB0',
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
})

    client.on('error', function (err) {
      console.error(err.message);
    });

    client.on('disconnect', function () {
      clearInterval(sendInterval);
      client.removeAllListeners();
      client.open(connectCallback);
    });
  }
};

client.open(connectCallback);

// Helper function to print results in the console
function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}

