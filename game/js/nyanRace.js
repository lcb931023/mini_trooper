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
	
	this.colors = [
		"Blue",
		"Green",
		"Indigo",
		"Orange",
		"Red",
		"Violet",
		"Yellow"
	];
	
  this.nyanCat;
	this.colorButton;
	this.counterTitle;
	this.timer;
	this.moveNyanCat = false;
	
	this.counter = 3;
	this.counterStyle = {font: "70px Arial", fill:"#000", align:"center" };
}

NyanRace.prototype.preload = function() {
  //load images
  this.gameEngine.load.image('Blue', 'images/nyanCat_Blue.png');
	this.gameEngine.load.image('Green', 'images/nyanCat_Green.png');
	this.gameEngine.load.image('Indigo', 'images/nyanCat_Indigo.png');
	this.gameEngine.load.image('Orange', 'images/nyanCat_Orange.png');
	this.gameEngine.load.image('Red', 'images/nyanCat_Red.png');
	this.gameEngine.load.image('Violet', 'images/nyanCat_Violet.png');
	this.gameEngine.load.image('Yellow', 'images/nyanCat_Yellow.png');
	this.gameEngine.load.image('background', 'images/noMeansNoBG.png');
};

NyanRace.prototype.create = function() {
	
	this.gameEngine.add.sprite(0, 0, 'background');
	
	this.counterTitle = this.gameEngine.add.text(this.gameEngine.world.centerX, 		this.gameEngine.world.centerY, this.counter, this.counterStyle);
	
	//randomly select nyan cat color game
	var randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
	console.log(randomColor);
	
	 this.nyanCat = this.gameEngine.add.sprite(-50, this.gameEngine.world.centerY - 100, randomColor);
	this.nyanCat.color = randomColor;

  this.nyanCat.anchor.setTo(0.5, 0.5);
	
	this.nyanCat.scale.setTo(0.5, 0.5);
	
   this.timer = this.gameEngine.time.create(false);
   this.timer.loop(1000, countdown, this);
	 this.timer.start();
	
	this.gameEngine.physics.enable(this.nyanCat, Phaser.Physics.ARCADE);
	
};

function countdown() {

   this.counter--;
	this.counterTitle.destroy();
	
	if(this.counter > 0){
		this.counterTitle = this.gameEngine.add.text(this.gameEngine.world.centerX, 		this.gameEngine.world.centerY, this.counter, this.counterStyle);
	} else {
		this.moveNyanCat = true;
	}

}

NyanRace.prototype.update = function() {

		if(this.moveNyanCat == true){
			 this.nyanCat.body.velocity.x = 2000;
		}

};
