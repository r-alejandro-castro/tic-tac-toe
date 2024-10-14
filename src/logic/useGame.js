import confetti from "canvas-confetti";
import { useState } from "react";
import { Turns } from "../constants.js";
import { checkWinnerFrom, checkEndGame } from './board.js';

export const useGame = () => {

    // Estado del tablero
    const [board, setBoard] = useState(() =>{
        const boardFromStorage = window.localStorage.getItem('board')
        if (boardFromStorage)
            return JSON.parse(boardFromStorage)
            return Array(9).fill(null)
    });

    // Estado del turno
    const [turn, setTurn] = useState(() => {
        const turnFromStorage = window.localStorage.getItem('turn')
        return turnFromStorage ?? Turns.X
    });

    // Estado del ganador
    const [winner, setWinner] = useState(null);

    // Resetea el tablero
    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setTurn(Turns.X);
        setWinner(null);

        window.localStorage.clear();
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

        // guarda el turno
        window.localStorage.setItem("board", JSON.stringify(newBoard));
        window.localStorage.setItem("turn", newTurn);

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