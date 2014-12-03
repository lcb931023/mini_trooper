"use strict";

function Minigame (pGameEngine) {
  this.gameEngine = pGameEngine;
  this.outcome = 0;
  this.gameId = "unknown";
}

Minigame.prototype.preload = function() {
  // Load image assets
};

Minigame.prototype.create = function() {

};

Minigame.prototype.update = function() {

};

Minigame.prototype.destroy = function() {

};

Minigame.prototype.addDif = function() {
  DIFFICULTY[this.gameId].current ++;
};

Minigame.prototype.resetDif = function() {
  DIFFICULTY[this.gameId].current = 0;
};
