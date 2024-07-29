/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: fly avoids Flyswatter
@author: 
@tags: []
@addedOn: 2024-00-00
*/


const player = "p" // player is Fly
const obstacle = "o" // obstacle is a FlySwatter



setLegend(
  [player, bitmap`
................
................
................
................
................
......00000.....
.....0000000....
.LLLL0200020LLLL
.LLLL0200020LLLL
.LLLL0000000LLLL
.....0000000....
....000000000...
....0.......0...
....0.......0...
....0.......0...
....0.......0...`], // sprite of a fly
  [ obstacle, bitmap`
................
......0000......
.....0L1L20.....
....021L21L0....
....01L21L20....
....021L210.....
.....0L120......
......000.......
.......0........
.......0........
.......0........
.......0........
.......0........
.......0........
.......0........
.......0........` ], // sprite of a flyswatter
)

const melody = tune `
500: F5^500,
500: G4~500,
500: C5-500 + E5/500 + G4~500,
500: D4-500 + G5-500 + G4/500,
500,
500: C5-500 + F5/500 + F4~500,
500: E4/500,
500: G4-500 + E5/500 + G5~500,
500: E5/500 + G4~500 + C5~500,
500: F5~500 + D4~500,
500: C5-500 + B4~500,
500: D4-500 + F5-500 + G4-500,
500: D4-500 + D5/500 + F4~500,
500: C5-500,
500,
500: C5~500,
500: F4-500 + E5/500,
500: F5-500 + B4-500 + D4~500,
500: D5/500,
500,
500: B4-500 + D5/500,
500: G5-500 + F4-500,
500: C5/500 + D4~500,
500: E4-500 + E5~500,
500: G4/500,
500: C5-500 + F4~500,
500: A5~500,
500: D4-500 + E5-500 + F4/500,
500: B4~500,
500: C5-500 + E4/500,
500: G4-500 + A5~500,
500: C5^500`;

playTune(melody, Infinity);
setSolids([])

setMap(map`
........
........
........
........
........
........
........
...p....`);

var gameRunning = true;
 
onInput("a", () => {
  if (gameRunning) {
    getFirst(player).x -= 1; // Fly moves left
  }
});
 
onInput("d", () => {
  if (gameRunning) {
    getFirst(player).x += 1; //  Fly moves right
  }
});
 
function spawnObstacle() {
  let x = Math.floor(Math.random() * 8);
  let y = 0;
  addSprite(x, y, obstacle);
}
 
function moveObstacles() {
  let obstacles = getAll(obstacle);
 
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 1;
  }
}
 
function despawnObstacles() {
  let obstacles = getAll(obstacle);
 
  for (let i = 0; i < obstacles.length; i++) {
   if (obstacles[i].y == 7) {
     obstacles[i].remove();
   }
  }
}
 
function checkHit() {
  let obstacles = getAll(obstacle);
  let p = getFirst(player);
 
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
      return true;
    }
  }
 
  return false;
}
var gameLoop = setInterval(() => {
  despawnObstacles();
  moveObstacles();
  spawnObstacle();
 
  if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("Game Over!", {
      x: 5,
      y: 6,
      color: color`3`
    });
  }
 
}, 1000);