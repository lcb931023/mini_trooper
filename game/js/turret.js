"use strict";

function Turret (gameEngine) {
  Phaser.Sprite.call(this, gameEngine, gameEngine.world.randomX, gameEngine.world.randomY, 'turret');
  this.anchor.setTo(0.5, 0.5);
  this.nextFire = 0;
  this.fireRate = 400;
  gameEngine.add.existing(this);
};

Turret.prototype = Object.create(Phaser.Sprite.prototype);
Turret.prototype.constructor = Turret;

Turret.prototype.fire = function(game){
      if (game.gameEngine.time.now > this.nextFire && game.bullets.countDead() > 0)
      {
          this.nextFire = game.gameEngine.time.now + this.fireRate;

          game.bullet = game.bullets.getFirstDead();

          game.bullet.reset(this.x, this.y);

          game.gameEngine.physics.arcade.moveToPointer(game.bullet, 300);

      }
};
