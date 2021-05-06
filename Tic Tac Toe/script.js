var TicTacToe = {
    //init is when we create the page
    init: function() {
        TicTacToe.symbols = ["X", "O"];
        TicTacToe.squares = Array.from(document.querySelectorAll(".square"));
        TicTacToe.turnIndicator = document.querySelector(".turnIndicator");
        TicTacToe.button = document.querySelector(".newGame");
        TicTacToe.board = document.querySelector(".board");
        TicTacToe.winningSets = [
			//winning conditions for tictactoe
            [0,1,2], //first row
            [3,4,5], //second row
            [6,7,8], //third row
            [0,3,6], 
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        TicTacToe.addEventListener();
        TicTacToe.newGame();
    },

    addEventListener: function() {
        var ttt = this;
        this.squares.forEach(function(x){
            x.addEventListener("click", function(){
                ttt.play(this);

            })
        })
        this.button.addEventListener("click", function() {
            ttt.newGame();
        })
    },

    //start a new game without restarting everything
    newGame: function() {
        this.activePlayer = 0;
        this.gameover = false; //start new game
        this.squares.forEach(function(x){
            x.classList.remove("X");
            x.classList.remove("O");
        })
        this.board.classList.remove("gameover");
        this.setTurnIndicator();
    },

    setTurnIndicator: function(){
        this.turnIndicator.innerText = this.symbols[this.activePlayer] + "'s Turn. "
    },

    play: function(el) {
        //make sure that the square is not filled
        //el element
        if(!this.gameover && el.classList.length == 1){
        //set the contents to your player's symbol
        //this will give x or o
        el.classList.add(this.symbols[this.activePlayer]);
        //check if you won
        if(this.checkWin()){
           this.turnIndicator.innerText = this.symbols[this.activePlayer] + " wins!";
           this.endgame();
        }
        //check if there is a draw
        else if (this.checkDraw()){
            this.turnIndicator.innerText = "It's a draw!";
            this.endgame();

        }
        //go to the next player's turn
        else {
            this.activePlayer = 1 - this.activePlayer;
            this.setTurnIndicator();
         }
        }
    },
    checkWin: function(){
        var ttt = this;
        return this.winningSets.some(function (x) {
            return x.every(function(i){
              return Array.from(ttt.squares[i].classList).indexOf((ttt.symbols[ttt.activePlayer])) > -1;
            })
        })
    },
    checkDraw: function(){
        return this.squares.every(function(x) {
           return  x.classList.length > 1;
        })
    },
    endgame: function(){
        this.gameover = true;
        this.board.classList.add("gameover");
    }

    }


window.onload = TicTacToe.init;