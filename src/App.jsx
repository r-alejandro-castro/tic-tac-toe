import { useState } from "react"

const Turns = {
  X: 'x',
  O: 'o',
}


const Square = ({children, isSelected, updateBoard, index}) => {

  const className = `square ${isSelected ? 'is-selected' : ''}`

  return (
    <div className={className}>
      {children}
    </div>
  )
}

function App() {
  
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )

  const [turn, setTurn] = useState(Turns.X)

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
