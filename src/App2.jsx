import { useState } from "react"

//Turnos
const Turns = {
  X: 'x',
  O: 'o',
}

//Componente de cuadrado
const Square = ({children, isSelected, updateBoard, index}) => {

  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}> 
      {children}
    </div>
  )
}

//Lista de combinaciones de posiciones para ganar
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )

  const [turn, setTurn] = useState(Turns.X)

  //Usamos el hook useCheckWinner para comprobar si hay ganador
  const [winner, setWinner] = useState(null)

  //revisamos todas las combinaciones de posiciones para ver si hay ganador
  const checkWinner = (boardtoCheak) => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        boardtoCheak[a] &&
        boardtoCheak[a] === boardtoCheak[b] &&
        boardtoCheak[a] === boardtoCheak[c]
        ) {
        return boardtoCheak[a]; // Retorna 'X' o 'O'
      }
    }
    return null;
  }

  const updateBoard = (index) => {

    //Si ya hay un valor en el tablero, no se puede cambiar
    if (board[index] !== null || winner) {
      return
    }

    //Actualiza el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //Cambia el turno
    const newTurn = turn === Turns.X ? Turns.O : Turns.X
    setTurn(newTurn)

    //Comprueba si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } 
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="game">
      {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {/* {index} */}
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === Turns.X}>{Turns.X}</Square>
        <Square isSelected={turn === Turns.O}>{Turns.O}</Square>
      </section>
    </main>
  )
}

export default App
