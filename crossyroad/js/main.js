import TitleScene from "./titleScene.js";
import GameScene from "./gameScene.js";
import PreloadScene from "./preloadScene.js";
import VictoryScene from "./victoryScene.js";

// Our game scene
let gameScene = new GameScene();
let titleScene = new TitleScene();
let preloadScene = new PreloadScene();
let victoryScene = new VictoryScene();

//* Game scene */
let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600
};
let game = new Phaser.Game(config);

// load scenes
game.scene.add("titleScene", titleScene);
game.scene.add("gameScene", gameScene);
game.scene.add("preloadScene", preloadScene);
game.scene.add("victoryScene", victoryScene);
// start title
game.scene.start("preloadScene");
