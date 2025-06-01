import React from 'react';
import './App.css';
import Board from './components/Board';
import { useTicTacToe } from './hooks/useTicTacToe';

function App() {
  const {
    board,
    winner,
    winningCells,
    isDraw,
    handleClick,
    resetGame,
    showNextRemoval,
    toggleNextRemovalFeature,
    nextRemovalIndex,
    status,
    firstPlayer,
    changeFirstPlayer,
    isGameInProgress
  } = useTicTacToe();

  return (
    <div className="game-container">
      <h1>🎮 Tic Tac Toe</h1>
      <div className="status-message">{status}</div>
      <Board 
        board={board} 
        onClick={handleClick} 
        winningCells={winningCells} 
        nextRemovalIndex={nextRemovalIndex}
      />
      {(winner || isDraw) && (
        <button className="reset-button" onClick={resetGame}>
          🔄 Play Again? ({firstPlayer} goes first)
        </button>
      )}
      <div className="feature-controls">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={showNextRemoval}
            onChange={toggleNextRemovalFeature}
          />
          💡 Show next tile to be removed
        </label>
        
        <div className="first-player-control">
          <span>🎲 First Player: </span>
          <label className="radio-label">
            <input
              type="radio"
              name="firstPlayer"
              value="X"
              checked={firstPlayer === 'X'}
              onChange={() => changeFirstPlayer('X')}
              disabled={isGameInProgress}
            />
            X
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="firstPlayer"
              value="O"
              checked={firstPlayer === 'O'}
              onChange={() => changeFirstPlayer('O')}
              disabled={isGameInProgress}
            />
            O
          </label>
        </div>
      </div>
      <div className="instructions">
        <p>🎯 First player to get 3 in a row wins!</p>
        <p>💡 If a player has 3 pieces on the board and makes a new move, their oldest piece is removed.</p>
      </div>
    </div>
  );
}

export default App;
