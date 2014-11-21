"use strict";

BulletHell.prototype = new Minigame();
BulletHell.prototype.constructor = BulletHell;

function BulletHell (pGameEngine) {
  this.gameEngine = pGameEngine;
	// [TODO] enum
  // 0 = ongoing, 1 = won, -1 = lost
  this.outcome = 0;
  this.score = 0;

	this.gameTimerTitle;
	this.gameTimer = 5;
	this.gameTimerStyle = {font: "50px Arial", fill:"#000", align:"center" };

	this.counterTitle;
	this.counter = 3;
	this.counterStyle = {font: "70px Arial", fill:"#000", align:"center" };

	this.turrets = [];

	this.bullets;
	this.fireRate = 400;
	this.nextFire = 0;

	this.startShooting;

	this.dragObj;
}

BulletHell.prototype.preload = function() {
	//load images
  this.gameEngine.load.image('elbin', 'images/elbin.png');
	this.gameEngine.load.image('turret', 'images/normTurret.png');
	this.gameEngine.load.image('bullet', 'images/bullet.png');

	this.startShooting = false;
};

BulletHell.prototype.create = function(){
	this.gameEngine.physics.startSystem(Phaser.Physics.ARCADE);
	this.gameEngine.physics.startSystem(Phaser.Physics.P2JS);
	this.gameEngine.physics.p2.gravity.y = 100;
	this.gameEngine.physics.p2.restitution = 0.8;
	this.gameEngine.stage.backgroundColor = '#FFFFFF';

	this.gameTimerTitle = this.gameEngine.add.text(900, 30, this.gameTimer, this.gameTimerStyle);

	this.counterTitle = this.gameEngine.add.text(this.gameEngine.world.centerX, this.gameEngine.world.centerY, this.counter, this.counterStyle);

	this.dragObj = this.gameEngine.add.sprite(this.gameEngine.world.centerX, this.gameEngine.world.centerY, 'elbin');
	this.dragObj.inputEnabled = true;
	//Allow dragging
	this.dragObj.input.enableDrag(true);
	//Start Countdown once you get a hold of obj
	this.dragObj.events.onDragStart.add(this.onDragStart, this);
	this.dragObj.events.onDragStop.add(this.onDragStop, this);

	//Make Turret Group

	for(var i=0; i < 3; i++){
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
};

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
	this.gameEngine.physics.arcade.overlap(this.bullets, this.dragObj, killPlayer, null, this);

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
	this.dragObj.destroy();
	this.counterTitle.destroy();
	this.gameTimerTitle.destroy();
	this.timer.destroy();
	this.counter = 3;
	this.gameTimer = 5;
	this.counterStyle = {font: "70px Arial", fill:"#000", align:"center" };
	for(var i=0; i < this.turrets.length; i++){
		this.turrets[i].destroy();
	}
	this.bullets.destroy();
}