import {
    Mouse
} from "./Mouse.js";
import {
    BattlefieldView
} from "./BattlefieldView.js";

import {
    getRandomFrom,
    getRandomInteger
} from "./utils.js";
import {
    Game
} from "./Game.js";
import {
    PrepScene
} from "./scenes/PrepScene.js";

console.log("Hello");

/* const battlefield = new BattlefieldView();
console.log('battlefield: ', battlefield); */

const game = new Game({
    prep: PrepScene,
});
game.start("prep");