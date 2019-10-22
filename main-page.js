etchASketch(16, 16);

function etchASketch(numRows, numColumns){
    createGrid(numRows, numColumns);
    document.getElementById('black').addEventListener('click', blackColor);
    document.getElementById('random-color').addEventListener('click', randomColor);
    document.getElementById('reset').addEventListener('click', resetGrid);
    document.getElementById('resize').addEventListener('click', resizeGrid);
}

function createGrid(numRows, numColumns){
    const gridContainer = document.getElementById("grid");
    gridContainer.style.setProperty('--grid-rows', numRows);
    gridContainer.style.setProperty('--grid-columns', numColumns);

    for(let i = 0; i < (numRows * numColumns); i++){
        let cells = document.createElement('div');
        gridContainer.appendChild(cells).className = "grid-cells";
    }
}

function mouseTrackColor(color){
    let cells = document.querySelectorAll('.grid-cells');
    isDragging = false;
    cells.forEach((cell) =>{
        //for first click on any cell
        cell.addEventListener('mousedown', function(){
            cell.style.backgroundColor = color;
            isDragging = true;
            console.log('changing color to black');
        });

        //for dragging from that position
        cell.addEventListener('mouseover', function(){
            if(isDragging){
                cell.style.backgroundColor = color;
            }
        });

        //when mouseup, stop the dragging and coloring
        cell.addEventListener('mouseup', function(){    
            isDragging = false;
            cell.removeEventListener('mouseover', function(){
                cell.style.backgroundColor = color;
            });
        });
    });
}

function blackColor(){
    mouseTrackColor('black');
}

function randomColor(){
    color = randomColorGenerator(0, 255);
    mouseTrackColor(color);
}

function randomColorGenerator(min, max){
    let red = Math.floor(Math.random() * (max- min + 1) + min);
    let green = Math.floor(Math.random() * (max - min + 1) + min);
    let blue = Math.floor(Math.random() * (max - min + 1) + min);

    console.log("red is : " + red);
    console.log("green is: " + green);
    console.log("blue is : " + blue);

    return 'rgb(' + red + ', ' + green + ', ' + blue + ')'; 
}

function resetGrid(){
    let cells = document.querySelectorAll('.grid-cells');
    const resetButton = document.getElementById("reset");

    resetButton.addEventListener('click', ()=>{
        cells.forEach((cell) =>{
            cell.style.backgroundColor = 'white';
            cell.style.transition = '0.4s';
        });
    });
}

function clearGrid(){
    let cells = document.querySelectorAll('.grid-cells');

    cells.forEach((cell) =>{
        cell.remove();
    });
}

function resizeGrid(){
    let size = prompt("Enter the size you want");
    console.log("size entered : " + size);
    clearGrid();
    etchASketch(size, size);
}