
const SQAURES_IN_CHECKBOX_PER_ROW_AND_COULUMN = 8;
const WHITECOLOUR = "white";
const BLACKCOLOUR = "black";

function Chess(ele) {
    this.element = document.querySelector(ele);
    this.init();
    this.addEventListeners();
}


//generate chessbox
Chess.prototype.init = function () {

    const fragment = document.createDocumentFragment();

    let paintBackgroundColor = WHITECOLOUR

    for (let i = 0; i < SQAURES_IN_CHECKBOX_PER_ROW_AND_COULUMN; i++) {

        const row = document.createElement('div');
        const rowFragment = document.createDocumentFragment();

        for (let j = 0; j < SQAURES_IN_CHECKBOX_PER_ROW_AND_COULUMN; j++) {

            var square = document.createElement("div");
            square.classList.add("square");
            square.classList.add(paintBackgroundColor === WHITECOLOUR ? "whiteBackground" : "blackBackground");

            //to bbgColor the next div color
            paintBackgroundColor = paintBackgroundColor === BLACKCOLOUR ? WHITECOLOUR :BLACKCOLOUR;

            square.dataset.column = j;
            square.dataset.row = i;

            rowFragment.appendChild(square);
        }

        //the bgColor to start with in the next row
        paintBackgroundColor = paintBackgroundColor === BLACKCOLOUR ? WHITECOLOUR :BLACKCOLOUR;

        row.appendChild(rowFragment);
        fragment.appendChild(row);
    }

    this.element.appendChild(fragment);
}

Chess.prototype.addEventListeners = function () {
    this.element.addEventListener('click', this.squareClick.bind(this))
}

Chess.prototype.flushPreviousSelection = function () {

    let squareHolders = this.element.children;

    for(let i = 0; i < squareHolders.length; i++) {

        let row = squareHolders[i].children;

        for(let j = 0; j < row.length; j++) {
            row[j].classList.remove('red');
        }
    }

}

Chess.prototype.squareClick = function (event) {

    this.flushPreviousSelection();
    let getColumnIndex = parseInt(event.target.dataset.column);
    let getRowIndex = parseInt(event.target.dataset.row);

    let tempColumnIndex = getColumnIndex;
    let tempRowIndex = getRowIndex;

    while (tempColumnIndex >= 0 && tempRowIndex >= 0) {
        let getRow = this.element.children[tempRowIndex];
        let getSquare = getRow.children[tempColumnIndex];
        getSquare.classList.add('red');
        tempColumnIndex--;
        tempRowIndex--;
    }


    tempColumnIndex = getColumnIndex;
    tempRowIndex = getRowIndex;

    while (tempColumnIndex < SQAURES_IN_CHECKBOX_PER_ROW_AND_COULUMN && tempRowIndex < SQAURES_IN_CHECKBOX_PER_ROW_AND_COULUMN) {
        let getRow = this.element.children[tempRowIndex];
        let getSquare = getRow.children[tempColumnIndex];
        getSquare.classList.add('red');
        tempColumnIndex++;
        tempRowIndex++;
    }

    tempColumnIndex = getColumnIndex;
    tempRowIndex = getRowIndex;

    while (tempColumnIndex >= 0 && tempRowIndex < SQAURES_IN_CHECKBOX_PER_ROW_AND_COULUMN) {
        let getRow = this.element.children[tempRowIndex];
        let getSquare = getRow.children[tempColumnIndex];
        getSquare.classList.add('red');
        tempColumnIndex--;
        tempRowIndex++;
    }

    tempColumnIndex = getColumnIndex;
    tempRowIndex = getRowIndex;

    while (tempColumnIndex < SQAURES_IN_CHECKBOX_PER_ROW_AND_COULUMN && tempRowIndex >= 0) {
        let getRow = this.element.children[tempRowIndex];
        let getSquare = getRow.children[tempColumnIndex];
        getSquare.classList.add('red');
        tempColumnIndex++;
        tempRowIndex--;
    }


}




new Chess('#chessContainer');
