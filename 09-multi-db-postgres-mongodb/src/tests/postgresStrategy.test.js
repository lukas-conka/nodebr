const assert = require('assert')
const Postgres =require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR = {
    nome: 'Gaviao negro',
    poder: 'flexa'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: 'Batman',
    poder: 'Dinheiro'
}

 describe('Postgres Strategy', function() {
    this.timeout(Infinity)
    this.beforeAll(async function (){
        await context.connect()
        await context.delete()
        await context.create(MOCK_HEROI_ATUALIZAR)
        
    })
    
    it('PostgresSQL  connection', async function() {
        const result = await context.isConnected()
        assert.equal(result, true)
    })

    it('cadastrar', async function(){
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('listar', async function(){
        const [result] = await context.read({nome: MOCK_HEROI_CADASTRAR.nome})
        delete result.id
        //const posicaoZero = result[0]
        //const [posicao1, posicao2] = [`esse e o 1`, `esse e o 2`]

        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('atualizar', async function(){
        const [itemAtualizar] = await context.read({nome: MOCK_HEROI_ATUALIZAR.nome})

        console.log(itemAtualizar)
        
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome:'Super Farao'
        }

        const [result] = await context.update(itemAtualizar.id, novoItem)
        const [itemAtualizado] = await context.read({id: itemAtualizar.id})

       assert.deepEqual(itemAtualizado.nome, novoItem.nome)
        /* no Js existe uma tecnica rest/spread q é um metodo usado para merger objs
        ou separa-los */
    })
    it('remover por id', async function() {
        const [item] = await context.read({})
        console.log('item', item)
        const result = await context.delete(item.id)

        assert.deepEqual(result, 1  )
    })
})