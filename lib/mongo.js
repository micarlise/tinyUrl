
const mongodb = require("mongodb");

const uri = "mongodb://0.0.0.0:27017"

const client = new mongo.MongoClient(uri, {
    useUnifiedTopology: true
});

await client.connect()

// setup index
const database = client.db("tinyurls");
const shortkeys = database.collection("shortkeys");

await shortkeys.createIndex({shortkey: 1});

function insertCode(key, url) {
    const doc = {
        shortkey: key,
        url: url
    };

    return shortkeys.insertOne(doc);
}

function getUrl(key) {
    const doc = {
        shortkey: key,
    };

    const options = {
        projection: {
            _id: 0,
            url: 1
        }
    };

    shortkeys.findOne(doc, options)
    .then((url) => {
        return url;
    });
}


