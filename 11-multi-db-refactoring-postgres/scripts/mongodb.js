docker ps
docker exec -it id 
    mongo -u lucasmaral -p root --authenticateDatabase herois

de.herois.insert({
    nome: 'Flash',
    poder:'Velocidade',
    dataNascimento: '1990-01-01'
})

db.herois.find()
db.herois.find().pretty()

for(let i =0;i <= 100; i++){
    de.herois.insert({
        nome: `Clone-${i}`,
        poder:'Velocidade',
        dataNascimento: '1990-01-01'
    })
}

db.herois.count()
db.herois.findOne()
db.herois.find().limt(10).sort({ nome: -1})
db.herois.find({}, {poder: 1, _id:0})

//update
db.herois.update({_id: ''}, {
    nome: 'Mulher maravilha'
})

db.herois.update({_id: ''}, 
{ $set: {nome: 'Mulher maravilha'} }
)

//delete
db.herois.remove({nome: 'mulher maravilha'})