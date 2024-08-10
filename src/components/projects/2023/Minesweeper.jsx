import React, { useState, useEffect } from "react";

const boardSize = 10;
const mineCount = 15;

const Minesweeper = () => {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const newBoard = [];
    setIsGameOver(false);

    for (let row = 0; row < boardSize; row++) {
      const rowArray = [];
      for (let col = 0; col < boardSize; col++) {
        rowArray.push({ mine: false, revealed: false, row, col });
      }
      newBoard.push(rowArray);
    }

    placeMines(newBoard);
    setBoard(newBoard);
  };

  const placeMines = (newBoard) => {
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
      const row = Math.floor(Math.random() * boardSize);
      const col = Math.floor(Math.random() * boardSize);
      if (!newBoard[row][col].mine) {
        newBoard[row][col].mine = true;
        minesPlaced++;
      }
    }
  };

  const handleCellClick = (row, col) => {
    if (isGameOver || board[row][col].revealed) return;

    const newBoard = board.slice();
    newBoard[row][col].revealed = true;

    if (newBoard[row][col].mine) {
      revealMines(newBoard);
      setIsGameOver(true);
      alert("Game Over! You hit a mine.");
    } else {
      const mineCount = getAdjacentMineCount(row, col, newBoard);
      newBoard[row][col].adjacentMines = mineCount;

      if (mineCount === 0) {
        revealAdjacentCells(row, col, newBoard);
      }

      setBoard(newBoard);
    }
  };

  const getAdjacentMineCount = (row, col, newBoard) => {
    let count = 0;
    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        const newRow = row + r;
        const newCol = col + c;
        if (
          newRow >= 0 &&
          newRow < boardSize &&
          newCol >= 0 &&
          newCol < boardSize
        ) {
          if (newBoard[newRow][newCol].mine) {
            count++;
          }
        }
      }
    }
    return count;
  };

  const revealAdjacentCells = (row, col, newBoard) => {
    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        const newRow = row + r;
        const newCol = col + c;
        if (
          newRow >= 0 &&
          newRow < boardSize &&
          newCol >= 0 &&
          newCol < boardSize
        ) {
          if (!newBoard[newRow][newCol].revealed) {
            newBoard[newRow][newCol].revealed = true;
            const mineCount = getAdjacentMineCount(newRow, newCol, newBoard);
            newBoard[newRow][newCol].adjacentMines = mineCount;
            if (mineCount === 0) {
              revealAdjacentCells(newRow, newCol, newBoard);
            }
          }
        }
      }
    }
  };

  const revealMines = (newBoard) => {
    newBoard.forEach((row) => {
      row.forEach((cell) => {
        if (cell.mine) {
          cell.revealed = true;
        }
      });
    });
    setBoard(newBoard);
  };

  const resetGame = () => {
    initGame();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>Minesweeper</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${boardSize}, 40px)`,
          gap: "2px",
          marginBottom: "20px",
        }}
      >
        {board.map((row) =>
          row.map((cell) => (
            <div
              key={`${cell.row}-${cell.col}`}
              onClick={() => handleCellClick(cell.row, cell.col)}
              style={{
                width: "40px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid black",
                backgroundColor: cell.revealed ? "lightgray" : "transparent",
                color: cell.revealed && cell.mine ? "red" : "black",
                cursor: "pointer",
              }}
            >
              {cell.revealed
                ? cell.mine
                  ? "💣"
                  : cell.adjacentMines > 0
                  ? cell.adjacentMines
                  : ""
                : ""}
            </div>
          ))
        )}
      </div>
      <button
        onClick={resetGame}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Reset Game
      </button>
    </div>
  );
};

export default Minesweeper;
