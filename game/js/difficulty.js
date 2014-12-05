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
	}
	// no means no
	,	nmn: {
		current : 0
	}
	// strooper trooper
	,	st: {
		current : 0
	}


};
