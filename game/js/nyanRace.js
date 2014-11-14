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
	
	this.buttons = [];
	
	this.btnFunc = [
		"pressBlue",
		"pressGreen",
		"pressIndigo",
		"pressOrange",
		"pressRed",
		"pressViolet",
		"pressYellow"
	];
	
  this.nyanCat;
	this.counterTitle;
	this.timer;
	this.moveNyanCat = false;
	
	this.counter = 3;
	this.counterStyle = {font: "70px Arial", fill:"#000", align:"center" };
	
	this.blueBtn;
	this.greenBtn;
	this.indigoBtn;
	this.orangeBtn;
	this.redBtn;
	this.violetBtn;
	this.yellowBtn;
	
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
	
	var xLoc = 100;
	
	for(var i = 0; i < 7; i++){
		console.log(this.colors[i]);
		this.buttons[i] = this.gameEngine.add.sprite(xLoc, 450, this.colors[i]);
		this.buttons[i].anchor.set(0.5);
		this.buttons[i].inputEnabled = true;
		this.buttons[i].events.onInputDown.add(eval(this.btnFunc[i]),this);
		this.buttons[i].anchor.setTo(0.5, 0.5);
		this.buttons[i].scale.setTo(0.3, 0.3);
		xLoc += 115;
		console.log(this.buttons[i]);
	}
	
	this.gameEngine.physics.enable(this.nyanCat, Phaser.Physics.ARCADE);
	
	 this.timer = this.gameEngine.time.create(false);
   this.timer.loop(1000, countdown, this);
	 this.timer.start();
	
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
	
		if(this.nyanCat.x > 1000){
			this.outcome = -1;
		}

};

function pressBlue(){
		if(this.nyanCat.color = "Blue"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

function pressGreen(){
		if(this.nyanCat.color = "Blue"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

function pressIndigo(){
		if(this.nyanCat.color = "Blue"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

function pressRed(){
		if(this.nyanCat.color = "Blue"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

function pressOrange(){
		if(this.nyanCat.color = "Blue"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

function pressViolet(){
		if(this.nyanCat.color = "Blue"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

function pressYellow(){
		if(this.nyanCat.color = "Blue"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

NyanRace.prototype.destroy = function() {
  // Reset vars
  this.score = 0;
  this.outcome = 0;
  // Detach listeners
    // No listeners attached in this game, other than the button, which gets its listener destroyed with itself
  // Remove elements
  this.nyanCat.destroy();
  this.counterTitle.destroy();
  this.timer.destroy();
	this.moveNyanCat = false;
	this.counter = 3;
	this.counterStyle = {font: "70px Arial", fill:"#000", align:"center" };
}
