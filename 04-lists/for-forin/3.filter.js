const { obterPessoas } = require('./service')

Array.prototype.meuFilter = function(callback){

    const lista = [];
    for(index in this){
        const item = this[index];
        const result = callback(item, index, this)

        if(!result) continue;
        lista.push(item)
    }

    return lista;

}

async function main(){
    try{
        const {
            results
        } = await obterPessoas('a')

        //const familaires = results.filter(function(item){
            //por padrao precisa retornar um boleano 
            //informar se derver matner ou remover da lista
            //false > remove da lista
            //true > mantem
            //noa encontrou -1
            //encontrou = possicaoNOarray
        //    const result = item.name.toLowerCase().indexOf('lars') !== -1

        //    return result
        //})

        const familaires = results.meuFilter((item, index, lista) => {
            console.log(`index: ${index}`, lista.length)
            return item.name.toLowerCase().indexOf('lars') !== -1 
        })

        const names = familaires.map((pessoa) => pessoa.name )
        console.log(names)

    }catch(error){
        console.error('Deu ruim', error)
    }
}

main()