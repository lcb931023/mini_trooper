"use strict";

var DIFFICULTY = {
		get: function(gameName, varName) {
			// Get difficulty;
			// if already highest, return highest
			return this[gameName][varName][this[gameName].current] ? this[gameName][varName][this[gameName].current] : this[gameName][varName][ this[gameName][varName].length-1 ];
		}
	// bullet hell
	,	bh: {
			current : 0
		,	turretAmt: [
      1,
      2,
      3,
      3,
      4,
      4,
      5,
    ]
    , fireRate: [
			400,
			400,
			500,
			400,
			500,
			400,
			700,
			650,
			600,
			550,
			500,
			450,
			400,

    ]
  }
	// nyan race
	,	nr: {
		current : 0
		, catSpeed: [
			500,
			750,
			1000,
			1150,
			1250,
			1350,
			1500,
			1750,
			2000,
			2000,
			2000,
			2000,
			2000,
			2000,
		]
	}
	// music membrane
	,	mm: {
		current : 0
		, playDur: [
			4.2,
			3.8,
			3.4,
			3.0,
			2.6,
			2.2,
			2.0,
			1.8,
			1.7,
			1.6,
			1.5,
			1.4
		]
	}
	// no means no
	,	nmn: {
		current : 0
		, pedoSpeed: [
			1,
			1.5,
			2.0,
			2.3,
			2.6,
			2.9,
			3.3,
		]
	}
	// strooper trooper
	,	st: {
		current : 0
	}
	// where's watson
	, ww: {
		current: 0
		, numFaces: [
			10,
			30,
			50,
			100,
			200,
			350,
			500,
			750,
			1000,
		]
		, faceSize: [
			3,
			2.5,
			2.0,
			2.0,
			1.5,
			1.0,
			1.0,
			0.5,
			0.5,
		]
	}

};
