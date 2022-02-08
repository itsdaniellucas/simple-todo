# Portfolio Project #5: Simple Todo

## Description

Simple Todo is a very simple mobile (Android) todo application built using React Native that connects to a Node (Nest) server which precomputes statistics on the todos via Kafka and stores it in a cache (Redis) and stores everything in a database (PostgreSQL)

>Disclaimer: The purpose of these projects is to showcase my knowledge of technologies, libraries and concepts in a simple application, it is expected to be a small-scaled application, the focus should be on the use cases of said technologies, libraries and concepts.

## Technologies and Libraries

The following technologies/libraries/concepts were used:

Server:

* Language - [`Javascript (Node)`](https://nodejs.org/en/)
* Framework - [`Nest`](https://nestjs.com/)
* Typescript - [`Typescript`](https://www.typescriptlang.org/)
* Database - [`PostgreSQL`](https://www.postgresql.org/)
* ORM - [`Sequelize`](https://sequelize.org/)
* Caching - [`Redis`](https://redis.io/)
* Queue/Messaging Service - [`Kafka`](https://kafka.apache.org/)
* Authentication - [`JWT`](https://jwt.io/)
* Containerization - [`Docker`](https://www.docker.com/)

Client:

* SPA Framework/Library - [`React Native`](https://reactnative.dev/) (Hooks)
* UI Library - [`React Natve Elements`](https://reactnativeelements.com/)
* Typescript - [`Typescript`](https://www.typescriptlang.org/)
* Navigation [`React Navigation`](https://reactnavigation.org/)
* Charts - [`React Native Chart Kit`](https://github.com/indiespirit/react-native-chart-kit)
* Storage Access - [`Async Storage`](https://react-native-async-storage.github.io/async-storage/)


## Running the Project

You need to install the following:

* [Node and NPM](https://nodejs.org/en/download/)
* [Android Studio](https://developer.android.com/studio)
* [Docker Desktop](https://www.docker.com/products/docker-desktop)
* [PostgreSQL](https://www.postgresql.org/) (optional)

Clone Repo:
```
> git clone https://github.com/itsdaniellucas/simple-todo

or using GitHub CLI
> gh repo clone itsdaniellucas/simple-todo
```

Run the server and other services via Docker:
```
> cd simple-todo\src\server-nest
> docker-compose build
> docker-compose up
```

Endpoint:
```
Node (Nest)
http://localhost:3000
```

Run the mobile app client via Android Studio and Metro:

Run Android Studio and load the android project under simple-todo\src\client-react-native, launch the emulator and execute
the following commands on the commandline:
```
> cd simple-todo\src\client-react-native
> npm install
> npx react-native start
> npx react-native run-android (on a 2nd terminal)
```

You also need to execute the following command so the emulator can call the endpoint on localhost:
```
> adb reverse tcp:3000 tcp:3000
```


Default Users:
|   Username    |   Password    |   Description                                                                                 |
|---------------|---------------|-----------------------------------------------------------------------------------------------|
|   test        |   test        |   Create and delete todos, view stats                                                         |

## License

MIT