"use strict";

BulletHell.prototype = new Minigame();
BulletHell.prototype.constructor = BulletHell;

function BulletHell (pGameEngine) {
  this.gameEngine = pGameEngine;	
	this.dragObj;
}

BulletHell.prototype.preload = function() {
	//load images
  this.gameEngine.load.image('elbin', 'images/elbin.png');
};

BulletHell.prototype.create = function() {
	this.gameEngine.stage.backgroundColor = '#FFFFFF';
	
	this.dragObj = this.gameEngine.add.sprite(this.gameEngine.world.centerX, this.gameEngine.world.centerY, 'elbin');
	
    this.dragObj.inputEnabled = true;

    //Allow dragging
    this.dragObj.input.enableDrag(true);
};

BulletHell.prototype.update = function() {
   

};

BulletHell.prototype.destroy = function(){
	this.dragObj.destroy();
}