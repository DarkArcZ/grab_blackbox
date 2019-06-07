// Azure IoT Hub
module.exports = {
	iot: {
		uri : 'gps-prototype.azure-devices.net',
		sharedAccessKey : 'HostName=gps-prototype.azure-devices.net;DeviceId=prototypeV1;SharedAccessKey=CwZn4wzI5USOAi8HkWXE9FuGGlXmBV5N5p9XqWK4l/g=',
		iotDeviceID : 'prototypeV1',
		policy : 'iothubowner',
		topicFilters: {
			tripStart: 'trip-start',
			tripData: 'trip-data'
		}
	},
	mqtt: {
		connectionString: 'mqtt://localhost:1833'
	}
}
