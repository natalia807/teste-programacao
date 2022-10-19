
var grid = new Array(rows);
var nextGrid = new Array(rows);
var DEAD = 0;
var ALIVE = 1;
var isPlaying = false;
var currentGeneration = 1;

//variaveis de configuracao do jogo!
var rows = 10; //linhas
var cols = 10; //colunas
var delayTime = 1000; //tempo de espera entre cada geracao em milisegundos! (1000 = 1s)


function InitializeGrids(){
    for (var i = 0; i < rows; i++){
        grid[i] = new Array(cols);
        nextGrid[i] = new Array(cols);
    }
}

function ResetGrids(){
    for(var i = 0; i < rows; i++){
        for(var j = 0; j < cols; j++){
            grid[i][j] = DEAD;
            nextGrid[i][j] = DEAD;
        }
    }
}

function CopyAndResetGrid(){
    for(var i = 0; i < rows; i++){
        for(var j = 0; j < cols; j++){
            grid[i][j] = nextGrid[i][j];
            nextGrid[i][j] = DEAD;
        }
    }
}

function UpdateGridContainer(){
    for(var i = 0; i < rows; i++){
        for(var j = 0; j < cols; j++){
            var td = document.getElementById(i + "_" + j);
            if (grid[i][j] == DEAD) {
                td.setAttribute("class", "dead");
            } else {
                td.setAttribute("class", "live");
            }  
        }
    }
}

function ApplyRules(row, col){
    var totalNeighbors = CountNeighbors(row, col);

    if(grid[row][col] == ALIVE){
        if(totalNeighbors < 2){
            nextGrid[row][col] = DEAD;
        }
        else if (totalNeighbors == 2 || totalNeighbors == 3) {
            nextGrid[row][col] = ALIVE;
        } 
        else if (totalNeighbors > 3) {
        nextGrid[row][col] = DEAD;
        }
    } else if (grid[row][col] == DEAD) {
        if (totalNeighbors == 3) {
            nextGrid[row][col] = ALIVE;
        }
    }
}

function NextGen(){
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            ApplyRules(i, j);
        }
    }
    CopyAndResetGrid();
    UpdateGridContainer();
    UpdateGenerationCount();
}

function UpdateGenerationCount(){
    var genCount = document.getElementById("generation-count");
    genCount.innerHTML = "Geração: " + currentGeneration;
    currentGeneration++;
}


//conta quantos vizinhos tem!
function CountNeighbors(row, col) {
    var count = 0;
    if (row-1 >= 0) {
        if (grid[row-1][col] == ALIVE) count++;
    }
    if (row-1 >= 0 && col-1 >= 0) {
        if (grid[row-1][col-1] ==ALIVE) count++;
    }
    if (row-1 >= 0 && col+1 < cols) {
        if (grid[row-1][col+1] == ALIVE) count++;
    }
    if (col-1 >= 0) {
        if (grid[row][col-1] == ALIVE) count++;
    }
    if (col+1 < cols) {
        if (grid[row][col+1] == ALIVE) count++;
    }
    if (row+1 < rows) {
        if (grid[row+1][col] == ALIVE) count++;
    }
    if (row+1 < rows && col-1 >= 0) {
        if (grid[row+1][col-1] == ALIVE) count++;
    }
    if (row+1 < rows && col+1 < cols) {
        if (grid[row+1][col+1] == ALIVE) count++;
    }
    return count;
}

function SetupButton(){
    var playButton = document.getElementById('play');
    playButton.onclick = PlayHandler;
}

function PlayHandler(){
    if (isPlaying) {
        console.log("Pause the game");
        isPlaying = false;
        this.innerHTML = "Continuar";
        clearTimeout(timer);
    } else {
        console.log("Continue the game");
        isPlaying = true;
        this.innerHTML = "Pausar";
        Play();
    }
}

function Play(){
    NextGen();

    if(isPlaying){
        timer = setTimeout(Play, delayTime);
    }
}

function CreateGrid(){
    var grid = document.getElementById("gridContainer");
    var table = document.createElement("table");

    for(var i = 0; i < rows; i++){
        var tr = document.createElement("tr");
        for(var j = 0; j < cols; j++){
            var td = document.createElement("td");
            td.setAttribute("id", i + "_" + j);
            td.setAttribute("class", "dead");

            td.onclick = CellClickHandler;
            tr.appendChild(td);
            
        }
        table.appendChild(tr);
    }
    grid.appendChild(table);
}

function CellClickHandler(){
    if(isPlaying) return;

    var data = this.id.split("_");
    var row = data[0];
    var col = data[1];

    var myClass = this.getAttribute("class");

    if(myClass.indexOf("live") > -1){
        this.setAttribute("class", "dead");
        grid[row][col] = DEAD;
    }
    else{
        this.setAttribute("class", "live");
        grid[row][col] = ALIVE;
    }
}

function Initialize(){
    CreateGrid();
    InitializeGrids();
    ResetGrids();
    SetupButton();
}

// Start everything
window.onload = Initialize;