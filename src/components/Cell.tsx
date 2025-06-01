import React from 'react';

interface CellProps {
  value: 'X' | 'O' | null;
  onClick: () => void;
  isWinningCell?: boolean;
  isNextRemoval?: boolean;
}

const Cell: React.FC<CellProps> = ({ value, onClick, isWinningCell, isNextRemoval }) => {
  return (
    <button 
      className={`cell ${isWinningCell ? 'winning' : ''} ${value ? 'occupied' : ''} ${isNextRemoval ? 'next-removal' : ''}`} 
      onClick={onClick} 
      disabled={!!value}
    >
      {value}
      {isNextRemoval && <span className="removal-indicator">⚠️</span>}
    </button>
  );
};

export default Cell;
