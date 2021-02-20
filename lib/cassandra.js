
const cassandra = require('cassandra-driver');


const client = new cassandra.Client({
    contactPoints: ['0.0.0.0'],
    localDataCenter: 'datacenter1',
    keyspace: 'tinyurls'
});


let queries = {
    insertKey: 'INSERT INTO shortkeys (shortkey, url) VALUES (?, ?) IF NOT EXISTS USING TTL 1209600',
    getUrl: 'SELECT url FROM shortkeys WHERE shortkey = ?',
    getAllUrls: 'SELECT shortkey as key, url FROM shortkeys'
}


function insertCode(key, url) {
    params = [key, url]
    return client.execute(queries.insertKey, params, {prepare: true});
}

function getUrl(key) {
    return client.execute(queries.getUrl, [key], {prepare: true})
    .then((response) => {
        if (!response) {
            return 
        }

        return response.rows[0].url;
    });
}

function getAllUrls() {
    return client.execute(queries.getAllUrls)
    .then((response) => {
        if (!response) {
            return {};
        }

        keyMap = {};

        response.rows.forEach((row) => {
            if (!row || !row.key || !row.url ) {
                return
            }

            keyMap[row.key] = row.url;
        });

        return keyMap;
    });
}

module.exports = { insertCode, getAllUrls, getUrl }


