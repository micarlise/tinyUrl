## TinyUrl

nodejs backend API to generate short key codes mapped to URLs.

### API

#### Create a short key mapping

```
curl -X POST -H 'Content-Type: application/json' \
    -d '{"url": "www.google.com"}' \
```

#### Redirect to a short key's URL

```
curl localhost:3000/fb8fjk9
```

#### See all current mappings

```
curl localhost:3000/
```

### Setup backend 

#### Run cassandra


```
docker-compose up -d
```

*Wait for tinyurl_setup_1 container to exit before running app*

#### Start tinyurl service

```
npx nodemon index.js
```
