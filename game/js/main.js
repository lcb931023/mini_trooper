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
    new MusicMembrane(gameEngine)
  ];
  var noMeansNo = new NoMeansNo(gameEngine);
	var musicMembrane = new MusicMembrane(gameEngine);

  /* Start screen setup */
	var titleText = "Mini Trooper";
	var titleStyle = {font: "70px Arial", fill:"#000", align:"center" };
	var startBtn;

	//ARRAY OF ALL MINI GAMES
	var miniGames = ["noMeansNo", "musicMembrane", "nyanRace"];

	//Keeps track of what mini game is randomly selected
	var currentMiniGame;

  //preload all minigames + start screen button
	function preload () {
    noMeansNo.preload();
	  musicMembrane.preload();

		gameEngine.load.spritesheet('button', 'images/button_sprite.png', 630,125);
  }

  function create () {

		gameEngine.stage.backgroundColor = '#FFF';

		var title = gameEngine.add.text(gameEngine.world.centerX - 190, gameEngine.world.centerY - 100, titleText, titleStyle);

		startBtn = gameEngine.add.button(gameEngine.world.centerX - 225, gameEngine.world.centerY + 100, 'button', startFunction, this, 1, 0);

  }

	function startFunction () {

		//randomly select mini game
		var randomMiniGame = Math.floor(Math.random() * miniGames.length);

		//set current MiniGame to currentMiniGame
		currentMiniGame = miniGames[randomMiniGame];

		/* IF currentMiniGame == "noMeansNo" */
		currentMiniGame = "noMeansNo";
		noMeansNo.create();

		/* IF currentMiniGame == "musicMembrane" etc... */


	}

  function update() {

		if (currentMiniGame == "noMeansNo"){
			noMeansNo.update();
      if (noMeansNo.outcome == 1) {
        // something happen after win
      } else if (noMeansNo.outcome == -1) {
        // something happen after lose
      }
		}

  }

};
