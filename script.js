const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameActive = true;

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {
  const cell = event.target;

  if (cell.textContent === '' && gameActive) {
    cell.textContent = currentPlayer;
    if (checkWin()) {
      gameActive = false;
      setTimeout(() => alert(`${currentPlayer} wins!`), 100);
    } else if (checkDraw()) {
      gameActive = false;
      setTimeout(() => alert(`It's a draw!`), 100);
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some(pattern => {
    return pattern.every(index => {
      return cells[index].textContent === currentPlayer;
    });
  });
}

function checkDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

function resetGame() {
  cells.forEach(cell => (cell.textContent = ''));
  currentPlayer = 'X';
  gameActive = true;
}

// Optionally, you can add a reset button to restart the game manually
const resetButton = document.createElement('button');
resetButton.textContent = 'Reset Game';
resetButton.addEventListener('click', resetGame);
document.body.appendChild(resetButton);

