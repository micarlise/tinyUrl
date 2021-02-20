

### Setup backend 

#### Run cassandra


```
docker run -d 
    -v $(pwd)/models/cassy_schema.cql:/root/cassy_schema.cql 
    -p 7000:7000 -p 9042:9042 
    --name cassandra 
    cassandra
```

```
docker exec -it cassandra bash
```

```
cqlsh < /root/cassy_schema.cql
```
