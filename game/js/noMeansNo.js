"use strict";

function NoMeansNo (pGameEngine) {
  this.gameEngine = pGameEngine;

  this.score = 0;
  this.scoreText;
  this.elbin;
	this.pedobear;
  //Keyboard controls
  this.cursors;
}

NoMeansNo.prototype.preload = function() {
  //load elbin image
  this.gameEngine.load.image('elbin', 'images/elbin.png');
	this.gameEngine.load.image('pedobear', 'images/pedobear.png');
};

NoMeansNo.prototype.create = function() {
  //background color
  this.gameEngine.stage.backgroundColor = '#FFF';

  this.elbin = this.gameEngine.add.sprite(50, this.gameEngine.world.centerY, 'elbin');
  this.elbin.anchor.setTo(0.5, 0.5);
	
	this.pedobear = this.gameEngine.add.sprite(50, this.gameEngine.world.centerY, 'pedobear');
  this.pedobear.anchor.setTo(0.5, 0.5);

  //scale our sprites
  this.elbin.scale.setTo(0.3, 0.3);
	this.pedobear.scale.setTo(1,1);

  //enable physics so sprites can move
  this.gameEngine.physics.enable(this.elbin, Phaser.Physics.ARCADE);
	this.gameEngine.physics.enable(this.pedobear, Phaser.Physics.ARCADE);
	
  this.cursors = this.gameEngine.input.keyboard.createCursorKeys();

};

NoMeansNo.prototype.update = function() {

  if (this.cursors.right.isDown){
      //  Move to the right
      this.elbin.body.velocity.x = 150;
  }
  else {
      //Don't move
      this.elbin.body.velocity.x = 0;
  }
	
	this.pedobear.body.velocity.x = 150;

};
