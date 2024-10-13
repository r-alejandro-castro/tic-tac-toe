import confetti from "canvas-confetti";
import { useState } from "react";
import { Turns } from "../constants.js";
import { checkWinnerFrom, checkEndGame } from './board.js';

export const useGame = () => {

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

    // Actualiza el tablero
    const updateBoard = (index) => {
        // Si ya hay un valor en el tablero o hay un ganador, no hacer nada
        if (board[index] !== null || winner) return;

        // Actualiza el tablero con el turno actual
        const newBoard = [...board];
        newBoard[index] = turn;
        setBoard(newBoard); // asincrono

        // Cambia el turno
        const newTurn = turn === Turns.X ? Turns.O : Turns.X;
        setTurn(newTurn);

        // Comprueba si hay ganador
        const newWinner = checkWinnerFrom(newBoard);
        
        if (newWinner) {
            confetti();
            setWinner(newWinner);
        } else if (checkEndGame(newBoard)) {
            setWinner(false); // empate
        }
    };

    return { board, turn, winner, resetGame, updateBoard };
};