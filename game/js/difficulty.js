"use strict";

var DIFFICULTY = {
	current : 0
	,	bh: {
		turretAmt: [
      1,
      2,
      3,
      3,
      4,
      4,
      5,
      5,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
    ]
    , fireRate: [
			400,
			400,
			500,
			400,
			500,
			400,
			500,
			400,

    ]
  }
	,	get: function(gameName, varName) {
		// Get difficulty;
		// if already highest, return highest
		return this[gameName][varName][this.current] ? this[gameName][varName][this.current] : this[gameName][varName][ this[gameName][varName].length-1 ];
	}

};
