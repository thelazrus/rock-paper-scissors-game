const readline = require('readline');

/********************************* CONSTANTS *********************************/
const VALID_MOVES = {
  r: {
    name: 'Rock',
    winsAgainst: 's'
  },
  p: {
    name: 'Paper',
    winsAgainst: 'r'
  },
  s: {
    name: 'Scissors',
    winsAgainst: 'p'
  }
};

/********************************* GAME DATA *********************************/
let wins = 0;
let losses = 0;
let ties = 0;

/* DO NOT CHANGE THE CODE ABOVE */

/***************************** HELPER FUNCTIONS ******************************/
function printHelp() {
  const help  = ["  Type 'r' for Rock", "  Type 'p' for Paper", "  Type 's' for Scissors", "  Type 'q' to quit", "  Type 'h' for a list of valid commands\n"];
  for (let i = 0; i < help.length; i++) {
    console.log(help[i]);
  }
}

function getWinner(move1, move2) {
  if (move1 === move2) { // tie
    ties++;
    return 0;
  } else if (VALID_MOVES[move1].winsAgainst === move2) { // win
    wins++;
    return 1;
  } else { // loss
    losses++;
    return -1;
  }
}


function getCPUMove() {
  const validMoveKeys = Object.keys(VALID_MOVES);
  const randomIndex = Math.floor(Math.random() * validMoveKeys.length);
  return validMoveKeys[randomIndex];
}

function processMove(cmd, cpu) {
  winner = getWinner(cmd, cpu);
  console.log(`You pick ${cmd}, computer picks ${cpu}.`);

  if (winner === 0) {
    console.log("You tie.\n");
  } else if (winner === 1) {
    console.log("You win!\n");
  } else {
    console.log("You lose...\n");
  }
}

/******************************* MAIN FUNCTION *******************************/
function promptInput(rl) {
  console.log(`${wins} wins - ${losses} losses - ${ties} ties`);
  rl.question('> ', (cmd) => {
    cmd = cmd.toLowerCase();
    
    if (cmd === 'h') {
      console.log("\nHelp:\n");
      printHelp();
    } else if (cmd === 'q') {
      rl.close();
      return;
    } else if (VALID_MOVES[cmd]) {
      const cpu = getCPUMove();
      processMove(cmd, cpu);
    } else {
      console.log("\nInvalid command.\n");
      printHelp();
    }
   
    promptInput(rl);
  });
};

/****************************** INITIALIZE GAME ******************************/
function initializeGame() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log("Welcome to Rock/Paper/Scissors\n");
  printHelp();

  promptInput(rl);
}

// start the game if running this file directly, `node game.js`
// do not start the game if running test specs
if (typeof require !== 'undefined' && require.main === module) {
  initializeGame();
}

/**************************************************************************/
/* Exports for testing */
module.exports = {
  printHelp,
  getWinner,
  getCPUMove,
  processMove,
  promptInput
};