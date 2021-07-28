const fs = require('fs')

module.exports = class {
  constructor(pathListaPrimos){
    //const arquivoExiste = fs.statSync(pathListaPrimos).isFile()
    //if(!arquivoExiste){
      //throw 'Arquivo de primos em: ' + pathListaPrimos + ' não existe'
    //}

    let primosString
    try {
      primosString = fs.readFileSync(pathListaPrimos, {'encoding': 'ascii', 'flag': 'r'})
    } catch {
      throw 'Arquivo de primos em: ' + pathListaPrimos + ' não existe'
    }

    this.primosLista = primosString.split('\r\n')
  }

  novoPrimo(){
    let pos = Math.floor(Math.random() * this.primosLista.length)
    return this.primosLista[pos]
  }
}
