"use strict";

MusicMembrane.prototype = new Minigame();
MusicMembrane.prototype.constructor = MusicMembrane;

function MusicMembrane (pGameEngine) {
  this.gameEngine = pGameEngine;
	this.gameId = 'mm';
	// [TODO] enum
  // 0 = ongoing, 1 = won, -1 = lost
  this.outcome = 0;
	this.score = 0;
  this.scoreText;
	this.premature = true;

	this.instruments = [
		"Guitar",
		"Ukulele",
		"Banjo",
		"Drums",
		"Piano",
		"Violin",
		"Trumpet",
		"Saxophone"
	];

	this.randomInstrument;
	this.randomSound;

	this.buttons = [];

	this.btnFunc = [
		"pressGuitar",
		"pressUkulele",
		"pressBanjo",
		"pressDrums",
		"pressPiano",
		"pressViolin",
		"pressTrumpet",
		"pressSaxophone"
	];

	this.counterTitle;
	this.timer;

	this.counter = 5;
	this.counterStyle = {font: "70px ChickenButt", fill:"#fff", align:"center" };

	this.instructions;
	this.instructionsTxt = "Wait for the sound, then pick the right instrument!";
	this.instructionsStyle = {font: "30px ChickenButt", fill:"#000", align:"left" };

}

MusicMembrane.prototype.preload = function() {
	//Load game background
	this.gameEngine.load.image('background2', 'images/musicMembraneBG.png');
  
	//Load all instrument images
	this.gameEngine.load.image('Guitar', 'images/guitar.png');
	this.gameEngine.load.image('Ukulele', 'images/uke.png');
	this.gameEngine.load.image('Banjo', 'images/banjo.png');
	this.gameEngine.load.image('Drums', 'images/drums.png');
	this.gameEngine.load.image('Piano', 'images/piano.png');
	this.gameEngine.load.image('Violin', 'images/violin.png');
	this.gameEngine.load.image('Trumpet', 'images/trumpet.png');
	this.gameEngine.load.image('Saxophone', 'images/sax.png');

	//Load all instrument sounds
	this.gameEngine.load.audio('Guitar', ['audio/guitar.mp3','audio/guitar.ogg']);
	this.gameEngine.load.audio('Banjo', ['audio/banjo.mp3','audio/banjo.ogg']);
	this.gameEngine.load.audio('Drums', ['audio/drums.mp3','audio/drums.ogg']);
	this.gameEngine.load.audio('Piano', ['audio/piano.mp3','audio/piano.ogg']);
	this.gameEngine.load.audio('Saxophone', ['audio/saxophone.mp3','audio/saxophone.ogg']);
	this.gameEngine.load.audio('Trumpet', ['audio/trumpet.mp3','audio/trumpet.ogg']);
	this.gameEngine.load.audio('Ukulele', ['audio/ukulele.mp3','audio/ukulele.ogg']);
	this.gameEngine.load.audio('Violin', ['audio/violin.mp3','audio/violin.ogg']);
};

MusicMembrane.prototype.create = function() {

	this.gameEngine.stage.backgroundColor = '#FFF';
	this.instructions = this.gameEngine.add.text((this.gameEngine.world.centerX - 372), this.gameEngine.world.centerY, this.instructionsTxt, this.instructionsStyle);

	this.gameEngine.time.events.add(Phaser.Timer.SECOND * 3, this.gameStart, this);

};

MusicMembrane.prototype.gameStart = function() {

	//get rid of instructions
	this.instructions.destroy();
	
	this.bg = this.gameEngine.add.sprite(0, 0, 'background2');
	
	this.gameEngine.stage.backgroundColor = '#FFA200';
	this.counterTitle = this.gameEngine.add.text(this.gameEngine.world.centerX, this.gameEngine.world.centerY, this.counter, this.counterStyle);

	//randomly select instrument sound
	this.randomInstrument = this.instruments[Math.floor(Math.random() * this.instruments.length)];

	var xLoc = 100;

	for(var i = 0; i < 8; i++){
		this.buttons[i] = this.gameEngine.add.sprite(xLoc, 450, this.instruments[i]);
		this.buttons[i].anchor.set(0.5);
		this.buttons[i].inputEnabled = true;
		this.buttons[i].events.onInputDown.add(eval(this.btnFunc[i]), this);
		this.buttons[i].anchor.setTo(0.5, 0.5);
		this.buttons[i].scale.setTo(1.5, 1.5);
		xLoc += 115;
	}

	this.timer = this.gameEngine.time.create(false);
	this.timer.loop(1000, mmCountdown, this);
	this.timer.start();

}

function mmCountdown() {

	this.counter--;
	this.counterTitle.destroy();

	if(this.counter > 0){
		this.counterTitle = this.gameEngine.add.text(this.gameEngine.world.centerX, this.gameEngine.world.centerY, this.counter, this.counterStyle);
	} else {
		//lose game when counter gets to 0
		this.outcome = -1;
	}

	if(this.counter == 3){
		//When counter reaches 2, play sound
		this.randomSound = this.gameEngine.add.audio(this.randomInstrument);
		this.premature = false;
		this.randomSound.play();
	}

};

//NOT USED
MusicMembrane.prototype.update = function() {

};

function pressGuitar(){
		if(this.randomInstrument == "Guitar"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

function pressUkulele(){
		if(this.randomInstrument == "Ukulele"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

function pressBanjo(){
		if(this.randomInstrument == "Banjo"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

function pressDrums(){
		if(this.randomInstrument == "Drums"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

function pressPiano(){
		if(this.randomInstrument == "Piano"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

function pressViolin(){
		if(this.randomInstrument == "Violin"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

function pressTrumpet(){
		if(this.randomInstrument == "Trumpet"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}

function pressSaxophone(){
		if(this.randomInstrument == "Saxophone"){
			this.outcome = 1;
		} else {
			this.outcome = -1;
		}
}


MusicMembrane.prototype.destroy = function() {
  // Reset vars
  this.score = 0;
  this.outcome = 0;
  // Detach listeners
  // No listeners attached in this game, other than the button, which gets its listener destroyed with itself
  // Remove elements
  this.counterTitle.destroy();
	this.bg.destroy();
	if(this.premature == false){
	this.randomSound.destroy();
	}

  this.timer.destroy();
	this.counter = 5;
	this.counterStyle = {font: "70px ChickenButt", fill:"#fff", align:"center" };
	for (var i = 0; i < this.buttons.length; i++) {
		this.buttons[i].destroy();
	}

	this.premature = true;

}
