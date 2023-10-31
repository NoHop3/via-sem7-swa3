// src/components/board/gameboard.styles.ts
import styled from 'styled-components';
import { Box, Button } from '@mui/material';

export const StyledBoardWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.palette.background};
  border: 8px solid ${({ theme }) => theme.palette.primary.main};
`;

export const StyledBoard = styled(Box)`
  display: grid;
  gap: 5px;
  background-color: ${({ theme }) => theme.palette.background};
  border-radius: 1rem;
  padding: 1rem;
  border: 8px solid ${({ theme }) => theme.palette.primary.main};

  .board-row {
    display: flex;
    flex-direction: row;
  }

  .board-piece.matchCombo3 {
    background-color: ${({ theme }) => theme.palette.secondary.main};
  }
  .board-piece.matchCombo4 {
    background-color: ${({ theme }) => theme.palette.divider};
  }
  .board-piece.matchCombo5 {
    background-color: ${({ theme }) => theme.palette.text.secondary};
  }

  .board-piece {
    margin: 8px;
    color: ${({ theme }) => theme.palette.text.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    cursor: pointer;
    border: 8px solid ${({ theme }) => theme.palette.primary.main};
    transition: background-color 0.5s ease-in-out;
    border-radius: 1rem;
  }

  .selected {
    background-color: ${({ theme }) => theme.palette.primary.contrastText};
  }
`;

export const StyledRanking = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.palette.background};
  border: 8px solid ${({ theme }) => theme.palette.primary.main};
`;

export const Overlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* 70% opacity black overlay */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2; /* Position the overlay in front of the board */
`;

export const GameOverTitle = styled.h3`
  color: white;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const RestartButton = styled(Button)`
  && {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: white;
    font-size: 1rem;
  }
`;