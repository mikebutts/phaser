class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "preloadScene" });
  }
  create() {
    this.logo = this.add.sprite(0, 0, "logo");

    this.logo.setPosition(800 / 2, 80);
    this.logo.setScale(0.35);
  }
  update() {
    this.logo.angle += 1;
  }
  preload() {
    this.load.image("logo", "assets/logonew2.png");

    this.graphics = this.add.graphics();
    this.newGraphics = this.add.graphics();
    var progressBar = new Phaser.Geom.Rectangle(200, 200, 400, 50);
    var progressBarFill = new Phaser.Geom.Rectangle(205, 205, 290, 40);

    this.graphics.fillStyle(0xffffff, 1);
    this.graphics.fillRectShape(progressBar);

    this.newGraphics.fillStyle(0x3587e2, 1);
    this.newGraphics.fillRectShape(progressBarFill);

    var loadingText = this.add.text(250, 260, "Loading: ", {
      fontSize: "32px",
      fill: "#FFF"
    });

    this.load.audio("titleMusic", "assets/Battle.mp3");
    this.load.audio("battleMusic", "assets/pixelriver.mp3");
    this.load.image("bg_img", "assets/castle.png");
    this.load.image("brand", "assets/images/logonew2.png");
    this.load.image("background", "assets/background.png");
    this.load.image("player", "assets/player.png");
    this.load.image("enemy", "assets/dragon.png");
    this.load.image("goal", "assets/treasure.png");
    this.load.image("chest", "assets/chest.png");
    this.load.audio("victoryMusic", "assets/victory.wav");
    this.load.image("play", "assets/PlayButton.png");

    this.load.on("progress", this.updateBar, {
      newGraphics: this.newGraphics,
      loadingText: loadingText
    });
    this.load.on("complete", this.complete, { scene: this.scene });
  }

  updateBar(percentage) {
    this.newGraphics.clear();
    this.newGraphics.fillStyle(0x3587e2, 1);
    this.newGraphics.fillRectShape(
      new Phaser.Geom.Rectangle(205, 205, percentage * 390, 40)
    );

    percentage = percentage * 100;
    this.loadingText.setText("Loading: " + percentage.toFixed(2) + "%");
    console.log("P:" + percentage);
  }

  complete() {
    setTimeout(() => {
      this.scene.start("titleScene");
    }, 1000);
  }
}

export default PreloadScene;
