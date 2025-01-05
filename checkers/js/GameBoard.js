class GameBoard {
    constructor() {
        this.board = Array(8).fill().map(() => Array(8).fill(null));
        this.currentPlayer = 'red';  // red starts
        this.selectedPiece = null;
        this.gameState = 'playing';  // playing, won, lost
        this.validMoves = [];
        this.moveValidator = new MoveValidator(this);
        
        this.logger = {
            log: function(message) {
                console.log(`[Checkers ${new Date().toISOString()}]: ${message}`);
            }
        };

        this.initializeBoard();
        this.initializeDOM();
    }

    initializeBoard() {
        try {
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    if ((row < 3) && (row + col) % 2 === 1) {
                        this.board[row][col] = {
                            type: 'piece',
                            color: 'black',
                            isKing: false
                        };
                    } else if ((row > 4) && (row + col) % 2 === 1) {
                        this.board[row][col] = {
                            type: 'piece',
                            color: 'red',
                            isKing: false
                        };
                    }
                }
            }
        } catch (error) {
            this.logger.log(`Error initializing board: ${error}`);
            throw new Error('Board initialization failed');
        }
    }

    initializeDOM() {
        const boardElement = document.getElementById('board');
        boardElement.innerHTML = '';

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = `square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
                square.dataset.row = row;
                square.dataset.col = col;

                const piece = this.board[row][col];
                if (piece) {
                    const pieceElement = document.createElement('div');
                    pieceElement.className = `piece ${piece.color}${piece.isKing ? ' king' : ''}`;
                    square.appendChild(pieceElement);
                }

                square.addEventListener('click', (e) => this.handleSquareClick(row, col));
                boardElement.appendChild(square);
            }
        }

        this.updateCurrentPlayerDisplay();
    }

    handleSquareClick(row, col) {
        if (this.gameState !== 'playing' || this.currentPlayer === 'black') return;

        const piece = this.board[row][col];
        
        // If a piece is already selected
        if (this.selectedPiece) {
            const validMove = this.validMoves.find(move => 
                move.endRow === row && move.endCol === col
            );

            if (validMove) {
                this.makeMove(validMove);
                this.clearSelection();
            } else if (piece && piece.color === this.currentPlayer) {
                this.selectPiece(row, col);
            } else {
                this.clearSelection();
            }
        } 
        // If no piece is selected and clicked on current player's piece
        else if (piece && piece.color === this.currentPlayer) {
            this.selectPiece(row, col);
        }
    }

    selectPiece(row, col) {
        this.selectedPiece = { row, col };
        this.validMoves = this.getValidMoves(row, col);
        this.updateBoardDisplay();
    }

    clearSelection() {
        this.selectedPiece = null;
        this.validMoves = [];
        this.updateBoardDisplay();
    }

    updateBoardDisplay() {
        // First, reset all squares to their base state
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            const row = parseInt(square.dataset.row);
            const col = parseInt(square.dataset.col);
            
            // Reset square classes
            square.className = `square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
            
            // Reset piece classes if there is a piece
            const pieceElement = square.querySelector('.piece');
            if (pieceElement) {
                const piece = this.board[row][col];
                pieceElement.className = `piece ${piece.color}${piece.isKing ? ' king' : ''}`;
            }
        });

        // Then add selection and valid move highlights
        if (this.selectedPiece) {
            // Highlight selected piece
            const selectedSquare = document.querySelector(
                `[data-row="${this.selectedPiece.row}"][data-col="${this.selectedPiece.col}"]`
            );
            const selectedPieceElement = selectedSquare?.querySelector('.piece');
            if (selectedPieceElement) {
                selectedPieceElement.classList.add('selected');
            }

            // Highlight valid moves
            this.validMoves.forEach(move => {
                const targetSquare = document.querySelector(
                    `[data-row="${move.endRow}"][data-col="${move.endCol}"]`
                );
                if (targetSquare) {
                    targetSquare.classList.add('valid-move');
                }
            });
        }
    }

    updateCurrentPlayerDisplay() {
        const currentPlayerElement = document.getElementById('current-player');
        currentPlayerElement.textContent = this.currentPlayer.charAt(0).toUpperCase() + 
            this.currentPlayer.slice(1);
    }

    getValidMoves(row, col) {
        const piece = this.board[row][col];
        if (!piece) return [];

        const moves = [];
        const directions = piece.isKing ? [-1, 1] : [piece.color === 'red' ? -1 : 1];

        // Check regular moves and jumps
        for (const rowDir of directions) {
            for (const colDir of [-1, 1]) {
                // Check regular move
                const newRow = row + rowDir;
                const newCol = col + colDir;
                if (this.isValidPosition(newRow, newCol)) {
                    const result = this.moveValidator.validateMove([row, col], [newRow, newCol]);
                    if (result.valid) {
                        moves.push(result.move);
                    }
                }

                // Check jump move
                const jumpRow = row + rowDir * 2;
                const jumpCol = col + colDir * 2;
                if (this.isValidPosition(jumpRow, jumpCol)) {
                    const result = this.moveValidator.validateMove([row, col], [jumpRow, jumpCol]);
                    if (result.valid) {
                        moves.push(result.move);
                    }
                }
            }
        }

        return moves;
    }

    makeMove(move) {
        const piece = this.board[move.startRow][move.startCol];
        
        // Move the piece
        this.board[move.endRow][move.endCol] = piece;
        this.board[move.startRow][move.startCol] = null;

        // Handle jumps
        if (move.isJump) {
            this.board[move.jumpedRow][move.jumpedCol] = null;
        }

        // King promotion
        if ((piece.color === 'red' && move.endRow === 0) || 
            (piece.color === 'black' && move.endRow === 7)) {
            piece.isKing = true;
        }

        // Switch turns
        this.currentPlayer = this.currentPlayer === 'red' ? 'black' : 'red';
        
        // Update the display
        this.initializeDOM();

        // Check for game over
        if (this.isGameOver()) {
            this.gameState = 'won';
            this.showGameOverMessage();
        } else if (this.currentPlayer === 'black') {
            // AI's turn
            setTimeout(() => this.makeAIMove(), 500);
        }
    }

    isValidPosition(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    isGameOver() {
        // Check if any player has no pieces left or no valid moves
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.color === this.currentPlayer) {
                    if (this.getValidMoves(row, col).length > 0) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    showGameOverMessage() {
        const winner = this.currentPlayer === 'red' ? 'Black' : 'Red';
        const messageElement = document.getElementById('game-message');
        messageElement.textContent = `Game Over! ${winner} wins!`;
    }

    makeAIMove() {
        const ai = new CheckersAI(document.getElementById('ai-difficulty').value);
        const move = ai.calculateMove(this);
        if (move) {
            this.makeMove(move);
        }
    }

    reset() {
        this.board = Array(8).fill().map(() => Array(8).fill(null));
        this.currentPlayer = 'red';
        this.selectedPiece = null;
        this.gameState = 'playing';
        this.validMoves = [];
        this.initializeBoard();
        this.initializeDOM();
        document.getElementById('game-message').textContent = '';
    }
}
