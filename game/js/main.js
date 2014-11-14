"use strict";

window.onload = function() {

  var gameEngine = new Phaser.Game(960, 560, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
  });
  // Minigame init
  var miniGames = [
    new NoMeansNo(gameEngine),
    //new MusicMembrane(gameEngine)
  ];

  /* Start screen setup */
  var gameStarted = false;
	var titleText = "Mini Trooper";
	var titleStyle = {font: "70px Arial", fill:"#000", align:"center" };
	var startBtn;

	//Keeps track of what mini game is randomly selected
	var iCurGame;

  //preload all minigames + start screen button
	function preload () {
    gameEngine.load.spritesheet('button', 'images/button_sprite.png', 630,125);
    for (var i=0; i<miniGames.length; i++) {
      miniGames[i].preload();
    }
  }

  function create () {

		gameEngine.stage.backgroundColor = '#FFF';

		var title = gameEngine.add.text(gameEngine.world.centerX - 190, gameEngine.world.centerY - 100, titleText, titleStyle);

		startBtn = gameEngine.add.button(gameEngine.world.centerX - 225, gameEngine.world.centerY + 100, 'button', startFunction, this, 1, 0);

  }

	function startFunction () {
		//randomly select mini game
		iCurGame = Math.floor(Math.random() * miniGames.length);

		miniGames[iCurGame].create();
    gameStarted = true;
	}

  function update() {
    if (gameStarted)
    {
      miniGames[iCurGame].update();
      if (miniGames[iCurGame].outcome == 1) {
        // something happen after win
        gotoNextGame();
      } else if (miniGames[iCurGame].outcome == -1) {
        // something happen after lose
        gotoNextGame();
      }
    }
  }

  function gotoNextGame() {
    console.log("Game " + iCurGame + " is finished.");
    miniGames[iCurGame].destroy();

    var iNewGame = Math.floor(Math.random() * miniGames.length);
    // Uncomment this after we get another game workin
    // while (iNewGame == iCurGame) { iNewGame = Math.floor(Math.random() * miniGames.length); }
    iCurGame = iNewGame;

    miniGames[iCurGame].create();
    console.log("Starting game " + iCurGame + ".");
  }

};
