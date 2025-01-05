class TicTacToe {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.isGameActive = false;
        this.isAITurn = false;
        this.isEasyMode = true;

        // DOM elements
        this.cells = document.querySelectorAll('.cell');
        this.status = document.getElementById('status');
        this.restartBtn = document.getElementById('restartBtn');
        this.flipBtn = document.getElementById('flipBtn');
        this.flipResult = document.getElementById('flipResult');
        this.easyBtn = document.getElementById('easyBtn');
        this.hardBtn = document.getElementById('hardBtn');

        // Bind event listeners
        this.cells.forEach(cell => {
            cell.addEventListener('click', () => this.handleCellClick(cell));
        });
        this.restartBtn.addEventListener('click', () => this.resetGame());
        this.flipBtn.addEventListener('click', () => this.flipCoin());
        this.easyBtn.addEventListener('click', () => this.setDifficulty('easy'));
        this.hardBtn.addEventListener('click', () => this.setDifficulty('hard'));
    }

    setDifficulty(level) {
        this.isEasyMode = level === 'easy';
        this.easyBtn.classList.toggle('active', this.isEasyMode);
        this.hardBtn.classList.toggle('active', !this.isEasyMode);
    }

    flipCoin() {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        this.flipResult.textContent = `Result: ${result}`;
        this.isGameActive = true;
        this.isAITurn = result === 'Tails';
        this.status.textContent = result === 'Heads' ? 'You go first!' : 'AI goes first!';
        
        // Disable the flip button after use
        this.flipBtn.disabled = true;
        
        if (this.isAITurn) {
            setTimeout(() => this.makeAIMove(), 500);
        }
    }

    handleCellClick(cell) {
        if (!this.isGameActive || this.isAITurn) return;
        
        const index = cell.dataset.index;
        if (this.board[index]) return;

        this.makeMove(index, 'X');
        
        if (this.checkWinner()) {
            this.status.textContent = 'You Win!';
            this.isGameActive = false;
            return;
        }

        if (this.isBoardFull()) {
            this.status.textContent = 'Draw!';
            this.isGameActive = false;
            return;
        }

        this.isAITurn = true;
        this.status.textContent = "AI's turn";
        setTimeout(() => this.makeAIMove(), 500);
    }

    makeMove(index, player) {
        this.board[index] = player;
        const cell = this.cells[index];
        cell.textContent = player;
        cell.classList.add(player.toLowerCase());
        this.currentPlayer = player;
    }

    makeAIMove() {
        if (!this.isGameActive) return;

        let moveIndex;
        if (this.isEasyMode && Math.random() < 0.4) {
            // 40% chance to make a random move in easy mode
            const emptyCells = this.getEmptyCells(this.board);
            moveIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        } else {
            moveIndex = this.minimax(this.board, 'O').index;
        }

        this.makeMove(moveIndex, 'O');

        if (this.checkWinner()) {
            this.status.textContent = 'AI Wins!';
            this.isGameActive = false;
            return;
        }

        if (this.isBoardFull()) {
            this.status.textContent = 'Draw!';
            this.isGameActive = false;
            return;
        }

        this.isAITurn = false;
        this.status.textContent = 'Your turn';
    }

    minimax(board, player) {
        const availableMoves = this.getEmptyCells(board);

        if (this.checkWinningCombination(board, 'X')) {
            return { score: -10 };
        } else if (this.checkWinningCombination(board, 'O')) {
            return { score: 10 };
        } else if (availableMoves.length === 0) {
            return { score: 0 };
        }

        const moves = [];

        for (let i = 0; i < availableMoves.length; i++) {
            const move = {};
            move.index = availableMoves[i];
            board[availableMoves[i]] = player;

            if (player === 'O') {
                const result = this.minimax(board, 'X');
                move.score = result.score;
            } else {
                const result = this.minimax(board, 'O');
                move.score = result.score;
            }

            board[availableMoves[i]] = null;
            moves.push(move);
        }

        let bestMove;
        if (player === 'O') {
            let bestScore = -Infinity;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

        return moves[bestMove];
    }

    checkWinner() {
        return this.checkWinningCombination(this.board, this.currentPlayer);
    }

    checkWinningCombination(board, player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winPatterns.some(pattern => {
            return pattern.every(index => {
                return board[index] === player;
            });
        });
    }

    getEmptyCells(board) {
        return board.reduce((cells, cell, index) => {
            if (!cell) cells.push(index);
            return cells;
        }, []);
    }

    isBoardFull() {
        return !this.board.includes(null);
    }

    resetGame() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.isGameActive = false;
        this.isAITurn = false;
        this.status.textContent = 'Ready to play';
        this.flipResult.textContent = '';
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
        // Re-enable the flip button
        this.flipBtn.disabled = false;
    }
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});
