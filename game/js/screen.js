"use strict";

function Screen (pGameEngine) {
  this.gameEngine = pGameEngine;
  this.done = false;
}

Screen.prototype.preload = function() {
  // Load image assets
};

Screen.prototype.create = function() {

};

Screen.prototype.update = function() {

};

Screen.prototype.destroy = function() {
  this.done = false;
};
