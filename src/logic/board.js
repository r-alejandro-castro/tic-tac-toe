import { winningCombinations } from "../constants";

export const checkWinnerFrom = (boardToCheck) =>{

  const winningCombination = winningCombinations;

  for (const combo of winningCombination) {
    const [a, b, c] = combo;
    if(
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    )
    {
      return boardToCheck[a]; // Retorna 'X' o 'O'
    }
  }

  return null; // No hay ganador
}


  // Comprueba si el tablero está terminado
export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
  };