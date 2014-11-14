"use strict";

LostScreen.prototype = new Screen();
LostScreen.prototype.constructor = Screen;

function LostScreen (pGameEngine) {
  this.gameEngine = pGameEngine;

  this.bg;
  this.againBtn;
}

LostScreen.prototype.preload = function() {
  // Load image assets
  this.gameEngine.load.image('lostBG', 'images/gameOver_bg.png');
  this.gameEngine.load.image('againBtn', 'images/gameOverBtn.png');
};

LostScreen.prototype.create = function() {
  this.bg = this.gameEngine.add.sprite(0,0,'lostBG');
  this.againBtn = this.gameEngine.add.sprite(this.gameEngine.world.centerX, 415, 'againBtn');
  this.againBtn.anchor.set(0.5);
	this.againBtn.inputEnabled = true;
	this.againBtn.events.onInputDown.add(function f(){this.done = true;},this);
};

LostScreen.prototype.update = function() {

};

LostScreen.prototype.destroy = function() {
  this.bg.destroy();
  this.againBtn.destroy();
  Screen.prototype.destroy.call(this); // reset 'done'
};
