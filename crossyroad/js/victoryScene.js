class VictoryScene extends Phaser.Scene {
  constructor() {
    super({ key: "victoryScene" });
  }

  preload() {
    this.load.image("chest", "assets/chest.png");
  }

  create() {
    this.add
      .text(160, 120, "VICTORY")
      .setOrigin(0.5)
      .setDepth(4)
      .setScale(2);
    let text = this.add.text(500, 500, "Back to Main Menu", {
      fontFamily: "Garamond",
      color: "white",
      fontSize: "2rem"
    });
    text.setDepth(5);
    text.setInteractive({ useHandCursor: true });
    text.on("pointerdown", () => this.clickButton());

    let bg = this.add.sprite(0, 0, "chest");
    bg.setPosition(800 / 2, 600 / 2);
    this.music = this.sound.add("victoryMusic");
    this.music.play();

    this.scene.setVisible(false);

    setTimeout(() => {
      this.scene.setVisible(true);
      this.cameras.main.fadeIn(2000);
    }, 500);
  }
  clickButton() {
    this.scene.switch("titleScene");
  }
}
export default VictoryScene;
