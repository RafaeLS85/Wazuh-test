## es necesario tener instalado elastic search en local?
...


## crear y levantar los contenedores:

```shell
docker-compose up -d --build
```

## acceder al contenedor "dev_environment-osd-1" 
1. obtenemos el id: docker ps
2. docker exec -it <container_id> bash
3. levantamos en modo desarrollo: yarn start --no-base-path
4. ahora podemos acceder al puerto :5601 localmente.
5. esperar a que se optimice el codigo
6. iniciar sesion con admin, admin


## documentacion importante:

https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html

## indices:
https://opensearch.org/docs/1.2/opensearch/index-data/#read-data


## create a index
```javascript
PUT /todo-index

{
  "settings": {
    "index": {
      "number_of_shards": 2,
      "number_of_replicas": 1
    }
  },
  "mappings": {
    "properties": {
      "id": {
        "type": "string"
      },
       "title": {
        "type": "string"
      },
       "completed": {
        "type": "boolean"
      }
    }
  },
  "aliases": {
    "todo-index": {}
  }
}

PUT todo-index/_doc/1
{  "id": "1", "title": "Spirited Away", "completed": false }



GET todo-index/_doc/1

{
  "_index" : "todo-index",
  "_type" : "_doc",
  "_id" : "1",
  "_version" : 1,
  "_seq_no" : 0,
  "_primary_term" : 1,
  "found" : true,
  "_source" : {
    "title" : "Spirited Away"
  }
}
```
