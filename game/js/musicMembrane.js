"use strict";

MusicMembrane.prototype = new Minigame();
MusicMembrane.prototype.constructor = MusicMembrane;

function MusicMembrane (pGameEngine) {
  this.gameEngine = pGameEngine;
	
	// [TODO] enum
  // 0 = ongoing, 1 = won, -1 = lost
  this.outcome = 0;
	this.score = 0;
  this.scoreText;
	
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
	this.counterStyle = {font: "70px Arial", fill:"#000", align:"center" };

}

MusicMembrane.prototype.preload = function() {
  
	//Load all instrument images
	this.gameEngine.load.image('Guitar', 'images/nyanCat_Blue.png');
	this.gameEngine.load.image('Ukulele', 'images/nyanCat_Green.png');
	this.gameEngine.load.image('Banjo', 'images/nyanCat_Indigo.png');
	this.gameEngine.load.image('Drums', 'images/nyanCat_Orange.png');
	this.gameEngine.load.image('Piano', 'images/nyanCat_Red.png');
	this.gameEngine.load.image('Violin', 'images/nyanCat_Violet.png');
	this.gameEngine.load.image('Trumpet', 'images/nyanCat_Yellow.png');
	this.gameEngine.load.image('Saxophone', 'images/nyanCat_Yellow.png');
	
	//Load all instrument sounds
	//this.gameEngine.load.audio('guitar', ['audio/nyanCatMusic.mp3','audio/nyanCatMusic.ogg']);
};

MusicMembrane.prototype.create = function() {
  
	this.gameEngine.stage.backgroundColor = '#FFA200';
	this.counterTitle = this.gameEngine.add.text(this.gameEngine.world.centerX, this.gameEngine.world.centerY, this.counter, this.counterStyle);
	
	//randomly select instrument sound
	this.randomInstrument = this.instruments[Math.floor(Math.random() * this.instruments.length)];
	console.log(this.randomInstrument);
	
	var xLoc = 100;

	for(var i = 0; i < 8; i++){
		this.buttons[i] = this.gameEngine.add.sprite(xLoc, 450, this.instruments[i]);
		this.buttons[i].anchor.set(0.5);
		this.buttons[i].inputEnabled = true;
		this.buttons[i].events.onInputDown.add(eval(this.btnFunc[i]), this);
		this.buttons[i].anchor.setTo(0.5, 0.5);
		this.buttons[i].scale.setTo(0.3, 0.3);
		xLoc += 115;
	}
	
	this.timer = this.gameEngine.time.create(false);
	this.timer.loop(1000, countdown, this);
	this.timer.start();


};

function countdown() {
  
	this.counter--;

	this.counterTitle.destroy();

	if(this.counter > 0){
		this.counterTitle = this.gameEngine.add.text(this.gameEngine.world.centerX, this.gameEngine.world.centerY, this.counter, this.counterStyle);
	} else {
		//lose game when counter gets to 0
		this.outcome = -1;
	}
	
	if(this.counter == 2){
		//When counter reaches 2, play sound
		//this.randomSound = this.gameEngine.add.audio(this.randomInstrument);
		//this.randomSound.play();
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
	//this.randomSound.destroy();
  this.timer.destroy();
	this.counter = 5;
	this.counterStyle = {font: "70px Arial", fill:"#000", align:"center" };
	for (var i = 0; i < this.buttons.length; i++) {
		this.buttons[i].destroy();
	}


}
