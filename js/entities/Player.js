import { TILE_SIZE } from '../constants.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        this.setCollideWorldBounds(true);
        this.setScale(2);

        this.moveSpeed = 160;
        this.isMoving = false;

        this.createAnimations();
        this.play('idle');

        console.log('Player created at', x, y);
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'idle',
            frames: [{ key: 'player', frame: 0 }],
            frameRate: 10,
        });

        this.scene.anims.create({
            key: 'move',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    }

    update(vimKeys) {
        this.isMoving = false;
        this.setVelocity(0);

        console.log('Updating player. Vim keys state:', 
            {H: vimKeys.H.isDown, J: vimKeys.J.isDown, K: vimKeys.K.isDown, L: vimKeys.L.isDown});

        if (vimKeys.H.isDown) {
            this.setVelocityX(-this.moveSpeed);
            this.flipX = true;
            this.isMoving = true;
            console.log('Moving left');
        } else if (vimKeys.L.isDown) {
            this.setVelocityX(this.moveSpeed);
            this.flipX = false;
            this.isMoving = true;
            console.log('Moving right');
        }

        if (vimKeys.K.isDown) {
            this.setVelocityY(-this.moveSpeed);
            this.isMoving = true;
            console.log('Moving up');
        } else if (vimKeys.J.isDown) {
            this.setVelocityY(this.moveSpeed);
            this.isMoving = true;
            console.log('Moving down');
        }

        if (this.isMoving) {
            this.play('move', true);
        } else {
            this.play('idle', true);
        }

        console.log('Player position:', this.x, this.y, 'Velocity:', this.body.velocity.x, this.body.velocity.y);
    }
}