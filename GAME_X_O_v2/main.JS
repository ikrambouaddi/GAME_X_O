const X_CLASS = 'x'
const CERCLE_CLASS = 'cercle'
const WINNING_COMPANITION = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
]
const  wenningMessageTextElement = document.querySelector('[data-wenning-message-text]')
const  esetedButton = document.getElementById('restad')
const cellElement = document.querySelectorAll('[data-cell]')
const  wenningMessage = document.getElementById('winningMessage')

let cerclTurn

startGame()
esetedButton.addEventListener('click',startGame)
function startGame(){
    cerclTurn = false 
    cellElement.forEach(cell =>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CERCLE_CLASS)
        cell.removeEventListener('click',handleClick )
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass() 
    wenningMessage.classList.remove('show')
}
function handleClick (e){
const cell = e.target
const currentClass = cerclTurn ? CERCLE_CLASS : X_CLASS
placeMark(cell, currentClass)
    if(checkWin(currentClass)){
        console.log("winner")
        endGame(false)
    }else if(isDraw()){
        endGame(true)
    }else{
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw){
    if(draw){
        wenningMessageTextElement.innerText = "Draw!"
    }else{
        wenningMessageTextElement.innerText =`${cerclTurn ? "o's":"x's"}wins!`
    }
    wenningMessage.classList.add('show')
}

function isDraw(){
    return [...cellElement].every(cell => {
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(CERCLE_CLASS)
    }) 
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}  

function swapTurns(){
    cerclTurn = !cerclTurn
}
function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CERCLE_CLASS)
    if(cerclTurn){
        board.classList.add(CERCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }
}


function checkWin(currentClass){
    return WINNING_COMPANITION.some(combination =>{
        return combination.every(index => {
            return cellElement[index].classList.contains(currentClass) 
        })
    })
}