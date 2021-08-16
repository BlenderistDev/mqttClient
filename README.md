# Mqtt Client
Web based program for comfortable work with mqtt messages. It gives you comfortable web interface for working with your mqtt network. Supports filtring mqtt messages by topic and message content. Messages can be grouped by topic or rolled into a topic tree.

Supports different databases to store mqtt messages:
- MySQL
- PostgreSQL
- MariaDB
- MongoDB

Real-time statistic:
- Ping (interval beetwen sending and reciving message)
- Message count per time interval


## Table of Contents
- [Initial setup](#initial)
- [Home Assistant addon](#home_assistant_addon)
  - [Installation](#home_assistant_addon_installation)
- [Pure client](#pure_client)
  - [Installation](#pure_client_installation)
  - [Launch](#pure_client_launch)
- [Docker](#docker)
  - [Installation](#docker_installation)
  - [Launch](#docker_launch)
- [DockerHub](#dockerhub)
  - [Installation](#dockerhub_installation)
  - [Launch](#dockerhub_launch)
- [Modules](#modules)
  - [Mqtt](#mqtt)
  - [Resender](#resender)
  - [Ping](#ping)
  - [MessageCounter](#messagecounter)
  - [DoubleClick](#doubleclick)
  - [ShellSender](#shellsender)
  - [ShellSubscriber](#shellsubscriber)

## <a name="initial"></a> Initial setup
First of all you should fill mqtt config. (Module Mqtt). After filling config use restart button to reload mqtt settings.
If you want to use some storage (like MongoDB or MySQL), fill storage config. (Module storage). Also you have to choose primary storage.

## <a name="home_assistant_addon"></a>Home Assistant addon
### <a name="home_assistant_addon_installation"></a> Installation

Supervisor > Add-on Store > ![image](https://user-images.githubusercontent.com/45158965/126977982-fc0a743c-68d9-4034-99aa-28011a3431ab.png) > Repositories

Add https://github.com/BlenderistDev/homeassistant-addons to your addons

Install addon mqttClient as usual.

More information: https://www.home-assistant.io/common-tasks/os#installing-third-party-add-ons


## <a name="pure_client"> Pure client
### <a name="pure_client_installation"> Installation
```
git clone https://github.com/BlenderistDev/mqttClient.git
cd mqttClient
./install.sh
```
### <a name="pure_client_launch"> Launch
```
./launch.sh
```

## <a name="docker"> Docker
### <a name="docker_installation"> Installation
```
git clone https://github.com/BlenderistDev/mqttClient.git
cd mqttClient
docker build -t blenderist:mqttclient .
```
### <a name="docker_launch"> Launch
```
docker run -p 4000:4000 blenderist:mqttclient
```

## <a name="dockerhub"> DockerHub
### <a name="dockerhub_installation"> Installation
```
docker pull blenderist/mqttclient:latest 

```
### <a name="dockerhub_launch"> Launch
```
docker run -p 4000:4000 blenderist/mqttclient:latest
```

### <a name="modules"> Modules
#### <a name="mqtt"> Mqtt
Main module. Connects to mqtt server, sends and receives mqtt messages.
###### Config
- `host` mqtt server host
  - validation: required, has protocol (for example mqtt://)
- `username` username for connecting, optional
- `password` password for connection, optional
- `topic` mqtt base topic for mqtt client, optional
#### <a name="resender"> Resender
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
#### <a name="ping"> Ping
Module measures time between sending and receiving message.
###### Config:
- `interval` metering interval
  - unit of measurement: seconds
  - validation: required, integer, more than 0
#### <a name="messagecounter"> MessageCounter
Module counts messages per time interval
###### Config:
- `interval` time interval for counting, seconds
  - unit of measurement: seconds
  - validation: required, integer, more than 0
#### <a name="doubleclick"> DoubleClick
Module adds double click functionality to smart switches without double click.
###### Config:
- `interval` time for waiting of second click
  - unit of measurement: miliseconds
  - validation: required, integer, more than 0
- `topic` topic for input message
  - validation: require
- `attribute` json attribute with value in incoming message. For example `state_center` or `state.state_center` or even `state[1].state_center`. Optional
- `name` part of output topic name. Helps to deference similar sensors. Optional
#### <a name="shellsender"> ShellSender
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

#### <a name="shellsubscriber"> ShellSubscriber
*Only pure installation*

**No root user**

Module executes shell command, triggered by message to specified topic. Message should be empty or contain a valid JSON key-value object with labels to replace. You can use labels in your commands with syntax `{{label_name}}`

It can be usefull for block or unblock your computer, luanch programs or set volume level.
###### Config:
- `topic` trigger topic
  - validation: required
- `command` shell command to execute
  - validation: required

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
