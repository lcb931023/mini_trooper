"use strict";

SuperTrooper.prototype = new Minigame();
SuperTrooper.prototype.constructor = SuperTrooper;

function SuperTrooper (pGameEngine) {
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
	this.gameStarted = false;

	this.counter = 5;
	this.counterStyle = {font: "70px ChickenButt", fill:"#000", align:"center" };
	
	this.instructions;
	this.instructionsTxt = "ITS SUPER TROOPER TIME!";
	this.instructionsStyle = {font: "30px ChickenButt", fill:"#000", align:"center" };
	
	//our word for playing
	this.word;
	this.wordStyle;
	
	//our random colors
	this.randomColor1;
	this.randomColor2;
	
	//pick random game (either 0 or 1)
	this.randomGame;
	this.randomGameTitle;
	this.randomGameTxt;
	this.randomGameStyle = {font: "30px ChickenButt", fill:"#000", align:"center" };

}

SuperTrooper.prototype.preload = function() {
  //load images
	this.gameEngine.load.image('Blue', 'images/nyanCat_Blue.png');
	this.gameEngine.load.image('Green', 'images/nyanCat_Green.png');
	this.gameEngine.load.image('Indigo', 'images/nyanCat_Indigo.png');
	this.gameEngine.load.image('Orange', 'images/nyanCat_Orange.png');
	this.gameEngine.load.image('Red', 'images/nyanCat_Red.png');
	this.gameEngine.load.image('Violet', 'images/nyanCat_Violet.png');
	this.gameEngine.load.image('Yellow', 'images/nyanCat_Yellow.png');
};

SuperTrooper.prototype.create = function() {
	
	this.gameEngine.stage.backgroundColor = '#FFF';
	this.instructions = this.gameEngine.add.text(200, this.gameEngine.world.centerY, this.instructionsTxt, this.instructionsStyle);
	
	this.gameEngine.time.events.add(Phaser.Timer.SECOND * 3, this.gameStart, this);
	
};

SuperTrooper.prototype.gameStart = function() {
	
	//get rid of instructions
	this.instructions.destroy();
	
	this.gameEngine.stage.backgroundColor = '#FFF';
	this.counterTitle = this.gameEngine.add.text(this.gameEngine.world.centerX, this.gameEngine.world.centerY - 200, this.counter, this.counterStyle);

	//randomly select colors for game
	this.randomColor1 = this.colors[Math.floor(Math.random() * this.colors.length)];
	this.randomColor2 = this.colors[Math.floor(Math.random() * this.colors.length)];
	
	this.randomGame = parseInt(Math.random() * 2);
	
	//What color is it in? aka randomColor1
	if(this.randomGame == 0){
		this.randomGameTxt = "What color is it in?";
	} 
	//What color is it in? aka randomColor2
	else {
		this.randomGameTxt = "What color is it?";
	}
	
 this.randomGameTitle = this.gameEngine.add.text(this.gameEngine.world.centerX, this.gameEngine.world.centerY - 100, this.randomGameTxt, this.randomGameStyle);
	
	//Prevent same colors
	while(this.randomColor1 == this.randomColor2){
		this.randomColor2 = this.colors[Math.floor(Math.random() * this.colors.length)];
	}
	
	this.wordStyle = {font: "45px ChickenButt", fill: this.randomColor1.toLowerCase(), align:"center" };
	this.word = this.gameEngine.add.text(this.gameEngine.world.centerX, this.gameEngine.world.centerY, this.randomColor2, this.wordStyle);

	var xLoc = 100;

	for(var i = 0; i < 7; i++){
		this.buttons[i] = this.gameEngine.add.sprite(xLoc, 450, this.colors[i]);
		this.buttons[i].anchor.set(0.5);
		this.buttons[i].inputEnabled = true;
		this.buttons[i].events.onInputDown.add(eval(this.btnFunc[i]),this);
		this.buttons[i].anchor.setTo(0.5, 0.5);
		this.buttons[i].scale.setTo(0.3, 0.3);
		xLoc += 115;
	}

	this.timer = this.gameEngine.time.create(false);
	this.timer.loop(1000, this.countdown, this);
	this.timer.start();
	
	this.gameStarted = true;
	
}


SuperTrooper.prototype.countdown = function() {
   this.counter--;
	this.counterTitle.destroy();

	if(this.counter > 0){
		this.counterTitle = this.gameEngine.add.text(this.gameEngine.world.centerX, this.gameEngine.world.centerY - 200, this.counter, this.counterStyle);
	} else {
		this.outcome = -1;
	}

};

SuperTrooper.prototype.update = function() {
	
	
};

function pressBlue(){
		
		if(this.randomGame == 0 && this.randomColor1 == "Blue"){
			this.outcome = 1;
		} else if(this.randomGame == 1 && this.randomColor2 == "Blue"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

function pressGreen(){
				if(this.randomGame == 0 && this.randomColor1 == "Green"){
			this.outcome = 1;
		} else if(this.randomGame == 1 && this.randomColor2 == "Green"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

function pressIndigo(){
			if(this.randomGame == 0 && this.randomColor1 == "Indigo"){
			this.outcome = 1;
		} else if(this.randomGame == 1 && this.randomColor2 == "Indigo"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

function pressRed(){
				if(this.randomGame == 0 && this.randomColor1 == "Red"){
			this.outcome = 1;
		} else if(this.randomGame == 1 && this.randomColor2 == "Red"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

function pressOrange(){
			if(this.randomGame == 0 && this.randomColor1 == "Orange"){
			this.outcome = 1;
		} else if(this.randomGame == 1 && this.randomColor2 == "Orange"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

function pressViolet(){
				if(this.randomGame == 0 && this.randomColor1 == "Violet"){
			this.outcome = 1;
		} else if(this.randomGame == 1 && this.randomColor2 == "Violet"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

function pressYellow(){
				if(this.randomGame == 0 && this.randomColor1 == "Yellow"){
			this.outcome = 1;
		} else if(this.randomGame == 1 && this.randomColor2 == "Yellow"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

SuperTrooper.prototype.destroy = function() {
  // Reset vars
  this.score = 0;
  this.outcome = 0;
  // Detach listeners
  // No listeners attached in this game, other than the button, which gets its listener destroyed with itself
  // Remove elements
  this.counterTitle.destroy();
  this.timer.destroy();
	this.counter = 5;
	this.counterStyle = {font: "70px ChickenButt", fill:"#000", align:"center" };
	for (var i = 0; i < this.buttons.length; i++) {
		this.buttons[i].destroy();
	}
	this.gameStarted = false;
	this.randomGame = null;
	this.word.destroy();
	this.randomGameTitle.destroy();
}
