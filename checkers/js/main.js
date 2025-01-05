document.addEventListener('DOMContentLoaded', () => {
    let gameBoard = new GameBoard();
    const moveValidator = new MoveValidator(gameBoard);

    // Set up reset button
    document.getElementById('reset-game').addEventListener('click', () => {
        gameBoard.reset();
    });

    // Set up difficulty change handler
    document.getElementById('ai-difficulty').addEventListener('change', (e) => {
        // The AI will use the new difficulty on its next move
        console.log(`Difficulty changed to ${e.target.value}`);
    });

    // Log initial game state
    gameBoard.logger.log('Game initialized');
});
