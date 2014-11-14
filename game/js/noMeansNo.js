"use strict";

NoMeansNo.prototype = new Minigame();
NoMeansNo.prototype.constructor = NoMeansNo;

function NoMeansNo (pGameEngine) {
  this.gameEngine = pGameEngine;
  // [TODO] enum
  // 0 = ongoing, 1 = won, -1 = lost
  this.outcome = 0;

  this.score = 0;

  this.bg;
  this.scoreText; // [TODO] implement
  this.elbin;
	this.pedobear;
	this.house;
	//button
	this.runBtn;
}

NoMeansNo.prototype.preload = function() {
  //load images
  this.gameEngine.load.image('elbin', 'images/elbin.png');
	this.gameEngine.load.image('house', 'images/house.png');
	this.gameEngine.load.image('background', 'images/noMeansNoBG.png');

	this.gameEngine.load.spritesheet('pedobear', 'images/pedobear_sprite.png', 40, 54, 6);
	this.gameEngine.load.spritesheet('button', 'images/button_sprite.png', 630,125);
};

NoMeansNo.prototype.create = function() {

	this.bg = this.gameEngine.add.sprite(0, 0, 'background');

	//button actions event handlers
	this.runBtn = this.gameEngine.add.button(this.gameEngine.world.centerX - 315, 415, 'button', actionOnClick, this, 1, 0);

  this.elbin = this.gameEngine.add.sprite(150, this.gameEngine.world.centerY + 65, 'elbin');
  this.elbin.anchor.setTo(0.5, 0.5);

	this.pedobear = this.gameEngine.add.sprite(0, this.gameEngine.world.centerY + 65, 'pedobear');
  this.pedobear.anchor.setTo(0.5, 0.5);
	this.pedobear.animations.add('run');
	this.pedobear.animations.play('run', 6, true);

	this.house = this.gameEngine.add.sprite(915, (this.gameEngine.world.centerY + 5), 'house');
  this.house.anchor.setTo(0.5, 0.5);

  //scale sprites
  this.elbin.scale.setTo(1, 1);

  //enable physics so sprites can move
  this.gameEngine.physics.enable(this.elbin, Phaser.Physics.ARCADE);
	this.gameEngine.physics.enable(this.pedobear, Phaser.Physics.ARCADE);
	this.gameEngine.physics.enable(this.house, Phaser.Physics.ARCADE);

	//CONSTANT
	this.elbin.body.velocity.x = 50;
	this.pedobear.body.velocity.x = 150;
};

NoMeansNo.prototype.update = function() {
	//Pedobear hits player
	this.gameEngine.physics.arcade.overlap(this.elbin, this.pedobear, killElbin, null, this);
	//Player hits house
	this.gameEngine.physics.arcade.overlap(this.elbin, this.house, liveElbin, null, this);

	function killElbin (elbin, pedobear) {
		console.log("Elbin is dead");
		this.pedobear.body.velocity.x = 0;
		// Removes elbin from the screen
		this.elbin.kill();
    this.outcome = -1;
	}

	function liveElbin (elbin, house) {
		console.log("Elbin is alive");
    this.outcome = 1;
	}

};

//button action functions
function actionOnClick(){
	this.elbin.body.velocity.x += 10;
}

NoMeansNo.prototype.destroy = function() {
  // Reset vars
  this.score = 0;
  this.outcome = 0;
  // Detach listeners
    // No listeners attached in this game, other than the button, which gets its listener destroyed with itself
  // Remove elements
  this.bg.destroy();
  this.elbin.destroy();
  this.pedobear.destroy();
  this.house.destroy();
  this.runBtn.destroy();
}
