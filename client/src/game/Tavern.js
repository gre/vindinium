var PIXI = require("pixi.js");

var beerTexture = PIXI.Texture.fromImage("/assets/img/beer2.png");

function Tavern () {
  PIXI.Sprite.call(this, beerTexture);
  this.position.x = 2;
  this.position.y = -10;
}
Tavern.prototype = Object.create(PIXI.Sprite.prototype);
Tavern.prototype.constructor = Tavern;

module.exports = Tavern;

