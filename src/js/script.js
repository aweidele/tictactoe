const squares = document.querySelectorAll(".game-board__square");
class Game {
  constructor() {
    this.currentPlayer = "x";
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

  _squareClickHandler(e) {
    const sq = e.target.closest(".game-board__square");
    if (sq.dataset.value) return;

    sq.innerHTML = `<svg class="icon-${this.currentPlayer}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><use href="#icon-${this.currentPlayer}" />`;
    sq.dataset.value = this.currentPlayer;
    this.players[this.currentPlayer].moves.push(sq.dataset.sq);
    this.currentPlayer = this.currentPlayer === "x" ? "o" : "x";
    this.moves++;
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
