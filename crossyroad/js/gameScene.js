class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "gameScene" });
  }

  // initiate scene parameters
  init() {
    // player speed
    this.playerSpeed = 3;

    // enemy speed
    this.enemyMinSpeed = 2;
    this.enemyMaxSpeed = 4.5;

    // boundaries
    this.enemyMinY = 50;
    this.enemyMaxY = 500;

    // we are not terminating
    this.isTerminating = false;
  }

  preload() {}

  // called after preload ends
  create() {
    this.music = this.sound.add("battleMusic");
    this.music.play();
    //create bg sprite
    let bg = this.add.sprite(0, 0, "background");

    // change orgin to the top-Left corner
    bg.setPosition(800 / 2, 600 / 2);

    //create the player
    this.player = this.add.sprite(
      40,
      this.sys.game.config.height / 2,
      "player"
    );
    this.player.depth = 1; //can set depth of sprites, higher is on top
    this.player.setScale(0.5);

    // goal
    this.goal = this.add.sprite(
      this.sys.game.config.width - 80,
      this.sys.game.config.height / 2,
      "goal"
    );
    this.goal.setScale(0.6);

    //enemy
    this.enemies = this.add.group({
      key: "enemy",
      repeat: 6,
      setXY: {
        x: 100,
        y: 100,
        stepX: 100,
        stepY: 20
      }
    });

    // set scale for all group elements
    Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.4, -0.4);

    //set flipX and Speed for group
    Phaser.Actions.Call(
      this.enemies.getChildren(),
      function(enemy) {
        //FLIP enemy
        enemy.flipX = true;

        //set enemy speed
        let dir = Math.random() < 0.5 ? 1 : -1;
        let speed =
          this.enemyMinSpeed +
          Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
        enemy.speed = dir * speed;
      },
      this
    );
  }

  //this is called up to 60 times per second
  update() {
    // don't execute if we are terminating
    if (this.isTerminating) return;

    // check for active input
    if (this.input.activePointer.isDown) {
      // player walks
      this.player.x += this.playerSpeed;
    }
    // treasure overlap check
    let playerRect = this.player.getBounds();
    let treasureRect = this.goal.getBounds();

    if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {
      console.log("reached goal!");

      // end game
      return this.gameWin();
    }

    // get enemies
    let enemies = this.enemies.getChildren();
    let numEnemies = enemies.length;

    for (let i = 0; i < numEnemies; i++) {
      // enemy movement
      enemies[i].y += enemies[i].speed;

      // check we haven't passed min or max Y
      let conditionUp = enemies[i].speed < 0 && enemies[i].y <= this.enemyMinY;
      let conditionDown =
        enemies[i].speed > 0 && enemies[i].y >= this.enemyMaxY;

      // if we passed the upper or lower limit, reverse
      if (conditionUp || conditionDown) {
        enemies[i].speed *= -1;
      }

      // check enemy overlap
      let enemyRect = enemies[i].getBounds();

      if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)) {
        console.log("Game over!");
        // end game

        return this.gameLose();
      }
    }
  }
  gameWin() {
    this.music.stop();
    this.isTerminating = true;
    this.scene.start("victoryScene");
  }
  gameLose() {
    this.music.stop();
    // initate game over sequence
    this.isTerminating = true;

    this.cameras.main.shake(500);
    // listen for event completion
    this.cameras.main.on(
      "camerashakecomplete",
      function(camera, effect) {
        // fade out
        this.cameras.main.fade(500);
      },
      this
    );
    this.cameras.main.on(
      "camerafadeoutcomplete",
      function(camera, effect) {
        this.scene.start("titleScene");
      },
      this
    );
  }
}

export default GameScene;
