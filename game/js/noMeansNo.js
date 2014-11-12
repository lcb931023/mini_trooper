"use strict";

NoMeansNo.prototype = new Minigame();
NoMeansNo.prototype.constructor = NoMeansNo;

function NoMeansNo (pGameEngine) {
  this.gameEngine = pGameEngine;

  this.score = 0;
  this.scoreText;
  this.elbin;
  //Keyboard controls
  this.cursors;
}

NoMeansNo.prototype.preload = function() {
  //load elbin image
  this.gameEngine.load.image('logo', 'images/elbin.png');
};

NoMeansNo.prototype.create = function() {
  this.elbin = this.gameEngine.add.sprite(50, this.gameEngine.world.centerY, 'logo');
  this.elbin.anchor.setTo(0.5, 0.5);

  //make elbins face smaller
  this.elbin.scale.setTo(0.3, 0.3);

  this.gameEngine.physics.enable(this.elbin, Phaser.Physics.ARCADE);

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

};
