const canvas = document.querySelector('#game'); //seleccionar el elemento canva del html
//acceder a los elementos del canvas, agregar un contexto
const game = canvas.getContext('2d');

let elementsSize;
let canvasSize;

window.addEventListener('load',setCanvasSize); //llamar la funion starGame , setCanvasSize
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

//para recorrer el arreglo
//forEach => recorrer un array
mapRowsCols.forEach((row, rowIndex) => { //filas
    row.forEach((col, colIndex) =>{
        const emoji = emojis[col];
        const posX= elementsSize * (colIndex); //ubicacion de los objetos
        const posY= elementsSize * (rowIndex+1);  //ubicacion de los objetos      
        game.fillText(emoji, posX, posY);     
    });
});

//recorrer el arrays
// for (let row = 1; row <= 10 ; row++) {
//     for (let col = 0; col < 10 ; col++) {
//         game.fillText(emojis[mapRowsCols[row-1][col]], elementsSize *col ,elementsSize *row);    
//     }
// }
}



