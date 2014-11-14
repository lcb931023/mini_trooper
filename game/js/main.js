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
		new NyanRace(gameEngine),
    //new MusicMembrane(gameEngine)
  ];

  /* Start screen setup */
  var gameStarted = false;
	var startBg;
	var startBtn;

	//Keeps track of what mini game is randomly selected
	var iCurGame;

  //preload all minigames + start screen button
	function preload () {
		gameEngine.load.image('startBg', 'images/startPg_bg.png');
    gameEngine.load.image('startBtn', 'images/startBtn.png');
		
    for (var i=0; i<miniGames.length; i++) {
      miniGames[i].preload();
    }
  }

  function create () {
		startBg = gameEngine.add.sprite(0,0,'startBg');
		startBtn = gameEngine.add.sprite(gameEngine.world.centerX, 415, 'startBtn');
		startBtn.anchor.set(0.5);
		startBtn.inputEnabled = true;
		startBtn.events.onInputDown.add(startFunction,this);
  }

	function startFunction () {
		//randomly select mini game
		iCurGame = Math.floor(Math.random() * miniGames.length);

		miniGames[iCurGame].create();
    gameStarted = true;
		startBtn.destroy();
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
