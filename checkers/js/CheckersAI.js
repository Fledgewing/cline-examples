class CheckersAI {
    constructor(difficulty = 'easy') {
        this.difficulty = difficulty;
        this.maxDepth = difficulty === 'easy' ? 2 : 4;
    }

    calculateMove(gameBoard) {
        try {
            if (this.difficulty === 'easy') {
                return this.calculateEasyMove(gameBoard);
            } else {
                return this.minimaxRoot(gameBoard, this.maxDepth);
            }
        } catch (error) {
            gameBoard.logger.log(`AI error: ${error}`);
            return this.getRandomValidMove(gameBoard);
        }
    }

    calculateEasyMove(gameBoard) {
        // Get all possible moves
        const moves = this.getAllPossibleMoves(gameBoard, 'black');
        
        // If there are jump moves, randomly select one of them
        const jumpMoves = moves.filter(move => move.isJump);
        if (jumpMoves.length > 0) {
            return jumpMoves[Math.floor(Math.random() * jumpMoves.length)];
        }
        
        // Otherwise, randomly select any valid move
        return moves.length > 0 ? moves[Math.floor(Math.random() * moves.length)] : null;
    }

    minimaxRoot(gameBoard, depth) {
        const moves = this.getAllPossibleMoves(gameBoard, 'black');
        let bestMove = null;
        let bestValue = -Infinity;
        
        for (const move of moves) {
            // Create a copy of the game board
            const boardCopy = this.copyGameBoard(gameBoard);
            
            // Make the move on the copy
            this.makeMove(boardCopy, move);
            
            // Get the value of this move
            const value = this.minimax(boardCopy, depth - 1, false, -Infinity, Infinity);
            
            if (value > bestValue) {
                bestValue = value;
                bestMove = move;
            }
        }
        
        return bestMove;
    }

    minimax(gameBoard, depth, maximizingPlayer, alpha, beta) {
        if (depth === 0 || this.isGameOver(gameBoard)) {
            return this.evaluateBoard(gameBoard);
        }

        if (maximizingPlayer) {
            let maxEval = -Infinity;
            const moves = this.getAllPossibleMoves(gameBoard, 'black');
            
            for (const move of moves) {
                const boardCopy = this.copyGameBoard(gameBoard);
                this.makeMove(boardCopy, move);
                const evaluation = this.minimax(boardCopy, depth - 1, false, alpha, beta);
                maxEval = Math.max(maxEval, evaluation);
                alpha = Math.max(alpha, evaluation);
                if (beta <= alpha) break;
            }
            
            return maxEval;
        } else {
            let minEval = Infinity;
            const moves = this.getAllPossibleMoves(gameBoard, 'red');
            
            for (const move of moves) {
                const boardCopy = this.copyGameBoard(gameBoard);
                this.makeMove(boardCopy, move);
                const evaluation = this.minimax(boardCopy, depth - 1, true, alpha, beta);
                minEval = Math.min(minEval, evaluation);
                beta = Math.min(beta, evaluation);
                if (beta <= alpha) break;
            }
            
            return minEval;
        }
    }

    evaluateBoard(gameBoard) {
        let score = 0;
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = gameBoard.board[row][col];
                if (piece) {
                    // Base piece values
                    const baseValue = piece.isKing ? 3 : 1;
                    const multiplier = piece.color === 'black' ? 1 : -1;
                    
                    // Position-based scoring
                    let positionValue = 0;
                    
                    // Favor pieces that are closer to being kinged
                    if (!piece.isKing) {
                        const progressToKing = piece.color === 'black' ? row : 7 - row;
                        positionValue += progressToKing * 0.1;
                    }
                    
                    // Favor pieces on the edges (harder to capture)
                    if (col === 0 || col === 7) {
                        positionValue += 0.2;
                    }
                    
                    score += (baseValue + positionValue) * multiplier;
                }
            }
        }
        
        return score;
    }

    getAllPossibleMoves(gameBoard, color) {
        const moves = [];
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = gameBoard.board[row][col];
                if (piece && piece.color === color) {
                    const pieceMoves = gameBoard.getValidMoves(row, col);
                    moves.push(...pieceMoves);
                }
            }
        }
        
        // If there are jump moves available, only return those
        const jumpMoves = moves.filter(move => move.isJump);
        return jumpMoves.length > 0 ? jumpMoves : moves;
    }

    copyGameBoard(gameBoard) {
        const copy = {
            board: JSON.parse(JSON.stringify(gameBoard.board)),
            currentPlayer: gameBoard.currentPlayer,
            getValidMoves: gameBoard.getValidMoves.bind(gameBoard),
            isValidPosition: gameBoard.isValidPosition.bind(gameBoard)
        };
        return copy;
    }

    makeMove(gameBoard, move) {
        const piece = gameBoard.board[move.startRow][move.startCol];
        
        // Move the piece
        gameBoard.board[move.endRow][move.endCol] = piece;
        gameBoard.board[move.startRow][move.startCol] = null;
        
        // Handle jumps
        if (move.isJump) {
            gameBoard.board[move.jumpedRow][move.jumpedCol] = null;
        }
        
        // Handle king promotion
        if ((piece.color === 'red' && move.endRow === 0) || 
            (piece.color === 'black' && move.endRow === 7)) {
            piece.isKing = true;
        }
        
        gameBoard.currentPlayer = gameBoard.currentPlayer === 'red' ? 'black' : 'red';
    }

    isGameOver(gameBoard) {
        return !this.hasValidMoves(gameBoard, gameBoard.currentPlayer);
    }

    hasValidMoves(gameBoard, color) {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = gameBoard.board[row][col];
                if (piece && piece.color === color) {
                    const moves = gameBoard.getValidMoves(row, col);
                    if (moves.length > 0) return true;
                }
            }
        }
        return false;
    }

    getRandomValidMove(gameBoard) {
        const moves = this.getAllPossibleMoves(gameBoard, 'black');
        return moves.length > 0 ? moves[Math.floor(Math.random() * moves.length)] : null;
    }
}
