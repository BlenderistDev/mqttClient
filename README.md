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
### Ping
Module measures time between sending and receiving message.
#### Config:
- `interval` metering interval
