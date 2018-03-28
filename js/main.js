/*----- constants -----*/
//create array with all the winning combinations
var lookup = {
    '1': 'red',
    '-1': 'black',
    'null': 'white' 
};

var coinDrop = new Audio("sounds/350874__cabled-mess__coin-c-08.wav");
/*----- app's state (variables) -----*/
var board, turn, winner, message;


/*----- cached element references -----*/
//querySelect elements (e.g board) that i will reuse
var message = document.getElementById('message');
// console.log(message)
var cells = document.querySelectorAll('td');
// console.log(cells)

/*----- event listeners -----*/
// addEventListener for newGame button and and for the board
document.querySelector('table').addEventListener('click', handleClick);
document.getElementById('reset').addEventListener('click', init);


// document.getElementById('startgame').addEventListener('click', startGame);
/*----- functions -----*/

// function startGame(e) {
//  var hide = document.getElementById('maindiv');
//  hide.className = 'hidden'
// }

// console.log(startgame)

// handleMove function
function handleClick(e) {
        // obtain idx of square
        e.target.tagName === "TD";
        var colIdx = parseInt(e.target.id.charAt(3));
        var rowIdx = board[colIdx].indexOf(null);
        if (rowIdx === -1) return;
        // update state (board, turn, winner)
        board[colIdx][rowIdx] = turn;
        turn *= -1;
        coinDrop.play();
        // call render
        render();
}


// getWinner function
function getWinner() {
    
}


// render function
function render() {
    board.forEach(function(colArr, colIdx) {
      var foundNull = false;
      colArr.forEach(function(val, rowIdx) {
        var td = document.getElementById(`r${rowIdx}c${colIdx}`);
        // var tr = document.querySelectorAll('tr');
          if (winner === 'T') {
            message.innerHTML = 'Rats, another tie!';
        } else if (winner) {
            message.innerHTML = `Congrats ${lookup[winner].toUpperCase()}!`;
        } else {
            message.innerHTML = `${lookup[turn].toUpperCase()}'s Turn`
        }
        
        td.style.backgroundColor = lookup[val];
        if (!val && !foundNull && turn === 1) {
          td.className = 'newmove';
          foundNull = true;
        } else if (!val && !foundNull && turn === -1) {
          td.className = 'newmove2';
          foundNull = true;
        } else {
          td.className = '';
        }

        document.querySelector('#wrapper').style.borderColor = lookup[turn];
        message.style.color = lookup[turn];
      });
    });
}


// init function
function init() {
     board = [
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null]
     ];
   turn = 1;
   winner = null;
   render();
}

init();











