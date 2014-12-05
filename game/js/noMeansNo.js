"use strict";

NoMeansNo.prototype = new Minigame();
NoMeansNo.prototype.constructor = NoMeansNo;

function NoMeansNo (pGameEngine) {
  this.gameEngine = pGameEngine;
  this.gameId = "nmn";
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
	this.gameStarted = false;

	this.instructions;
	this.instructionsTxt = "Run away from the bear before he rapes Elbin!";
	this.instructionsStyle = {font: "30px ChickenButt", fill:"#000", align:"center" };

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

	this.gameEngine.stage.backgroundColor = '#FFF';
	this.instructions = this.gameEngine.add.text(this.gameEngine.world.centerX, this.gameEngine.world.centerY, this.instructionsTxt, this.instructionsStyle);
	this.instructions.x = this.gameEngine.world.centerX - this.instructions.width/2;
	
	this.gameEngine.time.events.add(Phaser.Timer.SECOND * 3, this.gameStart, this);
};

NoMeansNo.prototype.gameStart = function() {

	//get rid of instructions
	this.instructions.destroy();

	this.bg = this.gameEngine.add.sprite(0, 0, 'background');

	//button actions event handlers
	this.runBtn = this.gameEngine.add.button(this.gameEngine.world.centerX - 315, 415, 'button', this.actionOnClick, this, 1, 0);

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
	this.elbin.body.velocity.x = 100;
	this.pedobear.body.velocity.x = 50;

	//now add physics overlaps in update function, as well as testing elbins body being violated
	this.gameStarted = true;

}

NoMeansNo.prototype.update = function() {

	if(this.gameStarted == true){

	//Pedobear hits player
	this.gameEngine.physics.arcade.overlap(this.elbin, this.pedobear, killElbin, null, this);
	//Player hits house
	this.gameEngine.physics.arcade.overlap(this.elbin, this.house, liveElbin, null, this);

	}

	function killElbin (elbin, pedobear) {
		this.pedobear.body.velocity.x = 0;
		// Removes elbin from the screen
		this.elbin.kill();
    this.outcome = -1;
	}

	function liveElbin (elbin, house) {
    this.outcome = 1;
	}

	if(this.gameStarted == true){

	if(this.elbin.body.velocity.x > 0){
		this.elbin.body.velocity.x -= 1;
	}

	}

};

//button action functions
NoMeansNo.prototype.actionOnClick = function(){
	this.elbin.body.velocity.x += 12;
};

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
	this.gameStarted = false;
};
