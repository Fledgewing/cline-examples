class MoveValidator {
    constructor(gameBoard) {
        this.gameBoard = gameBoard;
    }

    validateMove(startPos, endPos) {
        try {
            const [startRow, startCol] = startPos;
            const [endRow, endCol] = endPos;
            
            // Basic boundary checks
            if (!this.isWithinBounds(startRow, startCol) || 
                !this.isWithinBounds(endRow, endCol)) {
                return {
                    valid: false,
                    error: 'Position out of bounds'
                };
            }

            const piece = this.gameBoard.board[startRow][startCol];
            
            // Check if there's a piece at the start position
            if (!piece) {
                return {
                    valid: false,
                    error: 'No piece at start position'
                };
            }

            // Check if it's the correct player's turn
            if (piece.color !== this.gameBoard.currentPlayer) {
                return {
                    valid: false,
                    error: 'Not your piece'
                };
            }

            // Check if end position is empty
            if (this.gameBoard.board[endRow][endCol]) {
                return {
                    valid: false,
                    error: 'End position is occupied'
                };
            }

            // Check if move is diagonal
            if (Math.abs(endRow - startRow) !== Math.abs(endCol - startCol)) {
                return {
                    valid: false,
                    error: 'Move must be diagonal'
                };
            }

            const moveDistance = Math.abs(endRow - startRow);
            const isForwardMove = piece.color === 'red' ? endRow < startRow : endRow > startRow;

            // Check if piece is moving in the correct direction (unless it's a king)
            if (!piece.isKing && !isForwardMove) {
                return {
                    valid: false,
                    error: 'Piece can only move forward'
                };
            }

            // Regular move (1 square)
            if (moveDistance === 1) {
                return {
                    valid: true,
                    move: {
                        startRow,
                        startCol,
                        endRow,
                        endCol,
                        isJump: false
                    }
                };
            }
            // Jump move (2 squares)
            else if (moveDistance === 2) {
                const jumpedRow = startRow + Math.sign(endRow - startRow);
                const jumpedCol = startCol + Math.sign(endCol - startCol);
                const jumpedPiece = this.gameBoard.board[jumpedRow][jumpedCol];

                // Check if there's an opponent's piece to jump over
                if (!jumpedPiece || jumpedPiece.color === piece.color) {
                    return {
                        valid: false,
                        error: 'Invalid jump'
                    };
                }

                return {
                    valid: true,
                    move: {
                        startRow,
                        startCol,
                        endRow,
                        endCol,
                        jumpedRow,
                        jumpedCol,
                        isJump: true
                    }
                };
            }

            return {
                valid: false,
                error: 'Invalid move distance'
            };
        } catch (error) {
            this.gameBoard.logger.log(`Move validation error: ${error}`);
            return {
                valid: false,
                error: 'Move validation failed'
            };
        }
    }

    isWithinBounds(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    getJumpedPiece(startPos, endPos) {
        const [startRow, startCol] = startPos;
        const [endRow, endCol] = endPos;
        
        const jumpedRow = startRow + Math.sign(endRow - startRow);
        const jumpedCol = startCol + Math.sign(endCol - startCol);
        
        return {
            row: jumpedRow,
            col: jumpedCol,
            piece: this.gameBoard.board[jumpedRow][jumpedCol]
        };
    }

    hasValidMoves(color) {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.gameBoard.board[row][col];
                if (piece && piece.color === color) {
                    const moves = this.gameBoard.getValidMoves(row, col);
                    if (moves.length > 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    mustJump(color) {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.gameBoard.board[row][col];
                if (piece && piece.color === color) {
                    const moves = this.gameBoard.getValidMoves(row, col);
                    if (moves.some(move => move.isJump)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
