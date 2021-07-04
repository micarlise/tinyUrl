
const mongodb = require("mongodb");

const uri = "mongodb://0.0.0.0:27017"

const client = new mongodb.MongoClient(uri, {
    useUnifiedTopology: true
});

let database, shortkeys;

client.connect()
.then(() => {
    // setup index
    database = client.db("tinyurls");
    shortkeys = database.collection("shortkeys");

    shortkeys.createIndex({shortkey: 1});
});

function insertCode(key, url) {
    const doc = {
        shortkey: key,
        url: url
    };

    return shortkeys.insertOne(doc);
}

function getUrl(key) {
    const doc = {
        shortkey: key
    };

    const options = {
        projection: {
            _id: 0,
            url: 1
        }
    };

    return shortkeys.findOne(doc, options)
    .then((res) => {
        if (!res) {
            return
        }

        return res.url;
    });
}

function getAllUrls() {
    let cursor = shortkeys.find();
    let keyMap = {};

    return cursor.forEach(doc => {
        if (!doc || !doc.shortkey || !doc.url ) {
            return
        }

        keyMap[doc.shortkey] = doc.url;
    })
    .then(() => {
        return keyMap;
    });
}

module.exports = { insertCode, getUrl, getAllUrls }
