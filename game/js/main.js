"use strict";

window.onload = function() {

  var gameEngine = new Phaser.Game(960, 560, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
  });

  var noMeansNo = new NoMeansNo(gameEngine);
	var musicMembrane = new MusicMembrane(gameEngine);

  function preload () {
    noMeansNo.preload();
		musicMembrane.preload();
  }

  function create () {
    gameEngine.stage.backgroundColor = '#FFF'; 
    noMeansNo.create();
		musicMembrane.create();
  }

  function update() {
    noMeansNo.update();
		musicMembrane.update();
  }

};
