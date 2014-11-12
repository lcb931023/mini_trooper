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
}

NoMeansNo.prototype.preload = function() {
  //load elbin image
  this.gameEngine.load.image('elbin', 'images/elbin.png');
	this.gameEngine.load.image('pedobear', 'images/pedobear.png');
	this.gameEngine.load.image('house', 'images/house.png');
};

NoMeansNo.prototype.create = function() {
  this.elbin = this.gameEngine.add.sprite(150, this.gameEngine.world.centerY, 'elbin');
  this.elbin.anchor.setTo(0.5, 0.5);

	this.pedobear = this.gameEngine.add.sprite(0, this.gameEngine.world.centerY, 'pedobear');
  this.pedobear.anchor.setTo(0.5, 0.5);

	this.house = this.gameEngine.add.sprite(915, (this.gameEngine.world.centerY - 50), 'house');
  this.house.anchor.setTo(0.5, 0.5);

  //scale elbins face
  this.elbin.scale.setTo(1, 1);

  //enable physics so elbin can move
  this.gameEngine.physics.enable(this.elbin, Phaser.Physics.ARCADE);
	this.gameEngine.physics.enable(this.pedobear, Phaser.Physics.ARCADE);
	this.gameEngine.physics.enable(this.house, Phaser.Physics.ARCADE);

  this.cursors = this.gameEngine.input.keyboard.createCursorKeys();

};

NoMeansNo.prototype.update = function() {

	 //Pedobear hits player
	 this.gameEngine.physics.arcade.overlap(this.elbin, this.pedobear, killElbin, null, this);
	 //Player hits house
	 this.gameEngine.physics.arcade.overlap(this.elbin, this.house, liveElbin, null, this);

		if (this.cursors.right.isDown){
			//  Move to the right
			this.elbin.body.velocity.x = 150;
		}
		else {
			//Don't move
			this.elbin.body.velocity.x = 0;
		}

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
