"use strict";

$(document).ready(function() {
// Variables:
  var kids = ["Nylah", "Quincey", "Kate", "Ocean"];
  var enemy = ["Donnie", "Rosa", "Trash", "Hunger"];
  var randNum = Math.round(Math.random()*3); // Random # from 1 to 4, to use as index for kid/enemy arrays
  var audio = $("div#audio"); // - Audio button in upper right-hand corner
  var name, inputName = $("input#pname1"); // Holders of the player's name
  var playernum = 0;
  var kid = kids[randNum];
  var btnChooseKid = $("button#chooseKid");
  var btnLetsPlay = $("button#letsPlay");
  var btnExit = $("<button id='exit'>Head to the Playground</button>");
  var sectCont = $("section#cont");
  var firstWindow = $("div#newgame");
  var finish = $("div#finish");
  var pInst = $("p#instructions");
  var secondWindow = $("div#maze");
  var audioPlay = new Audio("./media/audio/kids.m4a");
  var pressed = false;
  var audioBtn = $("<div class='sprite audio'></div>");
  var divReveal = $("div#revealAfterNameEntry");
  var pFinish = $("p#finishGame");
  var kidOnScreen = $("div.sprite");
  var pMazeDirections = $("p#mazeDirections");
  var MekeMaZer = {};
  var codes = [38, 40, 37, 39, 32];
  var enemySpots = { // The x and y coordinates of each enemy in the maze
    enemyGreen: [530, 502],
    enemyRed: [728, 502],
    enemyBlue: [686, 214],
    enemyYellow: [488, 262]
  };
  // Variables specifically for the maze
  var canvas = document.getElementById("mazecanvas");
  var context = canvas.getContext("2d");
  var currRectX = 3;
  var currRectY = 4;
  var mazeWidth = 469;
  var mazeHeight = 438;
  var intervalVar;

/*
 - Maze popup on background. Music plays (music fades in, and greyed-out
    player button pops up in upper righthand corner to turn off. When
    hovered over player button shows "Turn off")

    - Player moves through until encountering enemies
          var currentEnemy = $("<div class='" + enemy[randNum] + "'></div>");
          secondWindow.append()
          -when user presses spacebar the enemy fades until completely disappears
          "You beat [enemy name]! Your time goes down by [random] ms!"

  - Add player's name and maze time on scoreboard, on top of fakes
*/    // case 888: //spacebar attack
      //       var enemyFigure = $('<div class="sprite ' + enemy+'"></div>');
      //       enemyFigure.animate({
      //         right: -20px,
      //         right: 20px},
      //         "normal", function() {
      //         /* stuff to do after animation is complete */
      //         }
      //       });
            /* Need a delay of 5 seconds here. Show a countdown for the
            attack. If player doesn't beat them in time, the enemy
            disappears and they continue. If enemy's beaten that attack
            time's doubled and subtracted from their overall maze time.
            */
            // break;
  //       }
  //     }
  //   });
  // }

  // Where all the maze code starts
  function drawMazeAndSprite(rectX, rectY, imgsrc = "./media/images/maze.png") {
    makeBackground(0,0, canvas.width, canvas.height);
    var mazeImg = new Image();
    mazeImg.onload = function() {
      context.drawImage(mazeImg, 0, 0);
      drawSprite(rectX, rectY);
      context.beginPath();
      context.arc(420, 450, 7, 0, 2*Math.PI, false);
      context.closePath();
      context.fillStyle = "#6FDEFF";
      context.fill();
    }
    mazeImg.src = imgsrc;
  }

  function drawSprite(x, y) {
    makeMazeArea(currRectX, currRectY);
    currRectX = x;
    currRectY = y;
    var sprite = new Image();
    sprite.src = "./media/images/"+kid.toLowerCase()+"_gamepiece.png";
    sprite.onload = function() {context.drawImage(sprite,currRectX,currRectY)};
  }

  function moveRect(e) {
    var newX;
    var newY;
    var movingAllowed;
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
      case 87:
        newX = currRectX;
        newY = currRectY - 4;
        break;
      case 37:
      case 65:
        newX = currRectX - 4;
        newY = currRectY;
        break;
      case 40:
      case 83:
        newX = currRectX;
        newY = currRectY + 4;
        break;
      case 39:
      case 68:
        newX = currRectX + 4;
        newY = currRectY;
        break;
    }
    movingAllowed = canMoveTo(newX, newY);
    if (movingAllowed === 1) {
      drawSprite(newX, newY);
      currRectX = newX;
      currRectY = newY;
    }
    else if (movingAllowed === 2) {
      clearInterval(intervalVar);
      makeBackground(0, 0, canvas.width, canvas.height);
      context.font = "40px Arial";
      context.fillStyle = "blue";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("Congratulations!", canvas.width/2, canvas.height/2);
      window.removeEventListener("keydown", moveRect, true);
      $('#maze').append(btnExit);

    }
  }

  function canMoveTo(destX, destY) {
    var imgData = context.getImageData(destX, destY+6, 18, 20);
    var data = imgData.data;
    var canMove = 1;
    /*
      yellow: ffff2e - 255/255/48
      yellow enemy- ffff03 - 225/225/5

      red: f0524f - 240/82/79
      red enemy - f70000 - 245/0/0

      blue: 3e6be6 - 62/109/230
      blue enemy - 0004f5 - 0/4/245

      green: 00990d - 0/153/13
      green enemy - 0afc0a - 10/250/10
      console.log(4/100/4)
    */
    if (destX >= 0 && destX <= mazeWidth - 15 && destY >= 0 && destY <= mazeHeight - 15) {
      for (var i = 0; i < 4 * 15 * 15; i += 4) {

          console.log("data: " + data[i]  +"/" + data[i+1] +"/" + data[i+2]);
          if ((data[i] === 240) && (data[i + 1] === 82) && (data[i + 2] === 79)) {
          canMove = 0;
          break;
        }
        else if (data[i] === 255 && data[i+1] === 255 && data[i + 2] === 255) {
          canMove = 2;
          break;
        }
      }
    }
    else {
      canMove = 0;
    }
    return canMove;
  }

  function createTimer(seconds) {
    intervalVar = setInterval(function() {
      makeBackground(mazeWidth, 0, canvas.width - mazeWidth, canvas.height);
      if (seconds === 0) {
        clearInterval(intervalVar);
        window.removeEventListener("keydown", moveRect, true);
        context.font = "40px Arial";
        context.fillStyle = "red";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText("Time's up!", canvas.width / 2, canvas.height / 2);
        return;
      }
      context.font = "20px Arial";
      if (seconds <= 10 && seconds > 5) {
        context.fillStyle = "orangered";
      }
      else if (seconds <= 5) {
        context.fillStyle = "red";
      } else {
        context.fillStyle = "green";
      }
      context.textAlign = "center";
      context.textBaseline = "middle";
      var minutes = Math.floor(seconds / 60);
      var secondsToShow = (seconds - minutes * 60).toString();
      if (secondsToShow.length ===1) {
        secondsToShow = "0" + secondsToShow;
      }
      context.fillText(minutes.toString() + ":" + secondsToShow, mazeWidth + 40, canvas.height/2);
      seconds--;
    }, 1000);
  }

  function makeBackground(x,y,w,h) {
    context.beginPath();
    context.rect(x,y,w,h);
    context.closePath();
    context.fillStyle = "beige";
    context.fill();
  }

  function makeMazeArea(x,y) {
    var mazeImg = new Image();
    mazeImg.src = "./media/images/maze.png";
    mazeImg.onload = function() {
      context.drawImage(mazeImg,x,y,19, 19,x,y,19, 19);
    }
  }

  drawMazeAndSprite(3,4);
  window.addEventListener("keydown", moveRect, true);
  createTimer(240);
  // Where all the maze code ends


  var addEventListeners = function() {
    btnChooseKid.on("click", function() {
      if ((inputName.val() != "Player name") && (inputName.val() != "") &&
        (inputName.val() != " ")) {
        name = inputName.val().toUpperCase();
        kidOnScreen.addClass(kid);
        kidOnScreen.show();
        pInst.text(name + ", you will help " + kid+".");// [Player name], you will help [kid].
        MekeMaZer = {Name: name, Kid: kid, Time: 0, Enemies: 0};
        playernum++;
        $("div#warning").text("");
        divReveal.show("fast");
      } else $("div#warning").text("Please enter your player name");
    });

    btnLetsPlay.on("click", function() {
      firstWindow.hide();
      secondWindow.show();
      pMazeDirections.text("Go "+ MekeMaZer.Name + " go! Help "+
        MekeMaZer.Kid + " get to the playground! Use the W, A, S, and D keys to "+
        "move (up, left, down, and right respectively) through the maze. Enemies coming soon.");

      secondWindow.append(audioPlay);
      secondWindow.append(audioBtn);
    });

    audioBtn.on("click", function() {
      if (pressed === false) {
        pressed = true;
        audioPlay.play();
      } else {
        pressed = false;
        audioPlay.pause();
      }
    });

    btnExit.on("click", function() {
      secondWindow.hide("fast");
      finish.show();
      pFinish.text("Thanks so much for playing! " + kid +
        " is so happy. Scoreboard results coming soon!");
    });
  };
  addEventListeners();
});
