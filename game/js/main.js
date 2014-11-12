"use strict";

window.onload = function() {

  var gameEngine = new Phaser.Game(960, 560, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
  });

  var noMeansNo = new NoMeansNo(gameEngine);

  function preload () {
    noMeansNo.preload();
  }

  function create () {
    noMeansNo.create();
  }

  function update() {
    noMeansNo.update();
  }

};
