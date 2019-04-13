/*
0 obter um usuario
1 obter o numero de telefone de um usuario a partior de um seu id
2 obter o endereco do usuario pelo id

//importamos um modulo interno do node.js
*/
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario(){

    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(function(){
                return resolve({
                    id: 1,
                    nome: 'Lucas',
                    dataNascimento: new Date()
                })
            }, 1000)
    })
    
}

main()
//1º passo add async na funcao -> automaticamente retornara uma promise
async function main() {
    try{
        console.time('medida-promise')
        const usuario = await obterUsuario()
        //const telefone = await obterTelefone(usuario.id)
        //const endereco = await obterEnderecoAsync(usuario.id)
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])

        const endereco = resultado[1]
        const telefone = resultado[0]

        console.log(`
            Nome: ${usuario.nome}
            endereco: ${endereco.rua}, ${endereco.numero}
            telefone: (${telefone.ddd})${telefone.telefone}
        `)
        console.timeEnd('medida-promise')
    }
    catch(error){
        console.error('Deu ruim', error)
    }
}

/*const usuarioPromise = obterUsuario()

usuarioPromise
    .then(function(usuario){
        return obterTelefone(usuario.id)
            .then(function resolverTelefone(result){
                return {
                    usuario: {
                        nome: usuario.nome,
                        id: usuario.id
                    },
                    telefone: result
                }
            })
    })
    .then(function(resultado){
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result){
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function (resultado){
        console.log(`
            Nome: ${resultado.usuario.nome}
            endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
            telefone: (${resultado.telefone.ddd})${resultado.telefone.telefone}
        
        `)
    })
    .catch(function (error){
        console.error('Deu ruim', error)
    })
*/
function obterTelefone(idUsuario){
    return new Promise(function resolvePromise(resolve, reject){
            setTimeout(() =>{
            return resolve( {
                telefone: '1198999888',
                ddd: '11'
            })
        }, 2000)
    })
  
}

function obterEndereco(idUsuario, callback){
    setTimeout(() =>{
        return callback(null, {
            rua: 'dos bobos ',
            numero: 0
        })
    }, 2000)
}



// obterUsuario(function resolverUsuario(error, usuario){
//     if(error){
//         console.error('Deu ruim em usuario', error)
//         return;
//     }

//     obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
//         if(error1){
//             console.error('Deu ruim em telefone', error)
//             return;
//         }
//         obterEndereco(usuario.id, function resolverEndereco(error2, endereco){
//             if(error2){
//                 console.error('Deu ruim em endereco', error2)
//                 return;
//             }

//             console.log(`
//             Nome: ${usuario.nome},
//             endereco: ${endereco.rua}, ${endereco.numero}
//             telefone: ${telefone.ddd} ${telefone.telefone}
//             `)
//         })

//     })
// });
//const telefone = obterTelefone(usuario.id)


//console.log('telefone', telefone) */