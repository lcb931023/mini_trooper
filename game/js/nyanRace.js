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
	this.nyanCatStars;
	this.nyanCatStarsAnim;
	this.totalStars = 0;
}

NyanRace.prototype.preload = function() {
  //load images
  this.gameEngine.load.image('cat', 'images/temp_cat.gif');
	this.gameEngine.load.spritesheet('nyanCatStars', 'images/nyanStar.png', 100, 100, 6);
};

NyanRace.prototype.create = function() {
	this.gameEngine.stage.backgroundColor = '#0F4D8F';
	
  this.nyanCat = this.gameEngine.add.sprite(150, this.gameEngine.world.centerY - 100, 'cat');
  this.nyanCat.anchor.setTo(0.5, 0.5);
	this.nyanCat.scale.setTo(0.5, 0.5);
	
	this.createTwinkles();
};

NyanRace.prototype.update = function() {

 if (this.totalStars < 200 && this.gameEngine.time.now > this.timer)
    {
        this.createTwinkles();
    }
};


NyanRace.prototype.createTwinkles = function(){
	
	this.nyanCatStars = this.gameEngine.add.sprite(this.gameEngine.world.randomX, this.gameEngine.world.randomY, 'nyanCatStars');
	this.nyanCatStars.anchor.setTo(0.5);
	this.nyanCatStars.animations.add('twinkle');
	this.nyanCatStars.animations.play('twinkle', 6, false);
	
	//this.gameEngine.add.tween(this.gameEngine.nyanCatStars).to({ x: this.gameEngine.width + (1600 + this.nyanCatStars.x) }, 20000, Phaser.Easing.Linear.None, true);

	this.totalStars++;
	this.timer = this.gameEngine.time.now + 100;
};