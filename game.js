const canvas = document.querySelector('#game'); //seleccionar el elemento canva del html
//acceder a los elementos del canvas, agregar un contexto
const game = canvas.getContext('2d');

window.addEventListener('load',startGame); //llamar la funion starGame , 'load' significa que apenas cargue

function startGame(){
//canvas.setAttribute('Width', window.innerWidth * 0.75)
//canvas.setAttribute('height', window.innerHeight * 0.5)

let canvasSize;
//asignar tamaño del canva, responsive.
if(window.innerHeight > window.innerWidth){
    canvasSize = window.innerWidth * 0.8;
}else{
    canvasSize = window.innerHeight * 0.8;
}

canvas.setAttribute('width', canvasSize);
canvas.setAttribute('height', canvasSize);

const elementsSize = (canvasSize / 10)-1;

game.font = elementsSize +'px Verdana';  //tamaño de la bomba, X
game.textAlign = ""
for (let i = 0; i < 10 ; i++) {
    game.fillText(emojis['X'], elementsSize *i ,elementsSize);

}

   // game.fillRect(0,50,100,100);
   // game.fillRect(0,0,100,100);
   // game.clearRect(0,0,50,50); 
   // game.clearRect(50,50,50,50); 
   // game.clearRect(0,0,50,50);

   // x => mover horizontal
   // y => mover vertical
   // game.font = '16px Verdana'
   // game.fillStyle = 'purple'; //aplica para textos o para los rectangulos
   // game.textAlign = 'left';
   // game.fillText('PLatzi', 25, 25); //insertar textos , posicion, posicion
}
