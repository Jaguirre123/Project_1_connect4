
var turn, grid;

function init() {
     grid = [null, null, null, 
                null, null, null,
                null,  null, null];
    // document.querySelector('td').textContent = "";
    turn = "X";
    for(var i = 0; i < (document.querySelector("td")).length; i++ ) {
        document.querySelector[i] = "";
    }
    setMessage(turn + " get's to start")
}


function setMessage(msg) {
    document.getElementById("messages").innerText = msg;
}


// var boxChecked = document.querySelector('td');


document.querySelector('table').addEventListener('click', handleClick);

init();

function handleClick(table) {
    // var cont = e.target.textContent;
    // console.log(e.target);
    if(grid[table.target.id] === null) {
        console.log(table.target.id);
        table.target.textContent = turn;
        grid[table.target.id] = turn;
        console.log(grid)
    } 
}




function nextMove() {
    if(square.innerText == '') {
     square.innerText = document.turn;
     render();
    } else {
        setMessage("pick a different square")
    }
}



