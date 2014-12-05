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
	this.bg;

	this.counterTitle;
	this.timer;
	this.gameStarted = false;

	this.counter = 5;
	this.counterStyle = {font: "70px ChickenButt", fill:"#fff", align:"center" };

	this.instructions;
	this.instructionsTxt = "Find JJ among the illegal aliens!";
	this.instructionsStyle = {font: "30px ChickenButt", fill:"#000", align:"center" };

	this.difficulty;
	this.difficultyStyle = {font: "50px ChickenButt", fill:"#fff", align:"center" };
	
	this.watson;
	this.people = [];
	
	this.nonWhites = [
		"Changbai",
		"Elbin",
		"Mike"
	];
	
	this.numFaces;
	this.faceSize;
	this.randomX;
	this.randomY;
	
}

WheresWatson.prototype.preload = function() {
  //load images
	this.gameEngine.load.image('JJ', 'images/jj.png');
	this.gameEngine.load.image('Changbai', 'images/changbai.png');
	this.gameEngine.load.image('Elbin', 'images/elbin.png');
	this.gameEngine.load.image('Mike', 'images/mike.png');
	this.gameEngine.load.image('background1', 'images/watsonBG1.png');
	this.gameEngine.load.image('background2', 'images/watsonBG2.png');
	this.gameEngine.load.image('background3', 'images/watsonBG3.png');
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
	
	var randomBackground = parseInt(Math.random() * 3) + 1;

	this.bg = this.gameEngine.add.sprite(0, 0, 'background' + randomBackground);
	
	this.randomX = parseInt(Math.random() * 960);
	this.randomY = parseInt(Math.random() * 560);
	
	this.numFaces = DIFFICULTY.get(this.gameId, "numFaces");
	this.faceSize = DIFFICULTY.get(this.gameId, "faceSize");
	
	this.watson = this.gameEngine.add.sprite(this.randomX, this.randomY, "JJ");
	this.watson.anchor.set(0.5);
	this.watson.inputEnabled = true;
	this.watson.events.onInputDown.add(pressWatson,this);
	this.watson.anchor.setTo(0.5, 0.5);
	this.watson.scale.setTo(this.faceSize, this.faceSize);
	
	for(var i = 0; i < this.numFaces; i++){
		
		this.randomX = parseInt(Math.random() * 960);
	  this.randomY = parseInt(Math.random() * 560);
		var rand = parseInt(Math.random() * this.nonWhites.length);
		this.people[i] = this.gameEngine.add.sprite(this.randomX, this.randomY, this.nonWhites[rand]);
		this.people[i].anchor.setTo(0.5, 0.5);
		this.people[i].scale.setTo(this.faceSize, this.faceSize);
		
	}
	
	this.counterTitle = this.gameEngine.add.text(this.gameEngine.world.centerX, this.gameEngine.world.centerY, this.counter, this.counterStyle);

	this.difficultyTxt = "Difficulty: " + DIFFICULTY.ww.current;
	this.difficulty = this.gameEngine.add.text(60, 30, this.difficultyTxt, this.difficultyStyle);

	

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
		this.outcome = -1;
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
	this.watson.destroy();
	this.bg.destroy();
  this.counterTitle.destroy();
	this.difficulty.destroy();
  this.timer.destroy();
	this.counter = 5;
	this.counterStyle = {font: "70px ChickenButt", fill:"#000", align:"center" };
	for (var i = 0; i < this.people.length; i++) {
		this.people[i].destroy();
	}
	this.gameStarted = false;
}
