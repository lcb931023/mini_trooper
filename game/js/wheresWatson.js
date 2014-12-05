"use strict";

WheresWatson.prototype = new Minigame();
WheresWatson.prototype.constructor = WheresWatson;

function WheresWatson (pGameEngine) {
  this.gameEngine = pGameEngine;
  this.gameId = "ww";
  // [TODO] enum
  // 0 = ongoing, 1 = won, -1 = lost
  this.outcome = 0;
  this.score = 0;
  this.scoreText;

	this.counterTitle;
	this.timer;
	this.gameStarted = false;

	this.counter = 5;
	this.counterStyle = {font: "70px ChickenButt", fill:"#fff", align:"center" };

	this.instructions;
	this.instructionsTxt = "Wait for nyan Cat and then choose the right color!";
	this.instructionsStyle = {font: "30px ChickenButt", fill:"#000", align:"center" };

	this.difficulty;
	this.difficultyStyle = {font: "50px ChickenButt", fill:"#fff", align:"center" };
	
	this.watson;
}

WheresWatson.prototype.preload = function() {
  //load images
	this.gameEngine.load.image('JJ', 'images/jj.png');
	this.gameEngine.load.image('Changbai', 'images/changbai.png');
	this.gameEngine.load.image('Elbin', 'images/elbin.png');
	this.gameEngine.load.image('Mike', 'images/mike.png');
	this.gameEngine.load.image('background1', 'images/nyanCat_Red.png');
	this.gameEngine.load.image('background2', 'images/nyanCat_Violet.png');
	this.gameEngine.load.image('background3', 'images/nyanCat_Yellow.png');
};

WheresWatson.prototype.create = function() {

	this.gameEngine.stage.backgroundColor = '#FFF';
	this.instructions = this.gameEngine.add.text(this.gameEngine.world.centerX, this.gameEngine.world.centerY, this.instructionsTxt, this.instructionsStyle);
	this.instructions.x = this.gameEngine.world.centerX - this.instructions.width/2;

	this.gameEngine.time.events.add(Phaser.Timer.SECOND * 3, this.gameStart, this);

};

WheresWatson.prototype.gameStart = function() {

	//get rid of instructions
	this.instructions.destroy();

	this.gameEngine.stage.backgroundColor = '#0F4D8F';
	this.counterTitle = this.gameEngine.add.text(this.gameEngine.world.centerX, this.gameEngine.world.centerY, this.counter, this.counterStyle);

	this.difficultyTxt = "Difficulty: " + DIFFICULTY.nr.current;
	this.difficulty = this.gameEngine.add.text(60, 30, this.difficultyTxt, this.difficultyStyle);
	
	this.watson = this.gameEngine.add.sprite(100, 100, "JJ");
	this.watson.anchor.set(0.5);
	this.watson.inputEnabled = true;
	this.watson.events.onInputDown.add(pressWatson,this);
	this.watson.anchor.setTo(0.5, 0.5);
	this.watson.scale.setTo(0.3, 0.3);

	

	this.timer = this.gameEngine.time.create(false);
	this.timer.loop(1000, this.countdown, this);
	this.timer.start();

	this.gameStarted = true;

}


WheresWatson.prototype.countdown = function() {
   this.counter--;
	this.counterTitle.destroy();

	if(this.counter > 0){
		this.counterTitle = this.gameEngine.add.text(this.gameEngine.world.centerX, this.gameEngine.world.centerY, this.counter, this.counterStyle);
	} else {

	}

};

WheresWatson.prototype.update = function() {



};


function pressWatson(){

	this.outcome = 1;
	
}


WheresWatson.prototype.destroy = function() {
  // Reset vars
  this.score = 0;
  this.outcome = 0;
  // Detach listeners
  // No listeners attached in this game, other than the button, which gets its listener destroyed with itself
  // Remove elements
  this.nyanCat.destroy();
  this.counterTitle.destroy();
	this.nyanCatMusic.destroy();
	this.difficulty.destroy();
  this.timer.destroy();
	this.moveNyanCat = false;
	this.counter = 5;
	this.counterStyle = {font: "70px ChickenButt", fill:"#000", align:"center" };
	for (var i = 0; i < this.buttons.length; i++) {
		this.buttons[i].destroy();
	}
	this.totalStars = 0;
	this.nyanCatStars.destroy();
	this.gameStarted = false;
}
