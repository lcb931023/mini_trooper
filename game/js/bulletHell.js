"use strict";

BulletHell.prototype = new Minigame();
BulletHell.prototype.constructor = BulletHell;

function BulletHell (pGameEngine) {
  this.gameEngine = pGameEngine;
	// [TODO] enum
  // 0 = ongoing, 1 = won, -1 = lost
  this.outcome = 0;
  this.score = 0;
	
	this.counterTitle;
	this.counter = 5;
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
		this.turrets[i] = this.gameEngine.add.sprite(this.gameEngine.world.randomX, this.gameEngine.world.randomY, 'turret');
		this.turrets[i].anchor.setTo(0.5);
		//console.log(this.turrets[i]);
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

function countdown() {
  this.counter--;
	this.counterTitle.destroy();
	
	if(this.counter > 0)
	{
		this.counterTitle = this.gameEngine.add.text(this.gameEngine.world.centerX, this.gameEngine.world.centerY, this.counter, this.counterStyle);
	}
	else
	{
		
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
			this.fire(this.turrets[i]);
			console.log(this.turrets[i]);
		}
	}
};

BulletHell.prototype.onDragStart = function(sprite, pointer){
	this.timer = this.gameEngine.time.create(false);
	this.timer.loop(1000, countdown, this);
	this.timer.start();	
};

BulletHell.prototype.onDragStop = function(sprite, pointer){
	this.outcome = -1;	
};

BulletHell.prototype.fire = function(turret){
			if (this.gameEngine.time.now > this.nextFire && this.bullets.countDead() > 0)
			{
					this.nextFire = this.gameEngine.time.now + this.fireRate;

					this.bullet = this.bullets.getFirstDead();

					this.bullet.reset(turret.x, turret.y);

					this.gameEngine.physics.arcade.moveToPointer(this.bullet, 300);
				
			}	
};


BulletHell.prototype.destroy = function(){
	// Reset vars
  this.score = 0;
  this.outcome = 0;
	this.dragObj.destroy();
	this.counterTitle.destroy();
	this.timer.destroy();
	this.counter = 5;
	this.counterStyle = {font: "70px Arial", fill:"#000", align:"center" };
	for(var i=0; i < this.turrets.length; i++){
		this.turrets[i].destroy();
	}
	this.bullets.destroy();
}