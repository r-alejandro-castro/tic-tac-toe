import { Turns } from "./constants.js";
import { useGame } from './logic/useGame.js';
import { WinnerModal } from "./components/WinnerModal.jsx";
import { Square } from "./components/Square.jsx";
import { BoardGame } from "./components/BoardGame.jsx";

function App() {

  const { board, turn, winner, resetGame, updateBoard } = useGame();

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>

      {/* Tablero de juego */}
      <section className="game">
        <BoardGame board={board} updateBoard={updateBoard}/>
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
