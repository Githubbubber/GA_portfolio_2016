"use strict";
$(document).ready(function() {
  // Variables used throughout the program
  // The x and o choices
        var divXPiece = $("div.xPiece");
        var divOPiece = $("div.oPiece");
  // Various instructions for the player
        var pGameMsg = $("p#gameMsg");
        var thTurns = $("th#whoseTurnIsIt");
        var pLastWindowMsg = $("p#lastWindowMsg");
        var yourPlayerMsg = "Player " + yourPlayerPiece+"'s turn";
        var computerMsg = "Opponent's turn";
        var theWinnerIsMsg = "The winner is: ";
        var scoreBoardEntry = $("<input type='text' id='scoreBoardEntry' placeholder='Your name'/>");
        var ul = $("<ul>");
  // Various play/game end buttons
        var btnPlayGameAgain = $("button#playGameAgain");
        var btnPlayNow = $("#playNow");
        var btnEndBtn1 = $("<button id='scoreboard'>Add name to scoreboard</button>");
        // var btnEndBtn2 = $("<button id='playGameAgain'>Play again</button>");
        var btnEndGame = $("button#endGame");
  // Grab all the table data cells
        var allTDs = $("td");
  // Assigns to both players their game pieces
        var yourPlayerPiece = "", oppPlayerPiece = "";
  // Attribute grabber (for string splitting later) and move counter
        var tdAttr = "", counter = 0;
  // Temporary index value holders
        var tdRow = null;
        var tdCol = null;
  // Using a modulus, turns will assign which piece to show upon square click
        var turns = 0;
  // Used for the x and o images to popup on square click
        var whichPiece;
  // The winner is...
        var theWinner = "";
  // Holds every piece's position on the game board
        var gameBoard = [ [null, null, null],
                        [null, null, null],
                        [null, null, null]
                      ];

  // This function resets all needed variables for repeat gameplay
        function resetVars() {
          yourPlayerPiece = "", oppPlayerPiece = "";
          theWinner = "";
          tdAttr = "", tdRow = "", tdCol = "";
          gameBoard = [ [null, null, null],
                          [null, null, null],
                          [null, null, null]
                        ];
        }

  // Full game mode
        function showGame() {// Hides intro window and shows game board
          $("#firstWindow").hide("slow");
          $("#secondWindow").show();
          yourPlayerMsg = "Player " + yourPlayerPiece.toUpperCase() +"'s turn";
          thTurns.text(yourPlayerMsg);

          allTDs.on("click", function() {// Event listener for each td click
            var tempHolder = $(this).attr("id").split("_");/* grabs cell
            location for corresponding '$(this)' td and assigns location
            in gameBoard array a game piece*/

            turns = counter % 2;
            whichPiece = (turns === 0) ? yourPlayerPiece : oppPlayerPiece;// Assign the square's game board array

            gameBoard[tempHolder[1]][tempHolder[2]] = whichPiece;

            $(this).css({ // CSS changes when a player chooses a square:
              "background-image": "url('./images/" + whichPiece +".png')",
              "background-repeat": "no-repeat",
              "background-position": "cover"
            });

            counter++;// Counts each round; if odd, player 1, else player 2

            if ((turns != 0)) { // Changes overhead text to player-specific msg
              thTurns.text(yourPlayerMsg);
            } else { thTurns.text(computerMsg); }

            for (var i = 0; i < 3; i++) { // Beginning of for loop, checking who won (checks your pieces, then the opponent's)
              if ((gameBoard[i][0] === yourPlayerPiece) && (gameBoard[i][1] === yourPlayerPiece) && (gameBoard[i][2] === yourPlayerPiece) ||
                (gameBoard[0][i] === yourPlayerPiece) && (gameBoard[1][i] === yourPlayerPiece) && (gameBoard[2][i] === yourPlayerPiece) ||
                (gameBoard[0][0] === yourPlayerPiece) && (gameBoard[1][1] === yourPlayerPiece) && (gameBoard[2][2] === yourPlayerPiece) ||
                (gameBoard[0][2] === yourPlayerPiece) && (gameBoard[1][1] === yourPlayerPiece) && (gameBoard[2][0] === yourPlayerPiece)){
                thTurns.text("We have a winner, folks!");
                theWinner = "Player " + yourPlayerPiece.toUpperCase(); // Tailored winner's msg
                allTDs.off("click");  // Disable all squares
                btnEndGame.text("Continue"); // Change button for forward progress of windows
                return;
              } else if ((gameBoard[i][0] === oppPlayerPiece) && (gameBoard[i][1] === oppPlayerPiece) && (gameBoard[i][2] === oppPlayerPiece) ||
                (gameBoard[0][i] === oppPlayerPiece) && (gameBoard[1][i] === oppPlayerPiece) && (gameBoard[2][i] === oppPlayerPiece) ||
                (gameBoard[0][0] === oppPlayerPiece) && (gameBoard[1][1] === oppPlayerPiece) && (gameBoard[2][2] === oppPlayerPiece) ||
                (gameBoard[0][2] === oppPlayerPiece) && (gameBoard[1][1] === oppPlayerPiece) && (gameBoard[2][0] === oppPlayerPiece)){
                thTurns.text("We have a winner, folks!");
                theWinner = "Player " + oppPlayerPiece.toUpperCase(); // Tailored winner's msg
                allTDs.off("click");  // Disable all squares
                btnEndGame.text("Continue"); // Change button for forward progress of windows
                return;
              } // else if ((gameBoard[0][0] === oppPlayerPiece) && (gameBoard[1][1] === oppPlayerPiece) && (gameBoard[2][2] === oppPlayerPiece)){

              //   } // End of for loop, checking who won
            }
          });
        }
  // The window to appear at the end of the game (hide previous window)
        function endGame() {
          $("#secondWindow").hide("slow");
          $("#lastWindow").show();

          if (theWinner != "") { // Got a winner? Tell them who it is, as well as how many turns
            pLastWindowMsg.html("<span>Thanks for playing! <br />After " + counter +
              " turns, " + theWinnerIsMsg + theWinner + "<br /> Add name to scoreboard: </span>");
            btnEndBtn1.css({
              "display": "inline",
              "width": "250px",
              "height": "70px",
              "margin": "0 auto",
              "font-size": "1em",
              "font-weight": "bold",
              "border-radius": "10px",
              "background-color": "green",
              "color": "white"
            });
            $("div#lastWindow").append(scoreBoardEntry);
            $("div#lastWindow").append(btnEndBtn1);
            // $("div#lastWindow").append(btnEndBtn2);
            // btnPlayGameAgain.before();
            // pLastWindowMsg.text("Thanks for playing! After "+ counter + " turns, " +
            //   theWinnerIsMsg + theWinner);
          } else pLastWindowMsg.text("Thanks for playing!");
        }

  //  Shows the first window to have player choose x or o again
        function playGameAgain() {
          $("#lastWindow").hide("slow");
          $("#firstWindow").show();
          pGameMsg.text("Please choose a player piece:");
        }

        var seconds = 0, endSeconds;
        var timerId;
        var timer = $("div.timer");
        var timer2 = $("div.timer2");

        $("#secondWindow").ready(function() {
          setInterval(function() {
            timer.text('Time: ' + (seconds++) + " seconds");
            endSeconds = seconds;
          }, 1000);
        });

        $("#lastWindow").ready(function(){
          timer2.text('Time: ' + seconds);
        });

  // Various event listeners (all buttons and the div x/o game pieces)
        var addEventListeners = function(){
          btnPlayNow.on("click", function() {// On play button press,
            // warn about required choice if not set
            if (yourPlayerPiece === "") {
              pGameMsg.text("You have to choose a game piece.");
              pGameMsg.css("color", "red");
            } else {
              showGame();
            }
          });

          btnEndGame.on("click", function() {// On end game button press, do endgame function
            endGame();
          });

          btnPlayGameAgain.on("click", function() {// Reload game; reset variables; show both x/o pieces to choose from
            pGameMsg.css("color", "inherit");
            divOPiece.show();
            divXPiece.show();
            resetVars();
            if (yourPlayerPiece === "") {
              pGameMsg.text("You have to choose a game piece.");
              pGameMsg.css("color", "red");
              playGameAgain();
            } else {
              playGameAgain();
            }
          });

          divXPiece.on("click", function() {// Divs of game pieces to choose from
            yourPlayerPiece = "x";
            oppPlayerPiece = "o";
            divOPiece.hide();
            pGameMsg.text("You're ready to play, player X.");
          });

          divOPiece.on("click", function() {
            yourPlayerPiece = "o";
            oppPlayerPiece = "x";
            divXPiece.hide();
            pGameMsg.text("You're ready to play, player O.");
          });


          btnEndBtn1.on("click", function() {
            var sbNameEntry = scoreBoardEntry.val();
            ul.append("<li>TabbyCat123</li>");
            ul.append("<li>"+sbNameEntry+"</li>");
            ul.append("<li>RickRollstein</li>");
            $("div#lastWindow").append(ul);
          });

        }

        addEventListeners();
});
