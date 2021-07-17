# mqttClient

## Pure client
### Installation
```
git clone https://github.com/BlenderistDev/mqttClient.git
cd mqttClient
./install.sh
```
### Launch
```
./launch.sh
```

## Docker
### Installation
```
git clone https://github.com/BlenderistDev/mqttClient.git
cd mqttClient
docker build -t blenderist:mqttclient .
```
### Launch
```
docker run -p 4000:4000 blenderist:mqttclient
```

## DocherHub
### Installation
```
docker pull blenderist/mqttclient:latest 

```
### Launch
```
docker run -p 4000:4000 blenderist/mqttclient:latest
```

### Modules
### Mqtt
Main module. Connects to mqtt server, sends and receives mqtt messages.
#### Config
- `host` mqtt server host
  - validation: required, has protocol (for example mqtt://)
- `username` username for connecting, optional
- `password` password for connection, optional
- `topic` mqtt base topic for mqtt client, optional
### Ping
Module measures time between sending and receiving message.
#### Config:
- `interval` metering interval
  - unit of measurement: seconds
  - validation: required, integer, more than 0
### MessageCounter
Module counts messages per time interval
#### Config:
- `interval` time interval for counting, seconds
  - unit of measurement: seconds
  - validation: required, integer, more than 0
