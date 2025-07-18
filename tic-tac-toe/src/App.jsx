import { useState } from "react";

const initialBoard = Array(9).fill(null);

const checkWinner = (board) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6],           // Diags
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export default function App() {
  const [board, setBoard] = useState(initialBoard);
  const [isXTurn, setIsXTurn] = useState(true);

  const winner = checkWinner(board);
  const isDraw = !winner && board.every(cell => cell !== null);

  const handleClick = (i) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXTurn(true);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Tic Tac Toe</h1>

      <div className="grid grid-cols-3 gap-3">
        {board.map((cell, index) => (
          <button
            key={index}
            className="w-24 h-24 text-3xl font-bold bg-gray-800 hover:bg-gray-700 rounded flex items-center justify-center transition"
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="mt-6 text-xl">
        {winner ? (
          <div className="text-green-400">Winner: {winner}</div>
        ) : isDraw ? (
          <div className="text-yellow-400">It's a draw!</div>
        ) : (
          <div>Next Turn: {isXTurn ? "X" : "O"}</div>
        )}
      </div>

      <button
        onClick={resetGame}
        className="mt-4 px-6 py-2 rounded bg-gray-900 hover:bg-gray-700 transition"
      >
        Reset
      </button>
    </div>
  );
}
