"use strict";

NyanRace.prototype = new Minigame();
NyanRace.prototype.constructor = NyanRace;

function NyanRace (pGameEngine) {
  this.gameEngine = pGameEngine;
  this.gameId = "nr";
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
	this.nyanCatMusic;
	this.nyanCatStars;
	this.totalStars = 0;

	this.counterTitle;
	this.timer;
	this.moveNyanCat = false;
	this.gameStarted = false;

	this.counter = 5;
	this.counterStyle = {font: "70px ChickenButt", fill:"#fff", align:"center" };

	this.instructions;
	this.instructionsTxt = "Wait for nyan Cat and then choose the right color!";
	this.instructionsStyle = {font: "30px ChickenButt", fill:"#000", align:"center" };

	this.difficulty;
	this.difficultyStyle = {font: "50px ChickenButt", fill:"#fff", align:"center" };
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

	this.gameEngine.load.spritesheet('nyanCatStars', 'images/nyanStar.png', 100, 100, 6);

	this.gameEngine.load.audio('nyanCatMusic', ['audio/nyanCatMusic.mp3','audio/nyanCatMusic.ogg']);
};

NyanRace.prototype.create = function() {

	this.gameEngine.stage.backgroundColor = '#FFF';
	this.instructions = this.gameEngine.add.text(this.gameEngine.world.centerX, this.gameEngine.world.centerY, this.instructionsTxt, this.instructionsStyle);
	this.instructions.x = this.gameEngine.world.centerX - this.instructions.width/2;

	this.gameEngine.time.events.add(Phaser.Timer.SECOND * 3, this.gameStart, this);

};

NyanRace.prototype.gameStart = function() {

	//get rid of instructions
	this.instructions.destroy();

	this.gameEngine.stage.backgroundColor = '#0F4D8F';
	this.counterTitle = this.gameEngine.add.text(this.gameEngine.world.centerX, this.gameEngine.world.centerY, this.counter, this.counterStyle);

	this.difficultyTxt = "Difficulty: " + DIFFICULTY.nr.current;
	this.difficulty = this.gameEngine.add.text(60, 30, this.difficultyTxt, this.difficultyStyle);

	//randomly select nyan cat color game
	var randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];

	this.nyanCat = this.gameEngine.add.sprite(-50, this.gameEngine.world.centerY - 100, randomColor);
	this.nyanCat.color = randomColor;
  this.nyanCat.anchor.setTo(0.5, 0.5);
	this.nyanCat.scale.setTo(0.5, 0.5);

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

	this.createTwinkles();
	this.nyanCatMusic = this.gameEngine.add.audio('nyanCatMusic');
	this.nyanCatMusic.play();
	this.timer = this.gameEngine.time.create(false);
	this.timer.loop(1000, this.countdown, this);
	this.timer.start();

	this.gameEngine.physics.enable(this.nyanCat, Phaser.Physics.ARCADE);

	this.gameStarted = true;

}


NyanRace.prototype.countdown = function() {
   this.counter--;
	this.counterTitle.destroy();

	if(this.counter > 0){
		this.counterTitle = this.gameEngine.add.text(this.gameEngine.world.centerX, this.gameEngine.world.centerY, this.counter, this.counterStyle);
	} else {
		this.moveNyanCat = true;
	}

};

NyanRace.prototype.update = function() {

	if(this.gameStarted == true){

	if (this.totalStars < 500)
	{
			this.createTwinkles();
	}

	}

	if(this.moveNyanCat == true){
		this.nyanCat.body.velocity.x = 1000;
	}

	if(this.gameStarted == true){

	if(this.nyanCat.x > 1000){
		this.outcome = -1;
	}

	}


};

NyanRace.prototype.createTwinkles = function(){

	this.nyanCatStars = this.gameEngine.add.sprite(this.gameEngine.world.randomX, this.gameEngine.world.randomY, 'nyanCatStars');
	this.nyanCatStars.anchor.setTo(0.5);
	this.nyanCatStars.animations.add('twinkle');
	this.nyanCatStars.animations.play('twinkle', 6, false);

	this.totalStars++;
};

function pressBlue(){
		if(this.nyanCat.color == "Blue"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

function pressGreen(){
		if(this.nyanCat.color == "Green"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

function pressIndigo(){
		if(this.nyanCat.color == "Indigo"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

function pressRed(){
		if(this.nyanCat.color == "Red"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

function pressOrange(){
		if(this.nyanCat.color == "Orange"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

function pressViolet(){
		if(this.nyanCat.color == "Violet"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

function pressYellow(){
		if(this.nyanCat.color == "Yellow"){
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
