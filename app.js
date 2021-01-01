// HTML Elements
const statusDiv = document.querySelector(".status");
const resetDiv = document.querySelector(".reset");
const cellDivs = document.querySelectorAll(".game-cell");

// game variables
let gameIsLive = true;
let xIsNext = true;
let winner = null;

// functions

function checkWinner(cell1, cell2, cell3)
{
    if(cell1 && cell1 === cell2 && cell1 === cell3){
        winner = cell1;
        return true;
    }
    return false;
}

const checkGameStatus = () => {
    const topLeft = cellDivs[0].classList[2];
    const topMiddle = cellDivs[1].classList[2];
    const topRight = cellDivs[2].classList[2];
    const middleLeft = cellDivs[3].classList[2];
    const middleMiddle = cellDivs[4].classList[2];
    const middleRight = cellDivs[5].classList[2];
    const bottomLeft = cellDivs[6].classList[2];
    const bottomMiddle = cellDivs[7].classList[2];
    const bottomRight = cellDivs[8].classList[2];
    
    console.log(topLeft, topMiddle, topRight);

    // check winner
    if(checkWinner(topLeft, topMiddle, topRight) ||
       checkWinner(middleLeft, middleMiddle, middleRight) ||
       checkWinner(bottomLeft, bottomMiddle, bottomRight) || 
       checkWinner(topLeft, middleLeft, bottomLeft) ||
       checkWinner(topMiddle, middleMiddle, bottomMiddle) ||
       checkWinner(topRight, middleRight, bottomRight) ||
       checkWinner(topLeft, middleMiddle, bottomRight) ||
       checkWinner(topRight, middleMiddle, bottomLeft)){
        
        gameIsLive = false;
        if(winner == 'x')
            statusDiv.innerHTML = `X has won!`;
        else
            statusDiv.innerHTML = `<span class="o-won">O</span> has won!`;
        console.log('WON');
        
    }
    else if(topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight 
        && middleRight && bottomLeft && bottomMiddle && bottomRight){
        statusDiv.innerHTML = `It's a draw!`;
    }
    else{
        xIsNext = !xIsNext;
        if(xIsNext)
            statusDiv.innerHTML = `X is next`;
        else
            statusDiv.innerHTML = `<span class="o-won">O</span> is next`; 
    }
}


// event Handlers
const handleReset = () => {
    xIsNext = true;
    statusDiv.innerHTML = 'X is next';
    for(const cellDiv of cellDivs){
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
    }
    winner = null;
    gameIsLive = true;
};

const handleCellClick = (e) => {
    const classList = e.target.classList;
    const location = classList[1];
    
    if(!gameIsLive || classList[2] === 'x' || classList[2] === 'o'){
        // then it already contains an x or o
        return;
    }

    if(xIsNext){
        classList.add('x');
        checkGameStatus();
    }
    else{
        classList.add('o');
        checkGameStatus();
    }
};

// event listeners
resetDiv.addEventListener('click', handleReset);

for(const cellDiv of cellDivs)
{
    cellDiv.addEventListener('click', handleCellClick);
}