# Biker Stop

## Initializing the app

```
npm i
```

## Starting the app (dev)

```
npm start
```

## Starting the app (prod)

```
node index.js
```

## Instructions for DB setup

Install mongoDb using homebrew

```
brew install mongodb
```

Create Directory

```
mkdir -p /data/db
```

Setting permissions for the directory

```
sudo chown -R `id -un` /data/db
```

## Run MongoDb server

```
mongod
```

## Run MongoDb shell

Start mongodb server in one terminal and move to the location where mongodb is located and type the command in new terminal

```
./mongo
```

