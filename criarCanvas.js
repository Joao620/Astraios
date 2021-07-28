const Decimal = require('decimal.js')
const {createCanvas} = require('canvas')

exports.criarCanvas = criarCanvas

function criarCanvas(alturaCanvas, larguraCanvas, primo){
  const quantPrimos = (alturaCanvas + larguraCanvas) 

  const objetoLinhas = gerarLinhas(primo, quantPrimos)
  const canvasLinhas = criarCanvasLinhas(objetoLinhas, larguraCanvas, alturaCanvas)
  const canvasPrincial = criarCanvasPrincipal(canvasLinhas, larguraCanvas, alturaCanvas)

  return canvasPrincial
}

function gerarLinhas(primo, quantPrimos){
  let PI = 3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481
  let radianMagic = PI / 180
  primoReal = digitosRaiz(primo, quantPrimos)

  primo = primoReal.valueOf().replace('.', '')

  const distancia = 10
  let startX = 0
  let startY = 0

  let maxY = 0
  let maxX = 0
  let minY = Number.MAX_VALUE
  let minX = Number.MAX_VALUE
  let lista = [[0, 0]]

  for(let digito of primo){
    let direcao = 360/10 * parseInt(digito)

    let newX = Math.round(Math.cos(direcao * radianMagic) * distancia + startX)
    let newY = Math.round(Math.sin(direcao * radianMagic) * distancia + startY)

    lista.push([newX, newY])

    startX = newX
    startY = newY

    // tenta transformar esses ifs em uma operacao matematica
    if (startX > maxX){
      maxX = startX
    } else if (startX < minX){
      minX = startX
    }

    if (startY > maxY){
      maxY = startY
    } else if (startY < minY){
      minY = startY
    }
  }

  return {
    'lista' : lista,
    'maxX' : maxX,
    'minX' : minX,
    'maxY' : maxY,
    'minY' : minY,
    'largura' :-minX + maxX,
    'altura' : -minY + maxY
  }
}


function criarCanvasLinhas(Linhas, larguraCanvas, alturaCanvas){
  const proporcao = calcularScale(
    larguraCanvas,
    alturaCanvas,
    Linhas.largura,
    Linhas.altura
  )
  const [transformX, transformY] = calcularTransform(
    Linhas.minX,
    Linhas.minY,
    Linhas.largura * proporcao,
    Linhas.altura * proporcao,
    Linhas.largura * proporcao,
    Linhas.altura * proporcao
  )

  const canvasLinhas = createCanvas(Linhas.largura * proporcao, Linhas.altura * proporcao)
  const ctx = canvasLinhas.getContext('2d')
  ctx.fillStyle = '#282828'
  ctx.fillRect(0, 0, canvasLinhas.width, canvasLinhas.height)
  
  ctx.scale(proporcao, proporcao)
  ctx.translate(transformX, transformY)

  let cores = nextColor()
  for(let i = 0; i < Linhas.lista.length - 1;i++){
    ctx.beginPath()
    ctx.moveTo(Linhas.lista[i][0], Linhas.lista[i][1])
    ctx.lineTo(Linhas.lista[i + 1][0], Linhas.lista[i + 1][1])
    ctx.strokeStyle = cores.next().value
    ctx.stroke()
  }

  return canvasLinhas
}

function criarCanvasPrincipal(canvasLinhas, larguraCanvas, alturaCanvas){
  const canvasPrincial = createCanvas(larguraCanvas, alturaCanvas)
  const ctx = canvasPrincial.getContext('2d', {alpha: false})
  ctx.fillStyle = '#282828'
  ctx.fillRect(0, 0, canvasPrincial.width, canvasPrincial.height)

  const [transformX, transformY] = calcularTransform(
    0,
    0,
    canvasLinhas.width,
    canvasLinhas.height,
    larguraCanvas,
    alturaCanvas
  )

  ctx.translate(transformX, transformY)

  ctx.drawImage(canvasLinhas, 0, 0)

  return canvasPrincial

}

function calcularScale(fundoLargura, fundoAltura, objetoLargura, objetoAltura){
  //let scaleRatio
  //if (fundoLargura > fundoAltura) {
    //scaleRatio =  fundoAltura / objetoAltura
  //} else {
    //scaleRatio =  fundoLargura / objetoLargura
  //}

  let proporcao1 = fundoLargura / fundoAltura
  let proporcao2 = objetoLargura / objetoAltura

  let scaleRatio
  if (proporcao2 >= proporcao1){
    scaleRatio = fundoLargura / objetoLargura
  } else {
    scaleRatio = fundoAltura / objetoAltura
  }
  console.log(fundoLargura, fundoAltura, objetoLargura, objetoAltura, scaleRatio)
  return scaleRatio
}

function calcularTransform(elementoX, elementoY, elementoLargura, elementoAltura, fundoLargura, fundoAltura){
  let meioColunaElemento = elementoX + elementoLargura / 2 
  let meioColunafundo = fundoLargura / 2
  let translacaoX = meioColunafundo - meioColunaElemento

  let meioHorizonteElemento = elementoY + elementoAltura / 2 
  let meioHorizontefundo = fundoAltura / 2
  let translacaoY = meioHorizontefundo - meioHorizonteElemento

  return [translacaoX, translacaoY]
}

function digitosRaiz(numPrimo, quantPrimos){
  Decimal.set({precision: quantPrimos})
  return new Decimal(numPrimo).sqrt(2)

}

function* nextColor(){
  const cores = [
    '#FB4934',
    '#B8BB26',
    '#FABD2F',
    '#83A598',
    '#D3869B',
    '#8EC07C',
    '#FE8019'
  ]

  //bagunça a lista
  cores.sort(() => Math.random() - 0.5)
  const len = cores.length
  for(let i = 0;;i = (i + 1) % len){
    yield cores[i] 
  }
}
