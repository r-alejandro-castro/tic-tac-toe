import { Square } from "./Square.jsx";

export function BoardGame({ updateBoard, board }) {
    return ( 
        <>
            {
            board.map((square, index) => {
                return (
                <Square key={index} index={index} updateBoard={updateBoard}>
                    {square}
                </Square>
                );
            })
            }
        </>
)}