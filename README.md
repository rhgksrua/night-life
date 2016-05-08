# FCC Nightlife SPA

FCC Nightlife app using nodeJS and reactJS with Yelp api

## Getting started

* git clone `https://github.com/rhgksrua/night-life.git`
* npm install

Uses `dotenv`.  Required environment variables

For github log in.
* `GITHUB_KEY`
* `GITHUB_SECRET`
* `APP_URL` - github call back url

For yelp api.
* `YELP_KEY`
* `YELP_SECRET`
* `YELP_TOKEN`
* `YELP_TOKEN_SECRET`

Uses mongoDB. Start mongoDB.
* run `./mongod` if running on `c9.io`

Start server with:
* `node server.js`

Build components with:
* `webpack`


## Features

Currently, only 5 results are returned.
Also, only sign in method is through Github.