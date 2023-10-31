import { useState, useEffect } from 'react';
import { Create, Position, CanMove, Move, Board } from './functional/board';
import {
  GameOverTitle,
  Overlay,
  RestartButton,
  StyledBoard,
  StyledBoardWrapper,
  StyledRanking,
} from './gameboard.styles';
import { IGameboardProps } from './gameboard.props';

const GameBoard = ({
  rows,
  cols,
  generator,
  score,
  movesLeft,
  user,
  completedGames,
  setScore,
  setMovesLeft,
  createGame,
  setCompletedGames,
}: IGameboardProps) => {
  const [board, setBoard] = useState<Board<string | IteratorResult<string, void>>>();
  const [selectedPiece, setSelectedPiece] = useState<Position | undefined>();
  const [pieceClasses, setPieceClasses] = useState<string[][]>([]);

  useEffect(() => {
    const initialGenerator = generator.next();
    if (!initialGenerator.done) {
      const initialPieceClasses: string[][] = new Array(rows);
      for (let i = 0; i < rows; i++) {
        initialPieceClasses[i] = new Array(cols).fill('');
      }
      setPieceClasses(initialPieceClasses);
      setBoard(Create(generator, rows, cols));
    }
  }, [generator, rows, cols]);

  useEffect(() => {
    if (user) {
      setCompletedGames();
    }
  }, [user]);

  function restartGame() {
    setBoard(Create(generator, rows, cols));
    setScore(0);
    setMovesLeft(10);
  }

  const handlePieceClick = (position: Position) => {
    if (selectedPiece) {
      if (position.row === selectedPiece.row && position.col === selectedPiece.col) {
        // Unselect the same piece
        setSelectedPiece(undefined);
      } else if (isAdjacent(selectedPiece, position)) {
        if (board) {
          const canSwap = CanMove(board, selectedPiece, position) && wouldCauseMatch(board, selectedPiece, position);
          if (canSwap) {
            Move(generator, board, selectedPiece, position);
            setBoard(board);
            setSelectedPiece(undefined);
            if (user) {
              setMovesLeft(movesLeft - 1);
              if (movesLeft - 1 === 0) {
                createGame({
                  userId: user?.id,
                  score,
                  completed: true,
                });
                setCompletedGames();
              }
            }
          }
        }
      } else {
        // Select a new piece if it's not in proximity
        setSelectedPiece(position);
      }
    } else {
      // Select a piece when none is selected
      setSelectedPiece(position);
    }
  };

  function isAdjacent(position1: Position, position2: Position): boolean {
    // Check if two positions are adjacent (horizontally or vertically)
    const rowDiff = Math.abs(position1.row - position2.row);
    const colDiff = Math.abs(position1.col - position2.col);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
  }

  function wouldCauseMatch(board: Board<string | IteratorResult<string, void>>, from: Position, to: Position) {
    const testBoard = { ...board };
    const pieceAtFrom = testBoard.pieces[from.row][from.col];
    const pieceAtTo = testBoard.pieces[to.row][to.col];

    testBoard.pieces[from.row][from.col] = pieceAtTo;
    testBoard.pieces[to.row][to.col] = pieceAtFrom;

    return hasMatch(testBoard, from, to);
  }

  function hasMatch(board: Board<string | IteratorResult<string, void>>, from: Position, to: Position): boolean {
    const { row: fromRow, col: fromCol } = from;
    const { row: toRow, col: toCol } = to;

    // Check only the rows and columns affected by the swap
    const rowsToCheck = [fromRow, toRow];
    const colsToCheck = [fromCol, toCol];

    for (const row of rowsToCheck) {
      let consecutiveCount = 1;
      for (let col = 1; col < board.cols; col++) {
        if (
          (board.pieces[row][col] as IteratorResult<string, void>).value ===
          (board.pieces[row][col - 1] as IteratorResult<string, void>).value
        ) {
          consecutiveCount++;
        } else {
          consecutiveCount = 1;
        }
        if (consecutiveCount >= 3) {
          return true;
        }
      }
    }

    for (const col of colsToCheck) {
      let consecutiveCount = 1;
      for (let row = 1; row < board.rows; row++) {
        if (
          (board.pieces[row][col] as IteratorResult<string, void>).value ===
          (board.pieces[row - 1][col] as IteratorResult<string, void>).value
        ) {
          consecutiveCount++;
        } else {
          consecutiveCount = 1;
        }
        if (consecutiveCount >= 3) {
          return true;
        }
      }
    }

    return false;
  }

  function checkMatchesAndGenerateNewBoard(board: Board<string | IteratorResult<string, void>>) {
    const updatedBoard = { ...board };
    const updatedPieceClasses = [...pieceClasses];
    let hasMatches = false;

    function markMatchingPieces(
      consecutiveCount: number,
      startRow: number,
      endRow: number,
      col: number,
      direction: string,
    ) {
      for (let i = startRow; i <= endRow; i++) {
        if (direction === 'vertical') {
          updatedPieceClasses[i][col] = 'matching';
          updatedPieceClasses[i][col] = `matchCombo${consecutiveCount}`;
        } else {
          updatedPieceClasses[col][i] = 'matching';
          updatedPieceClasses[col][i] = `matchCombo${consecutiveCount}`;
        }
      }
      setScore(score + consecutiveCount * 10);
      hasMatches = true;
      setPieceClasses(updatedPieceClasses);
    }

    // Check for horizontal matches
    for (let row = 0; row < updatedBoard.rows; row++) {
      let consecutiveCount = 1;
      for (let col = 1; col < updatedBoard.cols; col++) {
        if (
          (updatedBoard.pieces[row][col] as IteratorResult<string, void>).value ===
          (updatedBoard.pieces[row][col - 1] as IteratorResult<string, void>).value
        ) {
          consecutiveCount++;
        } else {
          if (consecutiveCount >= 3) {
            markMatchingPieces(consecutiveCount, col - consecutiveCount, col - 1, row, 'horizontal');
          }
          consecutiveCount = 1;
        }
      }
      if (consecutiveCount >= 3) {
        markMatchingPieces(
          consecutiveCount,
          updatedBoard.cols - consecutiveCount,
          updatedBoard.cols - 1,
          row,
          'horizontal',
        );
      }
    }

    // Check for vertical matches
    for (let col = 0; col < updatedBoard.cols; col++) {
      let consecutiveCount = 1;
      for (let row = 1; row < updatedBoard.rows; row++) {
        if (
          (updatedBoard.pieces[row][col] as IteratorResult<string, void>).value ===
          (updatedBoard.pieces[row - 1][col] as IteratorResult<string, void>).value
        ) {
          consecutiveCount++;
        } else {
          if (consecutiveCount >= 3) {
            markMatchingPieces(consecutiveCount, row - consecutiveCount, row - 1, col, 'vertical');
          }
          consecutiveCount = 1;
        }
      }
      if (consecutiveCount >= 3) {
        markMatchingPieces(
          consecutiveCount,
          updatedBoard.rows - consecutiveCount,
          updatedBoard.rows - 1,
          col,
          'vertical',
        );
      }
    }

    if (hasMatches) {
      // First wait a second then proceed
      setTimeout(() => {
        for (let col = 0; col < updatedBoard.cols; col++) {
          for (let row = updatedBoard.rows - 1; row >= 0; row--) {
            if ((updatedPieceClasses[row][col] ?? '').includes('matchCombo')) {
              updatedPieceClasses[row][col] = 'toRemove';
            }
          }
        }
        // Remove marked pieces and shift others down
        for (let col = 0; col < updatedBoard.cols; col++) {
          for (let row = updatedBoard.rows - 1; row >= 0; row--) {
            if ((updatedPieceClasses[row][col] ?? '').includes('toRemove')) {
              updatedPieceClasses[row][col] = '';

              for (let i = row; i > 0; i--) {
                updatedBoard.pieces[i][col] = updatedBoard.pieces[i - 1][col];
              }
              updatedBoard.pieces[0][col] = generateNewPiece();
            }
          }
        }
        setPieceClasses(updatedPieceClasses);
        setBoard(updatedBoard);
      }, 1000);
    }
  }

  function generateNewPiece() {
    // Use your generator to generate the next random piece
    const result = generator.next();
    if (!result.done) {
      return result;
    } else {
      console.log('generator is done');
      return '';
    }
  }

  useEffect(() => {
    if (board) {
      const interval = setInterval(() => {
        checkMatchesAndGenerateNewBoard(board);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [board]);

  return (
    <StyledBoardWrapper>
      {movesLeft === 0 ? (
        <Overlay>
          <GameOverTitle>Game Over</GameOverTitle>
          <RestartButton onClick={restartGame}>Restart</RestartButton>
        </Overlay>
      ) : null}
      <StyledBoard>
        {user ? (
          <h3>
            {user.username}, Moves left: {movesLeft}, Score: {score}
          </h3>
        ) : (
          <>
            <h3>Please login to track your progress</h3>
            <h3>Unsaved score: {score}</h3>
          </>
        )}
        {board?.pieces.map((row, rowIndex) => (
          <div className="board-row" key={rowIndex}>
            {row.map((piece, colIndex) => (
              <div
                className={`board-piece ${pieceClasses[rowIndex][colIndex] || ''} ${
                  selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex ? 'selected' : ''
                }`}
                key={colIndex}
                onClick={() => {
                  handlePieceClick({ row: rowIndex, col: colIndex });
                }}>
                <span>{(piece as IteratorResult<string, void>)?.value ?? ''}</span>
              </div>
            ))}
          </div>
        ))}
      </StyledBoard>
      <StyledRanking>
        {user ? (
          <>
            <h3>Last completed games</h3>
            {completedGames.map((game, index) => (
              <div key={index}>
                <span>
                  Game {game.id}: {game.score}
                </span>
              </div>
            ))}
          </>
        ) : (
          <h3>Please login to see your completed games</h3>
        )}
      </StyledRanking>
    </StyledBoardWrapper>
  );
};

export default GameBoard;
