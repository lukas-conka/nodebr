const assert = require('assert')
const MongoDB =require('../db/strategies/mongodb/mongodb')
const Context = require('../db/strategies/base/contextStrategy')

const HeroiSchema = require('./../db/strategies/mongodb/schemas/heroisSchemas')

let  context = {}

const MOCK_HEROI_CADASTRAR = {
    nome: 'Superman',
    poder: 'super poderes'
}

const MOCK_HEROI_DEFAULT= {
    nome: `Homem-aranha-${Date.now()}`,
    poder: 'super teia'
}

const MOCK_HEROI_ATUALIZAR= {
    nome: `Patolino-${Date.now()}`,
    poder: 'Cago'
}

let MOCK_HEROI_ID =''

describe.only('MongoDb Suite de teste', function(){
    this.beforeAll(async function (){
       const connection = MongoDB.connect()
       
       context = new Context(new MongoDB(connection, HeroiSchema))

        await context.create(MOCK_HEROI_DEFAULT)
        const result =  await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ID = result.id;
    })

    it('verficiar conexao', async () =>{
        const result = await context.isConnected()
        const expected = 'Conectado'

        assert.deepEqual(result, expected)
    })

    it('cadastrar', async () => {
        const {nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)
       // console.log('result', result)
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })

    it('listar', async() => {
        
        
        const [{nome, poder}] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome})
        const result = {
           nome, poder
        }
        
        assert.deepEqual(result, MOCK_HEROI_DEFAULT)
    })

    it('atualizar', async() => {
        console.log('MOCK_HEROI_ID', MOCK_HEROI_ID)
        const result = await context.update(MOCK_HEROI_ID, {
            nome: 'Pernalonga'
        })

        assert.deepEqual(result.nModified,1 )
    })

    it('remover', async() => {
        const result = await context.delete(MOCK_HEROI_ID)
        assert.deepEqual(result.n, 1)
    })
})
