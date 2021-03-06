var EventSourceObservable = require("./network/EventSourceObservable");
var GameModel = require("./GameModel");

// Server have a bug with positions: x and y are reversed
function reverseXY (pos) {
  return { x: pos.y, y: pos.x };
}
function bugfixServerPosition (game) {
  game.heroes.forEach(function (hero) {
    hero.pos = reverseXY(hero.pos);
    hero.spawnPos = reverseXY(hero.spawnPos);
  });
  return game;
}

function aggregateGame (previousGame, game) {
  return new GameModel(game, previousGame);
}

function GameStream (id) {
  return EventSourceObservable("/events/"+id)
    .map(bugfixServerPosition)
    .scan(null, aggregateGame);
}

module.exports = GameStream;
