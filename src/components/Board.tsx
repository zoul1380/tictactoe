import React from 'react';
import Cell from './Cell';

interface BoardProps {
  board: ('X' | 'O' | null)[];
  onClick: (index: number) => void;
  winningCells?: number[] | null;
  nextRemovalIndex?: number | null;
}

const Board: React.FC<BoardProps> = ({ board, onClick, winningCells, nextRemovalIndex }) => {
  return (
    <div className="board">
      {board.map((cellValue, index) => (
        <Cell
          key={index}
          value={cellValue}
          onClick={() => onClick(index)}
          isWinningCell={winningCells?.includes(index)}
          isNextRemoval={nextRemovalIndex === index}
        />
      ))}
    </div>
  );
};

export default Board;
