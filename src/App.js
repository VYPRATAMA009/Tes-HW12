import * as React from 'react';
import './index.css';

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  function selectSquare(square) {
    if (winner || squares[square]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[square] = nextValue;
    setSquares(nextSquares);
  }

  function restart() {
    setSquares(Array(9).fill(null));
  }

  function renderSquare(i) {
    return (
      <button
        className="w-16 h-16 border-2 border-gray-500 flex items-center justify-center text-2xl"
        onClick={() => selectSquare(i)}
      >
        {squares[i]}
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="status mb-4 text-xl">{status}</div>
      <div className="board-row flex">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row flex">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row flex">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={restart}
      >
        Restart
      </button>
    </div>
  );
}

function Game() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Board />
    </div>
  );
}


function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}


function calculateNextValue(squares) {
  const xCount = squares.filter(r => r === 'X').length;
  const oCount = squares.filter(r => r === 'O').length;
  return xCount === oCount ? 'X' : 'O';
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


function App() {
  return <Game />;
}

export default App;