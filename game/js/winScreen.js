"use strict";

WinScreen.prototype = new Screen();
WinScreen.prototype.constructor = Screen;

function WinScreen (pGameEngine) {
  this.gameEngine = pGameEngine;
  this.bg;
}

WinScreen.prototype.preload = function() {
  // Load image assets
  this.gameEngine.load.image('nextBG', 'images/nextBg.png');
};

WinScreen.prototype.create = function() {
  this.bg = this.gameEngine.add.sprite(0,0,'nextBG');
  this.gameEngine.time.events.add(Phaser.Timer.SECOND * 1.5, function f(){this.done = true;}, this);
};

WinScreen.prototype.update = function() {

};

WinScreen.prototype.destroy = function() {
  Screen.prototype.destroy.call(this);
  this.bg.destroy();
};
