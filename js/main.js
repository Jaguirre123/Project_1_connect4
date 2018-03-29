/*----- constants -----*/
var lookup = {
  '1': 'red',
  '-1': 'black',
  'null': 'white'
};

var coinDrop = new Audio("sounds/350874__cabled-mess__coin-c-08.wav");

/*----- app's state (variables) -----*/
var board, turn, winner;


/*----- cached element references -----*/
var message = document.getElementById('message');
var cells = document.querySelectorAll('td');

/*----- event listeners -----*/
document.querySelector('table').addEventListener('click', handleClick);
document.getElementById('reset').addEventListener('click', init);


/*----- functions -----*/

// handleClick function
function handleClick(e) {
  if (winner) return;
  // obtain idx of square
  e.target.tagName === "TD";
  var colIdx = parseInt(e.target.id.charAt(3));
  var rowIdx = board[colIdx].indexOf(null);
  if (rowIdx === -1) return;
  // update state (board, turn, winner)
  board[colIdx][rowIdx] = turn;
  turn *= -1;
  coinDrop.play();
  winner = getWinner();
  render();
}


// return false, -1 or 1
function getWinner() {
  if (checkRow()) {
    return checkRow();
  } else if (checkCol()) {
    return checkCol();
  } else if (checkUpperRightDiag()) {
    return checkUpperRightDiag();
  } else if (checkUpperLeftDiag()) {
    return checkUpperLeftDiag();
  } else {
    return false;
  }
}



function checkRow() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (board[col][row] && board[col][row] === board[col+1][row] && board[col+1][row] === board[col+2][row] && board[col + 2][row] === board[col + 3][row]) {
        return board[col][row]
      }
    }
  }
  return null;
}


function checkCol() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 4; row++) {
      if (board[col][row] && board[col][row] === board[col][row+1] && board[col][row+1] === board[col][row+2] && board[col][row+2] === board[col][row+3]) {
        return board[col][row]
      }
    }
  }
  return null;
}

function checkUpperRightDiag() {
  for(var col = 0; col < 4; col++) {
    for (var row = 0; row < 3; row++) {
      if (board[col][row] && board[col][row] === board[col+1][row+1] && board[col+1][row+1] === board[col+2][row+2] && board[col+2][row+2] === board[col+3][row+3]) {
        return board[col][row];
      }
    }
  } 
  return null;
}

function checkUpperLeftDiag() {
  for(var col = 6; col > 2; col--) {
    for (var row = 0; row < 3; row++) {
      if (board[col][row] && board[col][row] === board[col-1][row+1] && board[col-1][row+1] === board[col-2][row+2] && board[col-2][row+2] === board[col-3][row+3]) {
        return board[col][row];
      }
    }
  } 
  return null;
}

// render function
function render() {
  board.forEach(function (colArr, colIdx) {
    var foundNull = false;
    colArr.forEach(function (val, rowIdx) {
      var td = document.getElementById(`r${rowIdx}c${colIdx}`);
      if (winner === 'T') {
        message.innerHTML = 'Rats, another tie!';
      } else if (winner) {
        message.innerHTML = `Congrats ${lookup[winner].toUpperCase()}!`;
      } else {
        message.innerHTML = `${lookup[turn].toUpperCase()}'s Turn`
      }
      
      td.style.backgroundColor = lookup[val];

      if (winner) return;

      if (!val && !foundNull && winner && turn === 1) {
        td.className = 'newmove';
        foundNull = true;
      } else if (!val && !foundNull && winner && turn === -1) {
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











