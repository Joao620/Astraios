const express = require('express')
const {criarCanvas} = require('./criarCanvas')
const PrimoNumGen = require('./PrimoNumGen')
const app = express()

app.use(express.json())
primoGen = new PrimoNumGen('./numerosPrimos.txt')

app.get('/api/:dimensao([0-9]+[xX][0-9]+)/:primo(\\d+|)', (req, res) => {
  let altura, largura, primo
  try {
    [altura, largura, primo] = tratarDados(req.params.dimensao, req.params.primo)
  } catch(err) {
    console.log(err)
    res.send(err)
  }

  console.log(primo)

  const canvas = criarCanvas(largura, altura, primo)
  const canvasBuffer = canvas.toBuffer('image/png')
  res.setHeader('Content-Type', 'image/png')
  res.send(canvasBuffer)

})

let porta = process.env.PORT || 8080
app.listen(porta)

function tratarDados(dimensaoRaw, primoRaw){
  const [larguraTexto, alturaTexto] = dimensaoRaw.split('x') || dimensaoRaw.split('X')
  larguraNumero = parseInt(larguraTexto)
  alturaNumero = parseInt(alturaTexto)

  if (larguraNumero > 4000 || alturaNumero > 4000){
    throw "dimensions too big, limit is 4000"
  }


  primoNumero = parseInt(primoRaw)
  if (isNaN(primoNumero)){
    primoNumero = primoGen.novoPrimo()
  } else if (!ehPrimo(primoNumero)){
    throw "number passed isn't prime"
  }

  return [larguraNumero, alturaNumero, primoNumero]

}

function ehPrimo(num){
  for(let i = 2, s = Math.sqrt(num); i <= s; i++)
    if(num % i === 0) return false; 
  return num > 1;
}
