CREATE KEYSPACE tinyurls WITH replication = { 'class': 'SimpleStrategy', 'replication_factor': 1 };

CREATE TABLE IF NOT EXISTS tinyurls.shortkeys ( shortkey text, url text, PRIMARY KEY (shortkey));
