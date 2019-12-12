class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: "titleScene" });
  }

  preload() {}

  create() {
    let bg = this.add.sprite(0, 0, "bg_img");
    this.music = this.sound.add("titleMusic");
    this.music.play();
    // change orgin to the top-Left corner
    bg.setOrigin(0, 0);
    let playButton = this.add.sprite(600, 500, "play").setInteractive();
    playButton.setScale(0.2);

    let text = this.add.text(100, 100, "Welcome To My First Game!", {
      fontFamily: "Garamond",
      backgroundColor: "black",
      fontSize: "2rem"
    });

    playButton.setInteractive({ useHandCursor: true });
    playButton.on("pointerover", function() {
      this.setTint(0xff44ff);
    });
    playButton.on("pointerout", function() {
      this.clearTint();
    });
    playButton.on("pointerdown", () => this.clickButton());
  }

  clickButton() {
    this.music.stop();
    this.scene.switch("gameScene");
  }
}

export default TitleScene;
