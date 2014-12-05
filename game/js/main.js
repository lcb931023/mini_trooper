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
		//new NyanRace(gameEngine),
    //new MusicMembrane(gameEngine),
		//new BulletHell(gameEngine),
		//new SuperTrooper(gameEngine)
  ];

  var winScreen = new WinScreen(gameEngine);
  var lostScreen = new LostScreen(gameEngine);

  // Game State Machine
  var GS = {
    TITLE_SCREEN: 1,
    GAMING: 2,
    WON: 3,
    LOST: 4
  };
  var gameState = GS.TITLE_SCREEN;

  /* Start screen setup */
	var startBg;
	var startBtn;

	//Keeps track of what mini game is randomly selected
	var iCurGame;

  // setup screen, preload all minigames + start screen button
	function preload () {
    gameEngine.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    gameEngine.scale.setScreenSize();

		gameEngine.load.image('startBg', 'images/startPg_bg.png');
    gameEngine.load.image('startBtn', 'images/startBtn.png');
    for (var i=0; i< miniGames.length; i++) {
      miniGames[i].preload();
    }
    winScreen.preload();
    lostScreen.preload();
  }

  function create () {
    gameEngine.scale.refresh();

		console.log("Desktop: " + gameEngine.device.desktop);
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
    gameState = GS.GAMING;
		startBtn.destroy();
		startBg.destroy();
	}

	function startFunctionFullScreen () {
		//Full screen
		gameEngine.scale.startFullScreen();

		//randomly select mini game
		iCurGame = Math.floor(Math.random() * miniGames.length);

		miniGames[iCurGame].create();
    gameState = GS.GAMING;
		startBtn.destroy();
		startBg.destroy();
	}

  function update() {
    if (gameState == GS.GAMING)
    {
      miniGames[iCurGame].update();
      if (miniGames[iCurGame].outcome == 1) {
        gameWon();
      } else if (miniGames[iCurGame].outcome == -1) {
        gameLost();
      }
    } else if (gameState == GS.WON) {
      if (winScreen.done) {
        winScreen.destroy();
        gotoNextGame();
      }
    } else if (gameState == GS.LOST) {
      if (lostScreen.done) {
        lostScreen.destroy();
        gotoNextGame();
      }
    }
  }

  function gameWon() {
    miniGames[iCurGame].addDif();
    destroyCurrentGame();
    winScreen.create();
    gameState = GS.WON;
  }

  function gameLost() {
    miniGames[iCurGame].resetDif();
    destroyCurrentGame();
    lostScreen.create();
    gameState = GS.LOST;
  }

  function destroyCurrentGame() {
    miniGames[iCurGame].destroy();
  }

  function gotoNextGame() {
    var iNewGame = Math.floor(Math.random() * miniGames.length);
    // Avoid same game
    if (miniGames.length > 1)
      while (iNewGame == iCurGame)
        { iNewGame = Math.floor(Math.random() * miniGames.length); }
    iCurGame = iNewGame;

    miniGames[iCurGame].create();
    gameState = GS.GAMING;
  }

};
