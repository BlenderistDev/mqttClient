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
#### Mqtt
Main module. Connects to mqtt server, sends and receives mqtt messages.
###### Config
- `host` mqtt server host
  - validation: required, has protocol (for example mqtt://)
- `username` username for connecting, optional
- `password` password for connection, optional
- `topic` mqtt base topic for mqtt client, optional
#### Resender
Module resends messages from one mqtt server to another
###### Config
- `direction` direction of resending
  - validation: required
- `host` mqtt server host
  - validation: required, has protocol (for example mqtt://)
- `username` username for connecting, optional
- `password` password for connection, optional
- `topic` topic to resend. Support mqtt special chars like # or +
  - validation: required
#### Ping
Module measures time between sending and receiving message.
###### Config:
- `interval` metering interval
  - unit of measurement: seconds
  - validation: required, integer, more than 0
#### MessageCounter
Module counts messages per time interval
###### Config:
- `interval` time interval for counting, seconds
  - unit of measurement: seconds
  - validation: required, integer, more than 0
#### DoubleClick
Module adds double click functionality to smart switches without double click.
###### Config:
- `interval` time for waiting of second click
  - unit of measurement: miliseconds
  - validation: required, integer, more than 0
- `topic` topic for input message
  - validation: require
- `attribute` json attribute with value in incoming message. For example `state_center` or `state.state_center` or even `state[1].state_center`. Optional
- `name` part of output topic name. Helps to deference similar sensors. Optional
#### ShellSender
*Only pure installation*

**No root user**

Module executes shell command with time interval and sends execution result to specified topic.

It can be usefull for monitoring some system state, like disk usage or volume level.
###### Config:
- `topic` topic to send command result
  - validation: required
- `command` shell command to execute
  - validation: required
- `interval` interval beetween command execution
  - unit of measurement: seconds
  - validation: required, integer, more than 0

### Storages
The module allows you to view mqtt messages stored in the storage.
###### Config:
- `storage` storage to fetch data
#### Database
Module stores data to database.
###### Config:
- `dialect` database dialect. Supported dialects are mysql, mariadb, postrgesql.
  - validation: required
- `host` database host
  - validation: required
- `user` database user, optional
- `password` user password, optional
- `database` database name
  - validation: required
- `table` table name
  - validation: required
- `interval` interval to make query to database. Optional, if not set, every message will cause a query.
#### MongoDB
Module stores data to MongoDB.
###### Config:
- `host` MongoDB host
  - validation: required
- `user` MongoDB user, optional
- `password` user password, optional
- `database` database name
  - validation: required
- `collection` collection name
  - validation: required
- `interval` interval to make query to MongoDB. Optional, if not set, every message will cause a query.
