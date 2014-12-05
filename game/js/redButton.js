"use strict";

RedButton.prototype = new Minigame();
RedButton.prototype.constructor = RedButton;

function RedButton (pGameEngine) {
  this.gameEngine = pGameEngine;
  this.gameId = "rb";
  // [TODO] enum
  // 0 = ongoing, 1 = won, -1 = lost
  this.outcome = 0;
  this.score = 0;

  this.redButton;
  this.scoreText; // [TODO] implement
	
	this.counterTitle;
	this.timer;
	this.gameStarted = false;

	this.counter = 20;
	this.counterStyle = {font: "70px ChickenButt", fill:"#000", align:"center" };

	this.instructions;
	this.instructionsTxt = "A quick intermission.";
	this.instructionsStyle = {font: "30px ChickenButt", fill:"#000", align:"center" };
	
	this.intermission;
	this.intermissionStyle = {font: "50px ChickenButt", fill:"#000", align:"left", wordWrap: true, wordWrapWidth: 700};
}

RedButton.prototype.preload = function() {
  //load images
  this.gameEngine.load.image('redButton', 'images/btn_Red.png');
};

RedButton.prototype.create = function() {

	this.gameEngine.stage.backgroundColor = '#FFF';
	this.instructions = 	this.gameEngine.add.text(this.gameEngine.world.centerX, this.gameEngine.world.centerY, this.instructionsTxt, this.instructionsStyle);
	this.instructions.x = this.gameEngine.world.centerX - this.instructions.width/2;
	
	this.gameEngine.time.events.add(Phaser.Timer.SECOND * 3, this.gameStart, this);
};

RedButton.prototype.gameStart = function() {

	//get rid of instructions
	this.instructions.destroy();
	
	this.gameEngine.stage.backgroundColor = '#FFF';
	
	this.counterTitle = this.gameEngine.add.text(1000, 30, this.counter, this.counterStyle);

	this.redButton = this.gameEngine.add.sprite(this.gameEngine.world.centerX, this.gameEngine.world.centerY, 'redButton');
	this.redButton.scale.setTo(3.0);
	this.redButton.anchor.setTo(0.5);
	
	this.redButton.inputEnabled = true;
	this.redButton.events.onInputDown.add(this.redButtonPressed, this);

	this.intermissionTxt = "Don't press the red button.";
	this.intermission = this.gameEngine.add.text(60, 100, this.intermissionTxt, this.intermissionStyle);
	this.intermission.x = this.gameEngine.world.centerX - this.intermission.width/2;
	
	//now add physics overlaps in update function, as well as testing elbins body being violated
	this.gameStarted = true;
	
	this.timer = this.gameEngine.time.create(false);
	this.timer.loop(1000, this.countdown, this);
	this.timer.start();
}

RedButton.prototype.countdown = function(){
	this.counter--;
	this.counterTitle.destroy();

	if(20 > this.counter && this.counter > 17){
		this.intermissionTxt = "Don't press the red button.";
	}
	else if(17 >= this.counter && this.counter > 16){
		this.intermission.destroy();
		this.intermissionTxt = "Ok, now you can press it.";
		this.intermission = this.gameEngine.add.text(60, 100, this.intermissionTxt, this.intermissionStyle);
		this.intermission.x = this.gameEngine.world.centerX - this.intermission.width/2;
	} 
	else if(16 >= this.counter && this.counter > 15){
		this.intermission.destroy();
		this.intermissionTxt = "Dont!";
		this.intermission = this.gameEngine.add.text(60, 100, this.intermissionTxt, this.intermissionStyle);
		this.intermission.x = this.gameEngine.world.centerX - this.intermission.width/2;
	}
	else if(15 >= this.counter && this.counter > 14){
		this.intermission.destroy();
		this.intermissionTxt = "You!";
		this.intermission = this.gameEngine.add.text(60, 100, this.intermissionTxt, this.intermissionStyle);
		this.intermission.x = this.gameEngine.world.centerX - this.intermission.width/2;
	}
	else if(14 >= this.counter && this.counter > 13){
		this.intermission.destroy();
		this.intermissionTxt = "FUCKING!";
		this.intermission = this.gameEngine.add.text(60, 100, this.intermissionTxt, this.intermissionStyle);
		this.intermission.x = this.gameEngine.world.centerX - this.intermission.width/2;
	}
	else if(13 >= this.counter && this.counter > 12){
		this.intermission.destroy();
		this.intermissionTxt = "DARE!";
		this.intermission = this.gameEngine.add.text(60, 100, this.intermissionTxt, this.intermissionStyle);
		this.intermission.x = this.gameEngine.world.centerX - this.intermission.width/2;
	}
	else if(12 >= this.counter && this.counter > 10){
		this.intermission.destroy();
		this.intermissionTxt = "PRESS IT!";
		this.intermission = this.gameEngine.add.text(60, 100, this.intermissionTxt, this.intermissionStyle);
		this.intermission.x = this.gameEngine.world.centerX - this.intermission.width/2;
	}
	else if(10 >= this.counter && this.counter > 1){
		this.intermission.destroy();
		this.intermissionTxt = "I'm just messing, go ahead and press it and play the next level.";
		this.intermission = this.gameEngine.add.text(60, 100, this.intermissionTxt, this.intermissionStyle);
		this.intermission.x = this.gameEngine.world.centerX - this.intermission.width/2;
	}
	else {
		this.outcome = 1;
	}
};

RedButton.prototype.redButtonPressed = function(){
	this.outcome = -1;
}

RedButton.prototype.update = function() {
	if(this.gameStarted == true){
	
	}
};

RedButton.prototype.destroy = function() {
  // Reset vars
  this.score = 0;
  this.outcome = 0;
	this.intermission.destroy();
	this.redButton.destroy();
	this.counterTitle.destroy();
	this.timer.destroy();
	this.counter = 20;
  // Detach listeners
    // No listeners attached in this game, other than the button, which gets its listener destroyed with itself
  // Remove elements
  
	this.gameStarted = false;
};
