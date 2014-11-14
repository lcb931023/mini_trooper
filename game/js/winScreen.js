"use strict";

WinScreen.prototype = new Screen();
WinScreen.prototype.constructor = Screen;

function WinScreen (pGameEngine) {
  this.gameEngine = pGameEngine;
  this.bg;
}

WinScreen.prototype.preload = function() {
  // Load image assets
};

WinScreen.prototype.create = function() {

};

WinScreen.prototype.update = function() {

};

WinScreen.prototype.destroy = function() {
  Screen.prototype.destroy.call(this);
};
