# redisjsapp

## A simple nodejs application that stores and fetches data from a redis db


### Requirements
The application requires a redis db to be running on the system.
For example use: docker run -d -p 6379:6379 redis:5.0.4

### Description
If the redis is run in a docker container please verify that the IP address is correct. Right now it is hardcoded inside the index.js file.

The application can be run inside a docker container as well, just make sure the application and redis are running on the same network and can reach eachother.



