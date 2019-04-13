docker run \
    --name postgres \
    -e POSTGRES_USER=lucasamaral \
    -e POSTGRES_PASSWORD=minhasenhasecreta \
    -e POSTGRESS_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

docker run 
--name adminer
-p 8080:8080
--link postgres:postgres
-d
adminer

##------ mongodb

docker run
 --name mongodb
  -p 27017:27017
   -e MONGO_INITDB_ROOT_USERNAME=admin
   -e MONGO_INITDB_ROOT_PASSWORD=root
   -d mongo:4 

dockre run
    --name mongoclient
    -p 3000:3000
    --link mongodb:mongodb
    -d mongoClient/mongoClient

    docker exec -it mongodb 
        mongo --host localhost -u admin -p root --authenticationDatabase admin 
         --eval "db.getSiblingDB('herois').createUser({user: 'lucasamaral', pwd: 'root', roles: [{role: 'readWrite', db: 'herois'}]})"