"use strict";

NoMeansNo.prototype = new Minigame();
NoMeansNo.prototype.constructor = NoMeansNo;

function NoMeansNo (pGameEngine) {
  this.gameEngine = pGameEngine;

  this.score = 0;
  this.scoreText;
  this.elbin;
	this.pedobear;
	this.house;
  //Keyboard controls
  this.cursors;
	//button
	this.runBtn;
}

NoMeansNo.prototype.preload = function() {
  //load images
  this.gameEngine.load.image('elbin', 'images/elbin.png');
	this.gameEngine.load.image('house', 'images/house.png');
	this.gameEngine.load.image('background', 'images/noMeansNoBG.png');
	
	this.gameEngine.load.image('pedobear', 'images/pedobear_sprite.png', 26, 55);
	this.gameEngine.load.spritesheet('button', 'images/button_sprite.png', 630,125);
};

NoMeansNo.prototype.create = function() {
		
	this.gameEngine.add.sprite(0, 0, 'background');
	
	//button actions event handlers
	this.runBtn = this.gameEngine.add.button(this.gameEngine.world.centerX - 315, 400, 'button', actionOnClick, this, 1, 0);
	
  this.elbin = this.gameEngine.add.sprite(150, this.gameEngine.world.centerY + 65, 'elbin');
  this.elbin.anchor.setTo(0.5, 0.5);

	this.pedobear = this.gameEngine.add.sprite(0, this.gameEngine.world.centerY + 65, 'pedobear');
  this.pedobear.anchor.setTo(0.5, 0.5);

	this.house = this.gameEngine.add.sprite(915, (this.gameEngine.world.centerY + 5), 'house');
  this.house.anchor.setTo(0.5, 0.5);

  //scale sprites
  this.elbin.scale.setTo(1, 1);

  //enable physics so sprites can move
  this.gameEngine.physics.enable(this.elbin, Phaser.Physics.ARCADE);
	this.gameEngine.physics.enable(this.pedobear, Phaser.Physics.ARCADE);
	this.gameEngine.physics.enable(this.house, Phaser.Physics.ARCADE);
	
  //Stop the following keys from propagating up to the browser
  this.gameEngine.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR ]);
	
	//CONSTANT
	this.elbin.body.velocity.x = 50;
};

NoMeansNo.prototype.update = function() {
	//Pedobear hits player
	this.gameEngine.physics.arcade.overlap(this.elbin, this.pedobear, killElbin, null, this);
	//Player hits house
	this.gameEngine.physics.arcade.overlap(this.elbin, this.house, liveElbin, null, this);

	this.pedobear.body.velocity.x = 150;

	function killElbin (elbin, pedobear) {
		console.log("Elbin is dead");
		// Removes elbin from the screen
		this.elbin.kill();
	}

	function liveElbin (elbin, house) {
		console.log("Elbin is alive");
	}

};

//button action functions
function actionOnClick(){
	this.elbin.body.velocity.x += 10;
}
