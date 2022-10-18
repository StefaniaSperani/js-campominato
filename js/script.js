'use strict';
/*
l'utente clicca su una cella: 
se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - 
la cella si colora di rosso e la partita termina, 
altrimenti la cella cliccata si colora di azzurro e 
l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba 
o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, 
cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

BONUS:
1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
*/

const playBtn = document.getElementById('play');

function play() {
    console.log('Inizia!');
    let tentativiMax = 0;
    const NUM_BOMB = 16;
    const bombsPosition = [];
    let punteggioMax = 0;

    let numCell;
    const playground = document.getElementById('playground');
    playground.innerHTML = '';

    const levelHtml = document.getElementById('difficulty');
    const level = levelHtml.value;

    switch (level) {
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

    while (bombsPosition.length < NUM_BOMB) {
        const bomb = randomNumber(1, numCell);
        if (!bombsPosition.includes(bomb)) {
            bombsPosition.push(bomb);
        }
    }
    // console.log(bombsPosition);

    punteggioMax = numCell - NUM_BOMB;
    // console.log(punteggioMax);

    function clickOnCell(cella, numero) {
        cella.removeEventListener('click', clickOnCell);
        if (bombsPosition.includes(numero)) {
            cella.classList.add('click-color-bomb');
            endGame(); //collego la funzione all'evento della bomba

        } else {
            cella.classList.add('click-color');
            tentativiMax++
            console.log(tentativiMax)
            if(tentativiMax === punteggioMax){
                endGame();
            }
        }
    }

    function drawCell(num) {
        const cellPerSide = Math.sqrt(numCell);
        const cell = document.createElement('div');
        cell.className = 'square';
        cell.style.width = `calc(100% /${cellPerSide})`;
        cell.style.height = `calc(100% /${cellPerSide})`;
        cell.innerHTML = `
            <span>${num}</span>
        `;
        cell.addEventListener('click', () => clickOnCell(cell, num));
        return cell;
    }

    function drawGrid() {
        const grid = document.createElement('div');
        grid.className = 'grid';
        for (let i = 1; i <= numCell; i++) {
            const cell = drawCell(i);
            grid.appendChild(cell);
        }
        playground.appendChild(grid);
    }
    drawGrid();

    //1. Creo la funzione che al click della bomba
    //inserirà un messaggio nell'html di sconfitta
    function endGame() {
        //quindi, creo la variabile che prende il div dall'html
        let message = document.getElementById('message');
        //e al suo interno inserirò il messaggio, poi(riga 67)
        message.innerHTML = `
        <div class="red-text">Bomba! Hai perso!</div> `;

        const squares = document.getElementsByClassName('square');
        for (let i = 0; i < squares.length; i++) {
            squares[i].removeEventListener('click', clickOnCell);

        }
    }
}
playBtn.addEventListener('click', play);