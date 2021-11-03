const squares=document.querySelectorAll(".game-board__square"),result=document.querySelector(".game-result"),resultMessage=document.querySelector(".game-result__message"),resetButton=document.querySelector(".game-reset"),winningCombos=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];class Game{constructor(){this._initGame(),squares.forEach(((e,s)=>{e.dataset.sq=s,e.addEventListener("click",this._squareClickHandler.bind(this))})),resetButton.addEventListener("click",this._initGame.bind(this))}_initGame(){this.currentPlayer="x",this.gameStatus=!0,this.players={x:{label:"Player 1",moves:[]},o:{label:"Player 2",moves:[]}},this.moves=0,squares.forEach(((e,s)=>{e.classList.remove("a"),setTimeout((()=>e.innerHTML=""),600),e.dataset.value=""})),result.classList.remove("game-over"),this._changePlayer()}_changePlayer(){const e=document.querySelectorAll(".game__status div");e.forEach((e=>e.classList.remove("active"))),e["x"===this.currentPlayer?0:1].classList.add("active")}_determineWinner(){for(const e of winningCombos){if(e.every((e=>this.players[this.currentPlayer].moves.includes(e))))return this._endGame(!0);if(this.moves>=9)return this._endGame(!1)}this.currentPlayer="x"===this.currentPlayer?"o":"x",this._changePlayer()}_endGame(e){this.gameStatus=!1,result.classList.add("game-over"),resultMessage.textContent=e?`${this.players[this.currentPlayer].label} Wins!`:"It's a draw!"}_squareClickHandler(e){if(!this.gameStatus)return;const s=e.target.closest(".game-board__square");s.dataset.value||(s.innerHTML=`<svg class="icon-${this.currentPlayer}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><use href="#icon-${this.currentPlayer}" />`,setTimeout((()=>s.classList.add("a")),50),s.dataset.value=this.currentPlayer,this.players[this.currentPlayer].moves.push(Number(s.dataset.sq)),this.moves++,this._determineWinner())}}const game=new Game;