"use strict";

BulletHell.prototype = new Minigame();
BulletHell.prototype.constructor = BulletHell;

function BulletHell (pGameEngine) {
  this.gameEngine = pGameEngine;
  this.gameId = 'bh';
	// [TODO] enum
  // 0 = ongoing, 1 = won, -1 = lost
  this.outcome = 0;
  this.score = 0;

	this.bulletHellMusic;

	this.gameTimerTitle;
	this.gameTimer = 5;
	this.gameTimerStyle = {font: "50px ChickenButt", fill:"#000", align:"center" };

	this.counterTitle;
	this.counter = 3;
	this.counterStyle = {font: "70px ChickenButt", fill:"#000", align:"center" };

	this.turrets = [];

	this.bullets;

	this.startShooting;

	this.dragObj;

	this.gameStarted = false;

	this.instructions;
	this.instructionsTxt = "Select JJ and hold on, dodge the bullets gangsta!";
	this.instructionsStyle = {font: "30px ChickenButt", fill:"#000", align:"center" };
}

BulletHell.prototype.preload = function() {
	//load images
  this.gameEngine.load.image('jj', 'images/jj.png');
	this.gameEngine.load.image('turret', 'images/normTurret.png');
	this.gameEngine.load.image('bullet', 'images/bullet.png');

	this.startShooting = false;

	this.gameEngine.load.audio('guileTheme', ['audio/guile.mp3']);
};

BulletHell.prototype.create = function(){

	this.gameEngine.stage.backgroundColor = '#FFF';
	this.instructions = this.gameEngine.add.text(200, this.gameEngine.world.centerY, this.instructionsTxt, this.instructionsStyle);

	this.gameEngine.time.events.add(Phaser.Timer.SECOND * 3, this.gameStart, this);
};

BulletHell.prototype.gameStart = function(){

		//get rid of instructions
	this.instructions.destroy();

	this.gameEngine.physics.startSystem(Phaser.Physics.ARCADE);
	this.gameEngine.physics.startSystem(Phaser.Physics.P2JS);
	this.gameEngine.physics.p2.gravity.y = 100;
	this.gameEngine.physics.p2.restitution = 0.8;
	this.gameEngine.stage.backgroundColor = '#FFFFFF';

	this.bulletHellMusic = this.gameEngine.add.audio('guileTheme');
	this.bulletHellMusic.play();

	this.gameTimerTitle = this.gameEngine.add.text(900, 30, this.gameTimer, this.gameTimerStyle);

	this.counterTitle = this.gameEngine.add.text(this.gameEngine.world.centerX, this.gameEngine.world.centerY, this.counter, this.counterStyle);

	this.dragObj = this.gameEngine.add.sprite(this.gameEngine.world.centerX, this.gameEngine.world.centerY, 'jj');
	this.dragObj.anchor.setTo(0.5);
	this.dragObj.scale.setTo(0.7);
	this.dragObj.inputEnabled = true;
	//Allow dragging
	this.dragObj.input.enableDrag(true);
	//Start Countdown once you get a hold of obj
	this.dragObj.events.onDragStart.add(this.onDragStart, this);
	this.dragObj.events.onDragStop.add(this.onDragStop, this);

	//Make Turret Group
  var turretAmt = DIFFICULTY.get(this.gameId, "turretAmt");
	for(var i=0; i < turretAmt; i++){
		this.turrets[i] = new Turret(this.gameEngine);
	}

	//Create Bullets
	this.bullets = this.gameEngine.add.group();
	this.bullets.enableBody = true;
	this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

	this.bullets.createMultiple(50, 'bullet');
	this.bullets.setAll('checkWorldBounds', true);
	this.bullets.setAll('outOfBoundsKill', true);

	this.gameEngine.physics.enable(this.bullets, Phaser.Physics.ARCADE);
	this.gameEngine.physics.enable(this.dragObj, Phaser.Physics.ARCADE);

	this.gameStarted = true;

}

BulletHell.prototype.countdown = function() {
  this.counter--;
	this.counterTitle.destroy();

	if(this.counter > 0)
	{
		this.counterTitle = this.gameEngine.add.text(this.gameEngine.world.centerX, this.gameEngine.world.centerY, this.counter, this.counterStyle);
	}
	else if(this.counter < 0)
	{
		this.gameTimer--;
		this.gameTimerTitle.destroy();
		if(this.gameTimer > 0)
		{
			this.gameTimerTitle = this.gameEngine.add.text(900, 30, this.gameTimer, this.gameTimerStyle);
		}
		else
		{
			this.outcome = 1;
		}
	}
};

BulletHell.prototype.update = function() {
	//Player gets hit by bullet

	if(this.gameStarted == true){
		this.gameEngine.physics.arcade.overlap(this.bullets, this.dragObj, killPlayer, null, this);
	}

	function killPlayer(player, bullet){
		this.dragObj.kill();
		this.outcome = -1;
	}

	if(this.counter <= 0){
		for(var i=0; i < this.turrets.length; i++){
			this.turrets[i].fire(this);
		}
	}
};

BulletHell.prototype.onDragStart = function(sprite, pointer){
	this.timer = this.gameEngine.time.create(false);
	this.timer.loop(1000, this.countdown, this);
	this.timer.start();
};

BulletHell.prototype.onDragStop = function(sprite, pointer){
	this.outcome = -1;
};

BulletHell.prototype.destroy = function(){
	// Reset vars
  this.score = 0;
  this.outcome = 0;
	this.bulletHellMusic.destroy();
	this.dragObj.destroy();
	this.counterTitle.destroy();
	this.gameTimerTitle.destroy();
	this.timer.destroy();
	this.counter = 3;
	this.gameTimer = 5;
	this.counterStyle = {font: "70px ChickenButt", fill:"#000", align:"center" };
	for(var i=0; i < this.turrets.length; i++){
		this.turrets[i].destroy();
	}
	this.bullets.destroy();
	this.gameStarted = false;
}
