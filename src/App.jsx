import { useState } from "react";
import confetti from "canvas-confetti";

import { Turns } from "./constants.js";
import { checkWinnerFrom} from './logic/board.js';
import { WinnerModal } from "./components/WinnerModal.jsx";
import { Square } from "./components/Square.jsx";

// Componente de cuadrado


function App() {
  // Estado del tablero
  const [board, setBoard] = useState(Array(9).fill(null));

  // Estado del turno
  const [turn, setTurn] = useState(Turns.X);

  // Estado del ganador
  const [winner, setWinner] = useState(null);

  // Resetea el tablero
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(Turns.X);
    setWinner(null);
  };

  // Comprueba si el tablero está terminado
  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
  };

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
    const newWinner = checkWinnerFrom(newBoard);
    
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    }
    else if (checkEndGame(newBoard)) {
      setWinner(false); //empate
    };

  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>

      {/* Tablero de juego */}
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
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
      <WinnerModal resetGame={resetGame} winner={winner} />

      <button onClick={resetGame}>Reiniciar</button>


    </main>
  );
}

export default App;
