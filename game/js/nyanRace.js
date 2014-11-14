"use strict";

NyanRace.prototype = new Minigame();
NyanRace.prototype.constructor = NyanRace;

function NyanRace (pGameEngine) {
  this.gameEngine = pGameEngine;
  // [TODO] enum
  // 0 = ongoing, 1 = won, -1 = lost
  this.outcome = 0;
	


  this.score = 0;
  this.scoreText;
  this.nyanCat;
	this.colorButton;
}

NyanRace.prototype.preload = function() {
  //load images
  this.gameEngine.load.image('cat', 'images/temp_cat.gif');
	this.gameEngine.load.image('background', 'images/noMeansNoBG.png');
};

NyanRace.prototype.create = function() {

	this.gameEngine.add.sprite(0, 0, 'background');

  this.nyanCat = this.gameEngine.add.sprite(150, this.gameEngine.world.centerY - 100, 'cat');
  this.nyanCat.anchor.setTo(0.5, 0.5);
	
	this.nyanCat.scale.setTo(0.5, 0.5);
	
};

NyanRace.prototype.update = function() {




};
