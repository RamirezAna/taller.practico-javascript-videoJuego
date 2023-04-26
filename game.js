const canvas = document.querySelector('#game'); //seleccionar el elemento canva del html
//acceder a los elementos del canvas, agregar un contexto
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let elementsSize;
let canvasSize;

//crear nuestro objeto/variable para nuestro posicion de jugador
const playerPosition = {
 x: undefined,
 y:undefined,
}
//para control de cuando se choca contra otro objeto el jugador
const giftPosition ={
    x: undefined,
    y: undefined,
};

//variable para detectar las colisiones de los enemigos (bombas)
let enemyPositions = [];

window.addEventListener('load',setCanvasSize); //llamar la funcion starGame , setCanvasSize
window.addEventListener('resize',setCanvasSize); //evento resive; cambio de tamaño (achicamos o voltaemos) resize ( se ponuncia risai)

function setCanvasSize(){  
    //asignar tamaño del canva, responsive.
    if(window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
    }else{
        canvasSize = window.innerHeight * 0.8;
    }
    
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
     
    
    elementsSize =(canvasSize /10)-1;
    startGame();
}

function startGame(){ //tamaño de los elementos  
    game.font = elementsSize +'px Verdana';  //tamaño de la bomba, X
    game.textAlign = ""

    const map = maps[0];
    const mapRows = map.trim().split('\n'); //trim=limpia los espacion .split=tener en cuenta para la separacion en este caso el salto de lines \n
    const mapRowsCols = mapRows.map(row => row.trim().split(''));//para recorrer el arreglo por cada elemento.

    game.clearRect(0,0,canvasSize, canvasSize);//clear limpieza
    enemyPositions = [];   //limpia 

    //para recorrer el arreglo
    //forEach => recorrer un array
    mapRowsCols.forEach((row, rowIndex) => { //filas
    row.forEach((col, colIndex) =>{
        const emoji = emojis[col];
        const posX= elementsSize * (colIndex); //ubicacion de los objetos
        const posY= elementsSize * (rowIndex+1);  //ubicacion de los objetos      
       
        if (col == 'O'){ 
            //limpieza de movimiento
            if(!playerPosition.x && !playerPosition.y){ //comparacion para poder eliminar el jugador player cada vez que se mueva y no sea valos 0
                playerPosition.x = posX;
                playerPosition.y =posY;
            }
        }else if(col == 'I'){ //position de regalito, obtener position
            giftPosition.x = posX;
            giftPosition.y = posY;
        }else if (col == 'X'){ // position de la bomba
            enemyPositions.push({
                x: posX,
                y: posY,
            });
        }
 
        game.fillText(emoji, posX, posY);     
    });
});

movePlayer(); 
}


function movePlayer(){

    console.log(playerPosition.x);
    console.log(playerPosition.y);

    //toFixed es para redondear los decimales.
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;//funcion de comparacion true/false
    
    if(giftCollision){ 
            console.log('Subiste de nivel'); 
    } 

    //find = verificar segun la condicion que se vaya dentro
    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX= enemy.x == playerPosition.x;
        const enemyCollisionY= enemy.y == playerPosition.y;

        return enemyCollisionX && enemyCollisionY;//retornara true si solo son iguales
    });
    //si es true, significa que chocaste con el enemigo
    if(enemyCollision){ 
        console.log('Chocaste contra un enemigo'); 
    } 

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

window.addEventListener('keydown', moveTeclas); //movimientos de las reclas
//movimientos de los botones
btnUp.addEventListener('click', moveUp); 
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);


//if-else
function moveTeclas(event){
 if(event.key =='ArrowUp') moveUp();
 else if(event.key =='ArrowLeft') moveLeft();
 else if(event.key =='ArrowRight') moveRight();
 else if(event.key =='ArrowDown') moveDown();
 }

function moveUp(){ 
    if((playerPosition.y - elementsSize)<elementsSize){
          console.log('ya no puedes moverte');
    }else{
        console.log('arriba');    
        playerPosition.y -= elementsSize;
        startGame(); 
    }
}
function moveLeft(){ 
    if((playerPosition.x - elementsSize)<elementsSize-(elementsSize*2)){
        console.log('ya no puedes moverte');
     }else{
        console.log('izquierda');
        playerPosition.x -= elementsSize;
        startGame();  
    }
}
function moveRight(){ 
    if((playerPosition.x + elementsSize)>canvasSize-elementsSize){
        console.log('ya no puedes moverte');
    }else{
    console.log('derecha');
    playerPosition.x += elementsSize;
    startGame();  
    }
}
function moveDown(){ 
    if((playerPosition.y + elementsSize)>canvasSize){
        console.log('ya no puedes moverte');
    }else{
    console.log('abajo'); 
    playerPosition.y += elementsSize;
    startGame();  
    }
}

