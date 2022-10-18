'use strict';
/*
l'utente clicca su una cella: 
se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, 
altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, 
cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

BONUS:
1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
*/

const playBtn = document.getElementById('play');

function play(){
console.log('Inizia!');
    const NUM_BOMB = 16;
    const bombsPosition = [];

    let numCell;
    const playground = document.getElementById('playground');
    playground.innerHTML = '';

    const levelHtml = document.getElementById('difficulty');
    const level = levelHtml.value;

    switch(level){
        case '1':
        default:
            numCell = 100 //facile
        break;
        case '2':
            numCell = 81; //medio
        break;
        case '3':
            numCell = 49; //difficile
        break;
    }

    while(bombsPosition.length < NUM_BOMB){
        const bomb = randomNumber(1, numCell);
        if(!bombsPosition.includes(bomb)){
            bombsPosition.push(bomb);
        }
    }
    console.log(bombsPosition);
    
    function drawCell(num){
        const cellPerSide = Math.sqrt(numCell);
        const cell = document.createElement('div');
        cell.className = 'square';
        cell.style.width = `calc(100% /${cellPerSide})`;
        cell.style.height = `calc(100% /${cellPerSide})`;
        cell.innerHTML = `
            <span>${num}</span>
        `;

        cell.addEventListener('click', function(){
            if(bombsPosition.includes(num)){
                cell.classList.add('click-color-bomb')
            }else{
                cell.classList.add('click-color');
            } 
        })
        return cell;
    }

    function drawGrid(){
        const grid = document.createElement('div');
        grid.className = 'grid';
        for(let i = 1; i <= numCell; i++){
            const cell = drawCell(i);
            grid.appendChild(cell);
        }
        playground.appendChild(grid);
    }
    drawGrid();
}
playBtn.addEventListener('click', play);