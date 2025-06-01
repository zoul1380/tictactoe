import { useState, useCallback, useMemo } from 'react';

type Player = 'X' | 'O';
interface Move {
  player: Player;
  index: number;
  timestamp: number;
}

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const useTicTacToe = () => {
  const [firstPlayer, setFirstPlayer] = useState<Player>('X');
  const [board, setBoard] = useState<(Player | null)[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>(firstPlayer);
  const [moves, setMoves] = useState<Move[]>([]);
  const [winner, setWinner] = useState<Player | null>(null);
  const [winningCells, setWinningCells] = useState<number[] | null>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [showNextRemoval, setShowNextRemoval] = useState(false);

  // Calculate if game is in progress
  const isGameInProgress = useMemo(() => {
    return moves.length > 0 && !winner && !isDraw;
  }, [moves, winner, isDraw]);

  const handleClick = useCallback((index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newMoves = [...moves, { player: currentPlayer, index, timestamp: Date.now() }];
    setMoves(newMoves);

    if (newMoves.filter(move => move.player === currentPlayer).length > 3) {
      const oldestMove = newMoves
        .filter(move => move.player === currentPlayer)
        .sort((a, b) => a.timestamp - b.timestamp)[0];
      newBoard[oldestMove.index] = null;
      setBoard([...newBoard]); 
      setMoves(newMoves.filter(move => move.timestamp !== oldestMove.timestamp));
    }
    
    const currentWinningCombination = checkWin(newBoard, currentPlayer);
    if (currentWinningCombination) {
      setWinner(currentPlayer);
      setWinningCells(currentWinningCombination);
    } else if (newBoard.every(cell => cell !== null)) {
      setIsDraw(true);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  }, [board, currentPlayer, moves, winner]);

  const checkWin = (currentBoard: (Player | null)[], player: Player): number[] | null => {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (currentBoard[a] === player && currentBoard[b] === player && currentBoard[c] === player) {
        return combination;
      }
    }
    return null;
  };
  
  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer(firstPlayer);
    setMoves([]);
    setWinner(null);
    setWinningCells(null);
    setIsDraw(false);
  }, [firstPlayer]);
  // Function to change who goes first
  const changeFirstPlayer = useCallback((player: Player) => {
    setFirstPlayer(player);
    // Also update currentPlayer if game hasn't started yet
    if (moves.length === 0) {
      setCurrentPlayer(player);
    }
  }, [moves.length]);

  // Determine which cell will be removed next for the current player
  const getNextRemovalIndex = useCallback((): number | null => {
    if (!showNextRemoval || winner) return null;
    
    const currentPlayerMoves = moves.filter(move => move.player === currentPlayer);
    if (currentPlayerMoves.length < 3) return null;
    
    const oldestMove = currentPlayerMoves.sort((a, b) => a.timestamp - b.timestamp)[0];
    return oldestMove?.index ?? null;
  }, [moves, currentPlayer, showNextRemoval, winner]);

  const toggleNextRemovalFeature = useCallback(() => {
    setShowNextRemoval(prev => !prev);
  }, []);

  return {
    board,
    currentPlayer,
    winner,
    winningCells,
    isDraw,
    handleClick,
    resetGame,
    showNextRemoval,
    toggleNextRemovalFeature,
    nextRemovalIndex: getNextRemovalIndex(),
    status: winner ? `Player ${winner} wins!` : isDraw ? "It's a draw!" : `Player ${currentPlayer}'s turn`,
    firstPlayer,
    changeFirstPlayer,
    isGameInProgress
  };
};
