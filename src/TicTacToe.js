// src/TicTacToe.js
import React, { useEffect } from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
  useEffect(() => {
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', handleReset);

    function handleCellClick(event) {
      const clickedCell = event.target;
      const cellIndex = parseInt(clickedCell.getAttribute('data-index'));

      if (board[cellIndex] !== '' || !isGameActive || currentPlayer === 'O') {
        return;
      }

      updateCell(clickedCell, cellIndex);
      checkForWinner();
      if (isGameActive) {
        aiMove();
      }
    }

    function updateCell(cell, index) {
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.style.pointerEvents = 'none';
    }

    function checkForWinner() {
      let roundWon = false;

      for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          roundWon = true;
          break;
        }
      }

      if (roundWon) {
        alert(`${currentPlayer} has won!`);
        isGameActive = false;
        return;
      }

      if (!board.includes('')) {
        alert('It\'s a draw!');
        isGameActive = false;
        return;
      }

      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function handleReset() {
      board = ['', '', '', '', '', '', '', '', ''];
      currentPlayer = 'X';
      isGameActive = true;
      cells.forEach(cell => {
        cell.textContent = '';
        cell.style.pointerEvents = 'auto';
      });
    }

    function aiMove() {
      currentPlayer = 'O';
      let availableCells = [];
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
          availableCells.push(i);
        }
      }

      if (availableCells.length > 0) {
        const aiCellIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        const aiCell = document.querySelector(`.cell[data-index="${aiCellIndex}"]`);
        updateCell(aiCell, aiCellIndex);
        checkForWinner();
      }

      currentPlayer = 'X';
    }

    return () => {
      cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
      resetButton.removeEventListener('click', handleReset);
    };
  }, []);

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div id="board">
        {[...Array(9)].map((_, index) => (
          <div className="cell" data-index={index} key={index}></div>
        ))}
      </div>
      <button id="reset">Reset Game</button>
    </div>
  );
};

export default TicTacToe;
