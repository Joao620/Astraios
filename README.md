# Astraios
> Gerador de imagens aleatórias Incríveis

![imagem exemplar](https://raw.githubusercontent.com/Joao620/Astraios/626d5e4998929533c27a8b33aacce4281998ce83/assets/sampleImage.PNG)

## Instalação de servidor local

Linux:
```sh
git clone https://github.com/Joao620/Astraios.git
cd Astraios
npm install --production
node .
```

## Como usar a api
Usando a API publica
```
astraios.herokuapp.com/api/1234x1234/
```
Usando um servidor local
```
localhost:7777/api/1234x1234/
```
Aonde _1234_ é a resolução final da imagem, podendo ser até no máximo 4000

além disso pode ser especificado um numero primo como semente para a imagem, caso omitido um numero primo aleatório será usado
```
astraios.herokuapp.com/api/1000x1000/7
astraios.herokuapp.com/api/1280x720/42257
astraios.herokuapp.com/api/3840x2160/2
```

## Meta

João Carlos – [@João Carlos](https://www.linkedin.com/in/joão-carlos-a569a51b2) – jcarlos.paranhos@gmail.com

Distribuído sob a licença GLP-3.0. Veja `LICENSE` para mais informações.

[https://github.com/Joao620/Astraios](https://github.com/Joao620/Astraios)


