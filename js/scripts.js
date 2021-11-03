const squares = document.querySelectorAll(".game-board__square");
const result = document.querySelector(".game-result");
const resultMessage = document.querySelector(".game-result__message");

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// const test = [1, 0, 5, 2];
// winningCombos.forEach((combo) => {
//   console.log(combo, test);
//   const found = combo.every((v) => test.includes(v));
//   console.log(found);
// });

class Game {
  constructor() {
    this.currentPlayer = "x";
    this.gameStatus = true;
    this.players = {
      x: {
        label: "Player 1",
        moves: [],
      },
      o: {
        label: "Player 2",
        moves: [],
      },
    };
    this.moves = 0;

    squares.forEach((sq, i) => {
      sq.dataset.sq = i;
      sq.addEventListener("click", this._squareClickHandler.bind(this));
    });
  }

  _changePlayer() {
    this.currentPlayer = this.currentPlayer === "x" ? "o" : "x";
    const pl = document.querySelectorAll(".game__status div");
    pl.forEach((pl) => pl.classList.remove("active"));
    pl[this.currentPlayer === "x" ? 0 : 1].classList.add("active");
  }

  _determineWinner() {
    // winningCombos.forEach((combo) => {});
    for (const combo of winningCombos) {
      const found = combo.every((v) =>
        this.players[this.currentPlayer].moves.includes(v)
      );
      console.log(found);
      if (found) {
        return this._endGame();
        break;
      }
    }
    this._changePlayer();
  }

  _endGame() {
    this.gameStatus = false;
    result.classList.add("game-over");
    resultMessage.textContent = `${
      this.players[this.currentPlayer].label
    } Wins!`;
    console.log("endgame");
  }

  _squareClickHandler(e) {
    if (!this.gameStatus) return;

    const sq = e.target.closest(".game-board__square");
    if (sq.dataset.value) return;

    sq.innerHTML = `<svg class="icon-${this.currentPlayer}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><use href="#icon-${this.currentPlayer}" />`;
    sq.dataset.value = this.currentPlayer;
    this.players[this.currentPlayer].moves.push(Number(sq.dataset.sq));
    this.moves++;

    this._determineWinner();
  }
}

const game = new Game();
console.log(game);
//   const squares = document.querySelectorAll(".game-board__square");
//   const players = [
//     {
//       label: "Player 1",
//       moves: [],
//     },
//     {
//       label: "Player 2",
//       moves: [],
//     },
//   ];
//   let currentPlayer = "x";

//   squares.forEach((sq) => {
//     sq.addEventListener("click", function (e) {
//       this.innerHTML = `<svg class="icon-${currentPlayer}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><use href="#icon-${currentPlayer}" />`;
//       currentPlayer = currentPlayer === "x" ? "o" : "x";
//     });
//   });
