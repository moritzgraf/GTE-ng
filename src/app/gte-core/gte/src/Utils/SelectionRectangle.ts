import {SELECTION_INNER_COLOR} from './Constants';

/** A class representing the rectangle which selects vertices*/
export class SelectionRectangle extends Phaser.GameObjects.Sprite {
  scene: Phaser.Scene;

  start: Phaser.Math.Vector2;
  active: boolean;

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, null);
    this.setTexture('dot');

    this.start = new Phaser.Math.Vector2;
    this.tint = SELECTION_INNER_COLOR;

    this.alpha = 0;

    this.active = true;
    // when we click and hold, we reset the rectangle.
    this.scene.input.on('pointerdown', () => {
      if (this.active) {
        this.displayWidth = 0;
        this.displayHeight = 0;
        this.start.x = this.scene.input.activePointer.x;
        this.start.y = this.scene.input.activePointer.y;
        this.setPosition(this.start.x, this.start.y);
        this.alpha = 0.3;
        this.scene.time.addEvent({
          delay: 101,
          callback: () => {
            if (this.scene.input.activePointer.isDown) {
              this.scene.sys.canvas.style.cursor = 'crosshair';
            }
          }
        });
      }
    });

    // When we release, reset the rectangle
    this.scene.input.on('pointerup', () => {
      this.scene.sys.canvas.style.cursor = 'default';
      if (this.active) {
        this.alpha = 0;
        this.displayWidth = 0;
        this.displayHeight = 0;
      }
    });
    // On dragging, update the transform of the rectangle*/
    this.scene.input.on('drag', () => {
      if (this.scene.input.activePointer.isDown && this.active && this.alpha !== 0) {
        this.displayWidth = this.scene.input.activePointer.x - this.start.x;
        this.displayHeight = this.scene.input.activePointer.y - this.start.y;

      }
    });
    this.scene.add.existing(this);
  }
}

