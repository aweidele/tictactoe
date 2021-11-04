const squares = document.querySelectorAll(".game-board__square");
const result = document.querySelector(".game-result");
const resultMessage = document.querySelector(".game-result__message");
const resetButton = document.querySelector(".game-reset");

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

class Game {
  constructor() {
    this._initGame();
    squares.forEach((sq, i) => {
      sq.dataset.sq = i;
      sq.addEventListener("click", this._squareClickHandler.bind(this));
    });

    resetButton.addEventListener("click", this._initGame.bind(this));
  }

  _initGame() {
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
      sq.classList.remove("a");
      setTimeout(() => (sq.innerHTML = ""), 600);
      sq.dataset.value = "";
    });

    result.classList.remove("game-over");
    this._changePlayer();
  }

  _changePlayer() {
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
      if (found) {
        return this._endGame(true);
        break;
      }
      if (this.moves >= 9) {
        return this._endGame(false);
        break;
      }
    }
    this.currentPlayer = this.currentPlayer === "x" ? "o" : "x";
    this.moves++;
    this._changePlayer();
  }

  _endGame(winner) {
    this.gameStatus = false;
    result.classList.add("game-over");
    resultMessage.textContent = winner
      ? `${this.players[this.currentPlayer].label} Wins!`
      : `It's a draw!`;
  }

  _squareClickHandler(e) {
    if (!this.gameStatus) return;

    const sq = e.target.closest(".game-board__square");
    if (sq.dataset.value) return;

    sq.innerHTML = `<svg class="icon-${this.currentPlayer}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><use href="#icon-${this.currentPlayer}" />`;
    setTimeout(() => sq.classList.add("a"), 50);
    sq.dataset.value = this.currentPlayer;
    this.players[this.currentPlayer].moves.push(Number(sq.dataset.sq));

    this._determineWinner();
  }
}

const game = new Game();
