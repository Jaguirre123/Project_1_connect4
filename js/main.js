/*----- constants -----*/
var lookup = {
  '1': 'red',
  '-1': 'black',
  'null': 'white'
};

var coinDrop = new Audio("sounds/350874__cabled-mess__coin-c-08.wav");
var bell = new Audio("sounds/boxing-bell.mp3");
var champ = new Audio("sounds/yanp.mp3");
var laugh = new Audio ("sounds/hahahahihihihehehe.mp3");
var sparta = new Audio ("sounds/thisissparta.swf.mp3");
var smooth = new Audio ("sounds/1_82.mp3");
var congrats = new Audio ("sounds/congrats.mp3");
var easy = new Audio ("sounds/easy.mp3");
var homer = new Audio ("sounds/homer.mp3");
var petergee = new Audio ("sounds/petergee.mp3");
var sounds = [sparta, champ, laugh, smooth, congrats, easy, homer, petergee];

/*----- app's state (variables) -----*/
var board, turn, winner, timerId;


/*----- cached element references -----*/
var message = document.getElementById('message');
var wrapper = document.querySelector('#wrapper');

/*----- event listeners -----*/
document.querySelector('table').addEventListener('click', handleClick);
document.getElementById('reset').addEventListener('click', init);


/*----- functions -----*/

function getRandomSoundsIdx(max) {
  return Math.floor(Math.random() * sounds.length);
}

function randomRgb() {
  var col =  "rgb("
  + randomColor(255) + ","
  + randomColor(255) + ","
  + randomColor(255) + ")";
  wrapper.style.backgroundColor = col;
}
function randomColor(num) {          
  return Math.floor(Math.random() * num);
}   

// handleClick function
function handleClick(e) {
  if (winner || e.target.tagName !== "TD") return;
  // obtain idx of square
  var colIdx = parseInt(e.target.id.charAt(3));
  var rowIdx = board[colIdx].indexOf(null);
  if (rowIdx === -1) return;
  // update state (board, turn, winner)
  board[colIdx][rowIdx] = turn;
  turn *= -1;
  coinDrop.play();
  winner = getWinner();
  if (winner) sounds[getRandomSoundsIdx(sounds.length)].play();
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
       if (winner) {
        message.innerHTML = `${lookup[winner].toUpperCase()} WINS!`;
        randomRgb();
        if (!timerId) timerId = setInterval(randomRgb, 100);
      } else {
        message.innerHTML = `${lookup[turn].toUpperCase()}'s Turn`;
        wrapper.style.borderColor = lookup[turn];
        message.style.color = lookup[turn];
      }
      td.style.backgroundColor = lookup[val];
      var addClass = turn === 1 ?  'newmove' :  'newmove2';
      td.className = (!winner && !val && !foundNull) ? addClass : '';
      if (!val && !foundNull) foundNull = true;
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
  clearInterval(timerId);
  timerId = null;
  bell.play();

  sparta.pause();
  sparta.currentTime = 0;

  champ.pause();
  champ.currentTime = 0;

  laugh.pause();
  laugh.currentTime = 0;

  smooth.pause();
  smooth.currentTime = 0;

  congrats.pause();
  congrats.currentTime = 0;

  easy.pause();
  easy.currentTime = 0;

  homer.pause();
  homer.currentTime = 0;

  petergee.pause();
  petergee.currentTime = 0;

  wrapper.style.backgroundColor = 'white';
  render();
}

init();











