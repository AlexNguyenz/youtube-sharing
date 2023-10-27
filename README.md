# Youtube-sharing

Youtube-sharing is a web application that allows users to share videos from YouTube

## Features

- Register - Log in
- Share videos from YouTube
- Notification when someone shares a video (When user logged)

## Technologies:

- [ReactJS]
- [ExpressJS]
- [SocketIO]
- [MongoDB]

## Installation

Youtube-sharing requires [Node.js](https://nodejs.org/) v14.20.1+ to run.

Clone repository

```sh
git clone https://github.com/AlexNguyenz/youtube-sharing.git
```

## Manual

Install the dependencies and devDependencies and start the server.
[Create an atlas account]

[Install mongoDB compass]

```sh
cd youtube-sharing-be
```

Create init data

```sh
npm run seeding
```

Start server

```sh
cd youtube-sharing-be
npm run install
npm run dev
```

Install the dependencies and devDependencies and start the client.

```sh
cd youtube-sharing-fe
npm run install
npm run dev
```

## Docker

## License

MIT

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[ReactJS]: https://react.dev/
[ExpressJS]: https://expressjs.com/
[SocketIO]: https://socket.io/
[MongoDB]: https://www.mongodb.com/
[Install mongoDB compass]: https://www.mongodb.com/docs/compass/current/install/
[Create an atlas account]: https://medium.com/@zzpzaf.se/mongodb-atlas-free-shared-database-cluster-891435bec3a9
