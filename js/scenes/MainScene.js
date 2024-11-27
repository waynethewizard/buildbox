import LevelSystem from '../systems/LevelSystem.js';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
        this.player = null;
        this.levelSystem = null;
        this.debugText = null;
    }

    preload() {
        console.log('Preload started');
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('tiles', 'assets/tileset.png');
        console.log('Preload completed');
    }

    create() {
        console.log('Create started');
        
        this.cameras.main.setBackgroundColor('#4488AA');

        // Create player sprite first
        this.createPlayer();

        this.levelSystem = new LevelSystem(this);

        // Load a simple level
        const simpleLevel = {
            tiles: [
                [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
                [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
                [3, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 3],
                [3, 0, 1, 2, 2, 1, 0, 1, 2, 2, 2, 2, 1, 0, 3],
                [3, 0, 1, 2, 2, 1, 0, 1, 2, 2, 2, 2, 1, 0, 3],
                [3, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 3],
                [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
                [3, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 3],
                [3, 0, 1, 2, 2, 1, 0, 1, 2, 2, 2, 2, 1, 0, 3],
                [3, 0, 1, 2, 2, 1, 0, 1, 2, 2, 2, 2, 1, 0, 3],
                [3, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 3],
                [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
                [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
            ],
            objects: [
                { type: 'start', x: 1, y: 1 },
                { type: 'goal', x: 13, y: 11, width: 1, height: 1 }
            ]
        };

        this.levelSystem.loadLevel(simpleLevel);

        // Set up input
        this.input.keyboard.on('keydown', this.handleKeyDown, this);
        this.input.keyboard.on('keyup', this.handleKeyUp, this);

        // Debug text
        this.debugText = this.add.text(10, 10, 'Debug Info', { fontSize: '16px', fill: '#ffffff' });
        this.debugText.setScrollFactor(0);
        this.debugText.setDepth(2); // Set debug text depth to 2 to appear above everything

        console.log('Create completed');
    }

    createPlayer() {
        console.log('Creating player');
        // Create player sprite
        this.player = this.physics.add.sprite(80, 80, 'player');
        
        if (!this.player) {
            console.error('Failed to create player sprite');
            return;
        }

        this.player.setCollideWorldBounds(true);
        this.player.setScale(2);
        this.player.setDepth(1); // Set the player's depth to 1 to appear above the tiles

        // Ensure the player's physics body is enabled
        if (this.player.body) {
            this.player.body.setEnable(true);
        } else {
            console.error('Player body is null');
        }

        // Create animations
        this.anims.create({
            key: 'idle',
            frames: [{ key: 'player', frame: 0 }],
            frameRate: 10,
        });

        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        // Set initial animation
        this.player.play('idle');

        console.log('Player created successfully');
    }

    handleKeyDown(event) {
        console.log('Key pressed:', event.key);
    }

    handleKeyUp(event) {
        console.log('Key released:', event.key);
    }

    update() {
        if (!this.player || !this.player.body) {
            console.error('Player or player body is null in update');
            return;
        }

        const speed = 160;

        // Reset velocity
        this.player.setVelocity(0);

        // Check key states
        const keys = this.input.keyboard.addKeys('H,J,K,L');

        let movementDirection = '';

        if (keys.H.isDown) {
            this.player.setVelocityX(-speed);
            this.player.flipX = true;
            movementDirection += 'Left ';
        } else if (keys.L.isDown) {
            this.player.setVelocityX(speed);
            this.player.flipX = false;
            movementDirection += 'Right ';
        }

        if (keys.K.isDown) {
            this.player.setVelocityY(-speed);
            movementDirection += 'Up ';
        } else if (keys.J.isDown) {
            this.player.setVelocityY(speed);
            movementDirection += 'Down ';
        }

        // Update animation
        if (this.player.body.velocity.x !== 0 || this.player.body.velocity.y !== 0) {
            this.player.play('move', true);
        } else {
            this.player.play('idle', true);
        }

        // Update debug text
        this.debugText.setText(`
            Player Position: (${Math.round(this.player.x)}, ${Math.round(this.player.y)})
            Velocity: (${Math.round(this.player.body.velocity.x)}, ${Math.round(this.player.body.velocity.y)})
            Movement: ${movementDirection || 'None'}
            H: ${keys.H.isDown}
            J: ${keys.J.isDown}
            K: ${keys.K.isDown}
            L: ${keys.L.isDown}
        `);

        console.log(`Player moving: ${movementDirection}, Position: (${this.player.x}, ${this.player.y}), Velocity: (${this.player.body.velocity.x}, ${this.player.body.velocity.y})`);
    }
}