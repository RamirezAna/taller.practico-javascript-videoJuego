const canvas = document.querySelector('#game'); //seleccionar el elemento canva del html
//acceder a los elementos del canvas, agregar un contexto
const game = canvas.getContext('2d');

window.addEventListener('load',startGame); //llamar la funion starGame , 'load' significa que apenas cargue

function startGame(){
   // game.fillRect(0,50,100,100);
   //  game.fillRect(0,0,100,100);
   // game.clearRect(0,0,50,50); 
   // game.clearRect(50,50,50,50); 
   // game.clearRect(0,0,50,50);

   // x => mover horizontal
   // y => mover vertical
   game.font = '16px Verdana'
   game.fillStyle = 'purple'; //aplica para textos o para los rectangulos
   game.textAlign = 'left';
   game.fillText('PLatzi', 25, 25); //insertar textos , posicion, posicion
}
