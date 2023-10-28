# Youtube-sharing

Youtube-sharing is a web application that allows users to share videos from YouTube

Visit [https://youtube-sharing.vercel.app/]

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

Change network access on mongo atlas
![change network access](./images/network_access.png)

Select option connect compass
![select option connect compass](./images/select_connect_compass.png)

Copy URI
![copy uri](./images/uri.png)

Paste URI into mongoDB compass
![connect db](./images/connect_mongo_compass.png)

```sh
cd youtube-sharing-be
```

Create file .env

```js
API_KEY_YOUTUBE=
MONGO_URI=
URL_FE=http://localhost:3000
JWT_SECRET_KEY=
NODE_ENV=development
PORT=8080
```

| Key             | Value                      |
| --------------- | -------------------------- |
| API_KEY_YOUTUBE | [create api key youtube]   |
| MONGO_URI       | paste URI from mongo atlas |
| URL_FE          | client url on local        |
| JWT_SECRET_KEY  | random string              |
| NODE_ENV        | mode env                   |
| PORT            | server port on local       |

Create init data

```sh
npm run seeding
```

Start server

```sh
npm run install
npm run dev
```

Install the dependencies and devDependencies and start the client.

```sh
cd youtube-sharing-fe
```

Create file .env

```js
BASE_URL_LOCALHOST=http://localhost:8080
MODE=development
```

| Key                | Value               |
| ------------------ | ------------------- |
| BASE_URL_LOCALHOST | url server on local |
| MODE               | mode env            |

```sh
npm run install
npm run dev
```

Visit: `localhost:3000`

## Docker

Your system needs to have Docker and Docker Composed installed.

Start the whole system including MongoDB, backend, frontend servers and Mongo Compass:

```sh
docker-compose up -d
```

To load initial data to mongodb:

```sh
docker-compose exec server node src/seedData.js
```

In order to view db visit:
`http://localhost:28081/`

`username: admin`

`password: secret`

```sh
cd youtube-sharing-be
```

Create file .env

```js
API_KEY_YOUTUBE=
MONGO_URI=mongodb://user:password@youtube-sharing-mongodb/youtube?authSource=admin&authMechanism=SCRAM-SHA-1
URL_FE=http://localhost:3000
JWT_SECRET_KEY=
NODE_ENV=development
PORT=8080
```

| Key             | Value                    |
| --------------- | ------------------------ |
| API_KEY_YOUTUBE | [create api key youtube] |
| MONGO_URI       | keep value               |
| URL_FE          | client url on local      |
| JWT_SECRET_KEY  | random string            |
| NODE_ENV        | mode env                 |
| PORT            | server port on local     |

Visit: `localhost:3000`

## Usage

- When you access the website, you will see a list of videos that others have shared before
- You need to log in, or register (if you don't have an account yet) to receive notifications and be able to share the videos you want with everyone

Note:

- You can only receive notifications and share videos after logging in to the website
- When you log out and log back in, the previous notifications will still be retained
- Notifications are sent only and not stored in the database, so when you refresh the page or log in from a different location, the old notifications will no longer be available

## License

MIT

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[ReactJS]: https://react.dev/
[ExpressJS]: https://expressjs.com/
[SocketIO]: https://socket.io/
[MongoDB]: https://www.mongodb.com/
[Install mongoDB compass]: https://www.mongodb.com/docs/compass/current/install/
[Create an atlas account]: https://medium.com/@zzpzaf.se/mongodb-atlas-free-shared-database-cluster-891435bec3a9
[create api key youtube]: https://www.magetop.com/blog/cach-lay-api-key-youtube/#:~:text=C%C3%A1c%20b%C6%B0%E1%BB%9Bc%20%C4%91%E1%BB%83%20l%E1%BA%A5y%20API%20key%20YouTube,-B%C6%B0%E1%BB%9Bc%201%3A%20T%E1%BA%A1o&text=T%E1%BA%A1i%20Library%20c%C3%A1c%20b%E1%BA%A1n%20search,CREDENTIALS%20%C4%91%E1%BB%83%20t%E1%BA%A1o%20API%20key.
[https://youtube-sharing.vercel.app/]: https://youtube-sharing.vercel.app/
