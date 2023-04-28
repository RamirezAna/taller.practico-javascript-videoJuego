const canvas = document.querySelector('#game'); //seleccionar el elemento canva del html
//acceder a los elementos del canvas, agregar un contexto
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');
const btns = document.querySelector('.btns');
const reloadGame = document.querySelector('#reload');


let elementsSize;
let canvasSize;
let level = 0;
let lives =3;

let timeStart;
let timePlayer;
let timeInterval;
let localRecord = +(localStorage.getItem('localRecord'));

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

//funcion de redondeo de decimales p/implementar
function fixNumber(n){
    return Number(n.toFixed(0))
}

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
    
    canvasSize = Number(canvasSize.toFixed(0));//mi tamaño de canva  limitamos los valores decimales

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
     
    elementsSize =(canvasSize /10)-1;
    
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function startGame(){ //tamaño de los elementos  
    game.font = elementsSize +'px Verdana';  //tamaño de la bomba, X
    game.textAlign = ""

    const map = maps[level];

    if(!map){
        gameWin();//funcion de fin del juego
        return;//termina
    }

    if(!timeStart){
        timeStart = Date.now();
        timeInterval = setInterval(mostrarTiempo, 100);
        showRecord();//visualiza el record
    }

    const mapRows = map.trim().split('\n'); //trim=limpia los espacion .split=tener en cuenta para la separacion en este caso el salto de lines \n
    const mapRowsCols = mapRows.map(row => row.trim().split(''));//para recorrer el arreglo por cada elemento.

    mostrasVidas();//muestra las vidas

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
            levelWin();//funcion de subir de nivel
    } 

    //find = verificar segun la condicion que se vaya dentro
    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX= enemy.x == playerPosition.x;
        const enemyCollisionY= enemy.y == playerPosition.y;

        return enemyCollisionX && enemyCollisionY;//retornara true si solo son iguales
    });
    //si es true, significa que chocaste con el enemigo
    if(enemyCollision){ 
        levelFail();//cuando choques, debes empezar de nuevo
    } 

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin(){
    console.log('Subiste de Nivel');
    level++;
    startGame();
}

function gameWin(){
    console.log('Juego terminado');
    clearInterval(timeInterval); //para mi tiempo al llegar a la meta
 
    const recordTime = localStorage.getItem('record_time');//consultar la variable de tiempo guardado
    const playerTime = Date.now() - timeStart;

    if(recordTime){
        if(recordTime >= playerTime){
            localStorage.setItem('record_time', playerTime);
             pResult.innerHTML = 'SUPERASTE EL RECORD!!';
        }else{
           pResult.innerHTML = 'No superaste el record!';
        }
    }else{
        localStorage.setItem('record_time', playerTime);
        pResult.innerHTML = 'BIEN!!';
    }
    startTime = undefined;
    btns.classList.toggle('hide');
    reloadGame.classList.toggle('hide');
}

function levelFail(){   
    console.log('Chocaste contra un enemigo'); 
    lives--; //resta


    if(lives <= 0){        
        level=0; 
        lives=3;
        timeStart = undefined;//cuando pieder las vidas vuelve a resetear el tiempo
    }

    playerPosition.x = undefined;//undefined para volver a reiniciar las posiciones
    playerPosition.y = undefined;
    startGame();     
}

function mostrasVidas(){
    //crea un arreglo de la cantidad de corazones segun la vida
    const heartArray= Array(lives).fill(emojis['HEART']) //crea un array con la cantidad de elemento que le pasamos. ejemplo array[1,2,3] crea un array con 3 posiciones como ejemplo
   spanLives.innerHTML= "";//limpiar antes de cargar
   heartArray.forEach(heart => spanLives.append(heart));//mostrar en html
 //  spanLives.innerHTML= heartArray;
}

function mostrarTiempo(){
    spanTime.innerHTML = Date.now() - timeStart;
}

function showRecord(){
    spanRecord.innerHTML = localStorage.getItem('record_time');
}

window.addEventListener('keydown', moveTeclas); //movimientos de las reclas
//movimientos de los botones
btnUp.addEventListener('click', moveUp); 
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

//boton de reiniciar
reloadGame.addEventListener('click', ()=> {
    location.reload()
})

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

