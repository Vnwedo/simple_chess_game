const boardElement = document.getElementById("board");

// Chessboard initial state
const board = [
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
  ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
];

let selectedPiece = null; // Holds the currently selected piece
let selectedPosition = null; // Holds the position of the selected piece

// Function to render the board
function renderBoard() {
  boardElement.innerHTML = ""; // Clear the board

  board.forEach((row, i) => {
    row.forEach((piece, j) => {
      const square = document.createElement("div");
      square.className = "square " + ((i + j) % 2 === 0 ? "white" : "black");
      square.dataset.row = i; // Store the row and column as data attributes
      square.dataset.col = j;

      if (piece) {
        const pieceElement = document.createElement("span");
        pieceElement.className = "piece";
        pieceElement.textContent = piece;
        square.appendChild(pieceElement);
      }

      // Attach the click event to each square
      square.addEventListener("click", () => handleSquareClick(i, j));
      boardElement.appendChild(square);
    });
  });
}

// Handle square clicks
function handleSquareClick(row, col) {
  const piece = board[row][col];

  if (selectedPiece) {
    // If a piece is selected, move it to the clicked square
    board[row][col] = selectedPiece; // Move the piece
    board[selectedPosition.row][selectedPosition.col] = ""; // Clear the old square
    selectedPiece = null; // Deselect the piece
    selectedPosition = null; // Reset selected position
    renderBoard(); // Re-render the board
  } else if (piece) {
    // If no piece is selected, select the clicked piece
    selectedPiece = piece;
    selectedPosition = { row, col }; // Store the position of the selected piece
  }
}

// Initial render
renderBoard();
