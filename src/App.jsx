import { useState } from "react";
import useCheckWinner from './hooks/useCheckWinner';

// Turnos
const Turns = {
  X: "x",
  O: "o",
};

const checkWinner = useCheckWinner

// Componente de cuadrado
const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

function App() {
  // Estado del tablero
  const [board, setBoard] = useState(Array(9).fill(null));

  // Estado del turno
  const [turn, setTurn] = useState(Turns.X);

  // Estado del ganador
  const [winner, setWinner] = useState(null);

  // Actualiza el tablero
  const updateBoard = (index) => {
    // Si ya hay un valor en el tablero o hay un ganador, no hacer nada
    if (board[index] !== null || winner) return;

    // Actualiza el tablero con el turno actual
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard); //asincrono

    // Cambia el turno
    const newTurn = turn === Turns.X ? Turns.O : Turns.X;
    setTurn(newTurn);

    // Comprueba si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      alert(`El jugador ${newWinner} ha ganado!`);
    }
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>

      {/* Tablero de juego */}
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      {/* Turnos */}
      <section className="turn">
        <Square isSelected={turn === Turns.X}>{Turns.X}</Square>
        <Square isSelected={turn === Turns.O}>{Turns.O}</Square>
      </section>

      {/* Mostrar el ganador si existe */}
      {winner && <h2>Winner is: {winner}</h2>}
    </main>
  );
}

export default App;
